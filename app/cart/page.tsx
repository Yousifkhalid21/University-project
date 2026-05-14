'use client';

import React, { useState } from 'react';

// --- Database Structure Types ---
// These represent how data will be sent to your Orders and Order_Items tables
type OrderItemRecord = {
  product_id: number;
  quantity: number;
  price: number; // Stored here to lock in the price at the time of purchase
};

type OrderRecord = {
  customer_id: number; // Hardcoded for this demo
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
  reason: string; // MIS justification
  imageUrl: string;
};

// --- Initial Mock Data ---
const initialCart: CartItem[] = [
  { id: 1, name: "Wireless Mouse", price: 25.00, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=60" },
  { id: 2, name: "Laptop Stand", price: 45.00, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=200&q=60" },
];

const crossSellingSuggestions: Suggestion[] = [
  { id: 3, name: "Mechanical Keyboard", price: 85.00, reason: "Frequently bought with Laptop Stand", imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=200&q=60" },
  { id: 4, name: "Extended Mouse Pad", price: 15.00, reason: "Customers who bought a Mouse also bought this", imageUrl: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=200&q=60" },
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  // --- Calculations ---
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 100;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15;
  const total = subtotal + shippingCost;
  
  // Requirement 3: Decision Support Message
  const amountNeededForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  // --- Handlers ---
  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta); // Prevent going below 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Requirement 4: Data Structure formatting upon purchase
  const handleCheckout = () => {
    // Construct the payload that matches the Orders and Order Details tables
    const orderPayload: OrderRecord = {
      customer_id: 101, // Mock customer ID
      order_date: new Date().toISOString(),
      total_amount: total,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    console.log("🚀 Sending Data to Database (Orders & Order_Items tables):", orderPayload);
    alert("Checkout successful! Check the console to see the Database Payload.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Product Display */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
                
                <div className="ml-6 flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-lg font-bold text-blue-600 mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors">-</button>
                  <span className="px-4 py-2 font-medium bg-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors">+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-10">
              <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-3 text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? <span className="text-green-500 font-medium">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              
              <div className="flex justify-between border-t pt-4 mb-6 text-2xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Requirement 3: Decision Support Message */}
              {amountNeededForFreeShipping > 0 ? (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-sm font-medium text-center">
                  💡 Add <span className="font-bold text-blue-900">${amountNeededForFreeShipping.toFixed(2)}</span> more to your cart to get <strong>Free Shipping!</strong>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-medium text-center">
                  ✅ You have unlocked <strong>Free Shipping!</strong>
                </div>
              )}

              {/* Requirement 5: HCI - Clear, Large Button */}
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Requirement 2: MIS Cross-Selling Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span className="text-yellow-500 text-2xl">✨</span> Smart Suggestions for You
          </h2>
          <p className="text-gray-500 mb-6">Based on your cart and previous order data analysis.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crossSellingSuggestions.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 hover:border-blue-300 transition-colors">
                <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md bg-gray-100" />
                <div className="flex flex-col justify-center flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 mt-1 italic">{product.reason}</span>
                </div>
                <div className="flex items-center">
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 text-sm font-medium rounded-lg transition-colors">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
