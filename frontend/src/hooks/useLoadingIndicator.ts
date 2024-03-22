import { useState, useEffect } from "react";

export const useLoadingIndicator = (): [
  boolean,
  (endpoint: string) => void,
  (endpoint: string) => void,
  (endpoint: string) => boolean
] => {
  const [loading, setLoading] = useState(false);
  const [loaders, setLoaders] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(loaders.size > 0);
  }, [loaders]);

  const startLoading = (endpoint: string) => {
    setLoaders((pre) => new Set([...pre, endpoint]));
  };

  const endLoading = (endpoint: string) => {
    setLoaders((pre) => {
      const newLoaders = new Set(pre);
      newLoaders.delete(endpoint);
      return newLoaders;
    });
  };

  const isLoading = (endpoint: string) => loaders.has(endpoint);

  return [loading, startLoading, endLoading, isLoading];
};
