import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, TrendingUp, Package, ChevronRight } from 'lucide-react'
import StatusBadge from '../components/common/StatusBadge'
import { formatPrice, products } from '../data/mockData'

export default function ProductViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id)) || products[0]
  const [activeTab, setActiveTab] = useState('Description')

  const tabs = ['Description', 'Specifications', 'Variations', 'Reviews']

  const rating = product.rating || 4.5
  const totalReviews = product.totalReviews || 0
  const variations = product.variations || []
  const specifications = product.specifications || 'No specifications available.'
  const supplier = product.supplier || 'N/A'

  const renderStars = (r) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} fill={i < Math.floor(r) ? '#f59e0b' : 'none'} stroke={i < Math.floor(r) ? '#f59e0b' : '#d1d5db'} />
    ))
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>
        <Link to="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#374151' }}>{product.name}</span>
      </div>

      <div className="page-header">
        <h1>{product.name}</h1>
        <div className="page-header-actions">
          <button className="btn btn-outline" onClick={() => { if (window.confirm('Are you sure you want to delete this product?')) { alert('Product deleted'); navigate('/products'); } }}>DELETE PRODUCT</button>
          <Link to={`/products/edit/${product.id}`} className="btn btn-primary">EDIT PRODUCT</Link>
        </div>
      </div>

      {/* Product Overview */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Left: Images */}
        <div className="card">
          <div style={{
            width: '100%',
            aspectRatio: '1',
            background: '#f3f4f6',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}>
            <Package size={64} style={{ color: '#d1d5db' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                background: '#f3f4f6',
                border: i === 1 ? '2px solid #C8102E' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <Package size={20} style={{ color: '#d1d5db' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>{product.name}</h2>
            <StatusBadge status={product.status} />
          </div>

          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12 }}>SKU: {product.sku}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
            {renderStars(rating)}
            <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 8 }}>{rating} ({totalReviews} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 700 }}>{formatPrice(product.price)}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#10b981' }}>
              <TrendingUp size={14} /> +5.2%
            </span>
          </div>

          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
            Total Sales: <strong>{(product.sales || 0).toLocaleString()}</strong> units
          </div>

          {/* Product Identity */}
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#374151' }}>Product Identity</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Category</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{product.category}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Sub-Category</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{product.subcategory || product.subCategory || 'N/A'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Brand</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{product.brand}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4 }}>Supplier</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{supplier}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="tabs" style={{ marginBottom: 20 }}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Description' && (
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>
            {product.description || 'No description available.'}
          </div>
        )}

        {activeTab === 'Specifications' && (
          <div style={{ fontSize: 14, lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-line' }}>
            {specifications}
          </div>
        )}

        {activeTab === 'Variations' && (
          <div>
            {variations.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', color: '#9ca3af', fontSize: 12 }}>Attribute</th>
                    <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', color: '#9ca3af', fontSize: 12 }}>Value</th>
                    <th style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid #e5e7eb', color: '#9ca3af', fontSize: 12 }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {variations.map((v, i) => (
                    <tr key={i}>
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6' }}>{v.attribute}</td>
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6' }}>{v.value}</td>
                      <td style={{ padding: '10px 16px', borderBottom: '1px solid #f3f4f6' }}>{formatPrice(v.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#9ca3af' }}>No variations available for this product.</p>
            )}
          </div>
        )}

        {activeTab === 'Reviews' && (
          <p style={{ color: '#9ca3af' }}>
            {totalReviews > 0
              ? `${totalReviews} reviews with an average rating of ${rating}/5`
              : 'No reviews yet.'
            }
          </p>
        )}
      </div>
    </div>
  )
}
