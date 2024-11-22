import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-color-1 text-white flex flex-col items-center justify-center py-8 px-5">
            {children}
        </div>
    );
};

export default AuthLayout;
