import { Loader2 } from "lucide-react";
import React from "react";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullPage?: boolean;
};

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  message,
  fullPage = false,
}) => {
  const sizeClass =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6";

  const containerClass = fullPage
    ? "flex items-center justify-center min-h-[60vh] flex-col"
    : "flex items-center justify-center py-4 flex-col";

  return (
    <div className={containerClass}>
      <Loader2 className={`animate-spin text-primary ${sizeClass}`} />
      {message && <p className="mt-2 text-muted-foreground">{message}</p>}
    </div>
  );
};
