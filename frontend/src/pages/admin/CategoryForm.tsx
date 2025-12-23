import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const CategoryForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        menuPlacement: 'packages',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Auto-generate slug from name if slug is empty being edited
        if (name === 'name' && !formData.slug) {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMenuChange = (value: string) => {
        setFormData(prev => ({ ...prev, menuPlacement: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/categories', formData);
            toast.success('Category created successfully');
            navigate('/admin/categories');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Add New Category</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border">
                <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Luxury Tours" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL identifier)</Label>
                    <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required placeholder="e.g. luxury-tours" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="menuPlacement">Menu Placement</Label>
                    <Select onValueChange={handleMenuChange} value={formData.menuPlacement}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="packages">Packages Dropdown</SelectItem>
                            {/* <SelectItem value="india">India Dropdown</SelectItem> */}
                            {/* <SelectItem value="international">International Dropdown</SelectItem> */}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-stone-500">Currently only 'Packages Dropdown' is fully dynamic for new items.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="image">Hero Image URL</Label>
                    <Input id="image" name="image" value={formData.image} onChange={handleChange} required placeholder="https://example.com/hero.jpg" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Brief description for the hero section" />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/categories')}>Cancel</Button>
                    <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Category'}</Button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
