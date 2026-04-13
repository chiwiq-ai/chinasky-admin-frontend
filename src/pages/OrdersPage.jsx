import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Download, Plus, CheckCircle, Clock, Package } from 'lucide-react'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import { formatPrice, orders } from '../data/mockData'

export default function OrdersPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ALL ORDERS')
  const [search, setSearch] = useState('')

  const tabs = ['ALL ORDERS', 'PENDING', 'PROCESSING', 'SHIPPED']

  const filtered = orders.filter(order => {
    if (activeTab !== 'ALL ORDERS' && order.status.toUpperCase() !== activeTab) return false
    if (search) {
      const q = search.toLowerCase()
      if (!order.id.toLowerCase().includes(q) && !order.customer.name.toLowerCase().includes(q)) return false
    }
    return true
  })

  const columns = [
    { header: 'Order ID', render: (row) => <span style={{ fontWeight: 600, color: '#C8102E' }}>{row.id}</span> },
    {
      header: 'Customer',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar" style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: '#6b7280',
            flexShrink: 0,
          }}>
            {row.customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <span style={{ fontSize: 13 }}>{row.customer.name}</span>
        </div>
      ),
    },
    { header: 'Qty', render: (row) => row.qty },
    { header: 'Date', key: 'date' },
    { header: 'Total', render: (row) => <span style={{ fontWeight: 600 }}>{formatPrice(row.total)}</span> },
    { header: 'Delivery', key: 'delivery' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    {
      header: 'Actions',
      render: (row) => (
        <button
          className="btn btn-sm btn-outline"
          onClick={(e) => { e.stopPropagation(); navigate(`/orders/${row.id}`) }}
        >
          View
        </button>
      ),
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Orders</h1>
        <div className="page-header-actions">
          <button className="btn btn-secondary"><Download size={16} /> EXPORT CSV</button>
          <Link to="/orders/manual" className="btn btn-primary"><Plus size={16} /> CREATE MANUAL ORDER</Link>
        </div>
      </div>

      {/* Fulfillment Report */}
      <div className="card section-mb">
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Fulfillment Report</h3>
        <div className="grid-3">
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <CheckCircle size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Efficiency</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>94.2<span style={{ fontSize: 14, fontWeight: 400, color: '#9ca3af' }}>%</span></div>
          </div>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <Clock size={18} style={{ color: '#6366f1' }} />
              <span style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Avg Pickup Time</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>14<span style={{ fontSize: 14, fontWeight: 400, color: '#9ca3af' }}>m</span></div>
          </div>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <Package size={18} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Orders Queued</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>88</div>
          </div>
        </div>
      </div>

      {/* Tabs + Table */}
      <div className="card">
        <div className="tabs" style={{ marginBottom: 16 }}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="search-input-wrapper">
            <Search size={16} />
            <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" />
          </div>
        </div>

        <DataTable columns={columns} data={filtered} onRowClick={(row) => navigate(`/orders/${row.id}`)} />
      </div>
    </div>
  )
}
