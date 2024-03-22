import { useState } from "react";

export interface ImageWithFallbackProps {
  imagePath?: string;
  defaultImage: string;
  alt: string;
  className?: string;
  hideOnError?:boolean;
}

const ImageWithFallback = ({
  imagePath,
  defaultImage,
  alt,
  className,
  hideOnError
}: ImageWithFallbackProps) => {
  const [imageExists, setImageExists] = useState(true);

  return (
    <img
      className={`${className} ${hideOnError && !imageExists ? 'hidden' : ''}`}
      src={imageExists ? imagePath || defaultImage : defaultImage}
      alt={alt}
      onError={() => setImageExists(false)}
    />
  );
};

export default ImageWithFallback;
