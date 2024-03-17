import React, { useState } from 'react';

interface IframeWithFallbackProps {
  iframeSrc: string;
  defaultSrc: string;
  className?: string;
  hideOnError?: boolean;
}

const IframeWithFallback: React.FC<IframeWithFallbackProps> = ({
  iframeSrc,
  defaultSrc,
  className = '',
  hideOnError = false
}) => {
  const [iframeExists, setIframeExists] = useState(true);

  return (
    <iframe
      className={`${className} ${hideOnError && !iframeExists ? 'hidden' : ''}`}
      src={iframeExists ? iframeSrc || defaultSrc : defaultSrc}
      onError={() => setIframeExists(false)}
      title="PDF Preview"
    />
  );
};

export default IframeWithFallback;
