// app/api/leads/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../utils/connectDB';
import Lead from '../../models/lead';

export async function POST(req) {
  await connectDB();

  try {
    const { officerName, designation, policeStation, whatsappNumber, state, district, email, referredBy, idFrontUrl, idBackUrl } = await req.json();

    const newLead = new Lead({
      officerName,
      designation,
      policeStation,
      whatsappNumber,
      state,
      district,
      email,
      idFrontUrl,
      idBackUrl,
      referredBy,
    });

    await newLead.save();

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
