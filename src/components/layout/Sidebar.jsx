import { NavLink, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { LogOut } from 'lucide-react'
import menuConfig from '../../config/menu.json'
import appConfig from '../../config/app.json'

function Icon({ name, ...props }) {
  const Cmp = Icons[name] || Icons.Circle
  return <Cmp {...props} />
}

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/')
    }
  }

  return (
    <aside style={styles.sidebar} className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <Icons.ShoppingCart size={20} />
        </div>
        <div>
          <div style={styles.logoText}>{appConfig.appName}</div>
          <div style={styles.logoSub}>{appConfig.appSubtitle}</div>
        </div>
      </div>

      <nav style={styles.nav}>
        <div style={styles.menuSection}>
          {menuConfig.main.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              style={({ isActive }) => ({
                ...styles.menuItem,
                ...(isActive ? styles.menuItemActive : {}),
              })}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div style={styles.bottomSection}>
          {menuConfig.bottom.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              style={({ isActive }) => ({
                ...styles.menuItem,
                ...(isActive ? styles.menuItemActive : {}),
              })}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            style={{ ...styles.menuItem, width: '100%', border: 'none', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: 260,
    height: '100vh',
    background: '#1a1625',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    overflowY: 'auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: '#C8102E',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
  },
  logoText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1.2,
  },
  logoSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '12px 0',
  },
  menuSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '0 12px',
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '0 12px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: 12,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    borderRadius: 8,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s',
    background: 'transparent',
  },
  menuItemActive: {
    background: '#C8102E',
    color: 'white',
  },
}
