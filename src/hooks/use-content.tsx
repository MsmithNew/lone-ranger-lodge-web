
import { useState, useEffect } from "react";

interface ContentOptions {
  page: string;
  section?: string;
  fallbackData?: Record<string, any>;
}

export function useContent<T extends Record<string, any>>({
  page,
  section,
  fallbackData = {},
}: ContentOptions): {
  content: T;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  isOnline: boolean;
} {
  const [content] = useState<T>(fallbackData as T);
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const [isOnline] = useState<boolean>(true);

  const refresh = async () => {
    // No-op since we're not using a database
  };

  return { content, isLoading, error, refresh, isOnline };
}
