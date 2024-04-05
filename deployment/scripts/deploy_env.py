import argparse
import textwrap
import os
from pathlib import Path
import subprocess
import shlex
import boto3
import paramiko
PROFILE_NAME = 'smf'  # Replace 'smf' with your actual profile name


def upload_jar_to_remote(host, username, public_key_path, local_jar_path, remote_dir):
    ssh_client = paramiko.SSHClient()
    users_known_hosts = os.path.expanduser("~/.ssh/known_hosts")
    if os.path.exists(users_known_hosts):
        ssh_client.load_host_keys(users_known_hosts)

    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy)

    try:
        print(f"Connecting to remote host {host}...")
        ssh_client.connect(host, username=username)
        print(f"Connected to remote host {host}")

        print("Uploading backend jar...")

        sftp = ssh_client.open_sftp()

        root = Path().resolve()
        parent_directory = os.path.dirname(root)

        local_setup = os.path.join(parent_directory, "deployment", "machineImage", "environment.properties")

        ssh_client.exec_command(f"sudo chown ${username}:${username} /etc/smfinance-api/")
        ssh_client.exec_command("rm -rf /etc/smfinance-api/*.jar")
        ssh_client.exec_command("rm -rf /etc/smfinance-api/environment.properties")

        sftp.put(local_setup, f"{remote_dir}/environment.properties")

        sftp.put(local_jar_path, f"{remote_dir}/smfinance-0.0.1-SNAPSHOT.jar")
        ssh_client.exec_command("sudo systemctl restart smfinance-api.service")

        sftp.close()
        ssh_client.close()
        print(f"JAR file uploaded successfully to {host}")
    except Exception as e:
        print(f"Error: {e}")


def upload_frontEndFiles_to_remote(host, username, public_key_path, local_dir, remote_dir):
    ssh_client = paramiko.SSHClient()
    users_known_hosts = os.path.expanduser("~/.ssh/known_hosts")
    if os.path.exists(users_known_hosts):
        ssh_client.load_host_keys(users_known_hosts)

    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy)

    try:
        print(f"Connecting to remote host {host}...")
        ssh_client.connect(host, username=username)
        print(f"Connected to remote host {host}")

        print("Uploading frontend files...")

        sftp = ssh_client.open_sftp()

        ssh_client.exec_command(f"sudo chown ${username}:${username} {remote_dir}")

        ssh_client.exec_command("rm -rf /etc/smfinance-ui/*")

        for root, dirs, files in os.walk(local_dir):
            for file in files:
                local_file_path = os.path.join(root, file)

                remote_file_path = os.path.join(remote_dir, os.path.relpath(local_file_path, local_dir))
                remote_file_dir = os.path.dirname(remote_file_path)
                try:
                    sftp.chdir(remote_file_dir)
                except IOError:
                    sftp.mkdir(remote_file_dir)
                    sftp.chdir(remote_file_dir)

                sftp.put(local_file_path, f'{remote_file_dir}/{file}')

        ssh_client.exec_command("sudo systemctl restart nginx.service")

        sftp.close()
        ssh_client.close()
        print(f"Frontend files uploaded successfully to {host}")
    except Exception as e:
        print(f"Error: {e}")


def get_asg_instances(asg_name, region):
    session = boto3.Session(profile_name=PROFILE_NAME)
    client = session.client('autoscaling', region_name=region)
    response = client.describe_auto_scaling_groups(AutoScalingGroupNames=[asg_name])

    instances = []
    for group in response['AutoScalingGroups']:
        for instance in group['Instances']:
            instances.append(instance['InstanceId'])

    return instances


def get_instance_hostnames(instance_ids, region):
    session = boto3.Session(profile_name=PROFILE_NAME)
    ec2_client = session.client('ec2', region_name=region)
    response = ec2_client.describe_instances(InstanceIds=instance_ids)

    hostnames = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            hostnames.append(instance['PublicDnsName'])

    return hostnames

def get_ec2_instances_by_tag(tag_key, tag_value, region):
    session = boto3.Session(profile_name=PROFILE_NAME)
    ec2_client = session.client('ec2', region_name=region)
    response = ec2_client.describe_instances(
        Filters=[
             {
                'Name': f'tag:{tag_key}',
                'Values': [tag_value]
            }
        ]
    )

    instances = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instances.append(instance['InstanceId'])
            
    return instances

def get_instance_public_ips(instance_ids, region):
    session = boto3.Session(profile_name=PROFILE_NAME)
    ec2_client = session.client('ec2', region_name=region)
    response = ec2_client.describe_instances(InstanceIds=instance_ids)

    public_ips = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            public_ip = instance.get('PublicIpAddress', '')
            if public_ip:
                public_ips.append(public_ip)
            
    return public_ips


def parse_args():
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawTextHelpFormatter,
        description=textwrap.dedent("""\
                Devops script for deploying the code to the remote machine
            """)
    )
    parser.add_argument("--environment", help="Environment you want to deploy", default="prod")
    return parser.parse_args()


def build_be(backendPath):
    print(f"Building backend from this path {backendPath}")
    maven_command = "mvn clean install"
    # maven_command = "mvn clean install -DENVIRONMENT=prod"
    run_custom_command(backendPath, maven_command)


def build_fe(frontendPath):
    print(f"Building frontend from this path {frontendPath}")
    maven_command = "npm run build"
    run_custom_command(frontendPath, maven_command)


def run_custom_command(directory, command):
    try:
        # Change directory to the specified path
        os.chdir(directory)

        # Run the  command
        result = os.system(command)

        if result != 0:
            raise subprocess.CalledProcessError(result, command)

        print("Build successful")
    except subprocess.CalledProcessError as e:
        print(f"Error: Build failed with exit code {e.returncode}")
        raise e


def get_backend_path(parent_directory):
    return os.path.join(parent_directory, "backend")


def get_frontend_path(parent_directory):
    return os.path.join(parent_directory, "frontend")


def main():
    try:
        args = parse_args()
        print(f"Deploying to {args.environment} ENV")
        root = Path().resolve().parent
        root_dir = os.path.dirname(root)

        backend_path = get_backend_path(root_dir)
        build_be(backend_path)

        frontend_path = get_frontend_path(root_dir)
        build_fe(frontend_path)

        print("Fetch instance host names")

        region = 'us-east-1'
         # instance_ids = get_asg_instances("Instance_asg", region)
        # hostnames = get_instance_hostnames(instance_ids, region)
        instance_ids = get_ec2_instances_by_tag('Name', 'Test Ec2 machine', region)
        public_ips = get_instance_public_ips(instance_ids, region)
        print("public IP's" ,public_ips)

        username = 'ec2-user'
        public_key_path = '~/.ssh/id_rsa.pub'
        local_jar_path = os.path.join(backend_path, "target", "smfinance-0.0.1-SNAPSHOT.jar")
        remote_dir = '/etc/smfinance-api'

        for ip_address in public_ips:
            upload_jar_to_remote(ip_address, username, public_key_path, local_jar_path, remote_dir)

        local_frontend_dist = os.path.join(frontend_path, "dist")
        remote_frontend_dir = '/etc/smfinance-ui/'

        for ip_address in public_ips:
            upload_frontEndFiles_to_remote(ip_address, username, public_key_path, local_frontend_dist, remote_frontend_dir)

        message = f"All the files uploaded successfully to {', '.join(public_ips)}"
        print(message)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
