import { useEffect, useState } from "react";

export const useLoadFile = (file: File | null) => {
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", (event) => {
        setImagePreviewSrc(event.target?.result || "");
      });
    }
  }, [file]);

  return imagePreviewSrc;
};
