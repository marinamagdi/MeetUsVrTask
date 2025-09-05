
import LoginGuard from '@/components/guards/LoginGuard/LoginGuard';
import React from 'react';

const LoggedInLayout = ({ children }) => {
    return (
        <>
        <LoginGuard>{children}</LoginGuard>
            
                
            
        </>
    );
}

export default LoggedInLayout;