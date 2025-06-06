/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from 'next/dynamic';
import { Controller } from "react-hook-form";
import { TextLabel } from "../../atoms/typographies/label";
import { useState, useEffect } from "react";
import LoadingSpinner from '../../atoms/loading/default';

// Dynamically import the Editor with no SSR
const TinyMCEEditor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center"><LoadingSpinner /></div>
  }
);

interface TextEditorProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  errors?: string;
  className?: string;
  initialValue?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  name,
  control,
  label,
  placeholder,
  errors,
  className,
  initialValue,
}) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setApiKey(process.env.NEXT_PUBLIC_TINYMCE_API_KEY || null);
  }, []);

  if (!isMounted) {
    return (
      <div className={className}>
        {label && <TextLabel>{label}</TextLabel>}
        <div className="h-[300px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <TextLabel>{label}</TextLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={errors ? "border border-red-600 rounded" : ""}>
            {apiKey ? (
              <TinyMCEEditor
                apiKey={apiKey}
                initialValue={initialValue}
                value={field.value || ""}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: "link lists table image code preview",
                  toolbar:
                    "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table | code preview",
                  placeholder: placeholder || "",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={field.onChange}
              />
            ) : (
              <div className="h-[300px] flex items-center justify-center border border-yellow-400 bg-yellow-50 p-4 rounded">
                <p className="text-yellow-700">
                  TinyMCE API key is missing. Please check your environment configuration.
                </p>
              </div>
            )}
          </div>
        )}
      />
      {errors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
    </div>
  );
};

export default TextEditor;