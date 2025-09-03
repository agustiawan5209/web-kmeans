import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { NavigationButtons } from '@/components/ui/navigation-menu-button';
import { Toast } from '@/components/ui/toast';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Apple, BarChart3, Clock10, Heart, Leaf, Link2Icon } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const activeSection = usePage().url.split('/').pop()?.toLowerCase() || 'dashboard';

    // Ganti ikon sesuai konteks
    const navigationItems = [
        { title: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { title: 'Indikator', href: '/admin/indikator', icon: Leaf },
        { title: 'Data Makanan', href: '/admin/dataset', icon: Apple },
        { title: 'K-means', href: '/kmeans', icon: Link2Icon },
        { title: 'Riwayat Prediksi', href: '/admin/riwayat', icon: Clock10 },
    ];

    const page = usePage<SharedData>();
    const { flash } = page.props;

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: '',
        description: '',
        variant: 'success' as 'success' | 'error',
    });

    useEffect(() => {
        if (flash.success || flash.error) {
            setOpenToast(true);
        }
        if (flash.success) {
            setToastMessage({
                title: 'Sukses',
                description: flash.success,
                variant: 'success',
            });
        }
        if (flash.error) {
            setToastMessage({
                title: 'Error',
                description: flash.error,
                variant: 'error',
            });
        }
    }, [flash]);

    const closeToast = () => {
        setOpenToast(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toast
                open={openToast}
                onOpenChange={setOpenToast}
                title={toastMessage.title}
                description={toastMessage.description}
                duration={5000}
                variant={toastMessage.variant}
            />

            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white shadow-lg lg:flex">
                <div className="flex h-20 items-center border-b border-gray-200 px-6">
                    <Heart className="h-10 w-10 text-green-600" />
                    <span className="ml-3 truncate text-2xl font-extrabold text-green-700">Rekomendasi Sehat</span>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.title.toLowerCase().replace(/\s/g, '');
                            return (
                                <li key={item.title}>
                                    <NavigationButtons
                                        title={item.title}
                                        isActive={isActive}
                                        variant="default"
                                        href={item.href}
                                        icon={Icon}
                                        className={`flex w-full items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                                            isActive
                                                ? 'bg-orange-100 text-orange-700 shadow-md'
                                                : 'text-gray-700 hover:bg-green-100 hover:text-green-700'
                                        }`}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="border-t border-gray-200 p-6">
                    <NavUser />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex min-w-0 flex-1 flex-col lg:ml-64">
                <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6 shadow-sm">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </header>
                <section className="flex-1 overflow-auto p-6">{children}</section>
            </main>
        </div>
    );
}
