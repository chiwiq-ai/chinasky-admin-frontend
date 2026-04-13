import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setSent(true);
    } catch (err) {
      setErrorMessage(err?.message || 'Unable to send reset link. Please try again.');
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
        <div className="admin-auth-form">
          <div className="admin-auth-logo">
            <div className="admin-auth-logo-icon">
              <ShoppingCart size={24} />
            </div>
            <div className="admin-auth-logo-text">ChinaSky Admin</div>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit}>
              <h1>Forgot Password?</h1>
              <p className="admin-auth-subtitle">
                Enter your email and we'll send you a link to reset your password.
              </p>

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

              {errorMessage && (
                <div className="admin-auth-error" role="alert">{errorMessage}</div>
              )}

              <button type="submit" className="admin-auth-submit" disabled={submitting}>
                {submitting ? 'SENDING…' : 'SEND RESET LINK'}
              </button>

              <Link to="/login" className="admin-auth-back">
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </form>
          ) : (
            <div className="admin-auth-success">
              <div className="admin-auth-success-icon">
                <Mail size={32} />
              </div>
              <h1>Check your email</h1>
              <p className="admin-auth-subtitle">
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
              <p className="admin-auth-hint">
                Didn't receive it?{' '}
                <button type="button" className="admin-auth-link-btn" onClick={() => { setSent(false); setEmail(''); }}>
                  Try again
                </button>
              </p>
              <Link to="/login" className="admin-auth-back" style={{ marginTop: 24 }}>
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
