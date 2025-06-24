import { ReactNode } from "react";

interface FullscreenLayoutProps {
  children: ReactNode;
}

const FullscreenLayout = ({ children }: FullscreenLayoutProps) => {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">{children}</div>
  );
};

export default FullscreenLayout;
