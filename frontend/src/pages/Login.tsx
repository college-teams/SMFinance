import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <main className="relative">
      <div className="relative h-screen">
        <div
          className="relative h-screen bg-no-repeat bg-center opacity-40"
          style={{
            backgroundImage: "url('/images/bg1.jpg')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
