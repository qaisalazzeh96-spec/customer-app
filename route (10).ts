'use client';

import { useEffect, useState } from 'react';
import TeamLayout from '@/components/TeamLayout';

export default function TeamCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const token = localStorage.getItem('auth-token');
    try {
      const res = await fetch('/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem('auth-token');

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', description: '' });
        fetchCategories();
        alert('Category added successfully');
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add category');
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold">Categories</h3>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add Category
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h4 className="text-xl font-bold mb-4">Add Category</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-bold mb-2">{category.name}</h4>
              <p className="text-gray-600 text-sm">{category.description || 'No description'}</p>
            </div>
          ))}
        </div>
      </div>
    </TeamLayout>
  );
}
