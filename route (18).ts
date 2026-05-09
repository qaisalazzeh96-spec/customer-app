'use client';

import { useEffect, useState } from 'react';
import TeamLayout from '@/components/TeamLayout';

export default function TeamDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const token = localStorage.getItem('auth-token');
    try {
      const res = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
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
      <div className="space-y-8">
        <h3 className="text-3xl font-bold">Dashboard</h3>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="text-3xl font-bold">{stats?.stats?.totalOrders || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold">{stats?.stats?.totalRevenue?.toFixed(2) || 0} JOD</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Customers</p>
            <p className="text-3xl font-bold">{stats?.stats?.totalCustomers || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Pending Orders</p>
            <p className="text-3xl font-bold text-yellow-600">{stats?.stats?.pendingOrders || 0}</p>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-4">Top Selling Products</h4>
          <div className="space-y-3">
            {stats?.topProducts?.length > 0 ? (
              stats.topProducts.map((product: any) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded mr-3" />
                    )}
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <span className="text-gray-600">{product.totalSold} sold</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No products sold yet</p>
            )}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-4">Top Customers</h4>
          <div className="space-y-3">
            {stats?.topCustomers?.length > 0 ? (
              stats.topCustomers.map((customer: any) => (
                <div key={customer.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                    <p className="text-sm text-gray-600">{customer.totalOrders} orders</p>
                  </div>
                  <span className="font-semibold">{parseFloat(customer.totalSpent).toFixed(2)} JOD</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No customers yet</p>
            )}
          </div>
        </div>

        {/* Sales by Month */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-4">Sales by Month</h4>
          {stats?.salesByMonth?.length > 0 ? (
            <div className="space-y-2">
              {stats.salesByMonth.map((item: any) => (
                <div key={item.month} className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">{item.month}</span>
                  <div className="text-right">
                    <p className="font-semibold">{parseFloat(item.totalSales).toFixed(2)} JOD</p>
                    <p className="text-sm text-gray-600">{item.orderCount} orders</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No sales data yet</p>
          )}
        </div>

        {/* Top Selling Sizes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-xl font-bold mb-4">Top Selling Sizes</h4>
          {stats?.topSizes?.length > 0 ? (
            <div className="space-y-2">
              {stats.topSizes.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">{item.size}</span>
                  <span className="text-gray-600">{item.count} orders</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No size data yet</p>
          )}
        </div>
      </div>
    </TeamLayout>
  );
}
