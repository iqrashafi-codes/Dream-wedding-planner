import { useState, useRef, useEffect } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

/* ─── Constants ─────────────────────────────────────────── */
const CATEGORIES = ['Decoration', 'Catering', 'Photography', 'Venue', 'Clothing'];
const STATUSES   = ['Available', 'Limited', 'Out of Stock'];

/* ─── Types ─────────────────────────────────────────────── */
interface StockItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  status: string;
}

interface CartItem extends StockItem {}

interface Alert {
  type: 'success' | 'error';
  msg: string;
}

interface NewItemForm {
  name: string;
  price: string;
  qty: string;
  category: string;
  status: string;
}

/* ─── Seed data ──────────────────────────────────────────── */
const SEED: StockItem[] = [
  { id: 'ST-001', name: 'Royal Floral Arch',      category: 'Decoration',  price: 85000,  qty: 5,  status: 'Available'    },
  { id: 'ST-002', name: 'Premium Catering (50p)',  category: 'Catering',    price: 250000, qty: 3,  status: 'Limited'      },
  { id: 'ST-003', name: 'Bridal Photography Pkg',  category: 'Photography', price: 120000, qty: 2,  status: 'Limited'      },
  { id: 'ST-004', name: 'Grand Banquet Hall',       category: 'Venue',       price: 450000, qty: 1,  status: 'Available'    },
  { id: 'ST-005', name: 'Sherwani Collection',      category: 'Clothing',    price: 35000,  qty: 10, status: 'Available'    },
  { id: 'ST-006', name: 'Table Centerpieces',       category: 'Decoration',  price: 12000,  qty: 20, status: 'Available'    },
  { id: 'ST-007', name: 'Videography Package',      category: 'Photography', price: 95000,  qty: 0,  status: 'Out of Stock' },
];

/* ─── Pie chart helper ───────────────────────────────────── */
function drawPie(canvas: HTMLCanvasElement, slices: { value: number; color: string }[]) {
  const ctx  = canvas.getContext('2d');
  if (!ctx) return;
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total === 0) return;
  let angle = -Math.PI / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  slices.forEach((sl) => {
    const sweep = (sl.value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(80, 80);
    ctx.arc(80, 80, 75, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = sl.color;
    ctx.fill();
    angle += sweep;
  });
}

/* ─── Component ─────────────────────────────────────────── */
const Dashboard = () => {

  /* Stock state */
  const [stock, setStock]   = useState<StockItem[]>(SEED);
  const [cart,  setCart]    = useState<CartItem[]>([]);

  /* Insert form */
  const emptyNew: NewItemForm = { name: '', price: '', qty: '', category: '', status: '' };
  const [newItem,      setNewItem]      = useState<NewItemForm>(emptyNew);
  const [insertAlert,  setInsertAlert]  = useState<Alert | null>(null);

  /* Update form */
  const emptyUp: NewItemForm & { id: string } = { id: '', name: '', price: '', qty: '', category: '', status: '' };
  const [upItem,       setUpItem]       = useState<typeof emptyUp>(emptyUp);
  const [updateAlert,  setUpdateAlert]  = useState<Alert | null>(null);

  /* Delete form */
  const [delId,        setDelId]        = useState('');
  const [delConfirm,   setDelConfirm]   = useState('');
  const [deleteAlert,  setDeleteAlert]  = useState<Alert | null>(null);

  /* Filters */
  const [search,       setSearch]       = useState('');
  const [catFilter,    setCatFilter]    = useState('');
  const [priceFilter,  setPriceFilter]  = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* Pie chart ref */
  const pieRef = useRef<HTMLCanvasElement>(null);

  /* ── Derived chart data ── */
  const barData = CATEGORIES.map((cat) => ({
    name: cat,
    qty:  stock.filter((s) => s.category === cat).reduce((sum, s) => sum + s.qty, 0),
  }));
  const maxQty = Math.max(...barData.map((b) => b.qty), 1);

  const pieData = [
    { name: 'Available',    value: stock.filter((s) => s.status === 'Available').length,    color: '#16a34a' },
    { name: 'Limited',      value: stock.filter((s) => s.status === 'Limited').length,      color: '#ca8a04' },
    { name: 'Out of Stock', value: stock.filter((s) => s.status === 'Out of Stock').length, color: '#dc2626' },
  ];
  const pieTotal = pieData.reduce((s, p) => s + p.value, 0);

  useEffect(() => {
    if (pieRef.current) drawPie(pieRef.current, pieData);
  }, [stock]);

  /* ── Filtered stock ── */
  const filteredStock = stock.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter    ? item.category === catFilter    : true;
    const matchStatus = statusFilter ? item.status   === statusFilter : true;
    const matchPrice  =
      priceFilter === 'low'  ? item.price < 100000                           :
      priceFilter === 'mid'  ? item.price >= 100000 && item.price <= 300000  :
      priceFilter === 'high' ? item.price > 300000                           : true;
    return matchSearch && matchCat && matchStatus && matchPrice;
  });

  /* ── Cart ── */
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (item: StockItem) => {
    if (cart.find((c) => c.id === item.id)) return;
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => setCart(cart.filter((c) => c.id !== id));

  /* ── Scroll helper ── */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Fill edit form ── */
  const fillEditForm = (item: StockItem) => {
    setUpItem({ id: item.id, name: item.name, price: String(item.price), qty: String(item.qty), category: item.category, status: item.status });
    scrollTo('updateStock');
  };

  /* ── Insert handler ── */
  const handleInsert = () => {
    if (!newItem.name || !newItem.price || !newItem.qty || !newItem.category || !newItem.status) {
      setInsertAlert({ type: 'error', msg: 'Please fill in all fields.' });
      return;
    }
    const id = `ST-${String(stock.length + 1).padStart(3, '0')}`;
    setStock([...stock, {
      id,
      name:     newItem.name,
      category: newItem.category,
      price:    Number(newItem.price),
      qty:      Number(newItem.qty),
      status:   newItem.status,
    }]);
    setNewItem(emptyNew);
    setInsertAlert({ type: 'success', msg: `Item "${newItem.name}" added successfully with ID ${id}.` });
    setTimeout(() => setInsertAlert(null), 3000);
  };

  /* ── Update handler ── */
  const handleUpdate = () => {
    if (!upItem.id) { setUpdateAlert({ type: 'error', msg: 'Please enter a Stock ID.' }); return; }
    const exists = stock.find((s) => s.id === upItem.id);
    if (!exists) { setUpdateAlert({ type: 'error', msg: `No item found with ID "${upItem.id}".` }); return; }
    setStock(stock.map((s) => s.id === upItem.id ? {
      ...s,
      name:     upItem.name     || s.name,
      category: upItem.category || s.category,
      price:    upItem.price    ? Number(upItem.price) : s.price,
      qty:      upItem.qty      ? Number(upItem.qty)   : s.qty,
      status:   upItem.status   || s.status,
    } : s));
    setUpdateAlert({ type: 'success', msg: `Item "${upItem.id}" updated successfully.` });
    setUpItem(emptyUp);
    setTimeout(() => setUpdateAlert(null), 3000);
  };

  /* ── Delete handler ── */
  const handleDelete = () => {
    if (!delId || !delConfirm) { setDeleteAlert({ type: 'error', msg: 'Please fill in both fields.' }); return; }
    const item = stock.find((s) => s.id === delId);
    if (!item) { setDeleteAlert({ type: 'error', msg: `No item found with ID "${delId}".` }); return; }
    if (item.name.toLowerCase() !== delConfirm.toLowerCase()) {
      setDeleteAlert({ type: 'error', msg: 'Item name does not match. Please confirm correctly.' }); return;
    }
    setStock(stock.filter((s) => s.id !== delId));
    setDeleteAlert({ type: 'success', msg: `Item "${delId}" deleted successfully.` });
    setDelId(''); setDelConfirm('');
    setTimeout(() => setDeleteAlert(null), 3000);
  };

  /* ─── JSX ──────────────────────────────────────────────── */
  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
<div className="bg-gradient-to-br from-navy to-navy-dark py-12 px-8 text-center mb-8">
        <h1 className="text-4xl text-yellow-400 mb-2 font-bold">My Dashboard</h1>
        <p className="text-yellow-300 text-lg font-medium">Manage your bookings, stock and account details</p>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-12">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-12">
          {[
            { icon: '📅', num: '2',                                                           label: 'Total Bookings' },
            { icon: '✅', num: '1',                                                           label: 'Confirmed'      },
            { icon: '⏳', num: '1',                                                           label: 'Pending'        },
            { icon: '💰', num: '281,400 PKR',                                                 label: 'Total Paid'     },
            { icon: '📦', num: String(stock.reduce((s, i) => s + i.qty, 0)),                  label: 'Total Stock'    },
            { icon: '🛒', num: String(cart.length),                                           label: 'Cart Items'     },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 shadow flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="text-3xl">{s.icon}</div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-yellow-400">{s.num}</span>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow">

          {/* CHARTS */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow mb-8">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">Stock Overview – Graphical View</h2>
            <div className="grid grid-cols-2 gap-8">

              {/* Bar chart */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="font-bold text-gray-900 mb-5">Stock by Category (Quantity)</p>
                <div className="flex flex-col gap-3">
                  {barData.map((item, i) => {
                    const pct = Math.round((item.qty / maxQty) * 100);
                    const widthClass =
                      pct >= 100 ? 'w-full' :
                      pct >= 90  ? 'w-11/12' :
                      pct >= 75  ? 'w-3/4' :
                      pct >= 60  ? 'w-3/5' :
                      pct >= 50  ? 'w-1/2' :
                      pct >= 40  ? 'w-2/5' :
                      pct >= 30  ? 'w-3/10' :
                      pct >= 20  ? 'w-1/5' :
                      pct >= 10  ? 'w-1/10' : 'w-0';
                    return (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="w-24 text-sm text-gray-500 text-right flex-shrink-0">{item.name}</div>
                        <div className="flex-1 bg-gray-200 rounded h-5 overflow-hidden">
                          <div className={`h-full rounded transition-all duration-1000 ${widthClass} ${['bg-yellow-500','bg-gray-900','bg-green-600','bg-red-600'][i % 4]}`} />
                        </div>
                        <div className="w-7 text-sm font-bold text-gray-700">{item.qty}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pie chart */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="font-bold text-gray-900 mb-5">Stock Status Distribution</p>
                <div className="flex items-center gap-5">
                  <canvas ref={pieRef} width={160} height={160} className="flex-shrink-0" />
                  <div className="flex flex-col gap-3">
                    {pieData.map((slice) => (
                      <div key={slice.name} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          slice.name === 'Available'    ? 'bg-green-600'  :
                          slice.name === 'Limited'      ? 'bg-yellow-600' :
                                                          'bg-red-600'
                        }`} />
                        <span>{slice.name}: {pieTotal > 0 ? Math.round((slice.value / pieTotal) * 100) : 0}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* STOCK MANAGEMENT CARDS */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow mb-8">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">Stock Management</h2>
            {[
              { icon: '➕', title: 'Insert New Stock', desc: 'Add new packages, decorations or services to the stock database.', target: 'insertStock', danger: false },
              { icon: '✏️', title: 'Update Stock',     desc: 'Edit and update existing stock details, prices and availability.',  target: 'updateStock', danger: false },
              { icon: '🗑️', title: 'Delete Stock',     desc: 'Remove outdated or unavailable items from the stock records.',     target: 'deleteStock', danger: true  },
              { icon: '👁️', title: 'View All Stock',   desc: 'Browse and view all available wedding packages and inventory.',    target: 'viewStock',   danger: false },
            ].map((card, i, arr) => (
              <div key={card.title} className={`pb-5 mb-5 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="text-2xl">{card.icon}</div>
                <h3 className="font-bold text-gray-900 mt-1 mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{card.desc}</p>
                <button
                  onClick={() => scrollTo(card.target)}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${card.danger ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-yellow-400 text-black hover:bg-yellow-500'}`}
                >
                  {card.title}
                </button>
              </div>
            ))}
          </div>

          {/* INSERT STOCK */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow mb-8" id="insertStock">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">Insert New Stock</h2>
            {insertAlert && (
              <div className={`rounded-lg px-4 py-3 mb-4 text-sm ${insertAlert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {insertAlert.msg}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {([
                { label: 'Item Name',   id: 'name',  type: 'text',   placeholder: 'Enter item name', val: newItem.name,  onChange: (v: string) => setNewItem({ ...newItem, name:  v }) },
                { label: 'Price (PKR)', id: 'price', type: 'number', placeholder: 'Enter price',     val: newItem.price, onChange: (v: string) => setNewItem({ ...newItem, price: v }) },
                { label: 'Quantity',    id: 'qty',   type: 'number', placeholder: 'Enter quantity',  val: newItem.qty,   onChange: (v: string) => setNewItem({ ...newItem, qty:   v }) },
              ] as const).map((f) => (
                <div key={f.id}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.type} placeholder={f.placeholder} value={f.val}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={newItem.status}
                  onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                >
                  <option value="">Select Status</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button
              onClick={handleInsert}
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all"
            >
              Add to Stock
            </button>
          </div>

          {/* UPDATE STOCK */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow mb-8" id="updateStock">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">Update Stock</h2>
            {updateAlert && (
              <div className={`rounded-lg px-4 py-3 mb-4 text-sm ${updateAlert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {updateAlert.msg}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {([
                { label: 'Stock ID',    val: upItem.id,       onChange: (v: string) => setUpItem({ ...upItem, id:       v }), placeholder: 'e.g. ST-001',    type: 'text'   },
                { label: 'Item Name',   val: upItem.name,     onChange: (v: string) => setUpItem({ ...upItem, name:     v }), placeholder: 'Enter item name', type: 'text'   },
                { label: 'Price (PKR)', val: upItem.price,    onChange: (v: string) => setUpItem({ ...upItem, price:    v }), placeholder: 'Enter price',     type: 'number' },
                { label: 'Quantity',    val: upItem.qty,      onChange: (v: string) => setUpItem({ ...upItem, qty:      v }), placeholder: 'Enter quantity',  type: 'number' },
              ] as const).map((f) => (
                <div key={f.label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input
                    type={f.type} placeholder={f.placeholder} value={f.val}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={upItem.category}
                  onChange={(e) => setUpItem({ ...upItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={upItem.status}
                  onChange={(e) => setUpItem({ ...upItem, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                >
                  <option value="">Select Status</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all"
            >
              Update Stock
            </button>
          </div>

          {/* DELETE STOCK */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow mb-8" id="deleteStock">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">Delete Stock</h2>
            {deleteAlert && (
              <div className={`rounded-lg px-4 py-3 mb-4 text-sm ${deleteAlert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {deleteAlert.msg}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock ID to Delete</label>
                <input
                  placeholder="e.g. ST-001" value={delId}
                  onChange={(e) => setDelId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Item Name</label>
                <input
                  placeholder="Enter item name to confirm" value={delConfirm}
                  onChange={(e) => setDelConfirm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Delete Stock
            </button>
          </div>

          {/* VIEW ALL STOCK */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow mb-8" id="viewStock">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">All Stock Records</h2>
            <div className="flex flex-wrap gap-3 mb-5">
              <input
                placeholder="Search stock by name…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-44 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none"
              />
              {([
                { val: catFilter,    set: setCatFilter,    opts: CATEGORIES,                                                                                      placeholder: 'All Categories' },
                { val: priceFilter,  set: setPriceFilter,  opts: ['Under 100,000 PKR|low', '100,000-300,000 PKR|mid', 'Above 300,000 PKR|high'] as string[],      placeholder: 'All Prices'     },
                { val: statusFilter, set: setStatusFilter, opts: STATUSES,                                                                                        placeholder: 'All Status'     },
              ] as const).map((s, i) => (
                <select
                  key={i} value={s.val}
                  onChange={(e) => (s.set as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">{s.placeholder}</option>
                  {(s.opts as string[]).map((o: string) => {
                    const [label, value] = o.includes('|') ? o.split('|') : [o, o];
                    return <option key={value} value={value}>{label}</option>;
                  })}
                </select>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['Stock ID','Item Name','Category','Price (PKR)','Quantity','Status','Actions'].map((h) => (
                      <th key={h} className="bg-gray-900 text-yellow-400 px-4 py-3 text-left text-sm tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.length === 0
                    ? <tr><td colSpan={7} className="px-4 py-3 text-sm text-gray-500">No records found.</td></tr>
                    : filteredStock.map((item, idx) => (
                      <tr key={item.id} className={`border-b border-gray-100 hover:bg-yellow-50 ${idx % 2 !== 0 ? 'bg-gray-50' : ''}`}>
                        <td className="px-4 py-3 text-sm text-gray-700">#{item.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.qty}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'Available'    ? 'bg-green-100 text-green-800'  :
                            item.status === 'Limited'      ? 'bg-yellow-100 text-yellow-800' :
                                                             'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => fillEditForm(item)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-bold hover:opacity-80"
                          >Edit</button>
                          <button
                            onClick={() => { if (window.confirm(`Delete ${item.id}?`)) setStock(stock.filter((s) => s.id !== item.id)); }}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:opacity-80"
                          >Delete</button>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold hover:opacity-80"
                          >Cart</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* CART VIEW */}
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow" id="cartSection">
            <h2 className="text-2xl text-gray-900 font-semibold pb-2 border-b-2 border-yellow-400 mb-6">Cart View</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['Item Name','Category','Price (PKR)','Action'].map((h) => (
                      <th key={h} className="bg-gray-900 text-yellow-400 px-4 py-3 text-left text-sm">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0
                    ? <tr><td colSpan={4} className="px-4 py-3 text-sm text-gray-500">No items in cart yet.</td></tr>
                    : cart.map((item: CartItem) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-yellow-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.price.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:opacity-80"
                          >Remove</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            {cart.length > 0 && (
              <div className="flex justify-end items-center gap-3 mt-4 pt-3 border-t-2 border-yellow-400">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-yellow-400 text-lg">{cartTotal.toLocaleString()} PKR</span>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;