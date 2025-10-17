import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoginSchema } from "@/schemas/login-schema";
import { ErrorMessage } from "../error-message";
import { loginUser, loginWithGoogle } from "@/services/auth-service";
import { AlertCircleIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { toast } from "sonner";
export const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: valibotResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    const response = await loginUser(data);
    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }
    setErrorMessage(null);
    navigate("/");
  });

  const loginGoogle = async () => {
    const response = await loginWithGoogle();
    console.log(response.message)
  };
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex flex-col gap-y-1">
          <Input
            type="email"
            inputMode="email"
            placeholder="test@example.com"
            {...register("email")}
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="flex flex-col gap-y-1">
          <Input type="password" inputMode="text" {...register("password")} />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </div>
      </div>
      {errorMessage && (
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertTitle>
            {errorMessage || "Ha ocurrido un error inesperado"}
          </AlertTitle>
        </Alert>
      )}
      <div className="flex flex-col gap-y-2">
        <Button type="submit" title="Ingresar" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "Ingresar"
          )}
        </Button>
        <Button
          type="button"
          variant={"outline"}
          title="Ingresar con Google"
          onClick={loginGoogle}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Ingresar con Google
        </Button>
      </div>
    </form>
  );
};
