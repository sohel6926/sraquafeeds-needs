import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product, Sale } from '../../types';
import { 
  BarChart3, 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  CheckCircle2,
  Plus,
  Box,
  Save,
  Edit2,
  Trash2,
  X
} from 'lucide-react';

export const AdminCRM: React.FC = () => {
  const { products, sales, categories, addCategory, deleteCategory, addSale, updateProduct, addProduct, deleteProduct } = useData();
  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'categories'>('sales');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [sellingPrice, setSellingPrice] = useState<number | ''>('');

  // Inventory Add State
  const [invName, setInvName] = useState('');
  const [invCategory, setInvCategory] = useState<any>('All');
  const [invUnit, setInvUnit] = useState('');
  const [invStock, setInvStock] = useState<number | ''>('');
  const [invCost, setInvCost] = useState<number | ''>('');
  const [invPrice, setInvPrice] = useState<number | ''>('');
  const [editingInventoryId, setEditingInventoryId] = useState<string | null>(null);

  const [selectedProductUnit, setSelectedProductUnit] = useState<string>('Units');

  const STANDARD_UNITS = [
    'kg',
    'Tonnes',
    'Litres',
    'Grams',
    'Units (Pieces)',
    '25 kg Bag',
    '50 kg Bag',
    '10 kg Bag',
    '5 kg Bag',
    '1 kg Zip Foil Pack',
    '25 kg Moisture-Proof Bag',
    '10 kg Bucket',
    '5 kg Bucket',
    '10 kg Drum',
    '1 Litre Bottle',
    '5 Litre Can',
    '1 Litre & 5 Litre Bottles'
  ];
  const [isCustomUnit, setIsCustomUnit] = useState(false);
  const [customUnitValue, setCustomUnitValue] = useState('');

  // Categories Add State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Sales History Filters & Pagination
  const [saleCategoryFilter, setSaleCategoryFilter] = useState('All');
  const [saleProductFilter, setSaleProductFilter] = useState('All');
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage, setSalesPerPage] = useState(10);
  const [selectedSaleProduct, setSelectedSaleProduct] = useState<string | null>(null); // For performance modal

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
        setSelectedProductUnit(prod.packaging || 'Units');
      }
    } else {
      setSellingPrice('');
      setSelectedProductUnit('Units');
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

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalUnit = isCustomUnit ? customUnitValue.trim() : invUnit.trim();

    if (!invName.trim() || !finalUnit || invStock === '' || invCost === '' || invPrice === '') {
      alert('Please fill out all fields for the new product.');
      return;
    }

    if (editingInventoryId) {
      const existingProduct = products.find(p => p.id === editingInventoryId);
      if (existingProduct) {
        const updatedProduct: Product = {
          ...existingProduct,
          name: invName.trim(),
          category: invCategory,
          packaging: finalUnit,
          stock: Number(invStock),
          costPrice: Number(invCost),
          sellingPrice: Number(invPrice),
        };
        await updateProduct(updatedProduct);
        showToast(`${invName} updated successfully!`);
      }
    } else {
      const newProd: Omit<Product, 'id'> = {
        name: invName.trim(),
        category: invCategory,
        tagline: 'Standard Inventory Item',
        description: 'Added via Quick Inventory',
        packaging: finalUnit,
        keyBenefits: [],
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        stock: Number(invStock),
        costPrice: Number(invCost),
        sellingPrice: Number(invPrice),
        isPopular: false,
        curiosityHighlight: '',
        composition: [],
        specs: [],
        dosageSchedule: [],
        idealWaterParams: []
      };
      await addProduct(newProd);
      showToast(`${invName} added to inventory successfully!`);
    }
    
    resetInventoryForm();
  };

  const resetInventoryForm = () => {
    setEditingInventoryId(null);
    setInvName('');
    setInvUnit('');
    setIsCustomUnit(false);
    setCustomUnitValue('');
    setInvStock('');
    setInvCost('');
    setInvPrice('');
    setInvCategory('All');
  };

  const handleEditInventory = (p: Product) => {
    setEditingInventoryId(p.id);
    setInvName(p.name);
    setInvCategory(p.category);
    
    const unit = p.packaging || '';
    if (unit && !STANDARD_UNITS.includes(unit)) {
      setInvUnit('Other');
      setIsCustomUnit(true);
      setCustomUnitValue(unit);
    } else {
      setInvUnit(unit);
      setIsCustomUnit(false);
      setCustomUnitValue('');
    }

    setInvStock(p.stock !== undefined ? p.stock : '');
    setInvCost(p.costPrice !== undefined ? p.costPrice : '');
    setInvPrice(p.sellingPrice !== undefined ? p.sellingPrice : '');
    setActiveTab('inventory');
  };

  const handleDeleteInventory = async (p: Product) => {
    if (confirm(`Are you sure you want to delete "${p.name}"? This will completely remove it from the database.`)) {
      await deleteProduct(p.id);
      showToast(`${p.name} deleted successfully.`);
      if (editingInventoryId === p.id) {
        resetInventoryForm();
      }
    }
  };

  const handleAddCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    // Check if category already exists
    if (categories.some(c => c.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
      alert('Category already exists!');
      return;
    }

    await addCategory({ name: newCategoryName.trim() });
    showToast(`Category "${newCategoryName}" added successfully.`);
    setNewCategoryName('');
  };

  const handleDeleteCategorySubmit = async (id: string, name: string) => {
    if (confirm(`Delete category "${name}"? This cannot be undone.`)) {
      await deleteCategory(id);
      showToast(`Category deleted.`);
    }
  };

  // Compute CRM metrics
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const totalItemsSold = sales.reduce((sum, s) => sum + s.quantity, 0);
  const currentStockTotal = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Derived filtered sales
  const filteredSales = sales.filter(s => {
    if (saleProductFilter !== 'All' && s.productId !== saleProductFilter) return false;
    
    // If category filter is active, find the product and check its category
    if (saleCategoryFilter !== 'All') {
      const prod = products.find(p => p.id === s.productId);
      if (!prod || prod.category !== saleCategoryFilter) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredSales.length / salesPerPage);
  const currentSales = filteredSales.slice((salesPage - 1) * salesPerPage, salesPage * salesPerPage);

  // Product performance stats
  const selectedProductStats = selectedSaleProduct ? products.find(p => p.id === selectedSaleProduct) : null;
  const selectedProductSales = selectedSaleProduct ? sales.filter(s => s.productId === selectedSaleProduct) : [];
  const selectedProductTotalRevenue = selectedProductSales.reduce((sum, s) => sum + s.totalAmount, 0);
  const selectedProductTotalProfit = selectedProductSales.reduce((sum, s) => sum + s.profit, 0);
  const selectedProductTotalSold = selectedProductSales.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="space-y-6 max-w-5xl w-full relative">
      {/* Product Performance Modal */}
      {selectedSaleProduct && selectedProductStats && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">{selectedProductStats.name} Performance</h3>
                <p className="text-xs text-slate-500 mt-1">Detailed sales history and profitability</p>
              </div>
              <button 
                onClick={() => setSelectedSaleProduct(null)}
                className="p-2 bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 grid grid-cols-3 gap-4 border-b border-slate-100 bg-slate-50">
              <div className="p-4 bg-white rounded-lg shadow-2xs border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Total Units Sold</div>
                <div className="text-xl font-black text-slate-900 mt-1">{selectedProductTotalSold}</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-2xs border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Total Revenue</div>
                <div className="text-xl font-black text-slate-900 mt-1">₹{selectedProductTotalRevenue.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-2xs border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Total Profit</div>
                <div className="text-xl font-black text-emerald-600 mt-1">₹{selectedProductTotalProfit.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
              {selectedProductSales.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">No sales for this product yet.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3 text-right">Qty</th>
                      <th className="px-4 py-3 text-right">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedProductSales.map(s => (
                      <tr key={s.id} className="text-xs text-slate-800">
                        <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                          {new Date(s.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 font-semibold">{s.customerName}</td>
                        <td className="px-4 py-3 text-right">{s.quantity}</td>
                        <td className="px-4 py-3 text-right font-bold text-emerald-600">₹{s.profit.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Inventory & CRM</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage stock, record sales, and quick-add inventory.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'sales'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sales Desk
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'inventory'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Manage Inventory
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Categories
          </button>
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

      {activeTab === 'sales' && (
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
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Quantity
                </label>
                <div className="flex items-center">
                  <input 
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    placeholder={`e.g. 10`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 border-r-0 rounded-l-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:z-10 relative"
                  />
                  <div className="bg-slate-100 border border-slate-200 border-l-0 px-3 py-2 rounded-r-lg text-xs font-semibold text-slate-500 whitespace-nowrap min-w-[60px] text-center shadow-sm h-full flex items-center shrink-0">
                    {selectedProductUnit || 'Units'}
                  </div>
                </div>
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
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-slate-900">Sales History</h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">{filteredSales.length}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={saleCategoryFilter}
                onChange={(e) => {
                  setSaleCategoryFilter(e.target.value);
                  setSalesPage(1);
                }}
                className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
              >
                <option value="All">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <select
                value={saleProductFilter}
                onChange={(e) => {
                  setSaleProductFilter(e.target.value);
                  setSalesPage(1);
                }}
                className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 max-w-[150px]"
              >
                <option value="All">All Products</option>
                {products
                  .filter(p => saleCategoryFilter === 'All' || p.category === saleCategoryFilter)
                  .map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-auto max-h-[400px]">
            {currentSales.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No sales match your filters.
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
                  {currentSales.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors text-xs text-slate-800">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {new Date(s.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 font-semibold">{s.customerName}</td>
                      <td 
                        className="px-4 py-3 truncate max-w-[150px] cursor-pointer hover:text-emerald-600 transition-colors font-semibold" 
                        title="Click to view product performance"
                        onClick={() => setSelectedSaleProduct(s.productId)}
                      >
                        {s.productName}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{s.quantity}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">₹{s.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">₹{s.profit.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredSales.length > 0 && (
            <div className="p-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Rows per page:</span>
                <select 
                  value={salesPerPage} 
                  onChange={e => {
                    setSalesPerPage(Number(e.target.value));
                    setSalesPage(1);
                  }}
                  className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Page {salesPage} of {totalPages}
                </span>
                <div className="flex gap-1">
                  <button 
                    disabled={salesPage === 1}
                    onClick={() => setSalesPage(p => p - 1)}
                    className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-100 text-xs font-bold"
                  >
                    Prev
                  </button>
                  <button 
                    disabled={salesPage === totalPages}
                    onClick={() => setSalesPage(p => p + 1)}
                    className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-100 text-xs font-bold"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Add Form */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 self-start">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4 justify-between">
              <div className="flex items-center gap-2">
                {editingInventoryId ? <Edit2 className="w-4 h-4 text-sky-600" /> : <Box className="w-4 h-4 text-emerald-600" />}
                <h3 className="font-extrabold text-sm text-slate-900">
                  {editingInventoryId ? 'Edit Inventory Item' : 'Quick Add Item'}
                </h3>
              </div>
              {editingInventoryId && (
                <button 
                  type="button" 
                  onClick={resetInventoryForm}
                  className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Cancel Edit"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <form onSubmit={handleAddInventory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Product Name</label>
                <input 
                  type="text"
                  value={invName}
                  onChange={e => setInvName(e.target.value)}
                  placeholder="e.g. Urea, Raw Salt"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                <select 
                  value={invCategory}
                  onChange={e => setInvCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">General (All)</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unit Metric</label>
                <select
                  value={invUnit}
                  onChange={e => {
                    const val = e.target.value;
                    setInvUnit(val);
                    setIsCustomUnit(val === 'Other');
                    if (val !== 'Other') setCustomUnitValue('');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 mb-2"
                >
                  <option value="">-- Select Unit Metric --</option>
                  {STANDARD_UNITS.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                  <option value="Other">Other (Custom)</option>
                </select>

                {isCustomUnit && (
                  <input 
                    type="text"
                    value={customUnitValue}
                    onChange={e => setCustomUnitValue(e.target.value)}
                    placeholder="Type custom unit (e.g. 15 kg Box)"
                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-sm"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Initial Stock</label>
                  <input 
                    type="number"
                    value={invStock}
                    onChange={e => setInvStock(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Buy Price (Cost) ₹
                  </label>
                  <input 
                    type="number"
                    value={invCost}
                    onChange={e => setInvCost(Number(e.target.value))}
                    placeholder="0.00"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Customer Price (Sale) ₹
                  </label>
                  <input 
                    type="number"
                    value={invPrice}
                    onChange={e => setInvPrice(Number(e.target.value))}
                    placeholder="0.00"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className={`w-full py-2.5 rounded-lg text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 ${
                  editingInventoryId ? 'bg-sky-600 hover:bg-sky-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {editingInventoryId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingInventoryId ? 'Update Inventory Item' : 'Add to Inventory'}</span>
              </button>
            </form>
          </div>

          {/* Current Inventory Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Current Stock Levels</h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">{products.length} Items</span>
            </div>

            <div className="flex-1 overflow-auto max-h-[600px]">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 sticky top-0">
                    <th className="px-4 py-3">Product / Unit</th>
                    <th className="px-4 py-3 text-right">Stock</th>
                    <th className="px-4 py-3 text-right">Cost (₹)</th>
                    <th className="px-4 py-3 text-right">Price (₹)</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(p => (
                    <tr key={p.id} className={`hover:bg-slate-50 transition-colors text-xs text-slate-800 ${editingInventoryId === p.id ? 'bg-sky-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-500">{p.packaging}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`px-2 py-1 rounded font-bold ${
                          (p.stock || 0) <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {p.stock || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-600">
                        {p.costPrice || 0}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                        {p.sellingPrice || 0}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditInventory(p)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                            title="Edit Item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteInventory(p)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 self-start">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <Plus className="w-4 h-4 text-emerald-600" />
              <h3 className="font-extrabold text-sm text-slate-900">Add New Category</h3>
            </div>
            
            <form onSubmit={handleAddCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category Name</label>
                <input 
                  type="text"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Chemicals, Testing Kits"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Create Category
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Existing Categories</h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">{categories.length} Categories</span>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-emerald-500 transition-colors bg-slate-50">
                    <span className="font-bold text-sm text-slate-900">{c.name}</span>
                    <button 
                      onClick={() => handleDeleteCategorySubmit(c.id, c.name)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
