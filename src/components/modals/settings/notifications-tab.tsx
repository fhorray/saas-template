import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

type NotificationsFormData = {
  emailNotifications: boolean;
  whatsappNotifications: boolean;
};

export const NotificationsTab = ({ isPhone }: { isPhone: boolean }) => {
  const { register, handleSubmit } = useForm<NotificationsFormData>({
    defaultValues: {
      emailNotifications: false,
      whatsappNotifications: false,
    },
  });

  const onSubmit = (data: NotificationsFormData) => {
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
        Notificações
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              Notificações por Email
            </h4>
            <p className="text-sm text-gray-500">
              Receber atualizações sobre sua conta por e-mail
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("emailNotifications")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">
              Notificações por WhatsApp
            </h4>
            <p className="text-sm text-gray-500">
              Receber atualizações sobre sua conta por WhatsApp
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register("whatsappNotifications")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
      </form>
    </div>
  );
};
