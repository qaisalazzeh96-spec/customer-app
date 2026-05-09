'use client';

import { useEffect, useState } from 'react';
import TeamLayout from '@/components/TeamLayout';

export default function TeamFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    displayOrder: '0',
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  async function fetchFAQs() {
    const token = localStorage.getItem('auth-token');
    try {
      const res = await fetch('/api/faqs', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setFaqs(data.faqs || []);
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
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: formData.question,
          answer: formData.answer,
          displayOrder: parseInt(formData.displayOrder),
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ question: '', answer: '', displayOrder: '0' });
        fetchFAQs();
        alert('FAQ added successfully');
      } else {
        alert('Failed to add FAQ');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add FAQ');
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
          <h3 className="text-3xl font-bold">FAQs Management</h3>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add FAQ
          </button>
        </div>

        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            These FAQs will be displayed on the customer-facing FAQ page. They help answer common questions about your products and services.
          </p>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h4 className="text-xl font-bold mb-4">Add FAQ</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g., How long does it take to make a custom rug?"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Provide a detailed answer..."
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
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

        <div className="space-y-4">
          {faqs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No FAQs added yet. Click "Add FAQ" to create one.</p>
            </div>
          ) : (
            faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-700">{faq.answer}</p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">Order: {faq.displayOrder}</span>
                      <span className={`ml-3 px-2 py-1 rounded ${faq.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {faq.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </TeamLayout>
  );
}
