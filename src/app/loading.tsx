import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <Loader2Icon className="animate-spin text-gray-800" />
    </div>
  );
};

export default Loading;
