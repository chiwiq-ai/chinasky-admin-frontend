import { Link } from 'react-router-dom'
import { Plus, Megaphone, DollarSign, ShoppingCart, TrendingUp, Eye, Edit2 } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import { campaigns } from '../data/mockData'

const campaignTableData = [
  { id: 1, name: 'Spring Sale Announcement', type: 'Email', discount: '15%', segment: 'All Users', status: 'Active', reach: '42,850', conversion: '8.5%', actions: true },
  { id: 2, name: 'Abandoned Cart Recovery', type: 'SMS', discount: '₦500 off', segment: 'Abandoned Cart', status: 'Active', reach: '1,240', conversion: '12.3%', actions: true },
  { id: 3, name: 'New Arrivals - Electronics', type: 'Push', discount: '10%', segment: 'All Users', status: 'Active', reach: '38,500', conversion: '6.8%', actions: true },
  { id: 4, name: 'Loyalty Reward Reminder', type: 'Email', discount: '20%', segment: 'Loyals', status: 'Paused', reach: '8,402', conversion: '22.1%', actions: true },
  { id: 5, name: 'Weekend Flash Sale', type: 'Push', discount: '25%', segment: 'All Users', status: 'Active', reach: '42,850', conversion: '9.2%', actions: true },
  { id: 6, name: 'Re-engagement Offer', type: 'Email', discount: '₦1,000 off', segment: 'At Risk', status: 'Active', reach: '1,245', conversion: '5.4%', actions: true },
]

const typeColors = {
  Email: { bg: '#dbeafe', color: '#2563eb' },
  SMS: { bg: '#dcfce7', color: '#16a34a' },
  Push: { bg: '#e0e7ff', color: '#6366f1' },
}

export default function MarketingPage() {
  return (
    <div>
      <div className="page-header">
        <h1>Marketing Overview</h1>
        <Link to="/marketing/campaign/new" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <Plus size={16} /> CREATE CAMPAIGN
        </Link>
      </div>

      <div className="stats-grid section-mb">
        <StatCard title="Active Campaigns" value="12" icon={Megaphone} color="#6366f1" />
        <StatCard title="Marketing Revenue" value="₦4.2M" icon={DollarSign} color="#C8102E" />
        <StatCard title="Recovered Carts" value="₦1.8M" icon={ShoppingCart} color="#10b981" />
        <StatCard title="ROI" value="5.4x" icon={TrendingUp} highlight />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Active Campaigns</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Campaign Name', 'Type', 'Discount', 'Segment', 'Status', 'Reach', 'Conversion', 'Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 12, fontWeight: 600,
                    color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: '#1a1625', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaignTableData.map((row) => {
                const tc = typeColors[row.type] || typeColors.Email
                return (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 14 }}>{row.name}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: tc.bg, color: tc.color }}>
                        {row.type}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13 }}>{row.discount}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280' }}>{row.segment}</td>
                    <td style={{ padding: '14px 16px' }}><StatusBadge status={row.status} /></td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 500 }}>{row.reach}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#10b981' }}>{row.conversion}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-sm btn-outline" style={{ padding: '4px 8px' }}><Eye size={14} /></button>
                        <button className="btn btn-sm btn-outline" style={{ padding: '4px 8px' }}><Edit2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
