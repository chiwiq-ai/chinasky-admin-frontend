import { useState } from 'react'
import { DollarSign, TrendingUp, CreditCard, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import StatCard from '../components/common/StatCard'
import StatusBadge from '../components/common/StatusBadge'

const transactionData = [
  { id: 'TXN-CS-001', amount: 245000, netAmount: 238500, customer: { name: 'Tunde Adeyemi', email: 'tunde.a@gmail.com' }, date: '2026-04-08 14:32', status: 'Completed' },
  { id: 'TXN-CS-002', amount: 42500, netAmount: 41200, customer: { name: 'Chioma Okafor', email: 'chioma@gmail.com' }, date: '2026-04-08 12:15', status: 'Completed' },
  { id: 'TXN-CS-003', amount: 195000, netAmount: 189800, customer: { name: 'Emeka Nwosu', email: 'emeka.n@yahoo.com' }, date: '2026-04-08 10:45', status: 'Pending' },
  { id: 'TXN-CS-004', amount: 67800, netAmount: 65900, customer: { name: 'Aisha Bello', email: 'aisha.b@hotmail.com' }, date: '2026-04-07 18:20', status: 'Completed' },
  { id: 'TXN-CS-005', amount: 490000, netAmount: 477000, customer: { name: 'Tunde Adeyemi', email: 'tunde.a@gmail.com' }, date: '2026-04-07 15:10', status: 'Completed' },
  { id: 'TXN-CS-006', amount: 18200, netAmount: 17700, customer: { name: 'Fatima Yusuf', email: 'fatima.y@gmail.com' }, date: '2026-04-06 09:30', status: 'Refunded' },
  { id: 'TXN-CS-007', amount: 156800, netAmount: 152400, customer: { name: 'Blessing Obi', email: 'blessing.o@gmail.com' }, date: '2026-04-05 22:15', status: 'Completed' },
]

export default function StripeConnectPage() {
  const [dateRange, setDateRange] = useState('Last 7 Days')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(transactionData.length / itemsPerPage)
  const paginatedData = transactionData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div>
      <div className="page-header">
        <h1>Stripe Connect</h1>
        <button className="btn btn-primary">
          <Download size={16} /> DOWNLOAD REPORT
        </button>
      </div>

      <div className="stats-grid stats-grid-3 section-mb">
        <StatCard title="Total Processed" value="₦4,280,500" icon={DollarSign} color="#6366f1" change={0.9} subtitle="vs last period" />
        <StatCard title="Net Earnings" value="₦3,980,450" icon={TrendingUp} color="#10b981" />
        <StatCard title="Fees Paid" value="₦125,000" icon={CreditCard} color="#f59e0b" />
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="card-title">Transactions</h3>
          <select
            className="form-select"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            style={{ width: 'auto', minWidth: 160 }}
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="This Year">This Year</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Transaction ID', 'Amount (₦)', 'Net Amount', 'Customer', 'Date/Time', 'Status'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px', fontSize: 12, fontWeight: 600,
                    color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((txn) => (
                <tr key={txn.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 600, fontSize: 13 }}>{txn.id}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 500 }}>₦{txn.amount.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#10b981' }}>₦{txn.netAmount.toLocaleString()}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar avatar-sm" style={{ background: '#6366f1', fontSize: 10, flexShrink: 0 }}>
                        {txn.customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{txn.customer.name}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af' }}>{txn.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280' }}>{txn.date}</td>
                  <td style={{ padding: '14px 16px' }}><StatusBadge status={txn.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px', borderTop: '1px solid #f3f4f6',
        }}>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>
            Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, transactionData.length)} of {transactionData.length} transactions
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              style={{ padding: '6px 10px' }}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setCurrentPage(page)}
                style={{ padding: '6px 12px', minWidth: 36 }}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-sm btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              style={{ padding: '6px 10px' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
