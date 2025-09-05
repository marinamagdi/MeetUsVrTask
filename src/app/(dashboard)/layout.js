
import DashboardGuard from '@/components/guards/DashboardGuard/DashboardGuard';

import React from 'react';

const DashBoardLayout = ({ children }) => {
    return (
        <>
        <DashboardGuard>{children}</DashboardGuard>
            
                
            
        </>
    );
}

export default DashBoardLayout;