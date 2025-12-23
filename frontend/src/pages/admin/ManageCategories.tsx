import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
    _id: string;
    name: string;
    slug: string;
    menuPlacement: string;
}

const ManageCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/categories/${id}`);
                toast.success('Category deleted successfully');
                fetchCategories();
            } catch (error) {
                toast.error('Failed to delete category');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Categories</h1>
                <Link to="/admin/categories/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Category
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Menu Placement</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat._id}>
                                <TableCell className="font-medium">{cat.name}</TableCell>
                                <TableCell>{cat.slug}</TableCell>
                                <TableCell className="capitalize">{cat.menuPlacement}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(cat._id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
                Note: "Standard" categories (India Tours, International Tours, etc.) might be hardcoded in the Layout.
                New categories added here will be appended to the "Packages" dropdown dynamically.
            </p>
        </div>
    );
};

export default ManageCategories;
