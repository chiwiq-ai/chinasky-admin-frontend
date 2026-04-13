import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Package, Download, Edit2, Clock, CheckCircle, Star, ChevronRight } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'
import DataTable from '../components/common/DataTable'
import { formatPrice, products, inventory, suppliers } from '../data/mockData'

export default function InventoryDetailPage() {
  const { id } = useParams()

  // Try to find matching inventory item and product
  const invItem = inventory.find(i => i.id === id || i.id === `INV-${String(id).padStart(3, '0')}`) || inventory[0]
  const product = products.find(p => p.sku === invItem.sku || p.name === invItem.name) || products[0]
  const supplier = suppliers.find(s => s.name === invItem.supplier)

  const currentStock = invItem.currentStock ?? invItem.current ?? 1250
  const reserved = invItem.reserved ?? 145
  const available = invItem.available ?? 1105

  const stockActivityLog = [
    { date: '2026-04-08', eventType: 'Restock', quantity: '+500', performedBy: 'Halima Abdullahi' },
    { date: '2026-04-06', eventType: 'Sale', quantity: '-12', performedBy: 'System' },
    { date: '2026-04-05', eventType: 'Sale', quantity: '-8', performedBy: 'System' },
    { date: '2026-04-03', eventType: 'Adjustment', quantity: '-5', performedBy: 'Chukwudi Emeka' },
    { date: '2026-04-01', eventType: 'Restock', quantity: '+1,000', performedBy: 'Halima Abdullahi' },
    { date: '2026-03-28', eventType: 'Sale', quantity: '-22', performedBy: 'System' },
  ]

  const logColumns = [
    { header: 'Date', key: 'date' },
    {
      header: 'Event Type',
      render: (row) => <StatusBadge status={row.eventType} small />,
    },
    {
      header: 'Quantity',
      render: (row) => (
        <span style={{ fontWeight: 600, color: row.quantity.startsWith('+') ? '#10b981' : '#ef4444' }}>
          {row.quantity}
        </span>
      ),
    },
    { header: 'Performed By', key: 'performedBy' },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
        <Link to="/inventory" style={{ color: '#9ca3af', textDecoration: 'none' }}>Inventory</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#374151' }}>{invItem.name}</span>
      </div>

      <div className="page-header">
        <h1>{invItem.name}</h1>
        <div className="page-header-actions">
          <Link to="/inventory" className="btn btn-outline"><ArrowLeft size={16} /> BACK</Link>
          <button className="btn btn-secondary"><Edit2 size={16} /> EDIT INVENTORY</button>
          <button className="btn btn-primary"><Download size={16} /> DOWNLOAD REPORT</button>
        </div>
      </div>

      {/* Stock Stats */}
      <div className="stats-grid stats-grid-3">
        <StatCard title="Current Stock" value={`${currentStock.toLocaleString()} units`} icon={Package} />
        <StatCard title="Reserved" value={`${reserved.toLocaleString()} units`} />
        <StatCard title="Available" value={`${available.toLocaleString()} units`} color="#10b981" />
      </div>

      {/* Product + Replenishment Grid */}
      <div className="grid-2 section-mb">
        {/* Left: Product Image + Profile */}
        <div className="card">
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: 12,
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Package size={40} style={{ color: '#d1d5db' }} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>{invItem.name}</h3>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>SKU: {invItem.sku}</div>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Category: <strong>{invItem.category}</strong></div>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Sub-Category: <strong>{invItem.subcategory || invItem.subCategory || 'N/A'}</strong></div>
              <div style={{ fontSize: 13, marginBottom: 4 }}>Brand: <strong>{invItem.brand || product?.brand || 'N/A'}</strong></div>
              <div style={{ fontSize: 13 }}>
                Price: <strong>{formatPrice(product.price)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Replenishment Rules + Supplier */}
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Replenishment Rules</h3>
          <div className="grid-2" style={{ marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Reorder Point</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>30 <span style={{ fontSize: 12, fontWeight: 400, color: '#9ca3af' }}>units</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Reorder Quantity</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>2,000 <span style={{ fontSize: 12, fontWeight: 400, color: '#9ca3af' }}>units</span></div>
            </div>
          </div>

          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Supplier Details</h3>
          {supplier ? (
            <div>
              <div style={{ fontSize: 13, marginBottom: 4 }}><strong>{supplier.name}</strong></div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{supplier.contact.name} - {supplier.contact.phone}</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>{supplier.contact.email}</div>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: '#6b7280' }}>{invItem.supplier || 'No supplier assigned'}</div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card section-mb">
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Performance Metrics</h3>
        <div className="grid-3">
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <Clock size={18} style={{ color: '#6366f1' }} />
              <span style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Lead Time</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>4 <span style={{ fontSize: 14, fontWeight: 400, color: '#9ca3af' }}>days</span></div>
          </div>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <CheckCircle size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Fulfillment</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>98.5<span style={{ fontSize: 14, fontWeight: 400, color: '#9ca3af' }}>%</span></div>
          </div>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <Star size={18} style={{ color: '#f59e0b' }} />
              <span style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Quality</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>4.9<span style={{ fontSize: 14, fontWeight: 400, color: '#9ca3af' }}>/5</span></div>
          </div>
        </div>
      </div>

      {/* Stock Activity Log */}
      <div className="card">
        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Stock Activity Log</h3>
        <DataTable columns={logColumns} data={stockActivityLog} />
      </div>
    </div>
  )
}
