import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Trash2, Plus, Minus, ShoppingCart, User, Package } from 'lucide-react'
import { products, catalogProducts, formatPrice } from '../data/mockData'

export default function ManualOrderPage() {
  const navigate = useNavigate()
  const [orderType, setOrderType] = useState('WALK-IN')
  const [fulfillment, setFulfillment] = useState('Delivery')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState([
    { ...products[0], quantity: 2 },
    { ...products[1], quantity: 1 },
  ])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')

  const catalogItems = catalogProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addItem = (product) => {
    const existing = selectedItems.find(i => i.id === product.id)
    if (existing) {
      setSelectedItems(selectedItems.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ))
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id, delta) => {
    setSelectedItems(selectedItems.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta)
        return { ...i, quantity: newQty }
      }
      return i
    }))
  }

  const removeItem = (id) => {
    setSelectedItems(selectedItems.filter(i => i.id !== id))
  }

  const subtotal = selectedItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
  const shipping = fulfillment === 'Delivery' ? 2500 : 0
  const tax = Math.round(subtotal * 0.075)
  const grandTotal = subtotal + shipping + tax

  return (
    <div>
      <div className="page-header">
        <h1>Manual Order Execution</h1>
        <div className="page-header-actions">
          <div className="toggle-group">
            <button
              className={`toggle-group-btn ${orderType === 'WALK-IN' ? 'active' : ''}`}
              onClick={() => setOrderType('WALK-IN')}
            >
              WALK-IN
            </button>
            <button
              className={`toggle-group-btn ${orderType === 'VIRTUAL' ? 'active' : ''}`}
              onClick={() => setOrderType('VIRTUAL')}
            >
              VIRTUAL
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Left Column */}
        <div>
          {/* Customer Identity */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title"><User size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Customer Identity</h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Enter customer name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" placeholder="+234 800 000 0000" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" placeholder="customer@email.com" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Catalog Curation */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title"><Package size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Catalog Curation</h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="search-input-wrapper" style={{ marginBottom: 20 }}>
                <Search size={18} />
                <input className="form-input" placeholder="Search products by name or SKU..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>

              <div className="grid-2">
                {catalogItems.slice(0, 4).map(product => (
                  <div key={product.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }} onClick={() => addItem(product)}>
                    <div style={{ padding: 16 }}>
                      <div style={{ width: '100%', height: 80, background: '#f3f4f6', borderRadius: 8, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={24} style={{ color: '#9ca3af' }} />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{product.name}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#C8102E' }}>{formatPrice(product.price)}</div>
                      <button className="btn btn-outline btn-sm" style={{ marginTop: 8, width: '100%' }} onClick={(e) => { e.stopPropagation(); addItem(product); }}>
                        <Plus size={14} /> Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Inventory */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title"><ShoppingCart size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />Selected Inventory</h3>
            </div>
            <div style={{ padding: 20, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    {['Product', 'Unit Price', 'Quantity', 'Total', ''].map((h, i) => (
                      <th key={i} style={{ textAlign: i === 3 ? 'right' : i === 0 ? 'left' : 'center', padding: '10px 12px', fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>No items selected</td>
                    </tr>
                  ) : (
                    selectedItems.map(item => (
                      <tr key={item.id}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6', fontWeight: 500 }}>{item.name}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6', textAlign: 'center' }}>{formatPrice(item.price)}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <button className="btn btn-outline btn-sm" onClick={() => updateQuantity(item.id, -1)} style={{ padding: '4px 8px' }}>
                              <Minus size={14} />
                            </button>
                            <span style={{ fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                            <button className="btn btn-outline btn-sm" onClick={() => updateQuantity(item.id, 1)} style={{ padding: '4px 8px' }}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6', textAlign: 'right', fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f3f4f6', textAlign: 'center' }}>
                          <button className="btn btn-outline btn-sm" onClick={() => removeItem(item.id)} style={{ color: '#ef4444', padding: '4px 8px' }}>
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          {/* Order Summary */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title">Order Summary</h3>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontWeight: 500 }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: '#6b7280' }}>Shipping</span>
                <span style={{ fontWeight: 500 }}>{formatPrice(shipping)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 14 }}>
                <span style={{ color: '#6b7280' }}>Tax (7.5%)</span>
                <span style={{ fontWeight: 500 }}>{formatPrice(tax)}</span>
              </div>
              <div style={{ borderTop: '2px solid #1a1625', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Grand Total</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#C8102E' }}>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Fulfillment */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title">Fulfillment</h3>
            </div>
            <div style={{ padding: 20 }}>
              <div className="toggle-group" style={{ marginBottom: 20, width: '100%' }}>
                <button className={`toggle-group-btn ${fulfillment === 'Delivery' ? 'active' : ''}`} onClick={() => setFulfillment('Delivery')} style={{ flex: 1 }}>
                  Delivery
                </button>
                <button className={`toggle-group-btn ${fulfillment === 'Pickup' ? 'active' : ''}`} onClick={() => setFulfillment('Pickup')} style={{ flex: 1 }}>
                  Pickup
                </button>
              </div>

              {fulfillment === 'Delivery' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Recipient Name</label>
                    <input className="form-input" placeholder="Recipient full name" value={recipientName} onChange={e => setRecipientName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery Address</label>
                    <textarea className="form-textarea" placeholder="Enter delivery address" rows={3} value={recipientAddress} onChange={e => setRecipientAddress(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Recipient Phone</label>
                    <input className="form-input" placeholder="+234 800 000 0000" value={recipientPhone} onChange={e => setRecipientPhone(e.target.value)} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/orders')}>DISCARD CURATION</button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { alert('Order placed successfully!'); navigate('/orders'); }}>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}
