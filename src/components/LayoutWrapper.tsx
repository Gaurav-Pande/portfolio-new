'use client';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  // Simply pass through children - each page handles its own layout
  return <>{children}</>;
}
