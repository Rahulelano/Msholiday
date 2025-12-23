import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Tour {
    _id: string;
    title: string;
    category: string;
    location: string;
    price: string;
}

const ManageTours = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTours = async () => {
        try {
            const { data } = await api.get('/tours');
            setTours(data);
        } catch (error) {
            toast.error('Failed to fetch tours');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            try {
                await api.delete(`/tours/${id}`);
                toast.success('Tour deleted successfully');
                fetchTours();
            } catch (error) {
                toast.error('Failed to delete tour');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Tours</h1>
                <Link to="/admin/tours/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Tour
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tours.map((tour) => (
                            <TableRow key={tour._id}>
                                <TableCell className="font-medium">{tour.title}</TableCell>
                                <TableCell>{tour.category}</TableCell>
                                <TableCell>{tour.location}</TableCell>
                                <TableCell>{tour.price}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/tours/edit/${tour._id}`}>
                                            <Button variant="outline" size="icon">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(tour._id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageTours;
