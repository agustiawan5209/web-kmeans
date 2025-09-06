import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { NavigationButtons } from '@/components/ui/navigation-menu-button';
import { Toast } from '@/components/ui/toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Apple, BarChart3, Clock10, Heart, Leaf, Link2Icon } from 'lucide-react';
import { useEffect, useState, type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const activeSection = usePage().url.split('/').pop()?.toLowerCase() || 'dashboard';
    const isMobile = useIsMobile();
    // Ganti ikon sesuai konteks
    const navigationItems = [
        { title: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { title: 'Indikator', href: '/admin/indikator', icon: Leaf },
        { title: 'Data Makanan', href: '/admin/dataset', icon: Apple },
        { title: 'K-means', href: '/kmeans', icon: Link2Icon },
        { title: 'Riwayat Rekomendasi', href: '/admin/riwayat', icon: Clock10 },
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

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

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
            {(isSidebarOpen || !isMobile) && (
                <aside className="fixed inset-y-0 left-0 z-30 w-64 transform flex-col border-r border-gray-200 bg-white shadow-lg lg:flex">
                    <div className="flex h-20 items-center border-b border-gray-200 px-6">
                        <Heart className="h-10 w-10 text-pink-600" />
                        <span className="ml-3 text-lg font-extrabold whitespace-normal text-blue-700">Rekomendasi Sehat</span>
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
                                                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
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
            )}

            {/* Main Content */}
            <main className="flex min-w-0 flex-1 flex-col lg:ml-64">
                <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-blue-200/50 bg-white/80 px-6 shadow-sm backdrop-blur-md">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <div className="ml-auto flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-white shadow-md">
                            {page.props.auth.user?.name?.charAt(0) || 'U'}
                        </div>

                        {isMobile && (
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="ml-4 rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <span className="sr-only">Toggle sidebar</span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    {isSidebarOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        )}
                    </div>
                </header>
                <section className="flex-1 overflow-auto p-6">{children}</section>
            </main>
        </div>
    );
}
