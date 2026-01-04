import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Loader2, Trash2, FileText, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  label: string;
  docType: string; // [NEW] e.g., 'state-id', 'utility-bill'
  sessionId?: string;
  onUploadComplete?: (key: string) => void;
  onDeleteComplete?: () => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  label, 
  docType, 
  sessionId, 
  onUploadComplete, 
  onDeleteComplete 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // [SMART STATE] We track the file name/key here
  const [existingFile, setExistingFile] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // [CHECK] On load, check if file exists in LocalStorage or Parent
  // (In a real app, you'd fetch this status from the backend session, 
  // but for now we rely on the parent component or local check)
  useEffect(() => {
     const savedDocs = JSON.parse(localStorage.getItem('uploaded_docs_map') || '{}');
     if (savedDocs[docType]) {
        setExistingFile(savedDocs[docType]);
     }
  }, [docType]);

  const handleFileSelect = async (file: File) => {
    if (!file) return;
    setIsUploading(true);

    try {
      const activeSessionId = sessionId || localStorage.getItem('solar_session_id');
      if (!activeSessionId) throw new Error("Session Lost. Refresh page.");

      // 1. Get URL
      const urlRes = await fetch(
        `${API_URL}/api/funnel/upload-url?sessionId=${activeSessionId}&fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}&docType=${docType}`
      );
      const urlData = await urlRes.json();
      if (!urlData.success) throw new Error("Failed to get upload URL");

      // 2. Upload File
      await fetch(urlData.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      });

      // 3. Notify Success
      setExistingFile(file.name);
      
      // Save local reference for UI persistence
      const currentMap = JSON.parse(localStorage.getItem('uploaded_docs_map') || '{}');
      currentMap[docType] = file.name; // Store simple name for display
      localStorage.setItem('uploaded_docs_map', JSON.stringify(currentMap));

      if (onUploadComplete) onUploadComplete(urlData.key);
      toast({ title: "Uploaded", description: `${file.name} saved securely.` });

    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file picker
    if (!confirm("Are you sure you want to remove this document?")) return;

    setIsDeleting(true);
    try {
      const activeSessionId = sessionId || localStorage.getItem('solar_session_id');
      
      // 1. Call Backend Delete
      const res = await fetch(`${API_URL}/api/funnel/document/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            sessionId: activeSessionId,
            docType: docType 
        })
      });
      
      if (!res.ok) throw new Error("Delete failed");

      // 2. Clear State
      setExistingFile(null);
      
      // Update LocalStorage
      const currentMap = JSON.parse(localStorage.getItem('uploaded_docs_map') || '{}');
      delete currentMap[docType];
      localStorage.setItem('uploaded_docs_map', JSON.stringify(currentMap));

      if (onDeleteComplete) onDeleteComplete();
      toast({ title: "Removed", description: "File deleted from server." });

    } catch (err) {
       toast({ title: "Error", description: "Could not delete file", variant: "destructive" });
    } finally {
       setIsDeleting(false);
    }
  };

  return (
    <Card 
      onClick={() => !existingFile && !isUploading && fileInputRef.current?.click()}
      className={`
        cursor-pointer border-2 border-dashed transition-all group relative overflow-hidden
        ${existingFile 
            ? 'border-emerald-500 bg-emerald-50/50' 
            : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
        }
      `}
    >
      <CardContent className="p-4 flex items-center justify-center min-h-[120px]">
        <input ref={fileInputRef} type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />
        
        {isUploading || isDeleting ? (
          <div className="flex flex-col items-center gap-2">
             <Loader2 className="animate-spin text-emerald-600 h-8 w-8" />
             <span className="text-xs text-gray-500">{isUploading ? 'Uploading...' : 'Deleting...'}</span>
          </div>
        ) : existingFile ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="bg-emerald-100 p-3 rounded-full">
               <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-center">
               <p className="font-medium text-emerald-900 text-sm truncate max-w-[200px]">{existingFile}</p>
               <p className="text-xs text-emerald-600">Uploaded Successfully</p>
            </div>
            
            {/* DELETE BUTTON */}
            <Button 
                variant="destructive" 
                size="sm" 
                className="mt-2 h-8 px-3 text-xs bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 z-10"
                onClick={handleDelete}
            >
                <Trash2 className="w-3 h-3 mr-1" /> Remove
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <div className="bg-gray-100 p-3 rounded-full inline-block group-hover:bg-white transition-colors">
               <Upload className="w-6 h-6 text-gray-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">PDF or JPG (Max 10MB)</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
