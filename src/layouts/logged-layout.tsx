import { Header } from "@/components/header"
import { Outlet } from "react-router"

export const LoggedLayout = () => {
    return (
        <>
          <Header />
          <main className="min-h-[calc(100svh-5rem)]">
            <div className="w-full max-w-7xl mx-auto p-4">
              <Outlet />
            </div>
          </main>
        </>
    )
}