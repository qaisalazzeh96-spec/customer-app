'use client';

import { useEffect, useState } from 'react';
import TeamLayout from '@/components/TeamLayout';

export default function TeamRawMaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    color: '',
    unit: 'piece',
    quantity: '0',
    minQuantity: '0',
    costPerUnit: '',
    supplier: '',
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    const token = localStorage.getItem('auth-token');
    try {
      const res = await fetch('/api/raw-materials', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setMaterials(data.materials || []);
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
      const res = await fetch('/api/raw-materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        resetForm();
        fetchMaterials();
        alert('Material added successfully');
      } else {
        alert('Failed to add material');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add material');
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      type: '',
      color: '',
      unit: 'piece',
      quantity: '0',
      minQuantity: '0',
      costPerUnit: '',
      supplier: '',
    });
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
          <h3 className="text-3xl font-bold">Raw Materials Management</h3>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add Material
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h4 className="text-xl font-bold mb-4">Add Raw Material</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g., Yarn, Thread"
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="piece">Piece</option>
                    <option value="kg">Kilogram</option>
                    <option value="meter">Meter</option>
                    <option value="roll">Roll</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Min Quantity (Alert)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cost Per Unit</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPerUnit}
                    onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Supplier</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {materials.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No materials added yet
                  </td>
                </tr>
              ) : (
                materials.map((material) => (
                  <tr key={material.id} className={`hover:bg-gray-50 ${parseFloat(material.quantity) <= parseFloat(material.minQuantity) ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 font-medium">{material.name}</td>
                    <td className="px-6 py-4">{material.type || 'N/A'}</td>
                    <td className="px-6 py-4">{material.color || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {parseFloat(material.quantity)}
                      {parseFloat(material.quantity) <= parseFloat(material.minQuantity) && (
                        <span className="ml-2 text-red-600 text-xs">⚠️ Low</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{material.unit}</td>
                    <td className="px-6 py-4">{parseFloat(material.minQuantity)}</td>
                    <td className="px-6 py-4">{material.supplier || 'N/A'}</td>
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
