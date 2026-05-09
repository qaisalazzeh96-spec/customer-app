'use client';

import { useEffect, useState } from 'react';
import TeamLayout from '@/components/TeamLayout';

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    logo_url: '',
    site_name: '',
    hero_image: '',
    hero_title: '',
    hero_subtitle: '',
    ticker_text: '',
    ticker_color: '#000000',
    instagram_link: '',
    whatsapp_link: '',
    features_title: '',
    products_title: '',
    products_description: '',
    cta_title: '',
    cta_subtitle: '',
    about_text: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings({
        logo_url: data.settings.logo_url || '',
        site_name: data.settings.site_name || '',
        hero_image: data.settings.hero_image || '',
        hero_title: data.settings.hero_title || '',
        hero_subtitle: data.settings.hero_subtitle || '',
        ticker_text: data.settings.ticker_text || '',
        ticker_color: data.settings.ticker_color || '#000000',
        instagram_link: data.settings.instagram_link || '',
        whatsapp_link: data.settings.whatsapp_link || '',
        features_title: data.settings.features_title || '',
        products_title: data.settings.products_title || '',
        products_description: data.settings.products_description || '',
        cta_title: data.settings.cta_title || '',
        cta_subtitle: data.settings.cta_subtitle || '',
        about_text: data.settings.about_text || '',
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveSetting(key: string, value: string) {
    const token = localStorage.getItem('auth-token');
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ key, value }),
      });
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await Promise.all([
        saveSetting('logo_url', settings.logo_url),
        saveSetting('site_name', settings.site_name),
        saveSetting('hero_image', settings.hero_image),
        saveSetting('hero_title', settings.hero_title),
        saveSetting('hero_subtitle', settings.hero_subtitle),
        saveSetting('ticker_text', settings.ticker_text),
        saveSetting('ticker_color', settings.ticker_color),
        saveSetting('instagram_link', settings.instagram_link),
        saveSetting('whatsapp_link', settings.whatsapp_link),
        saveSetting('features_title', settings.features_title),
        saveSetting('products_title', settings.products_title),
        saveSetting('products_description', settings.products_description),
        saveSetting('cta_title', settings.cta_title),
        saveSetting('cta_subtitle', settings.cta_subtitle),
        saveSetting('about_text', settings.about_text),
      ]);
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'logo');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setSettings(prev => ({ ...prev, logo_url: data.url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload logo');
    }
  }

  async function handleHeroImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'hero');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setSettings(prev => ({ ...prev, hero_image: data.url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
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
        <h3 className="text-3xl font-bold mb-6">Site Settings</h3>
        <p className="text-gray-600 mb-8">Control the appearance and content of the customer-facing website</p>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold mb-4">Branding</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  placeholder="Rug N' Rope"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Logo (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full px-4 py-2 border rounded"
                />
                {settings.logo_url && (
                  <div className="mt-4">
                    <img src={settings.logo_url} alt="Logo" className="max-w-xs h-20 object-contain" />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: PNG with transparent background, max height 80px
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold mb-4">Hero Section</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  className="w-full px-4 py-2 border rounded"
                />
                {settings.hero_image && (
                  <div className="mt-4">
                    <img src={settings.hero_image} alt="Hero" className="max-w-md rounded" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Title</label>
                <input
                  type="text"
                  value={settings.hero_title}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  placeholder="Handmade Custom Rugs"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={settings.hero_subtitle}
                  onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  placeholder="Crafted with care, designed by you"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold mb-4">Ticker Tape</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ticker Text</label>
                <input
                  type="text"
                  value={settings.ticker_text}
                  onChange={(e) => setSettings({ ...settings, ticker_text: e.target.value })}
                  placeholder="Welcome to Rug N' Rope - Handmade Custom Rugs"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ticker Background Color</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={settings.ticker_color}
                    onChange={(e) => setSettings({ ...settings, ticker_color: e.target.value })}
                    className="h-10 w-20 border rounded"
                  />
                  <input
                    type="text"
                    value={settings.ticker_color}
                    onChange={(e) => setSettings({ ...settings, ticker_color: e.target.value })}
                    className="px-4 py-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold mb-4">Home Page Content</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Features Section Title</label>
                <input
                  type="text"
                  value={settings.features_title}
                  onChange={(e) => setSettings({ ...settings, features_title: e.target.value })}
                  placeholder="Why Choose Rug N' Rope"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Products Section Title</label>
                <input
                  type="text"
                  value={settings.products_title}
                  onChange={(e) => setSettings({ ...settings, products_title: e.target.value })}
                  placeholder="Our Handcrafted Rugs"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Products Section Description</label>
                <textarea
                  rows={2}
                  value={settings.products_description}
                  onChange={(e) => setSettings({ ...settings, products_description: e.target.value })}
                  placeholder="Explore our collection..."
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Call-to-Action Title</label>
                <input
                  type="text"
                  value={settings.cta_title}
                  onChange={(e) => setSettings({ ...settings, cta_title: e.target.value })}
                  placeholder="Ready to Create Your Dream Rug?"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Call-to-Action Subtitle</label>
                <input
                  type="text"
                  value={settings.cta_subtitle}
                  onChange={(e) => setSettings({ ...settings, cta_subtitle: e.target.value })}
                  placeholder="Let's bring your vision to life..."
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h4 className="text-xl font-bold mb-4">Social Links</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Instagram Link</label>
                <input
                  type="url"
                  value={settings.instagram_link}
                  onChange={(e) => setSettings({ ...settings, instagram_link: e.target.value })}
                  placeholder="https://instagram.com/yourusername"
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp Link</label>
                <input
                  type="url"
                  value={settings.whatsapp_link}
                  onChange={(e) => setSettings({ ...settings, whatsapp_link: e.target.value })}
                  placeholder="https://wa.me/962XXXXXXXXX"
                  className="w-full px-4 py-2 border rounded"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: https://wa.me/962XXXXXXXXX (include country code)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-800 disabled:opacity-50 font-semibold"
            >
              {saving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Preview:</strong> Open the{' '}
              <a href="/" target="_blank" className="underline">
                customer site
              </a>{' '}
              in a new tab to see your changes.
            </p>
          </div>
        </div>
      </div>
    </TeamLayout>
  );
}
