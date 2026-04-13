import { useState } from 'react'
import { Save, Monitor, Smartphone, Globe, Lock, Mail, MessageCircle, X } from 'lucide-react'
import { settings } from '../data/mockData'

export default function SettingsPage() {
  const [form, setForm] = useState({
    contactEmail: settings.contactEmail,
    supportPhone: settings.supportPhone,
    timezone: settings.timezone,
    passwordRotation: '30',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [emailNotifs, setEmailNotifs] = useState({
    orderConfirmations: true,
    shippingUpdates: true,
  })

  const [whatsappNotifs, setWhatsappNotifs] = useState({
    customerInquiries: true,
    marketing: false,
  })

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div>
      <div className="page-header">
        <h1>System Settings</h1>
        <div className="page-header-actions">
          <button className="btn btn-secondary"><X size={16} /> DISCARD CHANGES</button>
          <button className="btn btn-primary" onClick={() => alert('Configuration saved!')}><Save size={16} /> SAVE SYSTEM CONFIGURATION</button>
        </div>
      </div>

      <div className="grid-2 section-mb">
        {/* General Identity */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Globe size={20} style={{ color: '#6b7280' }} />
            <h3 className="card-title">General Identity</h3>
          </div>
          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input className="form-input" value={form.contactEmail} onChange={e => handleChange('contactEmail', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Support Phone</label>
            <input className="form-input" value={form.supportPhone} onChange={e => handleChange('supportPhone', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Timezone</label>
            <select className="form-select" value={form.timezone} onChange={e => handleChange('timezone', e.target.value)}>
              <option value="Africa/Lagos (WAT)">Africa/Lagos (WAT)</option>
              <option value="UTC">UTC</option>
              <option value="Europe/London (GMT)">Europe/London (GMT)</option>
              <option value="America/New_York (EST)">America/New_York (EST)</option>
            </select>
          </div>
        </div>

        {/* Security Protocol */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Lock size={20} style={{ color: '#6b7280' }} />
            <h3 className="card-title">Security Protocol</h3>
          </div>
          <div className="form-group">
            <label className="form-label">Password Rotation</label>
            <select className="form-select" value={form.passwordRotation} onChange={e => handleChange('passwordRotation', e.target.value)}>
              <option value="30">Every 30 days</option>
              <option value="60">Every 60 days</option>
              <option value="90">Every 90 days</option>
              <option value="never">Never</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input className="form-input" type="password" value={form.currentPassword} onChange={e => handleChange('currentPassword', e.target.value)} placeholder="Enter current password" />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input className="form-input" type="password" value={form.newPassword} onChange={e => handleChange('newPassword', e.target.value)} placeholder="Enter new password" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" value={form.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} placeholder="Confirm new password" />
          </div>
          <button className="btn btn-secondary" onClick={() => alert('Password updated!')}>Update Password</button>
        </div>
      </div>

      <div className="grid-2 section-mb">
        {/* Email Notifications */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Mail size={20} style={{ color: '#6b7280' }} />
            <h3 className="card-title">Email Notifications</h3>
          </div>
          {Object.entries(emailNotifs).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div
                className={`toggle-switch ${value ? 'active' : ''}`}
                onClick={() => setEmailNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
              />
            </div>
          ))}
        </div>

        {/* WhatsApp Updates */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <MessageCircle size={20} style={{ color: '#6b7280' }} />
            <h3 className="card-title">WhatsApp Updates</h3>
          </div>
          {Object.entries(whatsappNotifs).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ fontSize: 14, textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div
                className={`toggle-switch ${value ? 'active' : ''}`}
                onClick={() => setWhatsappNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Monitor size={20} style={{ color: '#6b7280' }} />
          <h3 className="card-title">Active Sessions</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Device / Browser', 'Location', 'Last Active', 'Status', ''].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid #e5e7eb',
                  fontSize: 12, color: '#9ca3af', textTransform: 'uppercase', background: '#f9fafb',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {settings.activeSessions.map((session, i) => (
              <tr key={i}>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {session.device.includes('Chrome') || session.device.includes('Windows') ? (
                      <Monitor size={18} style={{ color: '#6b7280' }} />
                    ) : (
                      <Smartphone size={18} style={{ color: '#6b7280' }} />
                    )}
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{session.device}</span>
                    {session.current && (
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                        background: '#dcfce7', color: '#16a34a', textTransform: 'uppercase',
                      }}>CURRENT</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', fontSize: 13, color: '#6b7280' }}>{session.location}</td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>{session.lastActive}</td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: session.current ? '#dcfce7' : '#fef3c7',
                    color: session.current ? '#16a34a' : '#d97706',
                  }}>
                    {session.current ? 'Active' : 'Idle'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
                  {!session.current && (
                    <button className="btn btn-sm btn-outline" style={{ color: '#ef4444', borderColor: '#fecaca' }}>
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
