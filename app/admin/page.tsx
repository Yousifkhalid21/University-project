'use client';

import React, { useState } from 'react';
import TopNavbar from '../components/TopNavbar';

type Customer = { id: number; name: string; totalSpent: number; orderCount: number; segment: string };
type OrderInsight = { month: string; revenue: number; orders: number };
type CartAnalysis = { productA: string; productB: string; frequency: number; relationship: string };
type Decision = { id: number; type: 'warning' | 'success' | 'info'; title: string; action: string };

const customers: Customer[] = [
  { id: 1, name: 'Ahmed Ali', totalSpent: 2450.0, orderCount: 5, segment: 'Major/VIP' },
  { id: 2, name: 'Sara Khalid', totalSpent: 150.0, orderCount: 1, segment: 'New' },
  { id: 3, name: 'Mohammed Hassan', totalSpent: 850.0, orderCount: 3, segment: 'Regular' },
  { id: 4, name: 'Fatima Noor', totalSpent: 3200.0, orderCount: 8, segment: 'Major/VIP' },
];

const monthlyTrends: OrderInsight[] = [
  { month: 'Jan', revenue: 4200, orders: 45 },
  { month: 'Feb', revenue: 5100, orders: 52 },
  { month: 'Mar', revenue: 3800, orders: 38 },
  { month: 'Apr', revenue: 6400, orders: 65 },
  { month: 'May', revenue: 8900, orders: 85 },
];

const cartAnalysis: CartAnalysis[] = [
  { productA: 'Laptop Stand', productB: 'Wireless Mouse', frequency: 45, relationship: 'Strong (Ergonomics)' },
  { productA: 'ProBook X15', productB: 'Laptop Bag', frequency: 32, relationship: 'Very Strong (Protection)' },
  { productA: '4K Monitor', productB: 'HDMI Cable', frequency: 28, relationship: 'Essential Pair' },
];

const decisions: Decision[] = [
  {
    id: 1,
    type: 'warning',
    title: 'Low Stock Alert: ProBook X15',
    action: 'Reorder immediately. Only 3 units left in inventory.',
  },
  {
    id: 2,
    type: 'info',
    title: 'Pricing Strategy: Wireless Mouse',
    action: "Bundle with 'Laptop Stand' for a 10% discount to clear aging stock.",
  },
  {
    id: 3,
    type: 'success',
    title: 'Targeted Marketing: Major/VIP',
    action: 'Send exclusive early-access emails to high-value customers for the next launch.',
  },
];

export default function AdminDashboard() {
  const [statusMessage, setStatusMessage] = useState('');
  const maxRevenue = Math.max(...monthlyTrends.map((trend) => trend.revenue));

  const handleSaveReports = () => {
    setStatusMessage('Reports saved successfully. Dashboard data has been exported.');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <TopNavbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h1>
            <p className="mt-1 text-base text-slate-600">Data-driven MIS insights for decisions and operational planning.</p>
          </div>
          <button
            onClick={handleSaveReports}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Save Reports
          </button>
        </header>

        {statusMessage ? (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800" role="status" aria-live="polite">
            ✅ {statusMessage}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Purchasing Patterns (Revenue Trend)</h2>
            <div className="mt-4 flex h-64 items-end gap-4">
              {monthlyTrends.map((trend) => {
                const heightPercentage = (trend.revenue / maxRevenue) * 100;
                return (
                  <div key={trend.month} className="group relative flex flex-1 flex-col items-center justify-end">
                    <div className="absolute -top-10 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      ${trend.revenue}
                    </div>
                    <div
                      className="w-full rounded-t-md bg-blue-500 transition-colors duration-300 hover:bg-blue-600"
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    <span className="mt-2 text-xs font-medium text-slate-500">{trend.month}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Decision Support</h2>
            <div className="space-y-4">
              {decisions.map((decision) => (
                <article
                  key={decision.id}
                  className={`rounded-xl border-l-4 p-4 ${
                    decision.type === 'warning'
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : decision.type === 'success'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-blue-500 bg-blue-50 text-blue-900'
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold">{decision.title}</h3>
                  <p className="text-sm opacity-90">{decision.action}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Customer Segmentation</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Total Spent</th>
                    <th className="pb-3 font-semibold">Segment</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-900">{customer.name}</td>
                      <td className="py-3 text-slate-600">${customer.totalSpent.toFixed(2)}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            customer.segment === 'Major/VIP'
                              ? 'bg-purple-100 text-purple-700'
                              : customer.segment === 'New'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {customer.segment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">Shopping Cart Analysis</h2>
            <p className="mb-4 text-sm text-slate-600">
              Product combinations frequently purchased together from order-item relationships.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th className="rounded-tl-lg p-4 font-semibold">Product A</th>
                    <th className="p-4 font-semibold">Product B</th>
                    <th className="p-4 font-semibold">Times Bought Together</th>
                    <th className="rounded-tr-lg p-4 font-semibold">MIS Relationship Insight</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {cartAnalysis.map((analysis, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-900">{analysis.productA}</td>
                      <td className="p-4 font-semibold text-slate-900">{analysis.productB}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${(analysis.frequency / 50) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-semibold text-slate-600">{analysis.frequency}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{analysis.relationship}</td>
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
