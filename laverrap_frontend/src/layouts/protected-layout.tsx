import { Header } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import { Navigate, Outlet } from "react-router";

export const ProtectedLayout = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      <Header />
      <main className="w-full min-h-[calc(100svh-5rem)]">
        <div className="container mx-auto w-full p-4">
          <Outlet />
        </div>
      </main>
      <Toaster duration={3000} position="top-right" richColors={true} />
    </>
  );
};
