const statusColors = {
  // Green statuses
  'Published': { bg: '#dcfce7', color: '#16a34a' },
  'Delivered': { bg: '#dcfce7', color: '#16a34a' },
  'Success': { bg: '#dcfce7', color: '#16a34a' },
  'In Stock': { bg: '#dcfce7', color: '#16a34a' },
  'IN STOCK': { bg: '#dcfce7', color: '#16a34a' },
  'Loyal': { bg: '#dcfce7', color: '#16a34a' },
  'Active': { bg: '#dcfce7', color: '#16a34a' },
  'Completed': { bg: '#dcfce7', color: '#16a34a' },
  'Paid': { bg: '#dcfce7', color: '#16a34a' },

  // Yellow / amber statuses
  'Pending': { bg: '#fef3c7', color: '#d97706' },
  'Processing': { bg: '#fef3c7', color: '#d97706' },
  'New': { bg: '#fef3c7', color: '#d97706' },
  'Paused': { bg: '#fef3c7', color: '#d97706' },

  // Orange statuses
  'Draft': { bg: '#ffedd5', color: '#ea580c' },
  'Low Stock': { bg: '#ffedd5', color: '#ea580c' },
  'LOW STOCK': { bg: '#ffedd5', color: '#ea580c' },
  'At Risk': { bg: '#ffedd5', color: '#ea580c' },
  'Medium': { bg: '#ffedd5', color: '#ea580c' },

  // Red statuses
  'Out of Stock': { bg: '#fee2e2', color: '#dc2626' },
  'OUT OF STOCK': { bg: '#fee2e2', color: '#dc2626' },
  'Failed': { bg: '#fee2e2', color: '#dc2626' },
  'Churned': { bg: '#fee2e2', color: '#dc2626' },
  'Cancelled': { bg: '#fee2e2', color: '#dc2626' },
  'High': { bg: '#fee2e2', color: '#dc2626' },

  // Other
  'Shipped': { bg: '#e0e7ff', color: '#6366f1' },
  'Refunded': { bg: '#fce7f3', color: '#db2777' },
  'Inactive': { bg: '#f3f4f6', color: '#6b7280' },
  'Low': { bg: '#dbeafe', color: '#2563eb' },
}

export default function StatusBadge({ status, small }) {
  const colors = statusColors[status] || { bg: '#f3f4f6', color: '#6b7280' }

  return (
    <span className="tag" style={{
      background: colors.bg,
      color: colors.color,
      ...(small ? { fontSize: 10, padding: '2px 8px' } : {}),
    }}>
      {status}
    </span>
  )
}
