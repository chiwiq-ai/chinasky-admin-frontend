import { useEffect, useState } from 'react'
import { DollarSign, ShoppingCart, TrendingUp, Package, Clock, CheckCircle, ShoppingBag, BarChart3 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../components/common/StatCard'
import { formatPrice } from '../data/mockData'
import { getDashboardKPIs, getRevenueChart, getSalesByCategory, getTopProducts } from '../services/api'

export default function DashboardPage() {
  const [dashboardKPIs, setDashboardKPIs] = useState({ totalRevenue: 0, totalOrders: 0, avgOrderValue: 0, activeSKUs: 0, dailyOrders: 0, fulfillmentRate: 0, cartAbandonment: 0, highlightedRevenue: 0 })
  const [revenueChartData, setRevenueChartData] = useState([])
  const [salesByCategoryData, setSalesByCategoryData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setLoadError('')
    Promise.all([
      getDashboardKPIs(),
      getRevenueChart(),
      getSalesByCategory(),
      getTopProducts(),
    ])
      .then(([kpis, revenue, sales, top]) => {
        if (cancelled) return
        if (kpis) setDashboardKPIs(kpis)
        if (Array.isArray(revenue)) setRevenueChartData(revenue)
        if (Array.isArray(sales)) setSalesByCategoryData(sales)
        if (Array.isArray(top)) setTopProducts(top)
      })
      .catch(err => {
        if (cancelled) return
        // eslint-disable-next-line no-console
        console.error('[DashboardPage] failed to load dashboard data', err)
        setLoadError(err?.message || 'Unable to load dashboard data.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const totalCategoryValue = salesByCategoryData.reduce((sum, c) => sum + c.value, 0)

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      {loadError && (
        <div role="alert" style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {loadError}
        </div>
      )}
      {loading && !loadError && (
        <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 16 }}>Loading dashboard…</div>
      )}

      {/* Primary KPIs */}
      <div className="stats-grid">
        <StatCard title="Total Revenue" value={formatPrice(dashboardKPIs.totalRevenue)} icon={DollarSign} change={5.2} subtitle="vs last month" />
        <StatCard title="Total Orders" value={dashboardKPIs.totalOrders.toLocaleString()} icon={ShoppingCart} change={12.3} subtitle="vs last month" />
        <StatCard title="Avg Order Value" value={formatPrice(dashboardKPIs.avgOrderValue)} icon={TrendingUp} change={-2.1} subtitle="vs last month" />
        <StatCard title="Active SKUs" value={dashboardKPIs.activeSKUs} icon={Package} subtitle="products live" />
      </div>

      {/* Secondary KPIs */}
      <div className="stats-grid section-mb">
        <StatCard title="Daily Orders" value={dashboardKPIs.dailyOrders.toLocaleString()} icon={ShoppingBag} />
        <StatCard title="Fulfillment Rate" value={`${dashboardKPIs.fulfillmentRate}%`} icon={CheckCircle} />
        <StatCard title="Cart Abandonment" value={`${dashboardKPIs.cartAbandonment}%`} icon={Clock} />
        <StatCard title="Highlighted Revenue" value={formatPrice(dashboardKPIs.highlightedRevenue)} icon={BarChart3} highlight />
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Revenue Chart */}
        <div className="card">
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={v => `₦${(v / 1000000).toFixed(0)}M`} />
              <Tooltip formatter={(val) => [formatPrice(val), 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#C8102E" strokeWidth={2} dot={{ fill: '#C8102E', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="card">
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>Sales by Category</h3>
          <div style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                  stroke="none"
                >
                  {salesByCategoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [formatPrice(val)]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Total</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{formatPrice(totalCategoryValue)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
            {salesByCategoryData.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Purchased Products */}
      <div className="card section-mb">
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Most Purchased Products</h3>
        <div className="product-cards-row">
          {topProducts.slice(0, 5).map(product => (
            <div key={product.id} className="product-card">
              <div style={{
                width: '100%',
                aspectRatio: '1',
                background: '#f3f4f6',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                color: '#9ca3af',
                fontSize: 12,
              }}>
                {product.image ? <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} /> : <Package size={32} />}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{product.category}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{formatPrice(product.price)}</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{product.sales} sold</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Ordering Locations */}
      <div className="card">
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Top Ordering Locations</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { name: 'Lagos', percentage: 85 },
            { name: 'Abuja', percentage: 62 },
            { name: 'Port Harcourt', percentage: 45 },
            { name: 'Enugu', percentage: 28 },
          ].map((loc, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{loc.name}</span>
                <span style={{ fontSize: 13, color: '#6b7280' }}>{loc.percentage}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${loc.percentage}%`, background: '#C8102E' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
