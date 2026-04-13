import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Mail, Phone, Globe, CheckCircle, Clock, Star, MessageSquare } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import DataTable from '../components/common/DataTable'
import { suppliers, formatPrice } from '../data/mockData'

const fulfillmentChartData = [
  { month: 'Jan', fulfilled: 92, total: 100 },
  { month: 'Feb', fulfilled: 95, total: 100 },
  { month: 'Mar', fulfilled: 88, total: 100 },
  { month: 'Apr', fulfilled: 97, total: 100 },
  { month: 'May', fulfilled: 94, total: 100 },
  { month: 'Jun', fulfilled: 98, total: 100 },
]

const procurementHistory = [
  { id: 'PO-4821', date: '2026-04-08', items: 'Golden Penny Semovita 2kg x500', total: 1400000, status: 'Processing' },
  { id: 'PO-4790', date: '2026-04-02', items: 'Dangote Sugar 1kg x1000', total: 900000, status: 'Delivered' },
  { id: 'PO-4756', date: '2026-03-25', items: 'Palm Oil 5L x200', total: 1200000, status: 'Delivered' },
  { id: 'PO-4710', date: '2026-03-18', items: 'Indomie Noodles 40pk x300', total: 1950000, status: 'Delivered' },
  { id: 'PO-4685', date: '2026-03-10', items: 'Golden Penny Semovita 2kg x400', total: 1120000, status: 'Delivered' },
]

export default function SupplierDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const supplier = suppliers.find(s => s.id === id) || suppliers[0]

  const procurementColumns = [
    { header: 'Order ID', key: 'id' },
    { header: 'Date', key: 'date' },
    { header: 'Items', key: 'items' },
    { header: 'Total', render: (row) => <span style={{ fontWeight: 600 }}>{formatPrice(row.total)}</span> },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} small /> },
  ]

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/suppliers')}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 style={{ marginBottom: 4 }}>{supplier.name}</h1>
            <span className="tag">{supplier.category}</span>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline"><Edit size={16} /> EDIT SUPPLIER</button>
          <button className="btn btn-primary"><MessageSquare size={16} /> MESSAGE SUPPLIER</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid section-mb">
        <StatCard title="Fulfillment Rate" value={`${supplier.fulfillmentRate}%`} icon={CheckCircle} change={2.4} subtitle="vs last quarter" color="#10b981" />
        <StatCard title="Avg Lead Time" value="2.4 Days" icon={Clock} change={-8.5} subtitle="improving" color="#6366f1" />
        <StatCard title="Quality Score" value={`4.9/5.0`} icon={Star} change={1.2} subtitle="vs last quarter" color="#f59e0b" />
      </div>

      {/* 2-column layout */}
      <div className="grid-2 section-mb">
        {/* Left: Company Info */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Company Information</h3>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Legal Entity</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{supplier.name} Plc</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Contact</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{supplier.contact.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', marginBottom: 4 }}>
                <Mail size={14} /> {supplier.contact.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280' }}>
                <Phone size={14} /> {supplier.contact.phone}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Website</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: '#2563eb' }}>
                <Globe size={14} /> www.{supplier.name.toLowerCase().replace(/\s+/g, '')}.ng
              </div>
            </div>

            {/* Fulfillment Consistency */}
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Fulfillment Consistency</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {['On-Time', 'Complete', 'Quality'].map((label, i) => {
                  const values = [96.5, 98.2, 99.1]
                  return (
                    <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981', marginBottom: 4 }}>{values[i]}%</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Monthly Fulfillment Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Monthly Fulfillment Performance</h3>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fulfillmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value}%`, 'Fulfillment']}
                  />
                  <Bar dataKey="fulfilled" fill="#C8102E" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Procurement History */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Procurement History</h3>
        </div>
        <DataTable columns={procurementColumns} data={procurementHistory} />
      </div>
    </div>
  )
}
