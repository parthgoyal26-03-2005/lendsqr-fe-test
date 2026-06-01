import './Pagination.scss'

interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const pageItems = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages: Array<number | 'ellipsis'> = [1]
    const visibleStart = Math.max(2, currentPage - 1)
    const visibleEnd = Math.min(totalPages - 1, currentPage + 1)

    if (visibleStart > 2) {
      pages.push('ellipsis')
    }

    for (let page = visibleStart; page <= visibleEnd; page += 1) {
      pages.push(page)
    }

    if (visibleEnd < totalPages - 1) {
      pages.push('ellipsis')
    }

    pages.push(totalPages - 1, totalPages)

    return pages.filter((page, index, array) => array.indexOf(page) === index)
  })()

  return (
    <div className="pagination">
      <span className="pagination__summary">
        Showing {startItem}-{endItem} of {totalItems}
      </span>
      <div className="pagination__controls">
        <button type="button" className="pagination__arrow" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page">
          <span aria-hidden="true">‹</span>
        </button>
        <div className="pagination__pages" aria-label="Pagination pages">
          {pageItems.map((page, index) =>
            page === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="pagination__ellipsis" aria-hidden="true">
                ...
              </span>
            ) : (
            <button
                key={page}
              type="button"
              className={page === currentPage ? 'is-active' : ''}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
            ),
          )}
        </div>
        <button type="button" className="pagination__arrow" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} aria-label="Next page">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  )
}
