import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { getStringForValue } from "@/lib/utils"


/**
 * Use DebugTable instead of this table
 * I only have this here for reference, DebugTable is more parametrized
 */

function RS_Table({ time, RS_data, title }) {
    const [columnFormat, setColumnFormat] = useState({})

    function updateFormat(columnId, format) {
        setColumnFormat(prev => ({
          ...prev,
          [columnId]: format,
        }))
      }
    //change this to add more signals if you need
  const keysToDisplay = ['tag_dest', 'tag1', 'tag2', 'b_mask', 'valid']
  
  const data = useMemo(() => {
    return RS_data
  }, [RS_data, time])
  
  const columns = useMemo(() => {
    const indexColumn = {
        accessorKey: 'index',
        header: 'index',
        cell: ({ row }) => row.index  // This will display the row index
    }

    const dataColumns = Object.keys(RS_data[0])
      .filter(key => keysToDisplay.includes(key))  // Only include keys that are in keysToDisplay
      .map(key => ({
        accessorKey: key,
        header: key,
        cell: ({row, column}) => {
            const row_value = row.original[key]
            const binaryString = getStringForValue(row_value.tv, time)
             
            if(binaryString.includes('x')) return binaryString

            const format = columnFormat[column.id] || "decimal"
            const number = parseInt(binaryString, 2)

            switch(format){
                case "binary": return binaryString
                case "decimal": return number.toString(10)
                case "hex": return number.toString(16).toUpperCase()
            }
        }
      }))

      return [indexColumn, ...dataColumns]
  }, [RS_data, time, columnFormat])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
        <div className="mb-2 ml-2 text-lg">
            {title}
        </div>
        <div className="rounded-md border">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                #
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onSelect={() => updateFormat(header.column.id, "binary")}>
                                Binary
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => updateFormat(header.column.id, "decimal")}>
                                Decimal
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => updateFormat(header.column.id, "hex")}>
                                Hex
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                    </TableHead>
                ))}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
    </div>
  )
}

export default RS_Table