'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function AdminPage() {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('/api/getLeads');
                setLeads(response.data.data);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        fetchLeads();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-white text-center  mb-6">Admin - Leads</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-2 lg:grid-cols-3 gap-4">
                {leads.map((lead) => (
                    <Card key={lead._id} className="bg-gray-900 text-white shadow-md rounded-lg">
                        <CardHeader className="p-4 border-b">
                            <h2 className="text-xl font-semibold">{lead.officerName}</h2>
                            <p className="text-gray-600">{lead.designation}</p>
                        </CardHeader>
                        <CardContent className="p-4">
                            <p><strong>Police Station:</strong> {lead.policeStation}</p>
                            <p><strong>WhatsApp Number:</strong> {lead.whatsappNumber}</p>
                            <p><strong>State:</strong> {lead.state}</p>
                            <p><strong>District:</strong> {lead.district}</p>
                            <p><strong>Email:</strong> {lead.email}</p>
                            <p><strong>Referred By:</strong> {lead.referredBy}</p>
                        </CardContent>
                        <CardFooter className="p-4 border-t flex justify-between">
                            <a href={lead.idFrontUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                View ID Front
                            </a>
                            <a href={lead.idBackUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                View ID Back
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
