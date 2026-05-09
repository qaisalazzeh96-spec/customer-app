'use client';

import Link from 'next/link';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Rug N' Rope</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link href="/catalogue" className="text-gray-700 hover:text-gray-900">Catalogue</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">About Us</Link>
              <Link href="/faq" className="text-gray-700 hover:text-gray-900">FAQ</Link>
              <Link href="/policies" className="text-gray-700 hover:text-gray-900 font-semibold">Order Policies</Link>
              <Link href="/track" className="text-gray-700 hover:text-gray-900">Track Order</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Order Policies</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Payment Policy</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Deposit Required:</strong> To confirm your order and begin production, a 50% deposit of the total price is required.
                </p>
                <p>
                  <strong>Payment Methods:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>CliQ:</strong> Pay securely via CliQ transfer</li>
                  <li><strong>Face-to-Face:</strong> Pay in person at our location</li>
                </ul>
                <p>
                  <strong>Final Payment:</strong> The remaining 50% is due upon completion of your rug before delivery or pickup.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Order Confirmation</h3>
              <p className="text-gray-700">
                Your order is considered confirmed once we receive your 50% deposit payment. You will receive a confirmation message with your order number and estimated completion date.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Production Time</h3>
              <p className="text-gray-700 mb-3">
                Each rug is handmade to order, and production times vary depending on:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li>Size of the rug</li>
                <li>Complexity of the design</li>
                <li>Current order queue</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Our team will provide you with an estimated timeline when you place your order. You can track your order status anytime using your order number.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Custom Design Policy</h3>
              <p className="text-gray-700 mb-3">
                We love bringing your unique visions to life! For custom designs:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li>Upload reference images or describe your design idea</li>
                <li>We'll work with you to finalize the design before production begins</li>
                <li>Minor adjustments can be made during the design phase</li>
                <li>Once production starts, design changes may incur additional costs</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Cancellation Policy</h3>
              <p className="text-gray-700 mb-3">
                We understand that circumstances change. Here's our cancellation policy:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li><strong>Before Production:</strong> Full refund of deposit if cancelled before we start production</li>
                <li><strong>During Production:</strong> Deposit is non-refundable once production has begun</li>
                <li><strong>Completed Orders:</strong> No refunds on completed custom orders</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Delivery & Pickup</h3>
              <p className="text-gray-700 mb-3">
                Once your rug is complete:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li>We'll notify you via WhatsApp or phone</li>
                <li>Arrange delivery (fees may apply based on location)</li>
                <li>Or schedule a pickup at our location</li>
                <li>Final payment must be completed before delivery/pickup</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Quality Guarantee</h3>
              <p className="text-gray-700">
                We take pride in our craftsmanship. Every rug undergoes a thorough quality check before delivery. If you notice any defects or issues, please contact us within 48 hours of receiving your rug, and we'll work to resolve the issue promptly.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">Questions About Our Policies?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about our policies, feel free to reach out to us via WhatsApp or check our FAQ page.
              </p>
              <div className="space-x-4">
                <Link
                  href="/faq"
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  View FAQ
                </Link>
                <Link
                  href="/order"
                  className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Place an Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
