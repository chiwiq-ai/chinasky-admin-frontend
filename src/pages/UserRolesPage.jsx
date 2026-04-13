import { useState } from 'react'
import { Plus, Shield, Users, UserCheck, Eye, Edit2 } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'

const accessLevelColors = {
  'Full Access': { bg: '#fee2e2', color: '#dc2626' },
  'Management': { bg: '#dbeafe', color: '#2563eb' },
  'Restricted': { bg: '#fef3c7', color: '#d97706' },
  'Read Only': { bg: '#f3f4f6', color: '#6b7280' },
}

const rolesData = [
  {
    id: 1, name: 'Super Admin', accessLevel: 'Full Access',
    members: [
      { initials: 'AO', color: '#C8102E' },
      { initials: 'FA', color: '#6366f1' },
      { initials: 'CE', color: '#10b981' },
    ],
    permissions: 14, lastModified: '2026-04-08',
  },
  {
    id: 2, name: 'Ops Manager', accessLevel: 'Management',
    members: [
      { initials: 'HA', color: '#f59e0b' },
      { initials: 'YO', color: '#8b5cf6' },
      { initials: 'AN', color: '#C8102E' },
      { initials: 'DO', color: '#10b981' },
    ],
    permissions: 9, lastModified: '2026-04-05',
  },
  {
    id: 3, name: 'Marketing Admin', accessLevel: 'Restricted',
    members: [
      { initials: 'YO', color: '#6366f1' },
      { initials: 'BO', color: '#f59e0b' },
    ],
    permissions: 5, lastModified: '2026-04-03',
  },
  {
    id: 4, name: 'Support Agent', accessLevel: 'Read Only',
    members: [
      { initials: 'AN', color: '#8b5cf6' },
      { initials: 'CE', color: '#C8102E' },
      { initials: 'FY', color: '#10b981' },
      { initials: 'OB', color: '#f59e0b' },
      { initials: 'NE', color: '#6366f1' },
      { initials: 'BO', color: '#dc2626' },
      { initials: 'TA', color: '#2563eb' },
      { initials: 'HA', color: '#059669' },
    ],
    permissions: 3, lastModified: '2026-03-28',
  },
]

export default function UserRolesPage() {
  return (
    <div>
      <div className="page-header">
        <h1>User Roles & Permissions</h1>
        <div className="page-header-actions">
          <button className="btn btn-secondary"><Plus size={16} /> ADD NEW ADMIN</button>
          <button className="btn btn-primary"><Plus size={16} /> NEW ROLE</button>
        </div>
      </div>

      <div className="stats-grid stats-grid-3 section-mb">
        <StatCard title="Total Users" value="17" icon={Users} />
        <StatCard title="Active Admins" value="09" icon={UserCheck} color="#10b981" />
        <StatCard title="Roles" value="04" icon={Shield} color="#6366f1" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Roles</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Role Name', 'Access Level', 'Members', 'Permissions', 'Last Modified', 'Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 12, fontWeight: 600,
                    color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rolesData.map((role) => {
                const alc = accessLevelColors[role.accessLevel] || accessLevelColors['Read Only']
                return (
                  <tr key={role.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px', fontWeight: 600, fontSize: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Shield size={16} style={{ color: '#6b7280' }} />
                        {role.name}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                        background: alc.bg, color: alc.color,
                      }}>
                        {role.accessLevel}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {role.members.slice(0, 4).map((m, i) => (
                          <div key={i} className="avatar avatar-sm" style={{
                            marginLeft: i > 0 ? -8 : 0, border: '2px solid #fff',
                            background: m.color, fontSize: 10, zIndex: role.members.length - i,
                            position: 'relative',
                          }}>
                            {m.initials}
                          </div>
                        ))}
                        {role.members.length > 4 && (
                          <div className="avatar avatar-sm" style={{
                            marginLeft: -8, border: '2px solid #fff',
                            background: '#e5e7eb', color: '#6b7280', fontSize: 10,
                            position: 'relative', zIndex: 0,
                          }}>
                            +{role.members.length - 4}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: 13 }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
                        background: '#f3f4f6', color: '#374151',
                      }}>
                        {role.permissions} permissions
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: 13, color: '#6b7280' }}>{role.lastModified}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-sm btn-outline" style={{ padding: '4px 8px' }}><Eye size={14} /></button>
                        <button className="btn btn-sm btn-outline" style={{ padding: '4px 8px' }}><Edit2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
