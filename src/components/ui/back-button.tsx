
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  className = "", 
  variant = "outline",
  size = "lg"
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={`px-8 py-3 text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
