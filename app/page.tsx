import Image from 'next/image';
import products from './data.json';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function HomePage() {
  const items = products as Product[];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Products</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={176}
                className="w-full object-cover bg-gray-100"
              />
              <div className="p-4">
                <h2 className="font-semibold text-gray-900">{product.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <p className="mt-2 text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
