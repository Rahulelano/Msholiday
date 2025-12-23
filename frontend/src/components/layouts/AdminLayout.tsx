import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; // We'll create this hook shortly
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FileText, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "bg-gray-100 text-primary" : "text-gray-600 hover:bg-gray-50";
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link to="/admin/dashboard" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/dashboard')}`}>
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/admin/tours" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/tours')}`}>
                        <FileText className="w-5 h-5 mr-3" />
                        Manage Tours
                    </Link>
                    <Link to="/admin/categories" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/categories')}`}>
                        <FileText className="w-5 h-5 mr-3" />
                        Categories
                    </Link>
                    <Link to="/admin/testimonials" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/testimonials')}`}>
                        <Users className="w-5 h-5 mr-3" />
                        Testimonials
                    </Link>
                    <Link to="/admin/inquiries" className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/admin/inquiries')}`}>
                        <MessageSquare className="w-5 h-5 mr-3" />
                        Inquiries
                    </Link>
                </nav>
                <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export { AdminLayout };
