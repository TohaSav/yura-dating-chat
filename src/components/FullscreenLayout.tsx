import { ReactNode } from "react";

interface FullscreenLayoutProps {
  children: ReactNode;
}

const FullscreenLayout = ({ children }: FullscreenLayoutProps) => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      {children}
    </div>
  );
};

export default FullscreenLayout;
