import React, { useState } from 'react';
import './styles/FinancialReports.css';

const FinancialReports = () => {
  const [formData, setFormData] = useState({
    service: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { service, cardName, cardNumber, expiryMonth, expiryYear, cvv } = formData;
    if (!service || !cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      alert('Please fill in all fields.');
      return;
    }
    alert('✅ Payment processed successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-1">Payment Details</h2>
          <p className="text-sm text-gray-500 mb-5">Complete your payment securely</p>

          <form onSubmit={handleSubmit}>
            <label className="block font-medium mb-1">Select Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            >
              <option value="">Select a service</option>
              <option>Initial Consultation</option>
              <option>Custom Design</option>
            </select>

            <label className="block font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              placeholder="As shown on card"
              value={formData.cardName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            <label className="block font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />

            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="block font-medium mb-1">Expiry Month</label>
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block font-medium mb-1">Expiry Year</label>
                <select
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">YYYY</option>
                  {[2025, 2026, 2027, 2028].map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block font-medium mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleChange}
              />
              Save card for future payments
            </label>

            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-2 rounded-md hover:bg-gray-800 transition"
            >
              Pay Now
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Your payment is secured with SSL encryption.
              <br />
              We do not store your card details.
            </p>
          </form>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 w-full lg:w-80">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">🔒 Secure Payments</h3>
            <p className="text-sm text-gray-600">
              All transactions are encrypted. Your info stays safe with us.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">💳 Accepted Cards</h3>
            <p className="text-sm text-gray-600">
              We accept Visa, Mastercard, AmEx, and Discover.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">👍 Satisfaction Guarantee</h3>
            <p className="text-sm text-gray-600">
              Not happy? We'll work with you until you are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
