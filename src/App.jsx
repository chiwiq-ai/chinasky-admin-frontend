import { Routes, Route } from 'react-router-dom'
import { AdminAuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminLayout from './components/layout/AdminLayout'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import ProductViewPage from './pages/ProductViewPage'
import AddProductPage from './pages/AddProductPage'
import InventoryPage from './pages/InventoryPage'
import InventoryDetailPage from './pages/InventoryDetailPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import ManualOrderPage from './pages/ManualOrderPage'
import PricingPage from './pages/PricingPage'
import CreatePricingRulePage from './pages/CreatePricingRulePage'
import CRMPage from './pages/CRMPage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CMSPage from './pages/CMSPage'
import SuppliersPage from './pages/SuppliersPage'
import SupplierDetailPage from './pages/SupplierDetailPage'
import MarketingPage from './pages/MarketingPage'
import CreateCampaignPage from './pages/CreateCampaignPage'
import AIInsightsPage from './pages/AIInsightsPage'
import UserRolesPage from './pages/UserRolesPage'
import StripeConnectPage from './pages/StripeConnectPage'
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Auth routes (no layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductViewPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/products/edit/:id" element={<AddProductPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/:id" element={<InventoryDetailPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/orders/manual" element={<ManualOrderPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pricing/new" element={<CreatePricingRulePage />} />
          <Route path="/crm" element={<CRMPage />} />
          <Route path="/crm/:id" element={<CustomerDetailPage />} />
          <Route path="/cms" element={<CMSPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/suppliers/:id" element={<SupplierDetailPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/marketing/campaign/new" element={<CreateCampaignPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/user-roles" element={<UserRolesPage />} />
          <Route path="/stripe" element={<StripeConnectPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}

export default App
