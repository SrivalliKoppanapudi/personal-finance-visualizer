'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ amount: '', description: '', category: '', date: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await axios.get('/api/transactions');
    setTransactions(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    const newErrors: any = {};
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      newErrors.amount = 'Amount must be a valid number greater than 0';
    }
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.category) newErrors.category = 'Please select a category';
    if (!form.date) newErrors.date = 'Date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (editingId) {
        await axios.put('/api/transactions', {
          id: editingId,
          ...form,
          amount: parseFloat(form.amount),
          date: new Date(form.date),
        });
        setEditingId(null);
      } else {
        await axios.post('/api/transactions', {
          ...form,
          amount: parseFloat(form.amount),
          date: new Date(form.date),
        });
      }

      setForm({ amount: '', description: '', category: '', date: '' });
      fetchData();
    } catch (err) {
      console.error('Submit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTxn = async (id: string) => {
    await axios.delete('/api/transactions', { data: { id } });
    fetchData();
  };

  const editTxn = (txn: any) => {
    setForm({
      amount: txn.amount.toString(),
      description: txn.description,
      category: txn.category,
      date: txn.date.slice(0, 10),
    });
    setEditingId(txn._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const groupedByCategory = categories.map(cat => ({
    name: cat,
    value: transactions.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0),
  }));

  const groupedByMonth = Object.entries(
    transactions.reduce((acc, txn) => {
      const key = new Date(txn.date).toLocaleDateString('default', { month: 'short', year: 'numeric' });
      acc[key] = (acc[key] || 0) + txn.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const totalExpenses = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const mostRecentTxn = transactions.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="min-h-screen bg-muted/40 py-10">

    <div className="max-w-4xl mx-auto p-4 space-y-6">
      
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border border-muted"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Expenses</p><p className="text-xl font-bold text-primary">₹{totalExpenses}</p></CardContent></Card>
        <Card className="shadow-md border border-muted"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Most Recent</p><p className="text-xl font-bold text-primary">{mostRecentTxn ? mostRecentTxn.description + ' - ₹' + mostRecentTxn.amount : 'N/A'}</p></CardContent></Card>
        <Card className="shadow-md border border-muted"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Categories Tracked</p><p className="text-xl font-bold text-primary">{categories.length}</p></CardContent></Card>
      </div>

      {/* Transaction Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">{editingId ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <Input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
          <Input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
          <div className="flex gap-2">
  <Button onClick={handleSubmit} disabled={loading}>
    {loading ? (editingId ? 'Updating...' : 'Submitting...') : (editingId ? 'Update' : 'Submit')}
  </Button>
  {editingId && (
    <Button
      variant="secondary"
      onClick={() => {
        setEditingId(null);
        setForm({ amount: '', description: '', category: '', date: '' });
        setErrors({});
      }}
      disabled={loading}
    >
      Cancel
    </Button>
  )}
</div>

        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
          <ul>
            {transactions.slice(0, 5).map(txn => (
              <li key={txn._id} className="flex justify-between items-center py-1">
                <span>{txn.description} - ₹{txn.amount}</span>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => editTxn(txn)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteTxn(txn._id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
            <BarChart width={300} height={200} data={groupedByMonth}>
              <XAxis dataKey="name" /><YAxis />
              <Bar dataKey="value" fill="#8884d8" />
              <Tooltip />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
            <PieChart width={300} height={200}>
              <Pie data={groupedByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                {groupedByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
