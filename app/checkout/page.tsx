'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- Mock Cart Data (passed from Cart page in a real app) ---
const cartItems = [
  { id: 1, name: "Wireless Mouse", price: 25.00, quantity: 1 },
  { id: 2, name: "Laptop Stand", price: 45.00, quantity: 1 },
];

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: ''
  });

  // --- Calculations ---
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Requirement 3: Saving Logic (Simulating Database Insert)
  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating the data payload structure for your Database tables
    const databasePayload = {
      customer: {
        name: formData.fullName,
        email: formData.email,
        address: `${formData.address}, ${formData.city}`
      },
      order: {
        order_date: new Date().toISOString(),
        total_amount: total,
        status: 'Completed'
      },
      order_items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }))
    };

    console.log("💾 SAVING TO DATABASE:", databasePayload);
    
    // Show success screen
    setIsSuccess(true);
  };

  // Requirement 4: Success Message Interface
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-lg w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Thank you, {formData.fullName}. Your order has been successfully saved to our system.
          </p>
          <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium mb-8 text-left border border-blue-100">
            <strong>MIS Active:</strong> Our Management Information System has begun analyzing your purchase data to provide better, personalized recommendations for your future visits!
          </div>
          <Link href="/" className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  // Requirement 5: Minimalist Interface
  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="mb-8">
          <Link href="/cart" className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-1">
            ← Back to Cart
          </Link>
          <h1 className="text-3xl font-extrabold mt-4 text-gray-900">Secure Checkout</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Requirement 1: Customer Data Form */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Customer Information</h2>
              <form onSubmit={handleConfirmPurchase} className="space-y-5" id="checkout-form">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="123 Main St" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="New York" />
                </div>
              </form>
            </div>
          </div>

          {/* Requirement 2: Invoice Summary */}
          <div className="w-full md:w-96">
            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg sticky top-8">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.quantity}x {item.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-3 mt-3 border-t border-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-lg transition-colors shadow-md"
              >
                Confirm Purchase
              </button>
              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                🔒 Secure 256-bit encryption
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
