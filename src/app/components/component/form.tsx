'use client'

import { ChangeEvent, FormEvent, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormData] !== null) {
        formDataObj.append(key, formData[key as keyof FormData] as any);
      }
    });

    try {
      const res = await axios.post('/api/leads', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Lead created:', res.data);
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  return (
    <div className="mx-auto border border-gray-600 rounded-xl p-8 max-w-4xl space-y-8">
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
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input className="text-black" id="state" value={formData.state} onChange={handleChange} placeholder="Enter state" />
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
          <Button type="submit" className="bg-[#00A79D]">Submit</Button>
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
