import React, { useState, useRef } from 'react';
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
  X,
  FileText,
  Printer
} from 'lucide-react';

import { STANDARD_UNITS, sanitizeProductUnit } from '../../utils/units';
import { t } from '../../utils/translations';

export const AdminCRM: React.FC = () => {
  const { products, sales, categories, addCategory, deleteCategory, addSale, updateSale, deleteSale, updateProduct, addProduct, deleteProduct, siteSettings } = useData();
  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'categories'>('sales');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTelugu, setIsTelugu] = useState(false);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [sellingPrice, setSellingPrice] = useState<number | ''>('');
  const [selectedProductUnit, setSelectedProductUnit] = useState<string>('Units');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Credit'>('Paid');
  const [amountPaid, setAmountPaid] = useState<number | ''>('');
  
  // Sale Edit & Invoice State
  const [editingSaleId, setEditingSaleId] = useState<string | null>(null);
  const [invoiceSale, setInvoiceSale] = useState<Sale | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Inventory Add State
  const [invName, setInvName] = useState('');
  const [invCategory, setInvCategory] = useState<any>('All');
  const [invUnit, setInvUnit] = useState('');
  const [invStock, setInvStock] = useState<number | ''>('');
  const [invCost, setInvCost] = useState<number | ''>('');
  const [invPrice, setInvPrice] = useState<number | ''>('');
  const [editingInventoryId, setEditingInventoryId] = useState<string | null>(null);

  const [isCustomUnit, setIsCustomUnit] = useState(false);
  const [customUnitValue, setCustomUnitValue] = useState('');

  // Categories Add State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Sales History Filters & Pagination
  const [saleCategoryFilter, setSaleCategoryFilter] = useState('All');
  const [saleProductFilter, setSaleProductFilter] = useState('All');
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage, setSalesPerPage] = useState(10);
  const [selectedCustomerName, setSelectedCustomerName] = useState<string | null>(null); // For performance modal

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
        setSelectedProductUnit(sanitizeProductUnit(prod.packaging));
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

    let stockDifference = qty;

    if (editingSaleId) {
      const existingSale = sales.find(s => s.id === editingSaleId);
      if (existingSale) {
        // If product changed or qty changed, adjust stock difference
        if (existingSale.productId === product.id) {
          stockDifference = qty - existingSale.quantity;
        } else {
          // If product changed, we need to restore old product stock, and deduct from new
          const oldProduct = products.find(p => p.id === existingSale.productId);
          if (oldProduct) {
             await updateProduct({ ...oldProduct, stock: (oldProduct.stock || 0) + existingSale.quantity });
          }
          stockDifference = qty;
        }
      }
    }

    if ((product.stock || 0) < stockDifference) {
      if (!confirm(`Warning: You only have ${product.stock || 0} in stock. Do you want to proceed and have negative stock?`)) {
        return;
      }
    }

    const price = Number(sellingPrice);
    const totalAmount = qty * price;
    const cost = (product.costPrice || 0);
    const profit = (price - cost) * qty;

    const paid = paymentStatus === 'Paid' ? totalAmount : Number(amountPaid);
    const balance = totalAmount - paid;

    if (editingSaleId) {
      const existingSale = sales.find(s => s.id === editingSaleId);
      if (existingSale) {
        const updatedSale: Sale = {
          ...existingSale,
          customerName: customerName.trim(),
          productId: product.id,
          productName: product.name,
          productCategory: product.category,
          quantity: qty,
          sellingPrice: price,
          totalAmount,
          profit,
          amountPaid: paid,
          balance,
          paymentStatus,
        };
        await updateSale(updatedSale);
        showToast('Sale updated successfully!');
      }
    } else {
      // Create Sale
      const newSale: Omit<Sale, 'id'> = {
        customerName: customerName.trim(),
        productId: product.id,
        productName: product.name,
        productCategory: product.category,
        quantity: qty,
        sellingPrice: price,
        totalAmount,
        profit,
        amountPaid: paid,
        balance,
        paymentStatus,
        date: new Date().toISOString()
      };
      await addSale(newSale);
      showToast('Sale recorded successfully!');
    }

    // Adjust stock from product
    const updatedProduct = {
      ...product,
      stock: (product.stock || 0) - stockDifference
    };
    await updateProduct(updatedProduct);

    // Reset form
    setCustomerName('');
    setQuantity('');
    setSelectedProductId('');
    setSellingPrice('');
    setSelectedProductUnit('Units');
    setPaymentStatus('Paid');
    setAmountPaid('');
    setEditingSaleId(null);
  };

  const handleEditSale = (sale: Sale) => {
    setEditingSaleId(sale.id);
    setCustomerName(sale.customerName);
    setSelectedProductId(sale.productId);
    setQuantity(sale.quantity);
    setSellingPrice(sale.sellingPrice);
    setPaymentStatus(sale.paymentStatus || 'Paid');
    setAmountPaid(sale.amountPaid || '');
    
    const prod = products.find(p => p.id === sale.productId);
    if (prod) {
      setSelectedProductUnit(sanitizeProductUnit(prod.packaging));
    }
  };

  const handleDeleteSale = async (sale: Sale) => {
    if (confirm(`Are you sure you want to delete this sale for ${sale.customerName}?`)) {
      if (confirm(`Do you want to restore the stock (${sale.quantity} units) to "${sale.productName}"?`)) {
        const prod = products.find(p => p.id === sale.productId);
        if (prod) {
          await updateProduct({ ...prod, stock: (prod.stock || 0) + sale.quantity });
        }
      }
      await deleteSale(sale.id);
      showToast('Sale deleted successfully!');
      if (editingSaleId === sale.id) {
        setEditingSaleId(null);
        setCustomerName('');
        setQuantity('');
        setSelectedProductId('');
        setSellingPrice('');
        setSelectedProductUnit('Units');
      }
    }
  };

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault();

    const rawUnit = isCustomUnit ? customUnitValue.trim() : invUnit.trim();
    const finalUnit = sanitizeProductUnit(rawUnit);

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
    
    const unit = sanitizeProductUnit(p.packaging);
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

  return (
    <div className="space-y-6 max-w-5xl w-full relative">

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
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900">{isTelugu ? 'నిల్వ & CRM' : 'Inventory & CRM'}</h2>
              <button
                onClick={() => setIsTelugu(!isTelugu)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-200 transition-colors"
                title="Toggle Telugu Language"
              >
                {isTelugu ? 'English' : 'తెలుగు'}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isTelugu ? 'స్టాక్ నిర్వహణ, విక్రయాల నమోదు మరియు త్వరిత చేర్పులు.' : 'Manage stock, record sales, and quick-add inventory.'}
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
            {t("Sales Desk", isTelugu)}
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'inventory'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t("Manage Inventory", isTelugu)}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t("Categories", isTelugu)}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Total Sales Revenue", isTelugu)}</span>
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Total Profit", isTelugu)}</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">₹{totalProfit.toLocaleString('en-IN')}</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-4 h-4 text-sky-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Items Sold", isTelugu)}</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalItemsSold.toLocaleString('en-IN')} Units</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-amber-600" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t("Total Stock Units", isTelugu)}</span>
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
            <h3 className="font-extrabold text-sm text-slate-900">{t("Record New Sale", isTelugu)}</h3>
          </div>
          
          <form onSubmit={handleRecordSale} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t("Select Product", isTelugu)}</label>
              <select 
                value={selectedProductId}
                onChange={handleProductSelect}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="">{t("-- Choose Product --", isTelugu)}</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.stock || 0})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t("Customer Name", isTelugu)}</label>
              <input 
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder={t("e.g. Ramesh Reddy", isTelugu)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t("Quantity", isTelugu)} ({selectedProductUnit})
                </label>
                <input 
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  placeholder={t("e.g. 10", isTelugu)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t("Price per", isTelugu)} {selectedProductUnit} (₹)</label>
                <input 
                  type="number"
                  value={sellingPrice}
                  onChange={e => setSellingPrice(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t("Payment Status", isTelugu)}</label>
                <select
                  value={paymentStatus}
                  onChange={e => setPaymentStatus(e.target.value as 'Paid' | 'Credit')}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="Paid">{t("Paid Full", isTelugu)}</option>
                  <option value="Credit">{t("Credit / Partial", isTelugu)}</option>
                </select>
              </div>
              {paymentStatus === 'Credit' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">{t("Amount Paid Now (₹)", isTelugu)}</label>
                  <input
                    type="number"
                    value={amountPaid}
                    onChange={e => setAmountPaid(Number(e.target.value))}
                    placeholder="0.00"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              )}
            </div>

            {editingSaleId && (
              <button 
                type="button"
                onClick={() => {
                  setEditingSaleId(null);
                  setCustomerName('');
                  setQuantity('');
                  setSelectedProductId('');
                  setSellingPrice('');
                  setSelectedProductUnit('Units');
                }}
                className="w-full py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                <X className="w-4 h-4" />
                <span>{t("Cancel Edit", isTelugu)}</span>
              </button>
            )}

            <button 
              type="submit"
              className={`w-full py-2.5 rounded-lg text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 ${editingSaleId ? 'bg-sky-600 hover:bg-sky-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              {editingSaleId ? <Save className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{editingSaleId ? t("Update Sale", isTelugu) : t("Record Sale", isTelugu)}</span>
            </button>
          </form>
        </div>

        {/* Sales History List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-slate-900">{t("Sales History", isTelugu)}</h3>
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
                <option value="All">{t("All Categories", isTelugu)}</option>
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
                <option value="All">{t("All Products", isTelugu)}</option>
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
                    <th className="px-4 py-3">{t("Date", isTelugu)}</th>
                    <th className="px-4 py-3">{t("Customer", isTelugu)}</th>
                    <th className="px-4 py-3">{t("Category", isTelugu)}</th>
                    <th className="px-4 py-3">{t("Product", isTelugu)}</th>
                    <th className="px-4 py-3 text-right">{t("Qty", isTelugu)}</th>
                    <th className="px-4 py-3 text-right">{t("Total (₹)", isTelugu)}</th>
                    <th className="px-4 py-3 text-right">{t("Paid (₹)", isTelugu)}</th>
                    <th className="px-4 py-3 text-right">{t("Debt (₹)", isTelugu)}</th>
                    <th className="px-4 py-3 text-right">{t("Profit (₹)", isTelugu)}</th>
                    <th className="px-4 py-3 text-center">{t("Actions", isTelugu)}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentSales.map(s => (
                    <tr key={s.id} className={`hover:bg-slate-50 transition-colors text-xs text-slate-800 ${editingSaleId === s.id ? 'bg-sky-50' : ''}`}>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        <div className="font-semibold text-slate-700">{new Date(s.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                        <div className="text-[10px] text-slate-400">{new Date(s.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td 
                        className="px-4 py-3 font-semibold text-emerald-700 cursor-pointer hover:underline"
                        title="Click to view customer details"
                        onClick={() => setSelectedCustomerName(s.customerName)}
                      >
                        {s.customerName}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {s.productCategory || products.find(p => p.id === s.productId)?.category || '-'}
                      </td>
                      <td className="px-4 py-3 truncate max-w-[150px] font-semibold text-slate-700">
                        {s.productName}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{s.quantity}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900">₹{s.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right font-bold text-sky-600">
                        ₹{s.amountPaid?.toLocaleString('en-IN') || s.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-red-500">
                        {s.balance > 0 ? `₹${s.balance.toLocaleString('en-IN')}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">₹{s.profit.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setInvoiceSale(s)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Generate Invoice"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleEditSale(s)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                            title="Edit Sale"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSale(s)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Sale"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Initial Stock ({isCustomUnit ? customUnitValue || 'Units' : invUnit || 'Units'})</label>
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
                    Cost per {isCustomUnit ? customUnitValue || 'Unit' : invUnit || 'Unit'} (₹)
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
                    Sell per {isCustomUnit ? customUnitValue || 'Unit' : invUnit || 'Unit'} (₹)
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
                    <th className="px-4 py-3">Category</th>
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
                      <td className="px-4 py-3 text-slate-600">
                        {p.category || 'General (All)'}
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

      {/* Invoice Modal */}
      {invoiceSale && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto flex flex-col print:shadow-none print:max-h-none">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between no-print sticky top-0 bg-white z-10">
              <h3 className="font-extrabold text-lg text-slate-900">Invoice Generation</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setTimeout(() => window.print(), 100);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print Invoice
                </button>
                <button
                  onClick={() => setInvoiceSale(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Area */}
            <div className="p-8 print-only bg-white text-black" ref={invoiceRef}>
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-6 mb-6">
                <div>
                  <h1 className="text-3xl font-black text-emerald-700 mb-1">{siteSettings?.name || 'SR AQUA FEEDS AND NEEDS'}</h1>
                  <p className="text-sm font-medium text-slate-600">{siteSettings?.address || 'K.G. Road, Pedapulleru, AP'}</p>
                  <p className="text-sm font-medium text-slate-600">{siteSettings?.phone ? `Ph: ${siteSettings.phone}` : 'Ph: +91 XXXXX XXXXX'}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-black text-slate-200 uppercase tracking-wider">Invoice</h2>
                  <p className="text-sm font-bold mt-2 text-slate-700">Date: {new Date(invoiceSale.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  <p className="text-sm font-bold text-slate-700">Time: {new Date(invoiceSale.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-sm font-bold text-slate-500 mt-1">Invoice #: INV-{new Date(invoiceSale.date).getTime().toString().slice(-6)}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</h3>
                <p className="text-lg font-bold text-slate-900">{invoiceSale.customerName}</p>
              </div>

              <table className="w-full text-left border-collapse mb-8">
                <thead>
                  <tr className="bg-slate-100 text-sm font-bold text-slate-700 uppercase">
                    <th className="px-4 py-3 border border-slate-200 rounded-tl-lg">Description</th>
                    <th className="px-4 py-3 border border-slate-200 text-right">Qty</th>
                    <th className="px-4 py-3 border border-slate-200 text-right">Rate (₹)</th>
                    <th className="px-4 py-3 border border-slate-200 text-right rounded-tr-lg">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm font-medium text-slate-800">
                    <td className="px-4 py-4 border border-slate-200">{invoiceSale.productName}</td>
                    <td className="px-4 py-4 border border-slate-200 text-right">{invoiceSale.quantity}</td>
                    <td className="px-4 py-4 border border-slate-200 text-right">{invoiceSale.sellingPrice.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4 border border-slate-200 text-right font-bold">{invoiceSale.totalAmount.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end mb-12">
                <div className="w-64">
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-bold text-slate-600">Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{invoiceSale.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-lg">
                    <span className="font-black text-slate-900">Total:</span>
                    <span className="font-black text-emerald-600">₹{invoiceSale.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-slate-200">
                <p className="font-bold text-slate-800 mb-1">Thank you for your business!</p>
                <p className="text-xs font-medium text-slate-500">For inquiries, please contact us.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Performance Modal */}
      {selectedCustomerName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">{selectedCustomerName} - Profile</h3>
                <p className="text-xs font-semibold text-slate-500">Customer purchase history and financial summary</p>
              </div>
              <button 
                onClick={() => setSelectedCustomerName(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto bg-slate-50 flex-1">
              {(() => {
                const customerSales = sales.filter(s => s.customerName === selectedCustomerName).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const totalPurchases = customerSales.reduce((acc, s) => acc + s.totalAmount, 0);
                const totalPaid = customerSales.reduce((acc, s) => acc + (s.amountPaid !== undefined ? s.amountPaid : s.totalAmount), 0);
                const totalDebt = customerSales.reduce((acc, s) => acc + (s.balance || 0), 0);
                const totalProfit = customerSales.reduce((acc, s) => acc + s.profit, 0);

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Purchases</div>
                        <div className="text-xl font-black text-slate-900">₹{totalPurchases.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Total Paid</div>
                        <div className="text-xl font-black text-emerald-600">₹{totalPaid.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-red-500 uppercase mb-1">Total Debt (Pending)</div>
                        <div className="text-xl font-black text-red-500">₹{totalDebt.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-sky-600 uppercase mb-1">Generated Profit</div>
                        <div className="text-xl font-black text-sky-600">₹{totalProfit.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3 text-right">Qty</th>
                            <th className="px-4 py-3 text-right">Total (₹)</th>
                            <th className="px-4 py-3 text-right">Paid (₹)</th>
                            <th className="px-4 py-3 text-right">Debt (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {customerSales.map(s => (
                            <tr key={s.id} className="text-xs font-semibold text-slate-700 hover:bg-slate-50">
                              <td className="px-4 py-3 text-slate-500">{new Date(s.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                              <td className="px-4 py-3">{s.productName}</td>
                              <td className="px-4 py-3 text-right">{s.quantity}</td>
                              <td className="px-4 py-3 text-right text-slate-900">₹{s.totalAmount.toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3 text-right text-emerald-600">₹{(s.amountPaid !== undefined ? s.amountPaid : s.totalAmount).toLocaleString('en-IN')}</td>
                              <td className="px-4 py-3 text-right text-red-500">{s.balance > 0 ? `₹${s.balance.toLocaleString('en-IN')}` : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
