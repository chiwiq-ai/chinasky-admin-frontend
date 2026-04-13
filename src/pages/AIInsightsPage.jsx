import { useState } from 'react'
import { Brain, Send, TrendingUp, TrendingDown, Minus, Package, DollarSign, AlertTriangle, BarChart3, Zap, Users, ArrowRight } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import { aiInsights, formatPrice } from '../data/mockData'

const quickPrompts = [
  'Predict holiday demand',
  'Optimize produce pricing',
  'Analyze customer churn',
  'Suggest bundle deals',
]

const priorityRecommendations = [
  {
    title: 'Revenue Optimization',
    description: 'Competitor analysis shows 8% margin opportunity on cooking oils. Adjust Palm Oil pricing from ₦7,800 to ₦8,400 for a projected ₦380K monthly uplift.',
    severity: 'High',
    category: 'Revenue',
    icon: DollarSign,
    color: '#C8102E',
  },
  {
    title: 'Inventory Alert',
    description: 'Samsung Galaxy A15 stock at 37 units with current velocity of 12 units/day. Reorder immediately to avoid stockout within 3 days.',
    severity: 'High',
    category: 'Inventory',
    icon: Package,
    color: '#f59e0b',
  },
  {
    title: 'Customer Retention',
    description: '1,245 customers flagged as at-risk. Implement targeted 15% discount campaign to recover estimated ₦2.4M in potential lost revenue.',
    severity: 'Medium',
    category: 'CRM',
    icon: Users,
    color: '#6366f1',
  },
]

const categoryVelocity = [
  { name: 'Grains & Flour', change: 16, color: '#10b981' },
  { name: 'Household Goods', change: -2, color: '#ef4444' },
  { name: 'Beverages', change: -6, color: '#ef4444' },
]

export default function AIInsightsPage() {
  const [query, setQuery] = useState('How should I prepare inventory for the upcoming festive period in Lagos Metro?')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = () => {
    if (!query.trim()) return
    setLoading(true)
    setTimeout(() => {
      setAiResponse(`Based on historical Lagos Metro festive season data and current market trends, here are my strategic recommendations:

**Lagos Metro Festive Period Analysis**

1. **Demand Surge Forecast**: Expect a 35-45% increase in grocery demand, particularly in Grains & Flour (+42%), Cooking Oils (+38%), and Beverages (+52%) categories across Ikeja, Lekki, and Victoria Island.

2. **Inventory Pre-positioning**: Begin stocking high-velocity items 3 weeks before the festive period. Priority items include Golden Penny Semovita (project 2,400 units), Indomie Noodles (1,800 packs), and Palm Oil (950 jerrycans).

3. **Pricing Strategy**: Maintain current pricing on staples to drive traffic, but implement 8-12% premium on imported specialty items where price sensitivity is lower.

4. **Logistics Preparation**: Coordinate with 3 additional last-mile delivery partners in Lagos Metro to handle the projected 60% increase in doorstep delivery orders.

5. **Marketing Activation**: Launch "Festive Feast" email campaign 2 weeks prior targeting 42,850 subscribers with early-bird bundle offers.`)
      setLoading(false)
    }, 1500)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>AI Strategic Insights</h1>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: '#dcfce7', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
            LIVE ENGINE
          </span>
        </div>
      </div>

      {/* AI Strategy Assistant */}
      <div className="card section-mb" style={{ background: '#1a1625', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(200,16,46,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={22} style={{ color: '#C8102E' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', margin: 0 }}>AI Strategy Assistant</h3>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Powered by predictive analytics</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: aiResponse ? 20 : 0 }}>
          <input
            style={{
              flex: 1, padding: '14px 16px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
              color: 'white', fontSize: 14, outline: 'none',
            }}
            placeholder="Ask AI about your business strategy, inventory, pricing..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{
              minWidth: 110, padding: '12px 20px', borderRadius: 10, border: 'none',
              background: '#C8102E', color: 'white', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Thinking...' : <><Send size={16} /> Ask AI</>}
          </button>
        </div>
        {aiResponse && (
          <div style={{
            background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 24,
            whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {aiResponse}
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => { setQuery(prompt); }}
            style={{
              padding: '8px 16px', borderRadius: 20, border: '1px solid #e5e7eb',
              background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <Zap size={14} style={{ color: '#C8102E' }} />
            {prompt}
          </button>
        ))}
      </div>

      {/* Forecast Stats */}
      <div className="stats-grid stats-grid-3 section-mb">
        <StatCard title="Next 30 Days Forecast" value={formatPrice(aiInsights.forecast30Day)} icon={BarChart3} color="#6366f1" change={8.5} subtitle="vs previous period" />
        <StatCard title="Volume Projection" value={aiInsights.volumeProjection.toLocaleString()} icon={Package} change={12.3} subtitle="orders expected" />
        <StatCard title="Immediate Stock Needs" value={`${aiInsights.immediateStockNeeds} Units`} icon={AlertTriangle} color="#f59e0b" />
      </div>

      {/* Priority Recommendations */}
      <div className="card section-mb">
        <div className="card-header">
          <h3 className="card-title">Priority Recommendations</h3>
        </div>
        <div className="grid-3">
          {priorityRecommendations.map((rec, i) => (
            <div key={i} style={{
              border: '1px solid #e5e7eb', borderRadius: 12, padding: 20,
              borderTop: `3px solid ${rec.color}`, position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: `${rec.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <rec.icon size={18} style={{ color: rec.color }} />
                </div>
                <StatusBadge status={rec.severity} />
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{rec.title}</h4>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 16 }}>{rec.description}</p>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: 13,
                fontWeight: 600, color: '#C8102E', display: 'flex', alignItems: 'center', gap: 4, padding: 0,
              }}>
                Apply Strategy <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Category Velocity */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Category Velocity</h3>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          {categoryVelocity.map((cat, i) => {
            const isPositive = cat.change > 0
            const barWidth = Math.min(Math.abs(cat.change) * 4, 100)
            return (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{cat.name}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontSize: 14, fontWeight: 700, color: cat.color,
                  }}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {isPositive ? '+' : ''}{cat.change}%
                  </span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{
                    width: `${barWidth}%`,
                    background: cat.color,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
