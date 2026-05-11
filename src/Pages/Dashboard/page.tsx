import { useState, useEffect, useRef } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';


interface StockItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  status: string;
}

const initialStock: StockItem[] = [
  { id: 'ST-001', name: 'Gold Wedding Package',    category: 'Package',     price: 281400, qty: 10, status: 'Available'   },
  { id: 'ST-002', name: 'Silver Wedding Package',  category: 'Package',     price: 140700, qty: 15, status: 'Available'   },
  { id: 'ST-003', name: 'Floral Stage Decoration', category: 'Decoration',  price: 45000,  qty: 8,  status: 'Limited'     },
  { id: 'ST-004', name: 'Premium Catering Service',category: 'Catering',    price: 120000, qty: 5,  status: 'Limited'     },
  { id: 'ST-005', name: 'Photography Package',     category: 'Photography', price: 75000,  qty: 0,  status: 'Unavailable' },
];

const COLORS     = ['#c9a84c', '#3498db', '#2ecc71', '#e74c3c'];
const CATEGORIES = ['Package', 'Decoration', 'Catering', 'Photography'];
const STATUSES   = ['Available', 'Limited', 'Unavailable'];

// ─── Chart.js Bar Chart ───────────────────────────────────────────────────────
function BarChartCanvas({ data }: { data: { name: string; Quantity: number }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<any>(null);

  useEffect(() => {
    let Chart: any;
    import('chart.js/auto').then((mod) => {
      Chart = mod.default;
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: data.map((d) => d.name),
          datasets: [{
            label: 'Quantity',
            data: data.map((d) => d.Quantity),
            backgroundColor: COLORS,
            borderRadius: 4,
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { font: { size: 11 } } },
            y: { ticks: { font: { size: 11 } }, beginAtZero: true },
          },
        },
      });
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [data]);

  return <canvas ref={canvasRef} height={250} />;
}

// ─── Chart.js Pie Chart ───────────────────────────────────────────────────────
function PieChartCanvas({ data }: { data: { name: string; value: number }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<any>(null);

  useEffect(() => {
    import('chart.js/auto').then((mod) => {
      const Chart = mod.default;
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(canvasRef.current, {
        type: 'pie',
        data: {
          labels: data.map((d) => d.name),
          datasets: [{
            data: data.map((d) => d.value),
            backgroundColor: COLORS,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 12 } } },
            tooltip: {
              callbacks: {
                label: (ctx: any) => {
                  const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const pct   = ((ctx.parsed / total) * 100).toFixed(0);
                  return `${ctx.label}: ${pct}%`;
                },
              },
            },
          },
        },
      });
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [data]);

  return <canvas ref={canvasRef} height={250} />;
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [stock, setStock]               = useState<StockItem[]>(initialStock);
  const [cart, setCart]                 = useState<StockItem[]>([]);
  const [idCounter, setIdCounter]       = useState(6);
  const [search, setSearch]             = useState('');
  const [catFilter, setCatFilter]       = useState('');
  const [priceFilter, setPriceFilter]   = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newItem, setNewItem]           = useState({ name: '', category: '', price: '', qty: '', status: '' });
  const [insertAlert, setInsertAlert]   = useState<{ msg: string; type: string } | null>(null);
  const [upItem, setUpItem]             = useState({ id: '', name: '', category: '', price: '', qty: '', status: '' });
  const [updateAlert, setUpdateAlert]   = useState<{ msg: string; type: string } | null>(null);
  const [delId, setDelId]               = useState('');
  const [delConfirm, setDelConfirm]     = useState('');
  const [deleteAlert, setDeleteAlert]   = useState<{ msg: string; type: string } | null>(null);

  const showAlert = (
    setter: React.Dispatch<React.SetStateAction<{ msg: string; type: string } | null>>,
    msg: string,
    type: string
  ) => {
    setter({ msg, type });
    setTimeout(() => setter(null), 4000);
  };

  const badgeClass = (status: string) =>
    status === 'Available' ? 'confirmed' : status === 'Limited' ? 'pending' : 'cancelled';

  const barData = CATEGORIES.map((cat) => ({
    name: cat,
    Quantity: stock.filter((s) => s.category === cat).reduce((sum, s) => sum + s.qty, 0),
  }));

  const pieData = [
    { name: 'Available',   value: stock.filter((s) => s.status === 'Available').length   },
    { name: 'Limited',     value: stock.filter((s) => s.status === 'Limited').length     },
    { name: 'Unavailable', value: stock.filter((s) => s.status === 'Unavailable').length },
  ].filter((d) => d.value > 0);

  const filteredStock = stock.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter    === '' || item.category === catFilter;
    const matchStatus = statusFilter === '' || item.status   === statusFilter;
    const matchPrice  =
      priceFilter === ''    ? true :
      priceFilter === 'low' ? item.price < 100000 :
      priceFilter === 'mid' ? item.price >= 100000 && item.price <= 300000 :
                              item.price > 300000;
    return matchSearch && matchCat && matchStatus && matchPrice;
  });

  const handleInsert = () => {
    if (!newItem.name || !newItem.category || !newItem.price || !newItem.qty || !newItem.status) {
      showAlert(setInsertAlert, 'Please fill in all fields correctly.', 'error'); return;
    }
    const id = `ST-${String(idCounter).padStart(3, '0')}`;
    setIdCounter(idCounter + 1);
    setStock([...stock, {
      id, name: newItem.name, category: newItem.category,
      price: parseFloat(newItem.price), qty: parseInt(newItem.qty), status: newItem.status,
    }]);
    showAlert(setInsertAlert, `Stock item "${newItem.name}" added with ID ${id}.`, 'success');
    setNewItem({ name: '', category: '', price: '', qty: '', status: '' });
  };

  const handleUpdate = () => {
    if (!upItem.id || !upItem.name || !upItem.category || !upItem.price || !upItem.qty || !upItem.status) {
      showAlert(setUpdateAlert, 'Please fill in all fields correctly.', 'error'); return;
    }
    const id     = upItem.id.toUpperCase();
    const exists = stock.find((s) => s.id === id);
    if (!exists) { showAlert(setUpdateAlert, `Stock ID "${id}" not found.`, 'error'); return; }
    setStock(stock.map((s) => s.id === id
      ? { ...s, name: upItem.name, category: upItem.category,
          price: parseFloat(upItem.price), qty: parseInt(upItem.qty), status: upItem.status }
      : s));
    showAlert(setUpdateAlert, `Stock item "${id}" updated successfully.`, 'success');
  };

  const handleDelete = () => {
    if (!delId) { showAlert(setDeleteAlert, 'Please enter a Stock ID.', 'error'); return; }
    const id   = delId.toUpperCase();
    const item = stock.find((s) => s.id === id);
    if (!item) { showAlert(setDeleteAlert, `Stock ID "${id}" not found.`, 'error'); return; }
    if (delConfirm && item.name.toLowerCase() !== delConfirm.toLowerCase()) {
      showAlert(setDeleteAlert, 'Item name does not match.', 'error'); return;
    }
    setStock(stock.filter((s) => s.id !== id));
    showAlert(setDeleteAlert, `Stock item "${id}" deleted successfully.`, 'success');
    setDelId(''); setDelConfirm('');
  };

  const fillEditForm = (item: StockItem) => {
    setUpItem({ id: item.id, name: item.name, category: item.category,
      price: String(item.price), qty: String(item.qty), status: item.status });
    document.getElementById('updateStock')?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item: StockItem) => {
    if (cart.find((c) => c.id === item.id)) { alert('Already in cart.'); return; }
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  const removeFromCart = (id: string) => setCart(cart.filter((c) => c.id !== id));
  const cartTotal = cart.reduce((sum, c) => sum + c.price, 0);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Navbar />

      <div className="page-header">
        <h1 className="page-title">My Dashboard</h1>
        <p className="page-subtitle">Manage your bookings, stock and account details</p>
      </div>

      <div className="dashboard-wrapper">

        {/* STATS */}
        <div className="dashboard-stats">
          {[
            { icon: '📅', num: '2',           label: 'Total Bookings' },
            { icon: '✅', num: '1',           label: 'Confirmed'      },
            { icon: '⏳', num: '1',           label: 'Pending'        },
            { icon: '💰', num: '281,400 PKR', label: 'Total Paid'     },
            { icon: '📦', num: String(stock.reduce((s, i) => s + i.qty, 0)), label: 'Total Stock' },
            { icon: '🛒', num: String(cart.length), label: 'Cart Items' },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <span className="stat-number">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-main">

          {/* GRAPHICAL VIEW */}
          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Stock Overview - Graphical View</h2>
            <div className="flex-container">
              <div className="chart-container">
                <p className="chart-title">Stock by Category (Quantity)</p>
                <BarChartCanvas data={barData} />
              </div>
              <div className="chart-container">
                <p className="chart-title">Stock Status Distribution</p>
                <PieChartCanvas data={pieData} />
              </div>
            </div>
          </div>

          {/* STOCK MANAGEMENT */}
          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Stock Management</h2>

            {/* FIX 1: Grid with 3 columns — 4th card wraps to next row */}
            <div className="stock-management-grid">

              <div className="stock-card">
                <div className="icon">➕</div>
                <h3 className="card-title">Insert New Stock</h3>
                <p className="card-description">Add new packages, decorations or services to the stock database.</p>
                <button className="btn btn-gold" onClick={() => scrollToSection('insertStock')}>Add Stock</button>
              </div>

              <div className="stock-card">
                <div className="icon">✏️</div>
                <h3 className="card-title">Update Stock</h3>
                <p className="card-description">Edit and update existing stock details, prices and availability.</p>
                <button className="btn btn-gold" onClick={() => scrollToSection('updateStock')}>Update Stock</button>
              </div>

              <div className="stock-card">
                <div className="icon">🗑️</div>
                <h3 className="card-title">Delete Stock</h3>
                <p className="card-description">Remove outdated or unavailable items from the stock records.</p>
                <button className="btn btn-danger" onClick={() => scrollToSection('deleteStock')}>Delete Stock</button>
              </div>

              <div className="stock-card">
                <div className="icon">👁️</div>
                <h3 className="card-title">View All Stock</h3>
                <p className="card-description">Browse and view all available wedding packages and inventory items.</p>
                <button className="btn btn-gold" onClick={() => scrollToSection('viewStock')}>View Stock</button>
              </div>

            </div>
          </div>
          {/* FIX 2: Closed the dashboard-section div above, and fixed comment syntax below */}

          {/* INSERT STOCK */}
          <div className="dashboard-section" id="insertStock">
            <h2 className="dashboard-section-title">Insert New Stock</h2>
            {insertAlert && (
              <div className={`alert-box alert-${insertAlert.type === 'success' ? 'success' : 'error'}`}>
                {insertAlert.msg}
              </div>
            )}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input className="form-input" placeholder="Enter item name"
                  value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (PKR)</label>
                <input type="number" className="form-input" placeholder="Enter price"
                  value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-input" placeholder="Enter quantity"
                  value={newItem.qty} onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input" value={newItem.status}
                  onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}>
                  <option value="">Select Status</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-gold" onClick={handleInsert}>Add to Stock</button>
          </div>

          {/* UPDATE STOCK */}
          <div className="dashboard-section" id="updateStock">
            <h2 className="dashboard-section-title">Update Stock</h2>
            {updateAlert && (
              <div className={`alert-box alert-${updateAlert.type === 'success' ? 'success' : 'error'}`}>
                {updateAlert.msg}
              </div>
            )}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Stock ID</label>
                <input className="form-input" placeholder="e.g. ST-001"
                  value={upItem.id} onChange={(e) => setUpItem({ ...upItem, id: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input className="form-input" placeholder="Enter item name"
                  value={upItem.name} onChange={(e) => setUpItem({ ...upItem, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={upItem.category}
                  onChange={(e) => setUpItem({ ...upItem, category: e.target.value })}>
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (PKR)</label>
                <input type="number" className="form-input" placeholder="Enter new price"
                  value={upItem.price} onChange={(e) => setUpItem({ ...upItem, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-input" placeholder="Enter quantity"
                  value={upItem.qty} onChange={(e) => setUpItem({ ...upItem, qty: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input" value={upItem.status}
                  onChange={(e) => setUpItem({ ...upItem, status: e.target.value })}>
                  <option value="">Select Status</option>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-gold" onClick={handleUpdate}>Update Stock</button>
          </div>

          {/* DELETE STOCK */}
          <div className="dashboard-section" id="deleteStock">
            <h2 className="dashboard-section-title">Delete Stock</h2>
            {deleteAlert && (
              <div className={`alert-box alert-${deleteAlert.type === 'success' ? 'success' : 'error'}`}>
                {deleteAlert.msg}
              </div>
            )}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Stock ID to Delete</label>
                <input className="form-input" placeholder="e.g. ST-001"
                  value={delId} onChange={(e) => setDelId(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Item Name</label>
                <input className="form-input" placeholder="Enter item name to confirm"
                  value={delConfirm} onChange={(e) => setDelConfirm(e.target.value)} />
              </div>
            </div>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Stock</button>
          </div>

          {/* VIEW ALL STOCK */}
          <div className="dashboard-section" id="viewStock">
            <h2 className="dashboard-section-title">All Stock Records</h2>
            <div className="search-filter-bar">
              <input className="search-input" placeholder="Search stock by name..."
                value={search} onChange={(e) => setSearch(e.target.value)} />
              <select className="filter-select" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="filter-select" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                <option value="">All Prices</option>
                <option value="low">Under 100,000 PKR</option>
                <option value="mid">100,000 - 300,000 PKR</option>
                <option value="high">Above 300,000 PKR</option>
              </select>
              <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <table className="stock-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price (PKR)</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.qty}</td>
                    <td>
                      <span className={`status-badge ${badgeClass(item.status)}`}>{item.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-gold" onClick={() => fillEditForm(item)}>Edit</button>
                      <button className="btn btn-gold" onClick={() => addToCart(item)}>🛒</button>
                    </td>
                  </tr>
                ))}
                {filteredStock.length === 0 && (
                  <tr>
                    <td colSpan={7}>No stock items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CART */}
          {cart.length > 0 && (
            <div className="dashboard-section">
              <h2 className="dashboard-section-title">🛒 My Cart</h2>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price (PKR)</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price.toLocaleString()}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total: {cartTotal.toLocaleString()} PKR</p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}