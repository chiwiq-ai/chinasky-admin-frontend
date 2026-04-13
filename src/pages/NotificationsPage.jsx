import { useState } from 'react'
import { Bell, AlertTriangle, ShoppingCart, CreditCard, Info, Check } from 'lucide-react'
import { notifications as initialNotifications } from '../data/mockData'

const typeIcons = {
  'Low Stock': AlertTriangle,
  'New Order': ShoppingCart,
  'Abandoned Cart': ShoppingCart,
  'Payment Failed': CreditCard,
  'Other': Info,
}

const typeColors = {
  'Low Stock': { bg: '#fef3c7', color: '#d97706', border: '#f59e0b' },
  'New Order': { bg: '#dcfce7', color: '#16a34a', border: '#10b981' },
  'Abandoned Cart': { bg: '#e0e7ff', color: '#6366f1', border: '#6366f1' },
  'Payment Failed': { bg: '#fee2e2', color: '#dc2626', border: '#ef4444' },
  'Other': { bg: '#f3f4f6', color: '#6b7280', border: '#9ca3af' },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Low Stock', 'New Order', 'Abandoned Cart', 'Payment Failed', 'Other']

  const filtered = activeFilter === 'All' ? notifications : notifications.filter(n => n.type === activeFilter)

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div>
      <div className="page-header">
        <h1>Notifications Center</h1>
        <button className="btn btn-secondary" onClick={markAllRead}>
          <Check size={16} /> Mark as Read
        </button>
      </div>

      <div className="tabs section-mb">
        {filters.map(f => (
          <button key={f} className={`tab ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
            {f}
            {f !== 'All' && (
              <span style={{
                marginLeft: 6, padding: '1px 6px', borderRadius: 10, fontSize: 10,
                fontWeight: 600, background: activeFilter === f ? '#C8102E' : '#e5e7eb',
                color: activeFilter === f ? '#fff' : '#6b7280',
              }}>
                {notifications.filter(n => n.type === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        {filtered.map(notif => {
          const Icon = typeIcons[notif.type] || Info
          const colors = typeColors[notif.type] || typeColors['Other']
          return (
            <div
              key={notif.id}
              onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20,
                background: notif.read ? '#ffffff' : '#fefce8', borderRadius: 12,
                border: '1px solid #e5e7eb', cursor: 'pointer',
                borderLeft: `4px solid ${colors.border}`,
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: colors.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={20} style={{ color: colors.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{
                    padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: colors.bg, color: colors.color, textTransform: 'uppercase',
                  }}>
                    {notif.type}
                  </span>
                  {!notif.read && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8102E' }} />
                  )}
                </div>
                <p style={{ fontSize: 14, color: '#374151', marginBottom: 6, lineHeight: 1.5, fontWeight: notif.read ? 400 : 500 }}>
                  {notif.message}
                </p>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{notif.time}</span>
              </div>
              <div style={{
                width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 6,
                background: notif.read ? '#e5e7eb' : '#C8102E',
              }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
