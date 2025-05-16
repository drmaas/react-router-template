import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`flex justify-left mt-10 ${className}`}>
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-black text-white">
        {children}
      </div>
    </div>
  );
}
