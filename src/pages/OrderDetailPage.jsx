import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Printer, Package, MapPin, CreditCard, ChevronDown } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import Modal from '../components/common/Modal'
import { formatPrice, orders } from '../data/mockData'

export default function OrderDetailPage() {
  const { id } = useParams()
  const order = orders.find(o => o.id === id) || orders[0]
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const [showModal, setShowModal] = useState(false)

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

  const subtotal = (order.items || []).reduce((sum, item) => sum + (item.subtotal || 0), 0)
  const deliveryFee = order.delivery === 'Doorstep' ? 2500 : 0
  const total = subtotal + deliveryFee

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus)
    setShowStatusDropdown(false)
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/orders" className="btn btn-outline btn-sm"><ArrowLeft size={16} /> BACK</Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ margin: 0 }}>Order {order.id}</h1>
              <StatusBadge status={currentStatus} />
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{order.date}</div>
          </div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
            <Printer size={16} /> PRINT INVOICE
          </button>
          <div style={{ position: 'relative' }}>
            <button className="btn btn-primary" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
              UPDATE STATUS <ChevronDown size={16} />
            </button>
            {showStatusDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 4,
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                zIndex: 50,
                minWidth: 160,
                overflow: 'hidden',
              }}>
                {statuses.map(s => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      border: 'none',
                      background: s === currentStatus ? '#f3f4f6' : '#fff',
                      cursor: 'pointer',
                      fontSize: 13,
                      color: '#374151',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = s === currentStatus ? '#f3f4f6' : '#fff'}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Left: Order Items */}
        <div className="card">
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Order Items</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Product</th>
                <th style={{ textAlign: 'right', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Price</th>
                <th style={{ textAlign: 'center', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af', textTransform: 'uppercase' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 8,
                        background: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Package size={18} style={{ color: '#9ca3af' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>{formatPrice(item.price)}</td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', textAlign: 'center' }}>{item.qty}</td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', textAlign: 'right', fontWeight: 600 }}>{formatPrice(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ borderTop: '2px solid #e5e7eb', marginTop: 8, paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 16px', fontSize: 13, color: '#6b7280' }}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 16px', fontSize: 13, color: '#6b7280' }}>
              <span>Delivery Fee</span>
              <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', fontSize: 16, fontWeight: 700, borderTop: '1px solid #e5e7eb', marginTop: 8 }}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Right: Customer, Delivery, Payment */}
        <div>
          {/* Customer Info */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Customer Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div className="avatar" style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#C8102E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
              }}>
                {order.customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{order.customer.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{order.customer.email}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Phone</span>
                <span>{order.customer.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Location</span>
                <span>{order.customer.location}</span>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={16} /> Delivery Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Method</span>
                <span>{order.delivery}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Address</span>
                <span>{order.customer.location}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card">
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={16} /> Payment Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Method</span>
                <span>{order.payment.method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Currency</span>
                <span>{order.payment.currency}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9ca3af' }}>Status</span>
                <StatusBadge status={order.payment.status} small />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Invoice Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Print Invoice">
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
          Invoice for order <strong>{order.id}</strong> is ready to print.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { window.print(); setShowModal(false) }}>Print</button>
        </div>
      </Modal>
    </div>
  )
}
