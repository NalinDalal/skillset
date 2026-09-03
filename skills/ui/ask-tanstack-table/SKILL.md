---
name: ask-tanstack-table
description: Library guide for TanStack Table v8: headless, TypeScript-first, sorting, filtering, pagination, virtualization, column resizing. Load via ask-table pattern skill.
---

# Ask TanStack Table: Data Tables v8

**When to use:** Any tabular data: admin panels, dashboards, reports, data grids.

**Package:** `@tanstack/react-table`, `@tanstack/react-virtual`


## Installation

```bash
npm i @tanstack/react-table @tanstack/react-virtual
```


## Core Setup

```tsx
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
```


## Column Definitions (Type-Safe)

```tsx
import { createColumnHelper } from '@tanstack/react-table'
import type { Project } from '@/types/project'

const columnHelper = createColumnHelper<Project>()

export const projectColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <div className="font-medium">{info.getValue()}</div>
    ),
    size: 250,
    minSize: 150,
    maxSize: 400,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue() as Project['status']} />,
    size: 120,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('owner.name', {
    header: 'Owner',
    cell: (info) => <UserAvatar user={info.row.original.owner} />,
    size: 180,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated',
    cell: (info) => <RelativeTime date={info.getValue() as Date} />,
    size: 160,
    sortingFn: 'datetime',
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (info) => <ProjectActions project={info.row.original} />,
    size: 80,
    sortable: false,
    filterable: false,
  }),
]
```


## Table Component (Complete)

```tsx
'use client'

import { useState, useRef } from 'react'
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  rowCount?: number // For server-side
  onRowClick?: (row: TData) => void
  className?: string
}

export function DataTable<TData>({
  columns,
  data,
  rowCount,
  onRowClick,
  className,
}: DataTableProps<TData>) {
  // State
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 25 })
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter, pagination, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!rowCount,
    rowCount,
    manualSorting: !!rowCount,
    manualFiltering: !!rowCount,
  })

  // Virtualization
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  })

  return (
    <div className={cn('overflow-hidden border rounded-lg', className)} ref={parentRef}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b bg-gray-50 dark:bg-gray-900/50">
        <input
          type="search"
          placeholder="Search all columns…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="flex-1 max-w-xs px-3 py-1.5 text-sm border rounded-lg outline-none"
        />
        <div className="flex items-center gap-2 ml-auto">
          <select
            value={pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 text-sm border rounded"
          >
            {[10, 25, 50, 100].map(size => <option key={size} value={size}>{size} / page</option>)}
          </select>
          <ColumnVisibilityDropdown table={table} />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse" role="grid">
        <thead className="bg-gray-50 dark:bg-gray-900/50 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <button
                          onClick={() => header.column.toggleSorting()}
                          className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          aria-label={`Sort by ${header.column.columnDef.header}`}
                        >
                          {header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUpDown className="h-4 w-4 opacity-50" />
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
          {/* Column Filters Row */}
          {table.getHeaderGroups()[1] && (
            <tr>
              {table.getHeaderGroups()[1].headers.map((header) => (
                <th key={header.id} className="px-3 py-1">
                  {header.column.getCanFilter() && (
                    <input
                      type="text"
                      placeholder={`Filter ${header.column.id}…`}
                      value={(header.column.getFilterValue() as string) || ''}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded outline-none"
                    />
                  )}
                </th>
              ))}
            </tr>
          )}
        </thead>

        {/* Virtualized Body */}
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <div style={{ height: virtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index]
              return (
                <tr
                  key={row.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => onRowClick?.(row.original)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 text-sm" style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
          </div>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-3 py-2 border-t flex items-center justify-between">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-{Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            rowCount ?? data.length
          )} of {rowCount ?? data.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
```


## Column Visibility Dropdown

```tsx
function ColumnVisibilityDropdown({ table }: { table: ReturnType<typeof useReactTable> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm"><Columns className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.getAllLeafColumns().map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(checked) => column.toggleVisibility(checked)}
            className="flex items-center gap-2"
          >
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```


## Server-Side (Large Data)

```tsx
// API: GET /api/projects?sort=name&order=asc&filter[status]=active&page=0&size=25
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort') || 'updatedAt'
  const order = searchParams.get('order') || 'desc'
  const page = Number(searchParams.get('page')) || 0
  const size = Number(searchParams.get('size')) || 25

  // Parse filters: filter[field]=value
  const filters: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    if (key.startsWith('filter[')) {
      filters[key.slice(7, -1)] = value
    }
  })

  const [data, total] = await Promise.all([
    db.project.findMany({
      where: buildWhere(filters),
      orderBy: { [sort]: order },
      skip: page * size,
      take: size,
    }),
    db.project.count({ where: buildWhere(filters) }),
  ])

  return Response.json({ data, rowCount: total, page, pageSize: size })
}
```


## Client-Side with Server Data

```tsx
function ProjectTable() {
  const [data, setData] = useState<Project[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const params = new URLSearchParams()
    params.set('page', String(pagination.pageIndex))
    params.set('size', String(pagination.pageSize))
    if (sorting[0]) { params.set('sort', sorting[0].id); params.set('order', sorting[0].desc ? 'desc' : 'asc') }
    columnFilters.forEach(f => params.set(`filter[${f.id}]`, String(f.value)))
    if (globalFilter) params.set('search', globalFilter)

    const res = await fetch(`/api/projects?${params}`)
    const { data, rowCount } = await res.json()
    setData(data)
    setRowCount(rowCount)
    setIsLoading(false)
  }, [pagination, sorting, columnFilters, globalFilter])

  useEffect(() => { fetchData() }, [fetchData])

  return (
    <DataTable
      columns={projectColumns}
      data={data}
      rowCount={rowCount}
      onRowClick={(project) => router.push(`/projects/${project.id}`)}
    />
  )
}
```


## Expanded Rows (Detail View)

```tsx
const columns = [
  columnHelper.display({
    id: 'expand',
    header: '',
    cell: (info) => (
      <button onClick={() => info.row.toggleExpanded()} className="p-1">
        {info.row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
    ),
    size: 40,
  }),
  // ... other columns
]

// In table options
getExpandedRowModel: getExpandedRowModel(),
```

```tsx
// Render expanded content
{row.getIsExpanded() && (
  <tr>
    <td colSpan={columns.length} className="p-4 bg-gray-50 dark:bg-gray-900/50">
      <ProjectDetail project={row.original} />
    </td>
  </tr>
)}
```


## Row Selection

```tsx
import { getSelectRowModel } from '@tanstack/react-table'

const table = useReactTable({
  // ...
  getSelectRowModel: getSelectRowModel(),
  onRowSelectionChange: (updater) => setRowSelection(updater),
})

// In header
<th>
  <input
    type="checkbox"
    checked={table.getIsAllRowsSelected()}
    onChange={(e) => table.toggleAllRowsSelected(e.target.checked)}
  />
</th>

// In body row
<td>
  <input
    type="checkbox"
    checked={row.getIsSelected()}
    onChange={(e) => row.toggleSelected(e.target.checked)}
  />
</td>
```


## Column Resizing (Built-in)

```tsx
import { useColumnOrder, getColumnOrder } from '@tanstack/react-table'

// Columns are resizable by default with handle
// Persist order:
const [columnOrder, setColumnOrder] = useState<string[]>(defaultOrder)
const table = useReactTable({
  // ...
  state: { columnOrder },
  onColumnOrderChange: setColumnOrder,
})
```


## Export to CSV

```tsx
function exportToCSV(table: ReturnType<typeof useReactTable>) {
  const headers = table.getAllLeafColumns().map(c => c.id)
  const rows = table.getFilteredRowModel().rows.map(row =>
    headers.map(h => row.getValue(h))
  )
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'export.csv'
  a.click()
}
```


## Related Skills

- `ui/ask-table` - Pattern guide for data tables
- `ui/ask-virtuoso` - Virtualized lists (non-table)
- `ui/ui-engineering` - Master orchestrator
