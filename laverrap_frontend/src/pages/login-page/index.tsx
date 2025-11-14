import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { CarIcon } from "lucide-react";
import { LoginForm } from "./components";

export const LoginPage = () => {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
            <CarIcon className="size-6" />
          </div>
          Laverrap
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Bienvenido</CardTitle>
            <CardDescription>Ingresá tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
