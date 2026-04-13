import { useEffect, useState } from 'react'
import { Bell, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getNotifications } from '../../services/api'

export default function TopBar({ onMenuToggle }) {
  const navigate = useNavigate()
  const [adminUser, setAdminUser] = useState({ name: '', role: '' })
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getCurrentUser().then(setAdminUser).catch(() => {})
    getNotifications().then(setNotifications).catch(() => {})
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header style={styles.topbar} className="admin-topbar">
      <div style={styles.leftSection}>
        <button
          className="mobile-menu-btn"
          onClick={onMenuToggle}
          style={styles.menuBtn}
        >
          <Menu size={22} />
        </button>
        <button
          style={styles.notifBtn}
          onClick={() => navigate('/notifications')}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span style={styles.badge}>{unreadCount}</span>
          )}
        </button>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.userInfo} onClick={() => navigate('/settings')}>
          <div className="topbar-user-text">
            <div style={styles.userName}>{adminUser.name}</div>
            <div style={styles.userRole}>{adminUser.role}</div>
          </div>
          <div style={styles.avatar}>
            {(adminUser.name || '').split(' ').map(n => n[0]).join('') || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}

const styles = {
  topbar: {
    height: 60,
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#374151',
    padding: 8,
    borderRadius: 8,
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    padding: 8,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: '#C8102E',
    color: 'white',
    fontSize: 10,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
  },
  userName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1a1625',
    textAlign: 'right',
  },
  userRole: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: 600,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#C8102E',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 14,
  },
}
