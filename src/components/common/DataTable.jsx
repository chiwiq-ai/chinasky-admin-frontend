import { useState } from 'react'

export default function DataTable({ columns, data, onRowClick }) {
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = Math.min(startIdx + pageSize, data.length)
  const pageData = data.slice(startIdx, endIdx)

  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{ ...styles.th, width: col.width || 'auto' }}>
                {col.label || col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={styles.empty}>
                No data available
              </td>
            </tr>
          ) : (
            pageData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                style={{
                  ...styles.tr,
                  background: rowIdx % 2 === 1 ? '#f9fafb' : 'transparent',
                }}
                onClick={() => onRowClick?.(row)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = rowIdx % 2 === 1 ? '#f9fafb' : 'transparent'
                }}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={styles.td}>
                    {col.render ? col.render(row, startIdx + rowIdx) : (row[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length > 0 && (
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>
            Showing {startIdx + 1} to {endIdx} of {data.length} results
          </span>
          <div style={styles.paginationButtons}>
            <button
              style={{ ...styles.pageBtn, ...(currentPage === 1 ? styles.pageBtnDisabled : {}) }}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {(() => {
              const pages = []
              if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) pages.push(i)
              } else {
                pages.push(1)
                if (currentPage > 3) pages.push('...')
                for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i)
                if (currentPage < totalPages - 2) pages.push('...')
                pages.push(totalPages)
              }
              return pages.map((page, idx) =>
                page === '...' ? (
                  <span key={`dots-${idx}`} style={{ padding: '6px 8px', color: '#9ca3af' }}>...</span>
                ) : (
                  <button
                    key={page}
                    style={{ ...styles.pageBtn, ...(page === currentPage ? styles.pageBtnActive : {}) }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )
            })()}
            <button
              style={{ ...styles.pageBtn, ...(currentPage === totalPages ? styles.pageBtnDisabled : {}) }}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: 12,
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: '#1a1625',
    whiteSpace: 'nowrap',
  },
  tr: {
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #f3f4f6',
    color: '#374151',
  },
  empty: {
    padding: '40px 16px',
    textAlign: 'center',
    color: '#9ca3af',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderTop: '1px solid #e5e7eb',
  },
  paginationInfo: {
    fontSize: 13,
    color: '#6b7280',
  },
  paginationButtons: {
    display: 'flex',
    gap: 4,
  },
  pageBtn: {
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 500,
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    background: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  pageBtnActive: {
    background: '#C8102E',
    color: '#ffffff',
    borderColor: '#C8102E',
  },
  pageBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
}
