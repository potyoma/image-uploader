import { ReactNode } from "react";

interface LoadBlockProps {
  fallback: ReactNode;
  children: ReactNode;
  loading?: boolean;
}

export default function LoadBlock({
  fallback,
  children,
  loading,
}: LoadBlockProps) {
  return <>{loading ? fallback : children}</>;
}
