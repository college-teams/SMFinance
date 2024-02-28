import boto3

REGION = 'us-east-1'
ASG_NAME = "Instance_asg"


def get_instance_hostnames(instance_ids):
    ec2_client = boto3.client('ec2', region_name=REGION)
    response = ec2_client.describe_instances(InstanceIds=instance_ids)

    hostnames = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            hostnames.append(instance['PublicDnsName'])

    return hostnames


def get_asg_instances():
    client = boto3.client('autoscaling', region_name=REGION)
    response = client.describe_auto_scaling_groups(AutoScalingGroupNames=[ASG_NAME])

    instances = []
    for group in response['AutoScalingGroups']:
        for instance in group['Instances']:
            instances.append(instance['InstanceId'])

    return instances


def main():
    print("Fetching host names...")
    instance_ids = get_asg_instances()
    hostnames = get_instance_hostnames(instance_ids)
    for hostname in hostnames:
        print(hostname)


if __name__ == "__main__":
    main()
