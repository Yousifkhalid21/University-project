'use client';

import React, { useEffect, useState } from 'react';
import TopNavbar from './components/TopNavbar';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Mouse',
    description: 'Comfortable ergonomic design for daily productivity.',
    price: 25,
    imageUrl:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Laptop Stand',
    description: 'Improves posture and workspace organization.',
    price: 45,
    imageUrl:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    description: 'Precise keys and premium typing comfort.',
    price: 85,
    imageUrl:
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60',
  },
];

export default function HomePage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timeoutId);
  }, [message]);

  const handleAddToCart = (name: string) => {
    setMessage(`${name} was added to your cart.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <TopNavbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-10 space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Shop Essentials</h1>
          <p className="max-w-2xl text-base text-slate-600">
            Discover clean, practical products with a simple and focused shopping experience.
          </p>
        </header>

        {message ? (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800" role="status" aria-live="polite">
            ✅ {message}
          </div>
        ) : null}

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-44 w-full object-cover transition duration-200 group-hover:scale-[1.02]"
              />
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
                <p className="text-sm text-slate-600">{product.description}</p>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="text-xl font-extrabold text-blue-700">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product.name)}
                    className="inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
