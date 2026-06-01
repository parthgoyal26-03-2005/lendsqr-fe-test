import type { ReactNode } from 'react'
import './DataTable.scss'

export interface TableColumn<T> {
  header: string
  width?: string
  className?: string
  headerAction?: ReactNode
  render: (item: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Array<TableColumn<T>>
  data: T[]
  rowKey: (item: T) => string
  onRowClick?: (item: T) => void
}

export function DataTable<T>({ columns, data, rowKey, onRowClick }: DataTableProps<T>) {
  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>, item: T): void => {
    if (!onRowClick) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onRowClick(item)
    }
  }

  return (
    <div className="data-table__wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header} style={column.width ? { width: column.width } : undefined}>
                <span className="data-table__header-label">
                  {column.header ? <span>{column.header}</span> : null}
                  {column.headerAction ? <span className="data-table__header-action">{column.headerAction}</span> : null}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={rowKey(item)}
              onClick={() => onRowClick?.(item)}
              onKeyDown={(event) => handleRowKeyDown(event, item)}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? 'button' : undefined}
            >
              {columns.map((column) => (
                <td key={column.header} className={column.className}>
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
