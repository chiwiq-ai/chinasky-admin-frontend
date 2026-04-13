import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Mail, Phone, Calendar, ShoppingBag, DollarSign, Brain, MessageSquare, User } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import DataTable from '../components/common/DataTable'
import { customers, orders, formatPrice } from '../data/mockData'

export default function CustomerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const customer = customers.find(c => c.id === id) || customers[0]
  const customerOrders = orders.filter(o =>
    o.customer.email === customer.email
  )

  const purchaseColumns = [
    { header: 'Order ID', key: 'id' },
    { header: 'Date', key: 'date' },
    { header: 'Items', render: (row) => `${row.qty} items` },
    { header: 'Total', render: (row) => <span style={{ fontWeight: 600 }}>{formatPrice(row.total)}</span> },
    { header: 'Delivery', key: 'delivery' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} small /> },
  ]

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/crm')}>
            <ArrowLeft size={16} />
          </button>
          <h1>Customer Detail</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline" onClick={() => navigate('/crm')}>BACK</button>
          <button className="btn btn-primary"><MessageSquare size={16} /> MESSAGE CUSTOMER</button>
        </div>
      </div>

      {/* Customer Header */}
      <div className="card section-mb">
        <div style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="avatar" style={{ width: 64, height: 64, borderRadius: '50%', background: '#C8102E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>
            {customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{customer.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#6b7280', fontSize: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {customer.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={14} /> {customer.id}</span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <StatusBadge status={customer.status} />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid section-mb">
        <StatCard title="Total Spend" value={formatPrice(customer.totalSpend)} icon={DollarSign} color="#C8102E" />
        <StatCard title="Order Count" value={customerOrders.length || '0'} icon={ShoppingBag} color="#6366f1" />
        <StatCard title="Avg Order Value" value={formatPrice(customer.aov)} icon={DollarSign} color="#10b981" />
        <StatCard title="Last Visit" value={customer.lastVisit} icon={Calendar} color="#f59e0b" />
      </div>

      {/* AI Behavioral Insights */}
      <div className="card section-mb" style={{ background: '#1a1625', color: '#fff' }}>
        <div className="card-header" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <h3 className="card-title" style={{ color: '#fff' }}><Brain size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />AI Behavioral Insights</h3>
        </div>
        <div style={{ padding: 24 }}>
          <div className="grid-2">
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12, fontWeight: 500 }}>Customer Segments</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(customer.segments || ['High Value', 'Frequent Buyer', 'Groceries Lover']).map((seg, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
                    {seg}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 12, fontWeight: 500 }}>Customer Loyalty Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 700 }}>82/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Identity Info */}
      <div className="card section-mb">
        <div className="card-header">
          <h3 className="card-title">Customer Identity</h3>
        </div>
        <div style={{ padding: 24 }}>
          <div className="grid-3">
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Full Name</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{customer.name}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Email Address</div>
              <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} style={{ color: '#6b7280' }} /> {customer.email}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Phone Number</div>
              <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} style={{ color: '#6b7280' }} /> {customer.phone || 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Location</div>
              <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} style={{ color: '#6b7280' }} /> {customer.location}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Status</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}><StatusBadge status={customer.status} /></div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Last Visit</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{customer.lastVisit}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Purchase History</h3>
        </div>
        <DataTable
          columns={purchaseColumns}
          data={customerOrders.length > 0 ? customerOrders : orders.slice(0, 4)}
        />
      </div>
    </div>
  )
}
