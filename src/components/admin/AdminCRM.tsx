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
  Printer,
  Download,
  CreditCard,
  Clock,
  Phone,
  MapPin,
  User,
  History,
  AlertCircle
} from 'lucide-react';

import { STANDARD_UNITS, sanitizeProductUnit } from '../../utils/units';
import { t } from '../../utils/translations';
import { jsPDF } from 'jspdf';


export const AdminCRM: React.FC = () => {
  const { 
    products, 
    sales, 
    customers,
    customerPayments,
    addCustomerPayment,
    deleteCustomerPayment,
    categories, 
    addCategory, 
    deleteCategory, 
    addSale, 
    updateSale, 
    deleteSale, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    siteSettings 
  } = useData();
  const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'categories'>('sales');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTelugu, setIsTelugu] = useState(false);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [sellingPrice, setSellingPrice] = useState<number | ''>('');
  const [selectedProductUnit, setSelectedProductUnit] = useState<string>('Units');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Credit' | 'Partial'>('Paid');

  const [amountPaid, setAmountPaid] = useState<number | ''>('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showCustomerSuggestions, setShowCustomerSuggestions] = useState(false);
  
  // Sale Edit & Invoice State
  const [editingSaleId, setEditingSaleId] = useState<string | null>(null);
  const [invoiceSale, setInvoiceSale] = useState<Sale | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Customer Debt Repayment State
  const [repaymentAmount, setRepaymentAmount] = useState<number | ''>('');
  const [repaymentMode, setRepaymentMode] = useState<string>('Cash');
  const [repaymentDate, setRepaymentDate] = useState<string>('');
  const [repaymentNotes, setRepaymentNotes] = useState<string>('');
  const [customerLedgerTab, setCustomerLedgerTab] = useState<'all' | 'sales' | 'payments'>('all');

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
  const [repaymentSaleId, setRepaymentSaleId] = useState<string>('all'); // For selecting specific product debt

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

  // Matching customers for autocomplete
  const customerSuggestions = customerName.trim().length > 0
    ? customers.filter(c => c.name.toLowerCase().includes(customerName.trim().toLowerCase()))
    : [];

  const handleSelectCustomer = (c: { name: string; phone?: string; address?: string }) => {
    setCustomerName(c.name);
    // Find phone & address: check customer object first, fallback to any past sales for this customer
    const pastSale = sales.find(s => s.customerName.trim().toLowerCase() === c.name.trim().toLowerCase() && (s.customerPhone || s.customerAddress));
    const phone = c.phone || pastSale?.customerPhone || '';
    const address = c.address || pastSale?.customerAddress || '';
    setCustomerPhone(phone);
    setCustomerAddress(address);
    setShowCustomerSuggestions(false);
  };

  // Helper to compute individual customer financial ledger & stats
  const getCustomerFinancials = (custName: string) => {
    const cSales = sales
      .filter(s => s.customerName.trim().toLowerCase() === custName.trim().toLowerCase())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const cPayments = (customerPayments || [])
      .filter(p => p.customerName.trim().toLowerCase() === custName.trim().toLowerCase())
      .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

    const totalPurchases = cSales.reduce((acc, s) => acc + s.totalAmount, 0);
    const initialPaidOnSales = cSales.reduce((acc, s) => acc + (s.amountPaid !== undefined ? s.amountPaid : s.totalAmount), 0);
    const totalRepayments = cPayments.reduce((acc, p) => acc + (p.amount || 0), 0);
    const totalPaid = initialPaidOnSales + totalRepayments;
    const totalDebt = Math.max(0, totalPurchases - totalPaid);
    const totalProfit = cSales.reduce((acc, s) => acc + s.profit, 0);

    return {
      cSales,
      cPayments,
      totalPurchases,
      totalPaid,
      totalDebt,
      totalProfit,
    };
  };

  const handleRecordDebtPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerName) return;
    const amt = Number(repaymentAmount);
    if (!amt || amt <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    const pDate = repaymentDate ? new Date(repaymentDate).toISOString() : new Date().toISOString();
    const pMode = repaymentMode || 'Cash';
    const pNotes = repaymentNotes.trim() || undefined;

    // Check if admin selected a specific product credit purchase
    if (repaymentSaleId && repaymentSaleId !== 'all') {
      const targetSale = sales.find(s => s.id === repaymentSaleId);
      if (targetSale) {
        const newPaid = (targetSale.amountPaid || 0) + amt;
        const newBal = Math.max(0, targetSale.totalAmount - newPaid);
        const newStatus = newBal === 0 ? 'Paid' : 'Partial';

        await updateSale({
          ...targetSale,
          amountPaid: newPaid,
          balance: newBal,
          paymentStatus: newStatus,
        });

        await addCustomerPayment({
          customerName: selectedCustomerName,
          amount: amt,
          paymentDate: pDate,
          paymentMode: pMode,
          saleId: targetSale.id,
          productName: targetSale.productName,
          notes: pNotes,
        });

        showToast(`Payment of ₹${amt.toLocaleString('en-IN')} applied to ${targetSale.productName}!`);
      }
    } else {
      // General payment: distribute across pending credit sales FIFO
      let remainingToApply = amt;
      const pendingSales = sales
        .filter(s => s.customerName.trim().toLowerCase() === selectedCustomerName.trim().toLowerCase() && (s.balance || 0) > 0)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      for (const s of pendingSales) {
        if (remainingToApply <= 0) break;
        const currDebt = s.balance || 0;
        const payForThis = Math.min(remainingToApply, currDebt);
        const newPaid = (s.amountPaid || 0) + payForThis;
        const newBal = Math.max(0, s.totalAmount - newPaid);

        await updateSale({
          ...s,
          amountPaid: newPaid,
          balance: newBal,
          paymentStatus: newBal === 0 ? 'Paid' : 'Partial',
        });
        remainingToApply -= payForThis;
      }

      await addCustomerPayment({
        customerName: selectedCustomerName,
        amount: amt,
        paymentDate: pDate,
        paymentMode: pMode,
        notes: pNotes || 'General Account Repayment',
      });

      showToast(`Payment of ₹${amt.toLocaleString('en-IN')} recorded for ${selectedCustomerName}!`);
    }

    setRepaymentAmount('');
    setRepaymentNotes('');
    setRepaymentDate('');
    setRepaymentSaleId('all');
  };

  const handleDeleteRepayment = async (id: string, amt: number) => {
    if (confirm(`Delete this payment record of ₹${amt.toLocaleString('en-IN')}?`)) {
      await deleteCustomerPayment(id);
      showToast('Payment record removed.');
    }
  };

  // Pure jsPDF high-speed, crash-free vector PDF generator
  const handleDownloadPdf = (sale: Sale) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Top Brand Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(4, 120, 87); // emerald-700
      doc.text(siteSettings?.businessName || 'SR AQUA FEEDS AND NEEDS', 14, 18);

      // Store Address & Phone
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const storeAddr = siteSettings?.address || 'Chakicherla Peddapattapu Palem, Ulavapadu (Mandal), Ramayapatnam Road, SPSR Nellore District, AP – 523292';
      const splitAddr = doc.splitTextToSize(storeAddr, 115);
      doc.text(splitAddr, 14, 24);

      const storePhone = siteSettings?.primaryPhone ? `Ph: +91 ${siteSettings.primaryPhone}` : 'Ph: +91 94932 43244';
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(storePhone, 14, 34);

      // Top Right: Tax Invoice Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(15, 23, 42);
      doc.text('TAX INVOICE', pageWidth - 14, 18, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      const invoiceDate = new Date(sale.date);
      const dateStr = invoiceDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = invoiceDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const invNum = `INV-${new Date(sale.date).getTime().toString().slice(-6)}`;

      doc.text(`Date: ${dateStr}`, pageWidth - 14, 25, { align: 'right' });
      doc.text(`Time: ${timeStr}`, pageWidth - 14, 30, { align: 'right' });
      doc.setFont('helvetica', 'bold');
      doc.text(`Invoice #: ${invNum}`, pageWidth - 14, 35, { align: 'right' });

      // Divider line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(14, 39, pageWidth - 14, 39);

      // BILLED TO Box
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 43, pageWidth - 28, 24, 2, 2, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(14, 43, pageWidth - 28, 24, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('BILLED TO', 18, 49);

      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(sale.customerName, 18, 55);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const custPhone = sale.customerPhone ? `Ph: +91 ${sale.customerPhone.replace(/^\+?91/, '').trim()}` : 'Ph: +91 XXXXX XXXXX';
      const custAddress = sale.customerAddress ? ` | Address: ${sale.customerAddress}` : '';
      doc.text(`${custPhone}${custAddress}`, 18, 62);

      // Table Header (including Date & Time and Category!)
      const tableTop = 73;
      doc.setFillColor(241, 245, 249);
      doc.rect(14, tableTop, pageWidth - 28, 9, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, tableTop, pageWidth - 28, 9, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      doc.text('DATE & TIME', 18, tableTop + 6);
      doc.text('PRODUCT / DESCRIPTION', 55, tableTop + 6);
      doc.text('CATEGORY', 105, tableTop + 6);
      doc.text('QTY', 145, tableTop + 6, { align: 'right' });
      doc.text('RATE (₹)', 168, tableTop + 6, { align: 'right' });
      doc.text('AMOUNT (₹)', pageWidth - 18, tableTop + 6, { align: 'right' });

      // Table Row
      const rowTop = tableTop + 9;
      doc.setFillColor(255, 255, 255);
      doc.rect(14, rowTop, pageWidth - 28, 14, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(14, rowTop, pageWidth - 28, 14, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(dateStr, 18, rowTop + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(timeStr, 18, rowTop + 10.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(sale.productName, 55, rowTop + 6);

      const resolvedCategory = (sale.productCategory && sale.productCategory !== 'Uncategorized')
        ? sale.productCategory
        : (products.find(p => p.id === sale.productId || p.name.toLowerCase() === sale.productName.toLowerCase())?.category || 'Aqua Feeds & Care');
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(4, 120, 87);
      doc.text(resolvedCategory, 105, rowTop + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`${sale.quantity}`, 145, rowTop + 6, { align: 'right' });
      doc.text(`₹${sale.sellingPrice.toLocaleString('en-IN')}`, 168, rowTop + 6, { align: 'right' });
      
      doc.setFont('helvetica', 'bold');
      doc.text(`₹${sale.totalAmount.toLocaleString('en-IN')}`, pageWidth - 18, rowTop + 6, { align: 'right' });

      // Financial Summary Box
      const summaryTop = rowTop + 19;
      const summaryBoxWidth = 75;
      const summaryBoxX = pageWidth - 14 - summaryBoxWidth;

      doc.setFillColor(248, 250, 252);
      doc.roundedRect(summaryBoxX, summaryTop, summaryBoxWidth, 30, 2, 2, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(summaryBoxX, summaryTop, summaryBoxWidth, 30, 2, 2, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text('Subtotal:', summaryBoxX + 6, summaryTop + 6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`₹${sale.totalAmount.toLocaleString('en-IN')}`, summaryBoxX + summaryBoxWidth - 6, summaryTop + 6.5, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(3, 105, 161);
      doc.text('Paid Amount:', summaryBoxX + 6, summaryTop + 13);
      doc.setFont('helvetica', 'bold');
      doc.text(`₹${(sale.amountPaid !== undefined ? sale.amountPaid : sale.totalAmount).toLocaleString('en-IN')}`, summaryBoxX + summaryBoxWidth - 6, summaryTop + 13, { align: 'right' });

      if (sale.balance > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(220, 38, 38);
        doc.text('Pending Debt:', summaryBoxX + 6, summaryTop + 19.5);
        doc.setFont('helvetica', 'bold');
        doc.text(`₹${sale.balance.toLocaleString('en-IN')}`, summaryBoxX + summaryBoxWidth - 6, summaryTop + 19.5, { align: 'right' });
      }

      doc.setDrawColor(203, 213, 225);
      doc.line(summaryBoxX + 4, summaryTop + 22, summaryBoxX + summaryBoxWidth - 4, summaryTop + 22);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(4, 120, 87);
      doc.text('Grand Total:', summaryBoxX + 6, summaryTop + 27);
      doc.text(`₹${sale.totalAmount.toLocaleString('en-IN')}`, summaryBoxX + summaryBoxWidth - 6, summaryTop + 27, { align: 'right' });

      // Footer
      const footerY = summaryTop + 40;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, footerY, pageWidth - 14, footerY);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('Thank you for choosing SR Aqua Feeds & Needs!', pageWidth / 2, footerY + 7, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('For emergency pond assistance or dispatch inquiries, please contact 9493243244.', pageWidth / 2, footerY + 12, { align: 'center' });

      // Save PDF file (Zero lag, instantaneous download!)
      doc.save(`Invoice_${sale.customerName.replace(/[^a-zA-Z0-9]/g, '_')}_${invNum}.pdf`);
      showToast('Invoice PDF downloaded successfully!');
    } catch (err: any) {
      console.error('Failed to generate PDF with jsPDF:', err);
      alert('Could not download PDF. Please try the Print Invoice option.');
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
          customerPhone: customerPhone.trim() || undefined,
          customerAddress: customerAddress.trim() || undefined,
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
        customerPhone: customerPhone.trim() || undefined,
        customerAddress: customerAddress.trim() || undefined,
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
    setCustomerPhone('');
    setCustomerAddress('');
    setShowCustomerSuggestions(false);
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
    setCustomerPhone(sale.customerPhone || '');
    setCustomerAddress(sale.customerAddress || '');
    setShowCustomerSuggestions(false);
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
        setCustomerPhone('');
        setCustomerAddress('');
        setShowCustomerSuggestions(false);
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
    <div className="space-y-6 w-full max-w-full relative">

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
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-200 transition-colors cursor-pointer"
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
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sales'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t("Sales Desk", isTelugu)}
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t("Manage Inventory", isTelugu)}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
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

            <div className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">{t("Customer Name", isTelugu)}</label>
                {customerName.trim() && (
                  customerSuggestions.some(c => c.name.toLowerCase() === customerName.trim().toLowerCase()) ? (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                      ✓ Existing Customer
                    </span>
                  ) : (
                    <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-medium border border-sky-200">
                      + New Customer
                    </span>
                  )
                )}
              </div>
              <input 
                type="text"
                value={customerName}
                onFocus={() => setShowCustomerSuggestions(true)}
                onChange={e => {
                  setCustomerName(e.target.value);
                  setShowCustomerSuggestions(true);
                }}
                placeholder={t("e.g. Ramesh Reddy", isTelugu)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />

              {/* Suggestions Dropdown */}
              {showCustomerSuggestions && customerSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-slate-200 max-h-48 overflow-y-auto z-30 divide-y divide-slate-100">
                  <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50">
                    Existing Customers ({customerSuggestions.length})
                  </div>
                  {customerSuggestions.map(c => {
                    const stats = getCustomerFinancials(c.name);
                    const pastSale = sales.find(s => s.customerName.trim().toLowerCase() === c.name.trim().toLowerCase() && (s.customerPhone || s.customerAddress));
                    const phone = c.phone || pastSale?.customerPhone;
                    const address = c.address || pastSale?.customerAddress;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectCustomer(c)}
                        className="w-full text-left p-2.5 hover:bg-emerald-50 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5">
                            <User className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                            <span>{c.name}</span>
                          </div>
                          {phone && <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{phone}</div>}
                          {address && <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{address}</div>}
                        </div>
                        <div className="text-right">
                          {stats.totalDebt > 0 ? (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                              Debt: ₹{stats.totalDebt.toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              No Debt
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}

                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isTelugu ? 'మొబైల్ నంబర్ (ఐచ్ఛికం)' : 'Mobile Number'}{' '}
                <span className="text-[10px] font-normal text-slate-400">(Optional)</span>
              </label>
              <input 
                type="tel"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                maxLength={15}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isTelugu ? 'కస్టమర్ చిరునామా / ఊరు (ఐచ్ఛికం)' : 'Customer Address / Village'}{' '}
                <span className="text-[10px] font-normal text-slate-400">(Optional)</span>
              </label>
              <input 
                type="text"
                value={customerAddress}
                onChange={e => setCustomerAddress(e.target.value)}
                placeholder={isTelugu ? 'ఉదా. రామాయపట్నం, ఉలవపాడు' : 'e.g. Ramayapatnam, Ulavapadu'}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-auto flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between no-print sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-lg text-slate-900">Tax Invoice</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!invoiceRef.current) return;
                    const printContent = invoiceRef.current.innerHTML;
                    const printWindow = window.open('', '_blank', 'width=850,height=900');
                    if (printWindow) {
                      printWindow.document.write(`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <title>Invoice - ${invoiceSale?.customerName || 'Customer'}</title>
                            <style>
                              @page { size: auto; margin: 12mm; }
                              body {
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                                color: #0f172a;
                                background: #fff;
                                margin: 0;
                                padding: 16px;
                              }
                              .text-3xl { font-size: 24px; font-weight: 900; }
                              .text-4xl { font-size: 32px; font-weight: 900; }
                              .text-lg { font-size: 16px; font-weight: 700; }
                              .text-sm { font-size: 13px; }
                              .text-xs { font-size: 11px; }
                              .font-bold { font-weight: bold; }
                              .font-black { font-weight: 900; }
                              .font-medium { font-weight: 500; }
                              .text-emerald-700 { color: #047857; }
                              .text-emerald-600 { color: #059669; }
                              .text-slate-900 { color: #0f172a; }
                              .text-slate-700 { color: #334155; }
                              .text-slate-600 { color: #475569; }
                              .text-slate-500 { color: #64748b; }
                              .text-slate-400 { color: #94a3b8; }
                              .text-slate-200 { color: #e2e8f0; }
                              .border-b-2 { border-bottom: 2px solid #cbd5e1; }
                              .border-b { border-bottom: 1px solid #e2e8f0; }
                              .border-t { border-top: 1px solid #e2e8f0; }
                              .pb-6 { padding-bottom: 20px; }
                              .mb-6 { margin-bottom: 20px; }
                              .mb-8 { margin-bottom: 24px; }
                              .mb-12 { margin-bottom: 32px; }
                              .pt-8 { padding-top: 24px; }
                              .flex { display: flex; }
                              .justify-between { justify-content: space-between; }
                              .justify-end { justify-content: flex-end; }
                              .items-center { align-items: center; }
                              .text-right { text-align: right; }
                              .text-center { text-align: center; }
                              .uppercase { text-transform: uppercase; }
                              .tracking-wider { letter-spacing: 0.05em; }
                              table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                              th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
                              th { background-color: #f8fafc; font-size: 11px; font-weight: 700; color: #475569; }
                              .w-72 { width: 300px; }
                              .py-2 { padding-top: 8px; padding-bottom: 8px; }
                              .py-3 { padding-top: 12px; padding-bottom: 12px; }
                            </style>
                          </head>
                          <body>
                            ${printContent}
                            <script>
                              window.onload = function() {
                                window.focus();
                                window.print();
                                window.onafterprint = function() { window.close(); };
                              };
                            </script>
                          </body>
                        </html>
                      `);
                      printWindow.document.close();
                    }
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Print to connected printer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Print Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadPdf(invoiceSale)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
                  title="Download instant crash-free PDF file"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInvoiceSale(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Area */}
            <div className="p-8 bg-white text-slate-900" ref={invoiceRef}>
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-6 mb-6">
                <div>
                  <h1 className="text-2xl font-black text-emerald-700 mb-1 tracking-tight">
                    {siteSettings?.businessName || 'SR AQUA FEEDS AND NEEDS'}
                  </h1>
                  <p className="text-xs font-medium text-slate-600 max-w-md leading-relaxed">
                    {siteSettings?.address || 'Chakicherla Peddapattapu Palem, Ulavapadu (Mandal), Ramayapatnam Road, SPSR Nellore District, Andhra Pradesh – 523292'}
                  </p>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    {siteSettings?.primaryPhone
                      ? `Ph: +91 ${siteSettings.primaryPhone}`
                      : siteSettings?.whatsappNumber
                      ? `Ph: +91 ${siteSettings.whatsappNumber}`
                      : 'Ph: +91 94932 43244'}
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="text-3xl font-black text-slate-300 uppercase tracking-widest">INVOICE</h2>
                  <p className="text-xs font-bold mt-2 text-slate-700">Date: {new Date(invoiceSale.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  <p className="text-xs font-bold text-slate-700">Time: {new Date(invoiceSale.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-xs font-bold text-slate-500 mt-0.5 font-mono">Invoice #: INV-{new Date(invoiceSale.date).getTime().toString().slice(-6)}</p>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">BILLED TO</h3>
                <p className="text-base font-extrabold text-slate-900">{invoiceSale.customerName}</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">
                  {invoiceSale.customerPhone
                    ? `Ph: +91 ${invoiceSale.customerPhone.replace(/^\+?91/, '').trim()}`
                    : 'Ph: +91 XXXXX XXXXX'}
                </p>
                {invoiceSale.customerAddress && (
                  <p className="text-xs font-medium text-slate-600 mt-0.5 flex items-center gap-1">
                    <span>Address: {invoiceSale.customerAddress}</span>
                  </p>
                )}
              </div>

              {(() => {
                const resolvedCat = (invoiceSale.productCategory && invoiceSale.productCategory !== 'Uncategorized')
                  ? invoiceSale.productCategory
                  : (products.find(p => p.id === invoiceSale.productId || p.name.toLowerCase() === invoiceSale.productName.toLowerCase())?.category || 'Aqua Feeds & Care');

                return (
                  <table className="w-full text-left border-collapse mb-6">
                    <thead>
                      <tr className="bg-slate-100 text-xs font-bold text-slate-700 uppercase">
                        <th className="px-3.5 py-3 border border-slate-200">Date & Time</th>
                        <th className="px-3.5 py-3 border border-slate-200">Product / Description</th>
                        <th className="px-3.5 py-3 border border-slate-200">Category</th>
                        <th className="px-3 py-3 border border-slate-200 text-right">Qty</th>
                        <th className="px-3.5 py-3 border border-slate-200 text-right">Rate (₹)</th>
                        <th className="px-3.5 py-3 border border-slate-200 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-xs font-semibold text-slate-800">
                        <td className="px-3.5 py-3.5 border border-slate-200 whitespace-nowrap">
                          <div className="font-bold text-slate-900">
                            {new Date(invoiceSale.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(invoiceSale.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-3.5 py-3.5 border border-slate-200">
                          <div className="font-bold text-slate-900">{invoiceSale.productName}</div>
                        </td>
                        <td className="px-3.5 py-3.5 border border-slate-200">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                            {resolvedCat}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 border border-slate-200 text-right font-medium">{invoiceSale.quantity}</td>
                        <td className="px-3.5 py-3.5 border border-slate-200 text-right">{invoiceSale.sellingPrice.toLocaleString('en-IN')}</td>
                        <td className="px-3.5 py-3.5 border border-slate-200 text-right font-bold text-slate-900">{invoiceSale.totalAmount.toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })()}

              <div className="flex justify-end mb-8">
                <div className="w-72 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{invoiceSale.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-sky-700 font-semibold">
                    <span>Paid Amount:</span>
                    <span className="font-bold">₹{(invoiceSale.amountPaid !== undefined ? invoiceSale.amountPaid : invoiceSale.totalAmount).toLocaleString('en-IN')}</span>
                  </div>
                  {invoiceSale.balance > 0 && (
                    <div className="flex justify-between items-center text-xs text-red-600 font-semibold">
                      <span>Pending Debt:</span>
                      <span className="font-bold">₹{invoiceSale.balance.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
                    <span className="font-black text-slate-900">Grand Total:</span>
                    <span className="font-black text-emerald-700 text-base">₹{invoiceSale.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-slate-200 space-y-1">
                <p className="font-bold text-xs text-slate-800">Thank you for choosing SR Aqua Feeds & Needs!</p>
                <p className="text-[11px] text-slate-500">For emergency pond assistance or dispatch inquiries, please contact 9493243244.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Performance & Debt Repayment Modal */}
      {selectedCustomerName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col animate-scale-in">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-900 leading-tight">
                    {selectedCustomerName}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-0.5">
                    {(() => {
                      const cObj = customers.find(c => c.name.toLowerCase() === selectedCustomerName.toLowerCase());
                      const cSales = sales.filter(s => s.customerName.toLowerCase() === selectedCustomerName.toLowerCase());
                      const phone = cObj?.phone || cSales[0]?.customerPhone;
                      const addr = cObj?.address || cSales[0]?.customerAddress;
                      return (
                        <>
                          {phone && (
                            <span className="flex items-center gap-1 text-slate-700 font-semibold">
                              <Phone className="w-3 h-3 text-slate-400" />
                              {phone}
                            </span>
                          )}
                          {addr && (
                            <span className="flex items-center gap-1 text-slate-500">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {addr}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedCustomerName(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-auto bg-slate-50 flex-1 space-y-6">
              {(() => {
                const { cSales, cPayments, totalPurchases, totalPaid, totalDebt, totalProfit } = getCustomerFinancials(selectedCustomerName);

                // Combined unified ledger sorted chronologically (newest first)
                const ledgerItems = [
                  ...cSales.map(s => ({
                    id: s.id,
                    type: 'sale' as const,
                    date: s.date,
                    productName: s.productName,
                    quantity: s.quantity,
                    sellingPrice: s.sellingPrice,
                    totalAmount: s.totalAmount,
                    paidAmount: s.amountPaid !== undefined ? s.amountPaid : s.totalAmount,
                    debtAmount: s.balance || 0,
                    saleObj: s,
                  })),
                  ...cPayments.map(p => ({
                    id: p.id,
                    type: 'payment' as const,
                    date: p.paymentDate,
                    productName: p.productName ? `Repayment for ${p.productName} (${p.paymentMode || 'Cash'})` : `Debt Repayment (${p.paymentMode || 'Cash'})`,
                    quantity: 1,
                    sellingPrice: p.amount,
                    totalAmount: p.amount,
                    paidAmount: p.amount,
                    debtAmount: 0,
                    notes: p.notes,
                    mode: p.paymentMode,
                    paymentObj: p,
                  })),
                ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                return (
                  <>
                    {/* Financial Summary 4 Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Purchases</div>
                        <div className="text-xl font-black text-slate-900">₹{totalPurchases.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Total Paid</div>
                        <div className="text-xl font-black text-emerald-600">₹{totalPaid.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                        <div className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1">Total Debt (Pending)</div>
                        <div className={`text-xl font-black ${totalDebt > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                          ₹{totalDebt.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs text-center">
                        <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-1">Generated Profit</div>
                        <div className="text-xl font-black text-sky-600">₹{totalProfit.toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    {/* Record Debt Payment Quick Box */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-emerald-600" />
                          <h4 className="font-extrabold text-sm text-slate-900">
                            Record Debt Clearance / New Payment
                          </h4>
                        </div>
                        {totalDebt > 0 ? (
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200">
                            Outstanding Balance: ₹{totalDebt.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                            ✓ No Debt Outstanding
                          </span>
                        )}
                      </div>

                      <form onSubmit={handleRecordDebtPayment} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end pt-1">
                        {/* 1. First Option: Select Product / Credit Purchase */}
                        <div className="sm:col-span-4">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            1. Select Product / Credit Bill *
                          </label>
                          <select
                            value={repaymentSaleId}
                            onChange={(e) => {
                              const sId = e.target.value;
                              setRepaymentSaleId(sId);
                              if (sId !== 'all') {
                                const targetSale = cSales.find(s => s.id === sId);
                                if (targetSale) {
                                  setRepaymentAmount(targetSale.balance > 0 ? targetSale.balance : '');
                                }
                              } else {
                                setRepaymentAmount(totalDebt > 0 ? totalDebt : '');
                              }
                            }}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                          >
                            <option value="all">-- All Purchases / General Account Debt Clearance (₹{totalDebt.toLocaleString('en-IN')} pending) --</option>
                            {cSales.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.productName} — Bought on {new Date(s.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} | Total: ₹{s.totalAmount.toLocaleString('en-IN')} | Remaining Debt: ₹{(s.balance || 0).toLocaleString('en-IN')}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Amount Paid (₹) *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={repaymentAmount}
                            onChange={e => setRepaymentAmount(Number(e.target.value))}
                            placeholder={totalDebt > 0 ? `${totalDebt}` : "0.00"}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Payment Mode
                          </label>
                          <select
                            value={repaymentMode}
                            onChange={e => setRepaymentMode(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="Cash">Cash</option>
                            <option value="PhonePe / GPay (UPI)">PhonePe / GPay (UPI)</option>
                            <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                            <option value="Cheque">Cheque</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Payment Date & Time
                          </label>
                          <input
                            type="datetime-local"
                            value={repaymentDate}
                            onChange={e => setRepaymentDate(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Notes / Remark (Optional)
                          </label>
                          <input
                            type="text"
                            value={repaymentNotes}
                            onChange={e => setRepaymentNotes(e.target.value)}
                            placeholder="e.g. Paid part debt"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="sm:col-span-4 flex justify-end pt-1">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Payment Record</span>
                          </button>
                        </div>
                      </form>
                    </div>


                    {/* Ledger Tabs and Transactions Table */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <History className="w-4 h-4 text-slate-600" />
                          <h4 className="font-extrabold text-sm text-slate-900">
                            Transaction History & Ledger
                          </h4>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {ledgerItems.length} records
                          </span>
                        </div>

                        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => setCustomerLedgerTab('all')}
                            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                              customerLedgerTab === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            All ({ledgerItems.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setCustomerLedgerTab('sales')}
                            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                              customerLedgerTab === 'sales' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            Purchases ({cSales.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setCustomerLedgerTab('payments')}
                            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                              customerLedgerTab === 'payments' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-700'
                            }`}
                          >
                            Debt Repayments ({cPayments.length})
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto max-h-[360px]">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                              <th className="px-4 py-3">Date & Time</th>
                              <th className="px-4 py-3">Type</th>
                              <th className="px-4 py-3">Item / Description</th>
                              <th className="px-4 py-3 text-right">Total (₹)</th>
                              <th className="px-4 py-3 text-right">Paid (₹)</th>
                              <th className="px-4 py-3 text-right">Debt Balance (₹)</th>
                              <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs">
                            {ledgerItems
                              .filter(item => {
                                if (customerLedgerTab === 'sales') return item.type === 'sale';
                                if (customerLedgerTab === 'payments') return item.type === 'payment';
                                return true;
                              })
                              .map(item => {
                                if (item.type === 'sale') {
                                  return (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                                        <div className="font-semibold text-slate-800">
                                          {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                        <div className="text-[10px] text-slate-400">
                                          {new Date(item.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                          SALE
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 font-semibold text-slate-900">
                                        {item.productName} ({item.quantity} Qty)
                                      </td>
                                      <td className="px-4 py-3 text-right font-bold text-slate-900">
                                        ₹{item.totalAmount.toLocaleString('en-IN')}
                                      </td>
                                      <td className="px-4 py-3 text-right font-bold text-emerald-600">
                                        ₹{item.paidAmount.toLocaleString('en-IN')}
                                      </td>
                                      <td className="px-4 py-3 text-right font-bold text-red-500">
                                        {item.debtAmount > 0 ? `₹${item.debtAmount.toLocaleString('en-IN')}` : '-'}
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (item.saleObj) setInvoiceSale(item.saleObj);
                                          }}
                                          className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                                          title="View Invoice"
                                        >
                                          <FileText className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                } else {
                                  return (
                                    <tr key={item.id} className="bg-sky-50/40 hover:bg-sky-50 transition-colors">
                                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                                        <div className="font-semibold text-slate-800">
                                          {new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                        <div className="text-[10px] text-slate-400">
                                          {new Date(item.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 flex items-center gap-1 w-fit">
                                          <CheckCircle2 className="w-3 h-3 text-sky-600" />
                                          REPAYMENT
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 font-semibold text-sky-900">
                                        <div>Debt Repayment via {item.mode}</div>
                                        {item.notes && <div className="text-[10px] text-slate-500 font-normal italic">"{item.notes}"</div>}
                                      </td>
                                      <td className="px-4 py-3 text-right text-slate-400">-</td>
                                      <td className="px-4 py-3 text-right font-black text-sky-700">
                                        +₹{item.paidAmount.toLocaleString('en-IN')}
                                      </td>
                                      <td className="px-4 py-3 text-right text-emerald-600 font-bold text-[11px]">
                                        Cleared
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteRepayment(item.id, item.paidAmount)}
                                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                                          title="Delete Repayment Record"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
