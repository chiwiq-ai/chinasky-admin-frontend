import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Users, Heart, AlertTriangle, UserPlus, ShoppingCart, Bold, Italic, Underline, Smile, Image } from 'lucide-react'

const segments = [
  { id: 'all', name: 'All Users', description: 'Target your entire user base', count: '42,850', icon: Users, color: '#6366f1' },
  { id: 'loyal', name: 'Loyals', description: 'High-value repeat customers', count: '8,402', icon: Heart, color: '#C8102E' },
  { id: 'at-risk', name: 'At Risk', description: 'Users showing churn signals', count: '1,245', icon: AlertTriangle, color: '#f59e0b' },
  { id: 'new', name: 'New Users', description: 'Registered in the last 30 days', count: '3,680', icon: UserPlus, color: '#10b981' },
  { id: 'abandoned', name: 'Abandoned Cart Recovery', description: 'Users with items left in cart', count: '892', icon: ShoppingCart, color: '#8b5cf6' },
]

export default function CreateCampaignPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', type: 'Email', subject: '', segment: '', content: '',
    scheduleDate: '', scheduleTime: '',
    ruleType: 'Percentage Discount', couponCode: '', discountType: 'Percentage',
    discountValue: '', minPurchase: '', totalUsageLimit: '', limitPerUser: '',
  })

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const selectedSegment = segments.find(s => s.id === form.segment)

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/marketing" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={16} /> CANCEL
          </Link>
          <h1>Create Marketing Campaign</h1>
        </div>
        <button className="btn btn-primary" onClick={() => { alert('Campaign launched!'); navigate('/marketing') }}>
          LAUNCH CAMPAIGN
        </button>
      </div>

      <div className="grid-2-1">
        {/* Left side - 2/3 */}
        <div>
          {/* General Information */}
          <div className="card section-mb">
            <h3 className="card-title" style={{ marginBottom: 20 }}>General Information</h3>
            <div className="form-group">
              <label className="form-label">Campaign Name</label>
              <input className="form-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Enter campaign name" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Campaign Type</label>
                <select className="form-select" value={form.type} onChange={e => handleChange('type', e.target.value)}>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="Push">Push Notification</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Subject Line</label>
                <input className="form-input" value={form.subject} onChange={e => handleChange('subject', e.target.value)} placeholder="Email subject line" />
              </div>
            </div>
          </div>

          {/* Targeting & Segmentation */}
          <div className="card section-mb">
            <h3 className="card-title" style={{ marginBottom: 20 }}>Targeting & Segmentation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {segments.map(seg => (
                <div
                  key={seg.id}
                  onClick={() => handleChange('segment', seg.id)}
                  style={{
                    padding: 16, borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                    border: form.segment === seg.id ? `2px solid ${seg.color}` : '1px solid #e5e7eb',
                    background: form.segment === seg.id ? `${seg.color}10` : '#fff',
                    transition: 'all 0.2s',
                  }}
                >
                  <seg.icon size={24} style={{ color: seg.color, marginBottom: 8 }} />
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{seg.name}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.4 }}>{seg.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Content */}
          <div className="card section-mb">
            <h3 className="card-title" style={{ marginBottom: 20 }}>Message Content</h3>
            <div style={{ display: 'flex', gap: 8, padding: '8px 12px', borderRadius: '8px 8px 0 0', border: '1px solid #e5e7eb', borderBottom: 'none', background: '#f9fafb' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4, color: '#6b7280' }} title="Bold"><Bold size={16} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4, color: '#6b7280' }} title="Italic"><Italic size={16} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4, color: '#6b7280' }} title="Underline"><Underline size={16} /></button>
              <div style={{ width: 1, background: '#e5e7eb', margin: '0 4px' }} />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4, color: '#6b7280' }} title="Emoji"><Smile size={16} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4, color: '#6b7280' }} title="Image"><Image size={16} /></button>
            </div>
            <textarea
              className="form-textarea"
              value={form.content}
              onChange={e => handleChange('content', e.target.value)}
              rows={8}
              placeholder="Write your campaign message here..."
              style={{ borderRadius: '0 0 8px 8px', borderTop: 'none' }}
            />
          </div>

          {/* Launch Schedule */}
          <div className="card section-mb">
            <h3 className="card-title" style={{ marginBottom: 20 }}>Launch Schedule</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="form-input" type="date" value={form.scheduleDate} onChange={e => handleChange('scheduleDate', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input className="form-input" type="time" value={form.scheduleTime} onChange={e => handleChange('scheduleTime', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - 1/3 */}
        <div>
          {/* Campaign Summary */}
          <div className="card section-mb" style={{ position: 'sticky', top: 88 }}>
            <h3 className="card-title" style={{ marginBottom: 20 }}>Campaign Summary</h3>
            <div style={{ display: 'grid', gap: 12, fontSize: 13 }}>
              {[
                ['Campaign Type', form.type],
                ['Estimated Reach', '12,482 Customers'],
                ['Target Segments', selectedSegment?.name || '-'],
                ['Success Rate Prediction', '84.2%'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#9ca3af' }}>{label}</span>
                  <span style={{ fontWeight: 600, color: label === 'Success Rate Prediction' ? '#10b981' : '#1a1625' }}>{value}</span>
                </div>
              ))}
            </div>
            {selectedSegment && (
              <div style={{ marginTop: 16, padding: 12, background: '#f9fafb', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Selected Audience</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedSegment.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{selectedSegment.count} users</div>
              </div>
            )}
          </div>

          {/* Incentives/Discount */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 20 }}>Incentives / Discount</h3>
            <div className="form-group">
              <label className="form-label">Rule Type</label>
              <select className="form-select" value={form.ruleType} onChange={e => handleChange('ruleType', e.target.value)}>
                <option value="Percentage Discount">Percentage Discount</option>
                <option value="Fixed Discount">Fixed Amount Discount</option>
                <option value="Free Shipping">Free Shipping</option>
                <option value="BOGO">Buy One Get One</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Coupon Code</label>
              <input className="form-input" value={form.couponCode} onChange={e => handleChange('couponCode', e.target.value)} placeholder="e.g. SPRING2026" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Discount Type</label>
                <select className="form-select" value={form.discountType} onChange={e => handleChange('discountType', e.target.value)}>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed Amount</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Discount Value</label>
                <input className="form-input" type="number" value={form.discountValue} onChange={e => handleChange('discountValue', e.target.value)} placeholder="0" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Min Purchase Requirement</label>
              <input className="form-input" type="number" value={form.minPurchase} onChange={e => handleChange('minPurchase', e.target.value)} placeholder="₦0" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Total Usage Limit</label>
                <input className="form-input" type="number" value={form.totalUsageLimit} onChange={e => handleChange('totalUsageLimit', e.target.value)} placeholder="1000" />
              </div>
              <div className="form-group">
                <label className="form-label">Limit Per User</label>
                <input className="form-input" type="number" value={form.limitPerUser} onChange={e => handleChange('limitPerUser', e.target.value)} placeholder="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
