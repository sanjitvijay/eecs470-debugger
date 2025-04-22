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
import { getStringForValue, convertSingleSignal, cn } from "@/lib/utils"

export default function DebugTable({ 
    time, 
    data, 
    title, 
    keysToDisplay,  
    customColumns = [],  // Default empty array 
    defaultFormat = "decimal", // Default to binary but can change if you want
    className = "",
    hideTitle = false
}){
  //Holds what format each column is, can be changed using the # button on the header
  const [columnFormat, setColumnFormat] = useState({})

  function updateFormat(columnId, format) {
    setColumnFormat(prev => ({
      ...prev,
      [columnId]: format,
    }))
  }

  // Memoize formattedData
  const formattedData = useMemo(() => {
    //if the signal is just a single signal, convert it to an array for processing
    return Array.isArray(data) ? data : convertSingleSignal(title, data)
  }, [data, title])

  function getLeafKeys(obj, prefix = "") {
    return Object.entries(obj).flatMap(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && value !== null) {
            if (value.leaf === true) {
                return [newKey]; // Include only if leaf is true
            }
            return getLeafKeys(value, newKey); // Recursively check deeper
        }
        return [];
    });
  }

  const columns = useMemo(() => {
    const leafKeys = getLeafKeys(formattedData[0]);
    const dataColumns = leafKeys
      .filter(key => keysToDisplay.includes(key))  // Only include keys that are in keysToDisplay
      .map(key => ({                               // Instantiates the column headers
        accessorKey: key,
        header: key.split('.').at(-1),
        cell: ({row, column}) => {
            //most of the logic exists here, writes values to individual cells
            const row_value = key.split('.').reduce((obj, prop) => obj?.[prop], row.original);
            //finds the correct value from the timeline given the debug time, look at utils.js for implementation
            const binaryString = getStringForValue(row_value.tv, time) 

            if(binaryString.includes('x')) return binaryString //just return xxx if invalid


            //formats number based on selection
            const format = columnFormat[column.id] || defaultFormat
            const number = BigInt('0b' + binaryString);

            switch(format){
                case "binary": return binaryString //return the original string to preserve all bits
                case "decimal": return number.toString(10)
                case "hex": return number.toString(16).toUpperCase()
            }
      }
    }))

    return [...customColumns, ...dataColumns]
  }, [formattedData, time, columnFormat])

  // Initialize table with formattedData and columns
  const table = useReactTable({
    data: formattedData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={cn(className)}>
      {!hideTitle && <div className="mb-2 ml-2 text-lg">
        {title}
      </div>}
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