import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import data from './data.json';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

const products = data.products as Product[];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">Storefront</h1>
          <p className="text-gray-500 mt-2">Browse our featured accessories.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={480}
                className="w-full h-44 object-cover bg-gray-100"
              />
              <div className="p-4">
                <h2 className="font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                  <Link href="/cart" className="text-sm text-blue-600 hover:underline font-medium">
                    Go to cart
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
