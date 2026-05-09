'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      router.push('/team/login');
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.admin);
      } else {
        localStorage.removeItem('auth-token');
        router.push('/team/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/team/login');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('auth-token');
      router.push('/team/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Rug N' Rope</h1>
          <nav className="space-y-2">
            <Link
              href="/team/dashboard"
              className={`block px-4 py-2 rounded ${isActive('/team/dashboard') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Dashboard
            </Link>
            <Link
              href="/team/orders"
              className={`block px-4 py-2 rounded ${isActive('/team/orders') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Orders
            </Link>
            <Link
              href="/team/customers"
              className={`block px-4 py-2 rounded ${isActive('/team/customers') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Customers (CRM)
            </Link>
            <Link
              href="/team/products"
              className={`block px-4 py-2 rounded ${isActive('/team/products') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Products
            </Link>
            <Link
              href="/team/categories"
              className={`block px-4 py-2 rounded ${isActive('/team/categories') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Categories
            </Link>
            <Link
              href="/team/raw-materials"
              className={`block px-4 py-2 rounded ${isActive('/team/raw-materials') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Raw Materials
            </Link>
            <Link
              href="/team/site-settings"
              className={`block px-4 py-2 rounded ${isActive('/team/site-settings') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              Site Settings
            </Link>
            <Link
              href="/team/faqs"
              className={`block px-4 py-2 rounded ${isActive('/team/faqs') ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              FAQs
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <p className="text-sm mb-2">{user?.firstName || user?.username}</p>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Portal</h2>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-sm text-blue-600 hover:underline"
          >
            View Customer Site →
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
