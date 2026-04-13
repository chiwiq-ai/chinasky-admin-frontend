import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Package, AlertTriangle, Brain, Truck, Download, RefreshCw } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import { formatPrice, inventory, categories } from '../data/mockData'

export default function InventoryPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const filtered = inventory.filter(item => {
    const q = search.toLowerCase()
    if (search && !item.name.toLowerCase().includes(q) && !item.sku.toLowerCase().includes(q)) return false
    if (category && item.category !== category) return false
    if (status && item.status !== status) return false
    return true
  })

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock').length

  const columns = [
    {
      header: 'Product',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Package size={18} style={{ color: '#9ca3af' }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{row.name}</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>{row.sku}</div>
          </div>
        </div>
      ),
    },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    {
      header: 'Category & Sub',
      render: (row) => (
        <div>
          <div style={{ fontSize: 13 }}>{row.category}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>{row.subcategory || row.subCategory}</div>
        </div>
      ),
    },
    { header: 'Supplier', key: 'supplier' },
    { header: 'Brand', key: 'brand' },
    { header: 'Current', render: (row) => (row.currentStock ?? row.current ?? 0).toLocaleString() },
    { header: 'Reserved', render: (row) => (row.reserved ?? 0).toLocaleString() },
    { header: 'Available', render: (row) => { const avail = row.available ?? 0; return <span style={{ fontWeight: 600, color: avail < 50 ? '#ef4444' : '#10b981' }}>{avail.toLocaleString()}</span> } },
    {
      header: 'Actions',
      render: (row) => (
        <button
          className="btn btn-sm btn-outline"
          onClick={(e) => { e.stopPropagation(); navigate(`/inventory/${row.id}`) }}
        >
          View
        </button>
      ),
    },
  ]

  const logisticsUpdates = [
    { id: 1, message: 'Shipment from Flour Mills Nigeria arrived - 2,000 units of Golden Penny Semovita', time: '2 hours ago', type: 'arrival' },
    { id: 2, message: 'Reorder placed for Samsung Galaxy A15 - 50 units from Samsung Nigeria', time: '5 hours ago', type: 'reorder' },
    { id: 3, message: 'Quality check completed for Indomie Noodles batch #4521 - All passed', time: '1 day ago', type: 'quality' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Inventory Management</h1>
        <div className="page-header-actions">
          <button className="btn btn-secondary"><RefreshCw size={16} /> UPDATE STOCK</button>
          <button className="btn btn-primary"><Download size={16} /> DOWNLOAD REPORT</button>
        </div>
      </div>

      <div className="stats-grid stats-grid-3">
        <StatCard title="Total Valuation" value="₦2.4M" icon={Package} />
        <StatCard title="Active Products" value="842" icon={Package} />
        <StatCard title="Low Stock Alerts" value={lowStockCount} icon={AlertTriangle} color="#f59e0b" />
      </div>

      <div className="card section-mb">
        <div className="filters-row">
          <div className="search-input-wrapper">
            <Search size={16} />
            <input type="text" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" />
          </div>
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <DataTable columns={columns} data={filtered} onRowClick={(row) => navigate(`/inventory/${row.id}`)} />
      </div>

      <div className="grid-2">
        {/* Recent Logistics Updates */}
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Recent Logistics Updates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {logisticsUpdates.map(update => (
              <div key={update.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: update.type === 'arrival' ? '#dcfce7' : update.type === 'reorder' ? '#dbeafe' : '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Truck size={16} style={{ color: update.type === 'arrival' ? '#16a34a' : update.type === 'reorder' ? '#2563eb' : '#d97706' }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.4 }}>{update.message}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{update.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Optimization AI Card */}
        <div style={{
          background: 'linear-gradient(135deg, #C8102E, #ff6b35)',
          borderRadius: 12,
          padding: 24,
          color: '#ffffff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Brain size={24} />
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Stock Optimization AI</h3>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9, marginBottom: 16 }}>
            Based on current sales velocity and seasonal patterns, we recommend increasing your Groceries category stock by 25% ahead of the upcoming holiday period. This could prevent an estimated 340 missed sales worth ₦1.2M in revenue.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>
            Priority items: Golden Penny Semovita, Palm Oil 5L, Indomie Noodles 40-pack. Current lead times suggest placing orders within the next 48 hours for optimal delivery timing.
          </p>
          <button style={{
            marginTop: 12,
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            View Full AI Report
          </button>
        </div>
      </div>
    </div>
  )
}
