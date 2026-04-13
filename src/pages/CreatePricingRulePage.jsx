import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X, Tag, Calendar, Percent, DollarSign } from 'lucide-react'
import { categories } from '../data/mockData'

export default function CreatePricingRulePage() {
  const navigate = useNavigate()
  const [ruleName, setRuleName] = useState('')
  const [description, setDescription] = useState('')
  const [eligibility, setEligibility] = useState('Global')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [ruleType, setRuleType] = useState('Percentage')
  const [discountValue, setDiscountValue] = useState('')
  const [minOrderValue, setMinOrderValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [recurring, setRecurring] = useState(false)

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const addProductTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setSelectedProducts(prev => [...prev, e.target.value.trim()])
      e.target.value = ''
    }
  }

  const removeProduct = (idx) => {
    setSelectedProducts(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/pricing')}>
            <ArrowLeft size={16} />
          </button>
          <h1>Create Pricing Rule</h1>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline" onClick={() => navigate('/pricing')}>CANCEL</button>
          <button className="btn btn-primary" onClick={() => { alert('Pricing rule published!'); navigate('/pricing'); }}>PUBLISH RULE</button>
        </div>
      </div>

      <div className="grid-2-1">
        {/* Left Section */}
        <div>
          {/* Basic Info */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title">Basic Information</h3>
            </div>
            <div style={{ padding: 24 }}>
              <div className="form-group">
                <label className="form-label">Rule Name</label>
                <input
                  className="form-input"
                  placeholder="e.g., Weekend Fresh Blowout"
                  value={ruleName}
                  onChange={e => setRuleName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe what this pricing rule does..."
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Eligibility & Targeting */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title">Eligibility & Targeting</h3>
            </div>
            <div style={{ padding: 24 }}>
              <div className="form-group">
                <label className="form-label">Scope</label>
                <div className="toggle-group" style={{ width: '100%' }}>
                  <button
                    className={`toggle-group-btn ${eligibility === 'Global' ? 'active' : ''}`}
                    onClick={() => setEligibility('Global')}
                    style={{ flex: 1 }}
                  >
                    Global
                  </button>
                  <button
                    className={`toggle-group-btn ${eligibility === 'Selected' ? 'active' : ''}`}
                    onClick={() => setEligibility('Selected')}
                    style={{ flex: 1 }}
                  >
                    Selected
                  </button>
                </div>
              </div>

              {eligibility === 'Selected' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Categories</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {categories.map(cat => (
                        <button
                          key={cat}
                          className={`tag ${selectedCategories.includes(cat) ? '' : ''}`}
                          style={{
                            cursor: 'pointer',
                            background: selectedCategories.includes(cat) ? '#C8102E' : '#f3f4f6',
                            color: selectedCategories.includes(cat) ? '#fff' : '#374151',
                            border: 'none',
                            padding: '6px 14px',
                            borderRadius: 20,
                            fontSize: 13,
                            fontWeight: 500,
                          }}
                          onClick={() => toggleCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Tags</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                      {selectedProducts.map((p, i) => (
                        <span key={i} className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          {p}
                          <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeProduct(i)} />
                        </span>
                      ))}
                    </div>
                    <input
                      className="form-input"
                      placeholder="Type product name and press Enter..."
                      onKeyDown={addProductTag}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Rule Summary Preview */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Rule Summary Preview</h3>
            </div>
            <div style={{ padding: 24, background: '#f9fafb', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Rule Name</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{ruleName || 'Not set'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Rule Type</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{ruleType}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Discount Value</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{discountValue ? (ruleType === 'Percentage' ? `${discountValue}%` : `₦${discountValue}`) : 'Not set'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Scope</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{eligibility === 'Global' ? 'All Products' : selectedCategories.join(', ') || 'None selected'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Schedule</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{startDate && endDate ? `${startDate} to ${endDate}` : 'Not set'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Recurring</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{recurring ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          {/* Rule Configuration */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title">Rule Configuration</h3>
            </div>
            <div style={{ padding: 24 }}>
              <div className="form-group">
                <label className="form-label">Rule Type</label>
                <select className="form-select" value={ruleType} onChange={e => setRuleType(e.target.value)}>
                  <option value="Percentage">Percentage Discount</option>
                  <option value="Fixed">Fixed Amount</option>
                  <option value="BOGO">Buy One Get One</option>
                  <option value="Tiered">Tiered Pricing</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {ruleType === 'Percentage' ? 'Discount Percentage' : ruleType === 'Fixed' ? 'Discount Amount (₦)' : 'Discount Value'}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="form-input"
                    type="number"
                    placeholder={ruleType === 'Percentage' ? 'e.g., 15' : 'e.g., 500'}
                    value={discountValue}
                    onChange={e => setDiscountValue(e.target.value)}
                    style={{ paddingLeft: 40 }}
                  />
                  <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    {ruleType === 'Percentage' ? <Percent size={16} /> : <DollarSign size={16} />}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Minimum Order Value (₦)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="e.g., 5000"
                  value={minOrderValue}
                  onChange={e => setMinOrderValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="card section-mb">
            <div className="card-header">
              <h3 className="card-title"><Calendar size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />Scheduling</h3>
            </div>
            <div style={{ padding: 24 }}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Recurring</label>
                <label className="toggle-switch">
                  <input type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)} />
                  <span />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
