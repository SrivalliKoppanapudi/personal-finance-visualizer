import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';
import { Types } from 'mongoose';

export async function GET() {
  await connectToDatabase();
  const data = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { amount, description, date, category } = body;

    if (!amount || !description || !date || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const txn = await Transaction.create({
      amount,
      description,
      date: new Date(date),
      category,
    });

    return NextResponse.json(txn);
  } catch (err: any) {
    console.error('POST /api/transactions error:', err.message || err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/transactions error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { id, amount, description, date, category } = await req.json();

    if (!id || !amount || !description || !date || !category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400 });
    }

    const updatedTxn = await Transaction.findByIdAndUpdate(
      id,
      {
        amount,
        description,
        date: new Date(date),
        category,
      },
      { new: true }
    );

    return NextResponse.json(updatedTxn);
  } catch (err) {
    console.error('PUT /api/transactions error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
