import React from "react";

const footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-8 bg-mandiriBlue-950  text-right text-sm text-white">
      ©{new Date().getFullYear()} PT Bank Mandiri Persero Tbk. All rights
      reserved.
    </footer>
  );
};

export default footer;
