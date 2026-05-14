'use client';

import React from 'react';

// ==========================================
// 1. DATABASE STRUCTURE & MOCK DATA
// ==========================================
type Customer = { id: number; name: string; totalSpent: number; orderCount: number; segment: string };
type Product = { id: number; name: string; stock: number; price: number; category: string };
type OrderInsight = { month: string; revenue: number; orders: number };
type CartAnalysis = { productA: string; productB: string; frequency: number; relationship: string };
type Decision = { id: number; type: 'warning' | 'success' | 'info'; title: string; action: string };

const customers: Customer[] = [
  { id: 1, name: "Ahmed Ali", totalSpent: 2450.00, orderCount: 5, segment: "Major/VIP" },
  { id: 2, name: "Sara Khalid", totalSpent: 150.00, orderCount: 1, segment: "New" },
  { id: 3, name: "Mohammed Hassan", totalSpent: 850.00, orderCount: 3, segment: "Regular" },
  { id: 4, name: "Fatima Noor", totalSpent: 3200.00, orderCount: 8, segment: "Major/VIP" },
];

const products: Product[] = [
  { id: 101, name: "Wireless Mouse", stock: 12, price: 25, category: "Accessories" },
  { id: 102, name: "Laptop Stand", stock: 45, price: 45, category: "Accessories" },
  { id: 103, name: "ProBook X15", stock: 3, price: 1299, category: "Laptops" },
  { id: 104, name: "4K Monitor", stock: 8, price: 350, category: "Monitors" },
];

const monthlyTrends: OrderInsight[] = [
  { month: "Jan", revenue: 4200, orders: 45 },
  { month: "Feb", revenue: 5100, orders: 52 },
  { month: "Mar", revenue: 3800, orders: 38 },
  { month: "Apr", revenue: 6400, orders: 65 },
  { month: "May", revenue: 8900, orders: 85 }, // Current peak
];

const cartAnalysis: CartAnalysis[] = [
  { productA: "Laptop Stand", productB: "Wireless Mouse", frequency: 45, relationship: "Strong (Ergonomics)" },
  { productA: "ProBook X15", productB: "Laptop Bag", frequency: 32, relationship: "Very Strong (Protection)" },
  { productA: "4K Monitor", productB: "HDMI Cable", frequency: 28, relationship: "Essential Pair" },
];

const decisions: Decision[] = [
  { id: 1, type: 'warning', title: "Low Stock Alert: ProBook X15", action: "Reorder immediately. Only 3 units left in inventory." },
  { id: 2, type: 'info', title: "Pricing Strategy: Wireless Mouse", action: "Bundle with 'Laptop Stand' for a 10% discount to clear aging stock." },
  { id: 3, type: 'success', title: "Targeted Marketing: Major/VIP", action: "Send exclusive early-access emails to Ahmed and Fatima for the new smartphone launch." },
];

// ==========================================
// 2. DASHBOARD UI COMPONENT
// ==========================================
export default function AdminDashboard() {
  const maxRevenue = Math.max(...monthlyTrends.map(t => t.revenue));

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar - Separating Admin from Customer UI */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold tracking-tight">MIS<span className="text-blue-400">Panel</span></h1>
          <p className="text-xs text-slate-400 mt-1">Management Information System</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block px-4 py-3 bg-blue-600 rounded-lg text-sm font-medium">Dashboard Overview</a>
          <a href="#" className="block px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg text-sm font-medium">Data Tables</a>
          <a href="#" className="block px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg text-sm font-medium">System Settings</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">Executive Dashboard</h2>
          <p className="text-slate-500 mt-1">Data-driven insights extracted from Orders and Customer tables.</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* REQUIREMENT 1: Smart Reports (Sales Trend Chart) */}
          <section className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Purchasing Patterns (Revenue Trend)</h3>
            <div className="flex items-end gap-4 h-64 mt-4">
              {monthlyTrends.map((trend) => {
                const heightPercentage = (trend.revenue / maxRevenue) * 100;
                return (
                  <div key={trend.month} className="flex-1 flex flex-col justify-end items-center group relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-800 text-white text-xs py-1 px-2 rounded transition-opacity">
                      ${trend.revenue}
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full bg-blue-500 hover:bg-blue-600 rounded-t-md transition-all duration-500 ease-out"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    {/* Label */}
                    <span className="text-xs text-slate-500 mt-2 font-medium">{trend.month}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* REQUIREMENT 4: Decision Board */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Decision Support Board</h3>
            <div className="space-y-4">
              {decisions.map((decision) => (
                <div key={decision.id} className={`p-4 rounded-xl border-l-4 ${
                  decision.type === 'warning' ? 'bg-red-50 border-red-500 text-red-900' :
                  decision.type === 'success' ? 'bg-green-50 border-green-500 text-green-900' :
                  'bg-blue-50 border-blue-500 text-blue-900'
                }`}>
                  <h4 className="font-bold text-sm mb-1">{decision.title}</h4>
                  <p className="text-xs opacity-90">{decision.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* REQUIREMENT 2: Customer Segmentation Table */}
          <section className="xl:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Customer Segmentation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Total Spent</th>
                    <th className="pb-3 font-medium">Segment</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-800">{customer.name}</td>
                      <td className="py-3 text-slate-600">${customer.totalSpent.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          customer.segment === 'Major/VIP' ? 'bg-purple-100 text-purple-700' :
                          customer.segment === 'New' ? 'bg-green-100 text-green-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {customer.segment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* REQUIREMENT 3: Shopping Cart Analysis (Market Basket Analysis) */}
          <section className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Shopping Cart Analysis (Cross-Selling)</h3>
            <p className="text-sm text-slate-500 mb-4">Products frequently bought together based on Order_Items relationships.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase text-slate-500 tracking-wider">
                    <th className="p-4 font-medium rounded-tl-lg">Product A</th>
                    <th className="p-4 font-medium">Product B</th>
                    <th className="p-4 font-medium">Times Bought Together</th>
                    <th className="p-4 font-medium rounded-tr-lg">MIS Relationship Insight</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {cartAnalysis.map((analysis, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">{analysis.productA}</td>
                      <td className="p-4 font-semibold text-slate-800">{analysis.productB}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-50" style={{ width: `${(analysis.frequency / 50) * 100}%` }}></div>
                          </div>
                          <span className="text-slate-600 font-medium">{analysis.frequency}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 italic">{analysis.relationship}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
