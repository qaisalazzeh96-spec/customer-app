'use client';

import { useEffect, useState } from 'react';
import TeamLayout from '@/components/TeamLayout';

export default function TeamCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const token = localStorage.getItem('auth-token');
    try {
      const res = await fetch('/api/customers', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <TeamLayout>
        <div>Loading...</div>
      </TeamLayout>
    );
  }

  return (
    <TeamLayout>
      <div>
        <h3 className="text-3xl font-bold mb-6">Customer Relationship Management (CRM)</h3>

        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No customers yet
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td className="px-6 py-4">{customer.mobile}</td>
                    <td className="px-6 py-4">{customer.email || 'N/A'}</td>
                    <td className="px-6 py-4">{customer.totalOrders || 0}</td>
                    <td className="px-6 py-4">{parseFloat(customer.totalSpent || 0).toFixed(2)} JOD</td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://wa.me/${customer.mobile.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </TeamLayout>
  );
}
