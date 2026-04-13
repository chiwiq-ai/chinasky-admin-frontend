import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Users, MapPin, Heart, AlertTriangle, Eye, Download, Plus } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import { customers, formatPrice } from '../data/mockData'

export default function CRMPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const locations = ['All', ...new Set(customers.map(c => c.location))]
  const statuses = ['All', 'Loyal', 'New', 'At Risk', 'Churned']

  const filtered = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === 'All' || c.location === locationFilter
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter
    return matchesSearch && matchesLocation && matchesStatus
  })

  const columns = [
    {
      header: 'Customer Identity',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar" style={{ width: 36, height: 36, borderRadius: '50%', background: '#C8102E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{row.name}</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} small />,
    },
    {
      header: 'Last Visit',
      key: 'lastVisit',
    },
    {
      header: 'Location',
      key: 'location',
    },
    {
      header: 'AOV',
      render: (row) => formatPrice(row.aov),
    },
    {
      header: 'Total Spend',
      render: (row) => <span style={{ fontWeight: 600 }}>{formatPrice(row.totalSpend)}</span>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <button className="btn btn-outline btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/crm/${row.id}`) }} style={{ padding: '6px 10px' }}>
          <Eye size={14} />
        </button>
      ),
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Customer Intelligence</h1>
        <div className="page-header-actions">
          <button className="btn btn-outline"><Download size={16} /> EXPORT REPORT</button>
          <button className="btn btn-primary"><Plus size={16} /> NEW CAMPAIGN</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid section-mb">
        <StatCard title="Total Users" value="42,850" icon={Users} change={5.2} subtitle="vs last month" color="#6366f1" />
        <StatCard title="Top Location" value="Lagos" icon={MapPin} subtitle="38% of total users" color="#10b981" />
        <StatCard title="Loyalists" value="8,402" icon={Heart} change={3.8} subtitle="active members" color="#C8102E" />
      </div>

      {/* Urgent Attention */}
      <div className="card section-mb" style={{ borderLeft: '4px solid #f59e0b' }}>
        <div style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={22} style={{ color: '#d97706' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Urgent Attention</span>
                <StatusBadge status="At Risk" small />
              </div>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>423 members haven't visited in 45+ days. Activate a win-back campaign to re-engage.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm">TRIGGER WIN-BACK</button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row section-mb">
        <div className="search-input-wrapper" style={{ flex: 1 }}>
          <Search size={18} />
          <input className="form-input" placeholder="Search customers by name or email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <select className="form-select" style={{ width: 180 }} value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
          ))}
        </select>
        <select className="form-select" style={{ width: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {statuses.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
          ))}
        </select>
      </div>

      {/* Customer Table */}
      <div className="card">
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={(row) => navigate(`/crm/${row.id}`)}
        />
      </div>
    </div>
  )
}
