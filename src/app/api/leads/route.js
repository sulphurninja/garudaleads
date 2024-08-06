// app/api/leads/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../utils/connectDB';
import Lead from '../../models/lead';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

export async function POST(req) {
    await connectDB();

    try {
        const formData = await req.formData();
        const officerName = formData.get('officerName');
        const designation = formData.get('designation');
        const policeStation = formData.get('policeStation');
        const whatsappNumber = formData.get('whatsappNumber');
        const state = formData.get('state');
        const district = formData.get('district');
        const email = formData.get('email');
        const referredBy = formData.get('referredBy');
        const idFront = formData.get('idFront');
        const idBack = formData.get('idBack');

        const idFrontBuffer = await streamToBuffer(idFront.stream());
        const idBackBuffer = await streamToBuffer(idBack.stream());

        const idFrontUpload = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            uploadStream.end(idFrontBuffer);
        });

        const idBackUpload = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            uploadStream.end(idBackBuffer);
        });

        const newLead = new Lead({
            officerName,
            designation,
            policeStation,
            whatsappNumber,
            state,
            district,
            email,
            idFrontUrl: idFrontUpload.secure_url,
            idBackUrl: idBackUpload.secure_url,
            referredBy,
        });

        await newLead.save();

        return NextResponse.json({ success: true, data: newLead }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}