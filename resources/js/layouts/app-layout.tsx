import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplateClient from '@/layouts/app/app-header-layout';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { isClientRoute, auth } = usePage<SharedData>().props;

    const isSuperUser = auth.user?.superstaff;
    const isAdmin = auth.is_admin;

    const LayoutComponent = isClientRoute ? AppLayoutTemplateClient : isAdmin || isSuperUser ? AppLayoutTemplate : AppLayoutTemplateClient;

    return (
        <LayoutComponent breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster />
        </LayoutComponent>
    );
}
