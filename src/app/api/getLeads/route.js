import { NextResponse } from 'next/server';
import connectDB from '../../../utils/connectDB';
import Lead from '../../models/lead';

export async function GET() {
    await connectDB();

    try {
        const leads = await Lead.find();
        return NextResponse.json({ success: true, data: leads }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}