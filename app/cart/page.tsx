'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNavbar from '../components/TopNavbar';

// --- Database Structure Types ---
type OrderItemRecord = {
  product_id: number;
  quantity: number;
  price: number;
};

type OrderRecord = {
  customer_id: number;
  order_date: string;
  total_amount: number;
  items: OrderItemRecord[];
};

// --- Frontend Types ---
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type Suggestion = {
  id: number;
  name: string;
  price: number;
  reason: string;
  imageUrl: string;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: 'Wireless Mouse',
    price: 25,
    quantity: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=60',
  },
  {
    id: 2,
    name: 'Laptop Stand',
    price: 45,
    quantity: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=200&q=60',
  },
];

const crossSellingSuggestions: Suggestion[] = [
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 85,
    reason: 'Frequently bought with Laptop Stand',
    imageUrl:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=200&q=60',
  },
  {
    id: 4,
    name: 'Extended Mouse Pad',
    price: 15,
    reason: 'Customers who bought a Mouse also bought this',
    imageUrl:
      'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=200&q=60',
  },
];

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timeoutId);
  }, [message]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 100;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const total = subtotal + shippingCost;
  const amountNeededForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const updateQuantity = (id: number, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const addSuggestionToCart = (product: Suggestion) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to your cart.`);
  };

  const handleCheckout = () => {
    const orderPayload: OrderRecord = {
      customer_id: 101,
      order_date: new Date().toISOString(),
      total_amount: total,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log('🚀 Order payload prepared:', orderPayload);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <TopNavbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Shopping Cart</h1>
          <p className="text-base text-slate-600">Review your items and complete checkout confidently.</p>
        </header>

        {message ? (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800" role="status" aria-live="polite">
            ✅ {message}
          </div>
        ) : null}

        <div className="flex flex-col gap-8 lg:flex-row">
          <section className="flex-1 space-y-4">
            {cart.map((item) => (
              <article
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl bg-slate-100 object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-lg font-extrabold text-blue-700">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center overflow-hidden rounded-xl border border-slate-300">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="inline-flex min-h-10 items-center bg-slate-50 px-4 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-semibold text-slate-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="inline-flex min-h-10 items-center bg-slate-50 px-4 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="w-full lg:w-96">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 border-b border-slate-200 pb-4 text-2xl font-bold text-slate-900">Order Summary</h2>

              <div className="mb-3 flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mb-4 flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? <span className="font-semibold text-green-700">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="mb-6 flex justify-between border-t border-slate-200 pt-4 text-2xl font-extrabold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {amountNeededForFreeShipping > 0 ? (
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm font-semibold text-blue-800">
                  💡 Add <span className="font-extrabold">${amountNeededForFreeShipping.toFixed(2)}</span> more to unlock free shipping.
                </div>
              ) : (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm font-semibold text-green-800">
                  ✅ You unlocked free shipping.
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="inline-flex w-full min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 text-lg font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900">Smart Suggestions</h2>
          <p className="mb-6 mt-1 text-sm text-slate-600">Based on your cart and previous purchase patterns.</p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {crossSellingSuggestions.map((product) => (
              <article
                key={product.id}
                className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg bg-slate-100 object-cover"
                />
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="font-bold text-slate-900">{product.name}</h3>
                  <span className="font-extrabold text-blue-700">${product.price.toFixed(2)}</span>
                  <span className="mt-1 text-xs text-slate-500">{product.reason}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => addSuggestionToCart(product)}
                    className="inline-flex min-h-10 items-center rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
