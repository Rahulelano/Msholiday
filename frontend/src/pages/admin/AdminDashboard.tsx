import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-600">Total Tours</h3>
                    <p className="text-3xl font-bold mt-2">--</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-600">Testimonials</h3>
                    <p className="text-3xl font-bold mt-2">--</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-600">Pending Inquiries</h3>
                    <p className="text-3xl font-bold mt-2">--</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
