import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const ManageInquiries = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            const { data } = await api.get('/inquiries');
            setInquiries(data);
        } catch (error) {
            toast.error("Failed to fetch inquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/inquiries/${id}`);
            toast.success("Inquiry deleted");
            fetchInquiries();
        } catch (error) {
            toast.error("Failed to delete inquiry");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Inquiries & Bookings</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Destination</TableHead> <TableHead>Message</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">No inquiries found.</TableCell>
                            </TableRow>
                        ) : (
                            inquiries.map((inquiry) => (
                                <TableRow key={inquiry._id}>
                                    <TableCell className="whitespace-nowrap text-gray-500 text-sm">
                                        {inquiry.createdAt ? format(new Date(inquiry.createdAt), 'MMM dd, yyyy') : '-'}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {inquiry.name}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span className="flex items-center gap-1"><Mail size={12} /> {inquiry.email}</span>
                                            <span className="flex items-center gap-1"><Phone size={12} /> {inquiry.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{inquiry.city || '-'}</TableCell>
                                    <TableCell>{inquiry.destination || '-'}</TableCell>
                                    <TableCell className="max-w-xs truncate" title={inquiry.message}>
                                        {inquiry.message}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(inquiry._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageInquiries;
