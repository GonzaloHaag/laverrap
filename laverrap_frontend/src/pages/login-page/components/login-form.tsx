import { useForm } from "react-hook-form";
import { InputForm } from "@/components/shared";
import { Button } from "@/components/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas";
import { authService } from "@/services";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit(async (data) => {
      const response = await authService.login(data);
      localStorage.setItem("token", response.token!);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
  });

  if(errors) {
     console.log(errors);
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <InputForm
        label="Email"
        labelFor="email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        placeholder="Ingrese su correo electrónico"
      />
      <InputForm
        label="Password"
        labelFor="password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        placeholder="Ingrese su contraseña"
      />
      <Button
        type="submit"
        variant={"default"}
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O</span>
        </div>
      </div>

      <Button type="button" variant={"outline"} title="Ingresar con google">
        <svg
          className="w-4 h-4 me-1"
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
    </form>
  );
};
