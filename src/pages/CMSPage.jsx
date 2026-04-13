import { useState } from 'react'
import { Edit, GripVertical, Layout, Image, Grid, ShoppingBag, Tag, MapPin, Sparkles, Gift, Monitor, Cookie } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import { cmsModules } from '../data/mockData'

const moduleIcons = {
  carousel: Image,
  strip: Sparkles,
  grid: Grid,
  product_grid: ShoppingBag,
  banner: Tag,
  map: MapPin,
}

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState('Homepage Modules')
  const [modules, setModules] = useState(cmsModules)
  const tabs = ['Homepage Modules', 'About', 'Policy']

  const toggleModule = (id) => {
    setModules(modules.map(m =>
      m.id === id ? { ...m, active: !m.active } : m
    ))
  }

  return (
    <div>
      <div className="page-header">
        <h1>Content Management System</h1>
        <div className="page-header-actions">
          <button className="btn btn-outline">DISCARD CHANGES</button>
          <button className="btn btn-primary">PUBLISH STOREFRONT</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs section-mb">
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

      {activeTab === 'Homepage Modules' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Homepage Module Configuration</h3>
            <span style={{ fontSize: 13, color: '#9ca3af' }}>{modules.filter(m => m.active).length} active modules</span>
          </div>
          <div>
            {modules.map((module, index) => {
              const IconComponent = moduleIcons[module.type] || Layout
              return (
                <div
                  key={module.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: index < modules.length - 1 ? '1px solid #f3f4f6' : 'none',
                    gap: 16,
                    opacity: module.active ? 1 : 0.6,
                  }}
                >
                  <GripVertical size={18} style={{ color: '#d1d5db', cursor: 'grab', flexShrink: 0 }} />

                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: module.active ? '#fff0f0' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconComponent size={20} style={{ color: module.active ? '#C8102E' : '#9ca3af' }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{module.name}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {module.description}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <button
                      onClick={() => toggleModule(module.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <StatusBadge status={module.active ? 'Active' : 'Inactive'} small />
                    </button>
                    <button className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Edit size={14} /> EDIT SECTION
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'About' && (
        <div className="card">
          <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
            <Layout size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
            <h3 style={{ marginBottom: 8 }}>About Page Editor</h3>
            <p>Configure your storefront About page content here.</p>
          </div>
        </div>
      )}

      {activeTab === 'Policy' && (
        <div className="card">
          <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
            <Layout size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
            <h3 style={{ marginBottom: 8 }}>Policy Page Editor</h3>
            <p>Configure your storefront Policy pages here (Privacy, Terms, Returns).</p>
          </div>
        </div>
      )}
    </div>
  )
}
