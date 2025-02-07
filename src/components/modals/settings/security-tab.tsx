import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SecurityFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const SecurityTab = ({ isPhone }: { isPhone: boolean }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SecurityFormData>();

  const onSubmit = (data: SecurityFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div>
      <h3
        className={cn(
          "text-2xl font-semibold text-gray-900 mb-6",
          isPhone && "text-center"
        )}
      >
        Segurança
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha Atual
            </label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            {errors.currentPassword && (
              <span className="text-red-500">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button type="submit">Atualizar Senha</Button>
        </div>
      </form>
    </div>
  );
};
