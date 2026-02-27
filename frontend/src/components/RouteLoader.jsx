import { LoaderCircleIcon } from "lucide-react";

const RouteLoader = ({ text = "Checking session..." }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-lg
                      bg-neutral-900/70 border border-emerald-800/40
                      shadow-lg backdrop-blur-sm">
        <LoaderCircleIcon className="w-6 h-6 animate-spin text-[#00FF9D]" />
        <span className="text-sm font-medium text-emerald-100">
          {text}
        </span>
      </div>
    </div>
  );
};

export default RouteLoader;