import products from './data.json';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article key={product.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover rounded-lg bg-gray-100"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h2>
              <p className="mt-1 text-blue-600 font-bold">${product.price.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
