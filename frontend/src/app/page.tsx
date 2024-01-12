import Login from "@/components/auth/Login";

export default function Home() {
  return (
    <main className="relative">
      <div
        className="relative h-screen"
      >
        <div className="relative h-screen bg-no-repeat bg-center opacity-40"
        style={{ backgroundImage: "url('/images/bg1.jpg')",backgroundPosition:'center',backgroundSize:'cover' }} />
        <Login />
      </div>
    </main>
  );
}
