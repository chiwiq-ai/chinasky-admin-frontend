import { Link } from 'react-router-dom'
import { Plus, Zap, Tag, Clock, Copy, TrendingUp, Activity } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import { pricingRules, coupons, formatPrice } from '../data/mockData'

export default function PricingPage() {
  const coupon = coupons[0]

  return (
    <div>
      <div className="page-header">
        <h1>Dynamic Pricing Engine</h1>
        <div className="page-header-actions">
          <Link to="/pricing/new" className="btn btn-primary">
            <Plus size={18} /> CREATE NEW RULE
          </Link>
        </div>
      </div>

      {/* Pricing Health Score */}
      <div className="card section-mb" style={{ background: 'linear-gradient(135deg, #1a1625 0%, #2d2640 100%)', color: '#fff' }}>
        <div style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pricing Health Score</div>
            <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1 }}>94<span style={{ fontSize: 32, fontWeight: 600 }}>%</span></div>
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Activity size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Active Rules</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>142</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <TrendingUp size={16} style={{ color: '#10b981' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Revenue Trend</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>+12.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Rules Grid */}
      <div className="section-mb">
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Active Pricing Rules</h2>
        <div className="grid-3">
          {pricingRules.map(rule => (
            <div key={rule.id} className="card">
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rule.type === 'Percentage' ? <Tag size={20} style={{ color: '#C8102E' }} /> :
                     rule.type === 'BOGO' ? <Zap size={20} style={{ color: '#C8102E' }} /> :
                     <Clock size={20} style={{ color: '#C8102E' }} />}
                  </div>
                  <StatusBadge status={rule.status} small />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{rule.name}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>{rule.scope} — {rule.schedule}</p>

                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 16 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#C8102E' }}>
                    {rule.type === 'Fixed' ? formatPrice(rule.discount) : `${rule.discount}%`}
                  </span>
                  <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 8 }}>
                    {rule.type === 'BOGO' ? 'BOGO' : 'discount'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span className="tag">{rule.scope}</span>
                </div>

                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>
                  <Clock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  {rule.schedule}
                </div>

                <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>MODIFY RULE</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon Code Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Active Coupon Codes</h3>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: '#f3f4f6', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '2px', fontFamily: 'monospace' }}>{coupon.code}</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}>
                  <Copy size={16} />
                </button>
              </div>
              <StatusBadge status={coupon.status} />
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Discount</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{coupon.type === 'Percentage' ? `${coupon.discount}%` : formatPrice(coupon.discount)}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Usage</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{coupon.usageCount} / {coupon.maxUsage}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Usage Rate</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{((coupon.usageCount / coupon.maxUsage) * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Expires</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{coupon.expiryDate}</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
