import Loader from "@/components/Loader";
import LoginForm from "@/components/LoginForm";
import useFetchUserDetails from "@/hooks/useFetchUserDetails";
import { isLoggedIn } from "@/utils";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { loading, user } = useFetchUserDetails();

  if (loading) {
    return (
      <div className="relative  w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isLoggedIn() && user) {
    return <Navigate to="/dashboard" replace />;
  }
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
