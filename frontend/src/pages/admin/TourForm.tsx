import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const TourForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        duration: '',
        location: '',
        category: '',
        subcategory: '',
        rating: '5',
        detailedDescription: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const fetchTour = async () => {
                try {
                    const { data } = await api.get(`/tours/${id}`);
                    setFormData({
                        ...data,
                        rating: data.rating.toString(),
                    });
                } catch (error) {
                    toast.error('Failed to fetch tour details');
                }
            };
            fetchTour();
        }
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditMode) {
                await api.put(`/tours/${id}`, formData);
                toast.success('Tour updated successfully');
            } else {
                await api.post('/tours', formData);
                toast.success('Tour created successfully');
            }
            navigate('/admin/tours');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Tour' : 'Add New Tour'}</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border">
                <div className="space-y-2">
                    <Label htmlFor="title">Tour Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Golden Triangle Tour" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={handleCategoryChange} value={formData.category} required>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="india-tours">India Tours</SelectItem>
                                <SelectItem value="international-tours">International Tours</SelectItem>
                                <SelectItem value="honeymoon">Honeymoon</SelectItem>
                                <SelectItem value="group-tours">Group Tours</SelectItem>
                                <SelectItem value="wedding">Destination Wedding</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subcategory">Subcategory / Filter Keyword</Label>
                        <Input id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} placeholder="e.g. Kerala, Dubai" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Delhi, Agra" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} required placeholder="e.g. 5 Days / 4 Nights" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. ₹25,000" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rating">Rating</Label>
                        <Input id="rating" name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Main Image</Label>
                    <div className="flex gap-4 items-center">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const formData = new FormData();
                                    formData.append('image', file);
                                    try {
                                        setLoading(true);
                                        const { data } = await api.post('/upload', formData, {
                                            headers: { 'Content-Type': 'multipart/form-data' }
                                        });
                                        // If using local backend, we might need full URL if frontend is on different port
                                        // But for now let's store the path returned (e.g., /uploads/image.jpg)
                                        // And ensure frontend <img src> handles it (prepends backend URL if needed)
                                        // Actually, let's prepend the current window origin + backend port if strictly separated?
                                        // Ideally, api.ts handles base URL. But for static images, we might strictly need the backend URL.
                                        // Let's assume the returned string is usable or we fix it in the view.
                                        // Ideally we store the FULL URL if possible to avoid issues, or relative path.
                                        // Let's just store the relative path and fix rendering to point to backend.
                                        // OR, simply construct the full URL here.
                                        const fullUrl = `http://localhost:5000${data}`; // Assuming default port 5000
                                        setFormData(prev => ({ ...prev, image: fullUrl }));
                                        toast.success("Image uploaded!");
                                    } catch (err) {
                                        toast.error("Upload failed");
                                    } finally {
                                        setLoading(false);
                                    }
                                }
                            }}
                        />
                        <span className="text-sm font-bold text-gray-500">OR</span>
                        <Input
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter URL directly"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Short Description (Card)</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={3} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="detailedDescription">Detailed Page Content</Label>

                    <div className="mb-2">
                        <label htmlFor="content-image-upload" className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 rounded-md inline-flex items-center justify-center text-sm font-medium transition-colors">
                            Insert Image into Text
                            <input
                                id="content-image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const formData = new FormData();
                                        formData.append('image', file);
                                        try {
                                            setLoading(true);
                                            const { data } = await api.post('/upload', formData, {
                                                headers: { 'Content-Type': 'multipart/form-data' }
                                            });
                                            const fullUrl = `http://localhost:5000${data}`;
                                            const markdownImage = `\n\n![Image Description](${fullUrl})\n\n`;

                                            setFormData(prev => ({
                                                ...prev,
                                                detailedDescription: (prev.detailedDescription || '') + markdownImage
                                            }));
                                            toast.success("Image inserted!");
                                        } catch (err) {
                                            toast.error("Upload failed");
                                        } finally {
                                            setLoading(false);
                                        }
                                    }
                                }}
                            />
                        </label>
                        <span className="text-xs text-muted-foreground ml-3">Calculates auto-layout when saved.</span>
                    </div>

                    <Textarea
                        id="detailedDescription"
                        name="detailedDescription"
                        value={formData.detailedDescription || ''}
                        onChange={handleChange}
                        rows={10}
                        className="font-mono text-sm"
                        placeholder="Paste headers, paragraphs, and lists here..."
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/tours')}>Cancel</Button>
                    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Tour'}</Button>
                </div>
            </form>
        </div>
    );
};

export default TourForm;
