import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Lock, ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage('');

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setDone(true);
    } catch (err) {
      setErrorMessage(err?.message || 'Unable to reset password. The link may have expired.');
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

          {!done ? (
            <form onSubmit={handleSubmit}>
              <h1>Set New Password</h1>
              <p className="admin-auth-subtitle">
                Must be at least 8 characters with a mix of letters and numbers.
              </p>

              <div className="admin-auth-field">
                <label>New Password</label>
                <div className="admin-auth-input-wrapper">
                  <Lock size={16} className="admin-auth-input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="admin-auth-field">
                <label>Confirm Password</label>
                <div className="admin-auth-input-wrapper">
                  <Lock size={16} className="admin-auth-input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="admin-auth-error" role="alert">{errorMessage}</div>
              )}

              <button type="submit" className="admin-auth-submit" disabled={submitting}>
                {submitting ? 'RESETTING…' : 'RESET PASSWORD'}
              </button>

              <Link to="/login" className="admin-auth-back">
                <ArrowLeft size={16} /> Back to Sign In
              </Link>
            </form>
          ) : (
            <div className="admin-auth-success">
              <div className="admin-auth-success-icon" style={{ color: '#16a34a', background: '#f0fdf4' }}>
                <CheckCircle size={40} />
              </div>
              <h1>Password Reset!</h1>
              <p className="admin-auth-subtitle">
                Your password has been reset. You can now sign in.
              </p>
              <Link to="/login">
                <button type="button" className="admin-auth-submit" style={{ marginTop: 16 }}>
                  SIGN IN
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
