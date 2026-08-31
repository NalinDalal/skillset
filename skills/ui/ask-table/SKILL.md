---
name: ask-table
description: Pattern guide for data tables: sorting, filtering, pagination, virtualization, column resizing, row selection, inline editing. Load via ui-engineering. Invokes pick-ui-library → recommends TanStack Table → loads ask-tanstack-table for implementation.
---

# Ask Table: Data Tables, Sorting, Filtering, Virtualization

**When to use:** Any tabular data: admin panels, dashboards, lists, reports, data grids.

---

## The Pattern (What Good Looks Like)

| Feature | Quality Bar (Linear/GitHub/Stripe) |
|---------|-------------------------------------|
| **Sorting** | Multi-column, click header, shift+click for multi, visual indicator |
| **Filtering** | Global search + per-column, faceted, saved views |
| **Pagination** | Cursor-based (infinite) or page-based, page size selector |
| **Virtualization** | 10k+ rows smooth, row height caching, overscan |
| **Column resize** | Drag handle, persist widths, min/max constraints |
| **Column reorder** | Drag header, persist order |
| **Row selection** | Checkbox column, shift+click range, select all (filtered) |
| **Inline editing** | Click to edit, Enter save, Escape cancel, validation |
| **Expandable rows** | Chevron, nested content, lazy load |
| **Copy/paste** | Cmd+C/Cmd+V rows, Excel-compatible TSV |
| **Keyboard** | Arrow nav, Space select, Enter edit, Escape cancel |
| **Accessibility** | ARIA grid, column headers, sort announcements |

---

## Quality Checklist

- [ ] **TanStack Table v8**: Headless, framework-agnostic, TypeScript-first
- [ ] **Virtualized**: `@tanstack/react-virtual` for 100+ rows
- [ ] **Server-side**: Sorting/filtering/pagination on server for large data
- [ ] **Column definitions**: Type-safe, reusable, composable
- [ ] **State persistence**: URL sync (search params) or localStorage
- [ ] **Loading states**: Skeleton rows, not spinner
- [ ] **Empty state**: Helpful illustration + action
- [ ] **Error state**: Retry button, not just error text
- [ ] **Responsive**: Horizontal scroll on mobile, priority columns
- [ ] **Density toggle**: Compact/comfortable spacing

---

## Anti-Patterns (Slop)

- ❌ HTML `<table>` with manual sort/filter: Reinventing wheel
- ❌ No virtualization >100 rows: Jank, memory
- ❌ All data client-side for 10k+ rows: Freezes main thread
- ❌ No keyboard nav: Power user hostile
- ❌ Fixed column widths: Content clips or wastes space
- ❌ No loading skeleton: Flashing content
- ❌ Select all only selects current page: Confusing
- ❌ No copy/paste: Data trapped

---

## Implementation Flow

```
User needs data table
    │
    ├─► ui-engineering detects "table/data grid/sorting/filtering"
    │
    ├─► pick-ui-library → recommends TanStack Table
    │
    ├─► load ask-tanstack-table (library skill)
    │
    └─► implement with TanStack Table + Virtual + URL state
```

---

## Core Setup (TanStack Table v8)

```tsx
// columns/projectColumns.tsx
import { createColumnHelper } from '@tanstack/react-table'
import type { Project } from '@/types/project'

const columnHelper = createColumnHelper<Project>()

export const projectColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <ProjectNameCell project={info.row.original} />,
    size: 250,
    minSize: 150,
    maxSize: 400,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue() as Project['status']} />,
    size: 120,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Last Updated',
    cell: (info) => <RelativeTime date={info.getValue() as Date} />,
    size: 180,
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

```tsx
// components/DataTable.tsx
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  rowCount?: number // For server-side pagination
  onRowClick?: (row: TData) => void
}

export function DataTable<TData>({ columns, data, rowCount, onRowClick }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: [],
      columnFilters: [],
      globalFilter: '',
      pagination: { pageIndex: 0, pageSize: 25 },
    },
    onSortingChange: (updater) => setSorting(updater),
    onColumnFiltersChange: (updater) => setColumnFilters(updater),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: !!rowCount,
    rowCount,
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
    <div className="overflow-hidden border rounded-lg" ref={parentRef}>
      <table className="w-full border-collapse" role="grid">
        <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <Button variant="ghost" size="icon" className="ml-1 p-0" onClick={() => header.column.toggleSorting()}>
                      {header.column.getIsSorted() === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          <div style={{ height: virtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <tr
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => onRowClick?.(table.getRowModel().rows[virtualRow.index].original)}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {table.getRowModel().rows[virtualRow.index].getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </div>
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-3 py-2 border-t flex items-center justify-between">
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="text-sm border rounded px-2 py-1"
        >
          {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size} per page</option>)}
        </select>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  )
}
```

---

## Server-Side (Large Data)

```tsx
// API route: GET /api/projects?sort=name&order=asc&filter[status]=active&page=0&size=25
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sort = searchParams.get('sort') || 'updatedAt'
  const order = searchParams.get('order') || 'desc'
  const page = Number(searchParams.get('page')) || 0
  const size = Number(searchParams.get('size')) || 25
  const filters = Object.fromEntries(searchParams.entries())

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

---

## When to Escalate

| Need | Escalate To |
|------|-------------|
| Virtualized list (not table) | `ask-virtual-list` + `ask-virtuoso` |
| Inline editing forms | `ask-form` + `ask-rhf` |
| Row actions (delete, etc.) | `ask-modal` + `ask-toast` |
| Export to CSV/Excel | Custom export utility |