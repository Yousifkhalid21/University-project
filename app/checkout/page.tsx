'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TopNavbar from '../components/TopNavbar';

type CheckoutItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const fallbackCartItems: CheckoutItem[] = [
  { id: 1, name: 'Wireless Mouse', price: 25.0, quantity: 1 },
  { id: 2, name: 'Laptop Stand', price: 45.0, quantity: 1 },
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CheckoutItem[]>(fallbackCartItems);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.0;
  const total = subtotal + shipping;

  useEffect(() => {
    const savedCart = localStorage.getItem('checkout-cart');

    if (!savedCart) {
      return;
    }

    try {
      const parsedCart = JSON.parse(savedCart) as CheckoutItem[];
      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        setCartItems(parsedCart);
      }
    } catch {
      setCartItems(fallbackCartItems);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const databasePayload = {
      customer: {
        name: formData.fullName,
        email: formData.email,
        address: `${formData.address}, ${formData.city}`,
      },
      order: {
        order_date: new Date().toISOString(),
        total_amount: total,
        status: 'Completed',
      },
      order_items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      })),
    };

    console.log('💾 SAVING TO DATABASE:', databasePayload);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <TopNavbar />

        <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="mb-3 text-3xl font-extrabold text-slate-900">Order Confirmed</h1>
            <p className="mb-6 text-base text-slate-600">
              Thank you, {formData.fullName}. Your transaction was completed successfully.
            </p>
            <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-left text-sm font-medium text-blue-800">
              ✅ Your order has been recorded and is now being processed for delivery.
            </div>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <TopNavbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 space-y-2">
          <Link href="/cart" className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800">
            ← Back to Cart
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Secure Checkout</h1>
          <p className="text-base text-slate-600">Enter your shipping details and confirm your order.</p>
        </header>

        <div className="flex flex-col gap-8 md:flex-row">
          <section className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 border-b border-slate-200 pb-4 text-2xl font-bold text-slate-900">Customer Information</h2>
            <form onSubmit={handleConfirmPurchase} className="space-y-5" id="checkout-form">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Shipping Address</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">City</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="New York"
                />
              </div>
            </form>
          </section>

          <aside className="w-full md:w-96">
            <section className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b border-slate-200 pb-4 text-2xl font-bold text-slate-900">Order Summary</h2>

              <div className="mb-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-lg font-extrabold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="mt-8 inline-flex w-full min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 text-lg font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <p className="mt-4 text-center text-xs text-slate-500">🔒 Secure 256-bit encryption</p>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
