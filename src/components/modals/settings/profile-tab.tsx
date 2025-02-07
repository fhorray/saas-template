import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type ProfileFormData = {
  name: string;
  email: string;
};

export const ProfileTab = ({
  user,
  isPhone,
}: {
  user: any;
  isPhone: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
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
        Profile
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={cn("flex items-center gap-6", isPhone && "flex-col")}>
          <div className="relative border-2 border-gray-400 p-6 rounded-full">
            <ImageIcon />
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900">{user?.name}</h4>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="opacity-60 cursor-not-allowed">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail address
            </label>
            <input
              {...register("email")}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
