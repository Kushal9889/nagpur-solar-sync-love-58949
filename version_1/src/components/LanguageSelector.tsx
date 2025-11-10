
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange, currentLanguage }) => {
  const languages = [
    { code: 'en', name: 'English', label: 'English' },
    { code: 'hi', name: 'Hindi', label: 'हिंदी' },
    { code: 'mr', name: 'Marathi', label: 'मराठी' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
