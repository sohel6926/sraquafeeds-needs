import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product, Sale } from '../../types';
import { 
  BarChart3, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Search,
  CheckCircle2,
  Plus
} from 'lucide-react';

export const AdminCRM: React.FC = () => {
  const { products, sales, addSale, updateProduct } = useData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [sellingPrice, setSellingPrice] = useState<number | ''>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    setSelectedProductId(pId);
    
    if (pId) {
      const prod = products.find(p => p.id === pId);
      if (prod) {
        setSellingPrice(prod.sellingPrice || 0);
      }
    } else {
      setSellingPrice('');
    }
  };

  const handleRecordSale = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId || !customerName.trim() || !quantity || !sellingPrice) {
      alert('Please fill out all fields.');
      return;
    }

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    const qty = Number(quantity);
    if (qty <= 0) {
      alert('Quantity must be greater than 0.');
      return;
    }

    if ((product.stock || 0) < qty) {
      if (!confirm(`Warning: You only have ${product.stock || 0} in stock. Do you want to proceed and have negative stock?`)) {
        return;
      }
    }

    const price = Number(sellingPrice);
    const totalAmount = qty * price;
    const cost = (product.costPrice || 0);
    const profit = (price - cost) * qty;

    // Create Sale
    const newSale: Omit<Sale, 'id'> = {
      customerName: customerName.trim(),
      productId: product.id,
      productName: product.name,
      quantity: qty,
      sellingPrice: price,
      totalAmount,
      profit,
      date: new Date().toISOString()
    };

    await addSale(newSale);

    // Deduct stock from product
    const updatedProduct = {
      ...product,
      stock: (product.stock || 0) - qty
    };
    await updateProduct(updatedProduct);

    showToast('Sale recorded successfully!');

    // Reset form
    setCustomerName('');
    setQuantity('');
    setSelectedProductId('');
    setSellingPrice('');
  };

  // Compute CRM metrics
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const totalItemsSold = sales.reduce((sum, s) => sum + s.quantity, 0);
  const currentStockTotal = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  return (
    <div className="space-y-6 max-w-5xl w-full">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">Inventory & CRM</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage stock, record sales, and track profit margins automatically.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Sales Revenue</span>
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Profit</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">₹{totalProfit.toLocaleString('en-IN')}</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-4 h-4 text-sky-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Items Sold</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalItemsSold.toLocaleString('en-IN')} Units</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-amber-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Stock Units</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{currentStockTotal.toLocaleString('en-IN')} Units</div>
        </div>
      </div>

      {/* Record Sale & Current Stock Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Record Sale Form */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <Plus className="w-4 h-4 text-emerald-600" />
            <h3 className="font-extrabold text-sm text-slate-900">Record New Sale</h3>
          </div>
          
          <form onSubmit={handleRecordSale} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Product</label>
              <select 
                value={selectedProductId}
                onChange={handleProductSelect}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="">-- Choose Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.stock || 0})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Customer Name</label>
              <input 
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Reddy"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quantity (Units)</label>
                <input 
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unit Price (₹)</label>
                <input 
                  type="number"
                  value={sellingPrice}
                  onChange={e => setSellingPrice(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Sale</span>
            </button>
          </form>
        </div>

        {/* Sales History List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900">Recent Sales History</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">{sales.length} Records</span>
          </div>

          <div className="flex-1 overflow-auto max-h-[400px]">
            {sales.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No sales recorded yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-right">Qty</th>
                    <th className="px-4 py-3 text-right">Total (₹)</th>
                    <th className="px-4 py-3 text-right">Profit (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sales.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors text-xs text-slate-800">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {new Date(s.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 font-semibold">{s.customerName}</td>
                      <td className="px-4 py-3 truncate max-w-[150px]" title={s.productName}>{s.productName}</td>
                      <td className="px-4 py-3 text-right font-medium">{s.quantity}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">₹{s.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">₹{s.profit.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
