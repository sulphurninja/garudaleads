'use client'

import { ChangeEvent, FormEvent, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast, Toaster } from 'sonner';

interface FormData {
  officerName: string;
  designation: string;
  policeStation: string;
  whatsappNumber: string;
  state: string;
  district: string;
  email: string;
  referredBy: string;
  idFront: File | null;
  idBack: File | null;
}

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    officerName: '',
    designation: '',
    policeStation: '',
    whatsappNumber: '',
    state: '',
    district: '',
    email: '',
    referredBy: '',
    idFront: null,
    idBack: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value, files } = e.target as HTMLInputElement;

    if ('files' in e.target && files) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else if (e.target instanceof HTMLSelectElement || e.target instanceof HTMLInputElement) {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'lscivs0l'); // Replace with your upload preset

    const response = await axios.post('https://api.cloudinary.com/v1_1/dxcer6hbg/image/upload', formData);
    return response.data.secure_url;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const idFrontUrl = formData.idFront ? await uploadImage(formData.idFront) : null;
      const idBackUrl = formData.idBack ? await uploadImage(formData.idBack) : null;

      const res = await axios.post('/api/leads', {
        ...formData,
        idFrontUrl,
        idBackUrl
      });

      console.log('Lead created:', res.data);
      toast.success('Lead created successfully!');
      setSubmitted(true); // Mark as submitted
      setFormData({
        officerName: '',
        designation: '',
        policeStation: '',
        whatsappNumber: '',
        state: '',
        district: '',
        email: '',
        referredBy: '',
        idFront: null,
        idBack: null,
      });
    } catch (error) {
      toast.error('Error creating lead.');
      console.error('Error creating lead:', error);
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  return (
    <div className="mx-auto border border-gray-600 rounded-xl p-8 max-w-4xl space-y-8">
      <Toaster />
      <div className="flex justify-center">
        <img src="https://cdrgaruda.vercel.app/logo.png" className="h-28" />
      </div>
      <div className="space-y-4 text-center text">
        <h1 className="text-3xl font-bold text-white">Garuda Intelligence WhatsApp Bot</h1>
        <p className="text-white">Fill out the form below to get started with our WhatsApp bot service.</p>
      </div>
      <form className="space-y-6 text-white" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="officerName">Officer Name</Label>
            <Input className="text-black" id="officerName" value={formData.officerName} onChange={handleChange} placeholder="Enter officer name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input className="text-black" id="designation" value={formData.designation} onChange={handleChange} placeholder="Enter designation" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="policeStation">Police Station</Label>
            <Input className="text-black" id="policeStation" value={formData.policeStation} onChange={handleChange} placeholder="Enter police station" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input className="text-black" id="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="Enter WhatsApp number" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 grid grid-cols-1">
            <Label htmlFor="state">State</Label>
            <select id="state" value={formData.state} onChange={handleChange} className="text-black w-full mt-1 px-2 rounded">
              <option value="" disabled>Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input className="text-black" id="district" value={formData.district} onChange={handleChange} placeholder="Enter district" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Id</Label>
          <Input className="text-black" id="email" value={formData.email} onChange={handleChange} type="email" placeholder="Enter email" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="idFront">ID Card Front Side</Label>
            <Input className="text-black" id="idFront" onChange={handleChange} type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idBack">ID Card Back Side</Label>
            <Input className="text-black" id="idBack" onChange={handleChange} type="file" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="referredBy">Referred By</Label>
          <Input className="text-black" id="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="Enter referrer" />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" className="bg-gray-700">Discard</Button>
          <Button type="submit" className="bg-[#00A79D]" disabled={loading || submitted}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
      <div className="bg-muted p-4 rounded-lg text-center">
        <p className="text-muted-foreground">
          For any queries, please contact us at{" "}
          <a href="#" className="underline">
            info@a3m.io
          </a>
        </p>
      </div>
    </div>
  );
}
