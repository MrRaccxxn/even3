import React from "react";

export const Paper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <div className={`${className} p-8`}>
        {children}
    </div>
}