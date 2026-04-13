import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Package, Eye, Edit2, Trash2, Search } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import { formatPrice, products, topProducts, categories, subCategories } from '../data/mockData'

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [subCat, setSubCat] = useState('')
  const [status, setStatus] = useState('')

  const published = products.filter(p => p.status === 'Published').length
  const drafts = products.filter(p => p.status === 'Draft').length

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false
    if (category && p.category !== category) return false
    if (subCat && p.subcategory !== subCat) return false
    if (status && p.status !== status) return false
    return true
  })

  const columns = [
    {
      header: 'Product Details',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {row.image ? <img src={row.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} /> : <Package size={20} style={{ color: '#9ca3af' }} />}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{row.name}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{row.sku}</div>
            <StatusBadge status={row.status} small />
          </div>
        </div>
      ),
    },
    { header: 'Category', key: 'category' },
    { header: 'Sub-Category', key: 'subcategory' },
    { header: 'Sales', render: (row) => row.sales.toLocaleString() },
    { header: 'Price', render: (row) => formatPrice(row.price) },
    { header: 'Brand', key: 'brand' },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to={`/products/${row.id}`} style={{ color: '#6b7280', display: 'flex' }}><Eye size={16} /></Link>
          <Link to={`/products/edit/${row.id}`} style={{ color: '#6b7280', display: 'flex' }}><Edit2 size={16} /></Link>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', padding: 0 }} onClick={() => { if (window.confirm('Delete this product?')) alert('Product deleted') }}><Trash2 size={16} /></button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Product Management</h1>
        <div className="page-header-actions">
          <Link to="/products/new" className="btn btn-primary"><Plus size={16} /> ADD PRODUCT</Link>
        </div>
      </div>

      <div className="stats-grid stats-grid-3">
        <StatCard title="Total Products" value="842" icon={Package} />
        <StatCard title="Drafts" value={drafts} />
        <StatCard title="Published" value={published} />
      </div>

      <div className="card section-mb">
        <div className="filters-row">
          <div className="search-input-wrapper">
            <Search size={16} />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" />
          </div>
          <select className="form-select" value={category} onChange={e => { setCategory(e.target.value); setSubCat('') }}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="form-select" value={subCat} onChange={e => setSubCat(e.target.value)}>
            <option value="">All Sub-Categories</option>
            {category && subCategories[category]?.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <DataTable columns={columns} data={filtered} />
      </div>

      {/* Most Purchased Products */}
      <div className="card">
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
              }}>
                <Package size={32} style={{ color: '#9ca3af' }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{product.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>{product.category}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{formatPrice(product.price)}</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{product.sales} sold</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
