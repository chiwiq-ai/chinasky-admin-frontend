import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bold, Italic, Underline, Link2, Plus, Upload, Trash2 } from 'lucide-react'
import { categories, subCategories, suppliers } from '../data/mockData'

export default function AddProductPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    productId: '',
    category: '',
    subCategory: '',
    description: '',
    specifications: '',
    costPrice: '',
    sellingPrice: '',
    supplier: '',
    status: 'Published',
  })

  const [variations, setVariations] = useState([
    { attribute: '', value: '', price: '' },
  ])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addVariation = () => {
    setVariations(prev => [...prev, { attribute: '', value: '', price: '' }])
  }

  const removeVariation = (idx) => {
    setVariations(prev => prev.filter((_, i) => i !== idx))
  }

  const updateVariation = (idx, field, value) => {
    setVariations(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v))
  }

  return (
    <div>
      <div className="page-header">
        <h1>Add New Product</h1>
        <div className="page-header-actions">
          <Link to="/products" className="btn btn-outline">DISCARD</Link>
          <button className="btn btn-primary" onClick={() => { alert('Product added successfully!'); navigate('/products'); }}>ADD PRODUCT</button>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Left Column - 2/3 */}
        <div>
          {/* General Information */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>General Information</h3>
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter product name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
              />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Brand</label>
                <select className="form-select" value={formData.brand} onChange={e => handleChange('brand', e.target.value)}>
                  <option value="">Select brand</option>
                  <option value="Golden Penny">Golden Penny</option>
                  <option value="Indomie">Indomie</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Nivea">Nivea</option>
                  <option value="Thermocool">Thermocool</option>
                  <option value="Devon King's">Devon King's</option>
                  <option value="Dangote">Dangote</option>
                  <option value="Oraimo">Oraimo</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Product ID</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Auto-generated"
                  value={formData.productId}
                  onChange={e => handleChange('productId', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Classification</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={e => { handleChange('category', e.target.value); handleChange('subCategory', '') }}
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Sub-Category</label>
                <select
                  className="form-select"
                  value={formData.subCategory}
                  onChange={e => handleChange('subCategory', e.target.value)}
                >
                  <option value="">Select sub-category</option>
                  {formData.category && subCategories[formData.category]?.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Content</h3>
            <div className="form-group">
              <label className="form-label">Description</label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, padding: '8px 12px', background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: '#6b7280' }}><Bold size={16} /></button>
                <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: '#6b7280' }}><Italic size={16} /></button>
                <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: '#6b7280' }}><Underline size={16} /></button>
                <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: '#6b7280' }}><Link2 size={16} /></button>
              </div>
              <textarea
                className="form-textarea"
                rows={5}
                placeholder="Enter product description..."
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Specifications</label>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Enter product specifications..."
                value={formData.specifications}
                onChange={e => handleChange('specifications', e.target.value)}
              />
            </div>
          </div>

          {/* Variations */}
          <div className="card">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Variations</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af' }}>Attribute</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af' }}>Value</th>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid #e5e7eb', fontSize: 12, color: '#9ca3af' }}>Price</th>
                  <th style={{ width: 40, borderBottom: '1px solid #e5e7eb' }}></th>
                </tr>
              </thead>
              <tbody>
                {variations.map((v, i) => (
                  <tr key={i}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
                      <input type="text" className="form-input" placeholder="e.g. Size" value={v.attribute} onChange={e => updateVariation(i, 'attribute', e.target.value)} />
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
                      <input type="text" className="form-input" placeholder="e.g. 1kg" value={v.value} onChange={e => updateVariation(i, 'value', e.target.value)} />
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
                      <input type="text" className="form-input" placeholder="₦0" value={v.price} onChange={e => updateVariation(i, 'price', e.target.value)} />
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
                      <button onClick={() => removeVariation(i)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={addVariation} className="btn btn-sm" style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: '1px dashed #d1d5db', color: '#6b7280', cursor: 'pointer', padding: '8px 16px', borderRadius: 8, fontSize: 13 }}>
              <Plus size={14} /> Add Variation
            </button>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div>
          {/* Valuation */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Valuation</h3>
            <div className="form-group">
              <label className="form-label">Cost Price</label>
              <input type="number" className="form-input" placeholder="₦0.00" value={formData.costPrice} onChange={e => handleChange('costPrice', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Selling Price</label>
              <input type="number" className="form-input" placeholder="₦0.00" value={formData.sellingPrice} onChange={e => handleChange('sellingPrice', e.target.value)} />
            </div>
          </div>

          {/* Visual Assets */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Visual Assets</h3>
            <div style={{
              border: '2px dashed #d1d5db',
              borderRadius: 12,
              padding: '40px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#fafafa',
            }}>
              <Upload size={32} style={{ color: '#9ca3af', marginBottom: 8 }} />
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Click to upload or drag and drop</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>PNG, JPG up to 5MB</div>
            </div>
          </div>

          {/* Supplier */}
          <div className="card section-mb">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Supplier</h3>
            <div className="form-group">
              <select className="form-select" value={formData.supplier} onChange={e => handleChange('supplier', e.target.value)}>
                <option value="">Select supplier</option>
                {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <Link to="/suppliers/new" className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
              <Plus size={14} /> ADD NEW SUPPLIER
            </Link>
          </div>

          {/* Status */}
          <div className="card">
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input
                  type="radio"
                  name="status"
                  value="Published"
                  checked={formData.status === 'Published'}
                  onChange={e => handleChange('status', e.target.value)}
                  style={{ accentColor: '#C8102E' }}
                />
                Published
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                <input
                  type="radio"
                  name="status"
                  value="Draft"
                  checked={formData.status === 'Draft'}
                  onChange={e => handleChange('status', e.target.value)}
                  style={{ accentColor: '#C8102E' }}
                />
                Draft
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
