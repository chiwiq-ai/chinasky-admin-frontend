import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ShoppingCart } from 'lucide-react';
import { useAdminAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setErrorMessage(err?.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-left">
        <div className="admin-auth-left-overlay" />
        <div className="admin-auth-left-content">
          <h2>ChinaSky Admin</h2>
          <p>Manage your store, products, orders, and customers from one powerful dashboard.</p>
        </div>
      </div>

      <div className="admin-auth-right">
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <div className="admin-auth-logo">
            <div className="admin-auth-logo-icon">
              <ShoppingCart size={24} />
            </div>
            <div className="admin-auth-logo-text">ChinaSky Admin</div>
          </div>

          <h1>Welcome Back</h1>
          <p className="admin-auth-subtitle">Sign in to your admin dashboard</p>

          <div className="admin-auth-field">
            <label>Email</label>
            <div className="admin-auth-input-wrapper">
              <Mail size={16} className="admin-auth-input-icon" />
              <input
                type="email"
                placeholder="admin@chinaskysupermarket.ng"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-auth-field">
            <label>Password</label>
            <div className="admin-auth-input-wrapper">
              <Lock size={16} className="admin-auth-input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/forgot-password" className="admin-auth-forgot">Forgot Password?</Link>
          </div>

          {errorMessage && (
            <div className="admin-auth-error" role="alert">
              {errorMessage}
            </div>
          )}

          <button type="submit" className="admin-auth-submit" disabled={submitting}>
            {submitting ? 'SIGNING IN…' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}
