import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Loader2, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  label: string;
  onUploadComplete?: (key: string) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ label, onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getSessionId = () => {
    let sessionId = localStorage.getItem('funnel_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('funnel_session_id', sessionId);
    }
    return sessionId;
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPG, PNG) or PDF",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const sessionId = getSessionId();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      // Step 1: Get the upload URL from backend
      const urlResponse = await fetch(
        `${apiUrl}/api/funnel/upload-url?sessionId=${sessionId}&fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`
      );
      
      const urlData = await urlResponse.json();
      
      if (!urlData.success) {
        throw new Error(urlData.error || "Failed to get upload URL");
      }

      // Step 2: Upload the file to the URL (Local or S3)
      const uploadResponse = await fetch(urlData.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      // Success!
      setUploadedFile(file.name);
      toast({
        title: "Upload successful",
        description: `${file.name} uploaded successfully`,
      });

      if (onUploadComplete) {
        onUploadComplete(urlData.key);
      }

    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearUpload = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card 
      className={`
        border-2 border-dashed transition-all cursor-pointer
        ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}
        ${uploadedFile ? 'border-solid border-emerald-500 bg-emerald-50' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !uploadedFile && fileInputRef.current?.click()}
    >
      <CardContent className="p-4">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={handleInputChange}
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mb-2" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-emerald-800 text-sm">{label}</p>
                <p className="text-xs text-emerald-600 truncate max-w-[150px]">{uploadedFile}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                clearUpload();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-gray-100 p-3 rounded-full mb-3">
              <Upload className="h-6 w-6 text-gray-500" />
            </div>
            <p className="font-medium text-gray-700 text-sm mb-1">{label}</p>
            <p className="text-xs text-gray-500">Click or drag to upload</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
