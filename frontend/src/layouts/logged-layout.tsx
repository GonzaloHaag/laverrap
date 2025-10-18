import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks";
import { Header } from "@/components";
import { Toaster } from "@/components/ui/sonner";
export const LoggedLayout = () => {
  const { session } = useAuth();
  if (session) {
    return (
     <>
        <Header />
        <main className="min-h-[calc(100svh-5rem)]">
          <div className="w-full max-w-7xl mx-auto p-4">
            <Outlet />
          </div>
          <Toaster duration={2000} position="bottom-right" richColors={true} />
        </main>
      </>
    );
  }
  return <Navigate to={"/auth/login"} />
};
