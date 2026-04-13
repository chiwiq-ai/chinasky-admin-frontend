// ============================================================================
// API Service Layer (Admin Dashboard)
// ============================================================================
// All data access goes through this layer. By default it uses mock data, but
// you can swap to a real backend by setting `useMockData: false` in
// src/config/app.json (or VITE_USE_MOCK_DATA=false) and providing
// VITE_API_BASE_URL.
//
// Each function returns a Promise so call sites work identically whether the
// data comes from mock or real fetch. The HTTP layer (src/lib/api-client.js)
// handles auth headers, timeouts, content-type validation, and structured
// error reporting.
// ============================================================================

import appConfig from '../config/app.json'
import * as mock from '../data/mockData'
import { apiGet, apiPost, apiPut, apiPatch, apiDelete, request, tokenStorage } from '../lib/api-client.js'

const envFlag = import.meta.env.VITE_USE_MOCK_DATA
const USE_MOCK = envFlag !== undefined ? String(envFlag).toLowerCase() !== 'false' : Boolean(appConfig.useMockData)

const mockResolve = (data) => Promise.resolve(data)

// ---------- Dashboard -------------------------------------------------------
export const getDashboardKPIs = () =>
  USE_MOCK ? mockResolve(mock.dashboardKPIs) : apiGet('/dashboard/kpis')

export const getRevenueChart = () =>
  USE_MOCK ? mockResolve(mock.revenueChartData) : apiGet('/dashboard/revenue-chart')

export const getSalesByCategory = () =>
  USE_MOCK ? mockResolve(mock.salesByCategoryData) : apiGet('/dashboard/sales-by-category')

export const getTopProducts = () =>
  USE_MOCK ? mockResolve(mock.topProducts) : apiGet('/dashboard/top-products')

// ---------- Products --------------------------------------------------------
export const getProducts = (params = {}) =>
  USE_MOCK ? mockResolve(mock.products) : apiGet('/products', { query: params })

export const getProduct = (id) =>
  USE_MOCK ? mockResolve(mock.products.find(p => p.id === Number(id))) : apiGet(`/products/${encodeURIComponent(id)}`)

export const createProduct = (data) =>
  USE_MOCK ? mockResolve({ ...data, id: Date.now() }) : apiPost('/products', data)

export const updateProduct = (id, data) =>
  USE_MOCK ? mockResolve({ ...data, id }) : apiPut(`/products/${encodeURIComponent(id)}`, data)

export const deleteProduct = (id) =>
  USE_MOCK ? mockResolve({ success: true }) : apiDelete(`/products/${encodeURIComponent(id)}`)

// ---------- Categories ------------------------------------------------------
export const getCategories = () =>
  USE_MOCK ? mockResolve(mock.categories) : apiGet('/categories')

export const getSubCategories = () =>
  USE_MOCK ? mockResolve(mock.subCategories) : apiGet('/sub-categories')

// ---------- Inventory -------------------------------------------------------
export const getInventory = () =>
  USE_MOCK ? mockResolve(mock.inventory) : apiGet('/inventory')

export const getInventoryItem = (id) =>
  USE_MOCK ? mockResolve(mock.inventory.find(i => i.id === id)) : apiGet(`/inventory/${encodeURIComponent(id)}`)

// ---------- Orders ----------------------------------------------------------
export const getOrders = (params = {}) =>
  USE_MOCK ? mockResolve(mock.orders) : apiGet('/orders', { query: params })

export const getOrder = (id) =>
  USE_MOCK ? mockResolve(mock.orders.find(o => o.id === id)) : apiGet(`/orders/${encodeURIComponent(id)}`)

export const updateOrderStatus = (id, status) =>
  USE_MOCK ? mockResolve({ id, status }) : apiPatch(`/orders/${encodeURIComponent(id)}/status`, { status })

// ---------- Customers -------------------------------------------------------
export const getCustomers = (params = {}) =>
  USE_MOCK ? mockResolve(mock.customers) : apiGet('/customers', { query: params })

export const getCustomer = (id) =>
  USE_MOCK ? mockResolve(mock.customers.find(c => c.id === id)) : apiGet(`/customers/${encodeURIComponent(id)}`)

// ---------- Suppliers -------------------------------------------------------
export const getSuppliers = () =>
  USE_MOCK ? mockResolve(mock.suppliers) : apiGet('/suppliers')

export const getSupplier = (id) =>
  USE_MOCK ? mockResolve(mock.suppliers.find(s => s.id === id)) : apiGet(`/suppliers/${encodeURIComponent(id)}`)

// ---------- Pricing ---------------------------------------------------------
export const getPricingRules = () =>
  USE_MOCK ? mockResolve(mock.pricingRules) : apiGet('/pricing/rules')

export const getCoupons = () =>
  USE_MOCK ? mockResolve(mock.coupons) : apiGet('/pricing/coupons')

// ---------- Marketing -------------------------------------------------------
export const getCampaigns = () =>
  USE_MOCK ? mockResolve(mock.campaigns) : apiGet('/marketing/campaigns')

export const getMarketingStats = () =>
  USE_MOCK ? mockResolve(mock.marketingStats) : apiGet('/marketing/stats')

// ---------- CMS -------------------------------------------------------------
export const getCmsModules = () =>
  USE_MOCK ? mockResolve(mock.cmsModules) : apiGet('/cms/modules')

// ---------- AI Insights -----------------------------------------------------
export const getAIInsights = () =>
  USE_MOCK ? mockResolve(mock.aiInsights) : apiGet('/ai/insights')

// ---------- User Roles ------------------------------------------------------
export const getUserRoles = () =>
  USE_MOCK ? mockResolve(mock.userRoles) : apiGet('/user-roles')

export const getAdminUsers = () =>
  USE_MOCK ? mockResolve(mock.adminUsers) : apiGet('/admin-users')

// ---------- Notifications ---------------------------------------------------
export const getNotifications = () =>
  USE_MOCK ? mockResolve(mock.notifications) : apiGet('/notifications')

export const markNotificationRead = (id) =>
  USE_MOCK ? mockResolve({ id, read: true }) : apiPatch(`/notifications/${encodeURIComponent(id)}/read`, {})

// ---------- Transactions / Stripe -------------------------------------------
export const getTransactions = () =>
  USE_MOCK ? mockResolve(mock.transactions) : apiGet('/stripe/transactions')

// ---------- Auth / Current Admin --------------------------------------------
export const getCurrentUser = () =>
  USE_MOCK ? mockResolve(mock.adminUser) : apiGet('/me')

export const adminLogin = (email, password) => {
  if (USE_MOCK) return mockResolve({ user: mock.adminUser, token: 'mock-admin-token' })
  return request('/auth/login', { method: 'POST', body: { email, password }, auth: false })
}

export const adminLogout = () => {
  if (USE_MOCK) {
    tokenStorage.clear()
    return mockResolve({ success: true })
  }
  return apiPost('/auth/logout', undefined).finally(() => tokenStorage.clear())
}
