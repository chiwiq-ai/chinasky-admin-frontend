import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Phone, TrendingUp, Shield, Truck, Clock, Plus, MoreHorizontal, Package } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import StatCard from '../components/common/StatCard'
import { suppliers } from '../data/mockData'

const categoryTabs = ['All', 'Fruits & Produce', 'Frozen & Seafood', 'Pantry & Dry Goods']

export default function SuppliersPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? suppliers
    : suppliers.filter(s => s.category === activeCategory)

  return (
    <div>
      <div className="page-header">
        <h1>Supplier Management</h1>
        <div className="page-header-actions">
          <button className="btn btn-primary"><Plus size={16} /> NEW SUPPLIER</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid section-mb">
        <StatCard title="Network Integrity" value="94.8%" icon={Shield} change={2.1} subtitle="vs last quarter" color="#10b981" />
        <StatCard title="Active Suppliers" value="142" icon={Truck} change={5.4} subtitle="in network" color="#6366f1" />
        <StatCard title="Pending Orders" value="08" icon={Clock} subtitle="awaiting fulfillment" color="#f59e0b" />
      </div>

      {/* Category Tabs */}
      <div className="tabs section-mb">
        {categoryTabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeCategory === tab ? 'active' : ''}`}
            onClick={() => setActiveCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Supplier Cards Grid */}
      <div className="grid-3">
        {filtered.map(supplier => {
          const perfData = supplier.performance.map((val, i) => ({ month: i, value: val }))
          return (
            <div key={supplier.id} className="supplier-card card">
              <div style={{ padding: 24 }}>
                {/* Image Placeholder & Rating */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Package size={24} style={{ color: '#9ca3af' }} />
                  </div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    background: '#fef3c7',
                    color: '#d97706',
                    padding: '4px 10px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                  }}>
                    <Star size={12} fill="#d97706" /> {supplier.rating}
                  </span>
                </div>

                {/* Name & Category */}
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{supplier.name}</h3>
                <span className="tag" style={{ marginBottom: 12, display: 'inline-block' }}>{supplier.category}</span>

                {/* Primary Contact */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
                  <Phone size={14} />
                  <span>{supplier.contact.name}</span>
                </div>

                {/* Performance Trend */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Performance Trend</div>
                  <div style={{ height: 40 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={perfData}>
                        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => navigate(`/suppliers/${supplier.id}`)}
                  >
                    VIEW PROFILE
                  </button>
                  <button className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
