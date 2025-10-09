import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { LoginSchema } from "@/schemas/login-schema";
import { ErrorMessage } from "../error-message";
import { loginUser } from "@/services/auth-service";
import { AlertCircleIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
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
        <Button type="button" title="Google" variant={"outline"}>
          Ingresar con Google
        </Button>
      </div>
    </form>
  );
};
