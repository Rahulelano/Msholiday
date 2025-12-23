import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        location: '',
        text: '',
        rating: 5,
        tour: '',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    });

    const fetchTestimonials = async () => {
        try {
            const { data } = await api.get('/testimonials');
            setTestimonials(data);
        } catch (error) {
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/testimonials/${id}`);
            toast.success("Testimonial deleted");
            fetchTestimonials();
        } catch (error) {
            toast.error("Failed to delete testimonial");
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/testimonials', newTestimonial);
            toast.success("Testimonial added");
            setIsDialogOpen(false);
            fetchTestimonials();
            setNewTestimonial({
                name: '',
                location: '',
                text: '',
                rating: 5,
                tour: '',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
            });
        } catch (error) {
            toast.error("Failed to create testimonial");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Testimonials</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Testimonial</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Testimonial</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input value={newTestimonial.name} onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })} required />
                            </div>
                            <div>
                                <Label>Location</Label>
                                <Input value={newTestimonial.location} onChange={e => setNewTestimonial({ ...newTestimonial, location: e.target.value })} required />
                            </div>
                            <div>
                                <Label>Tour Name</Label>
                                <Input value={newTestimonial.tour} onChange={e => setNewTestimonial({ ...newTestimonial, tour: e.target.value })} required />
                            </div>
                            <div>
                                <Label>Rating (1-5)</Label>
                                <Input type="number" min="1" max="5" value={newTestimonial.rating} onChange={e => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })} required />
                            </div>
                            <div>
                                <Label>Message</Label>
                                <Textarea value={newTestimonial.text} onChange={e => setNewTestimonial({ ...newTestimonial, text: e.target.value })} required />
                            </div>
                            <Button type="submit" className="w-full">Save Testimonial</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Tour</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((t) => (
                            <TableRow key={t._id}>
                                <TableCell className="font-medium">{t.name}</TableCell>
                                <TableCell>{t.location}</TableCell>
                                <TableCell className="truncate max-w-xs">{t.text}</TableCell>
                                <TableCell>{t.tour}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {t.rating} <Star size={12} className="ml-1 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(t._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageTestimonials;
