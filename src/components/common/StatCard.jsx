import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ title, value, icon: Icon, trend, trendUp, color, subtitle }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: color || '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={18} style={{ color: color ? '#fff' : '#6b7280' }} />
          </div>
        )}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1625' }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {trend && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            fontSize: 12,
            fontWeight: 600,
            color: trendUp ? '#10b981' : '#ef4444',
          }}>
            {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend}
          </span>
        )}
        {subtitle && (
          <span style={{ fontSize: 12, color: '#9ca3af' }}>{subtitle}</span>
        )}
      </div>
    </div>
  )
}
