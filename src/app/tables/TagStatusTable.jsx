import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getStringForValue } from '@/lib/utils';


function TagStatusTable({time, title = "tag status table", timeline, columns}) {
    const [vector, setVector] = useState('')
    
    useEffect(()=>{
        setVector(getStringForValue(timeline, time))
    }, [time])

    // Create rows of bits based on the number of columns
    const createRows = () => {
        
        const bits = vector.split('').reverse();
        const rowsPerColumn = Math.ceil(bits.length / columns);
        const rows = Array(rowsPerColumn).fill().map(() => Array(columns).fill(null));
        
        // Fill the array column by column
        for (let i = 0; i < bits.length; i++) {
            const col = Math.floor(i / rowsPerColumn);
            const row = i % rowsPerColumn;
            rows[row][col] = bits[i];
        }
        
        return rows;
    }

    return (
        <div>
            <div className="mb-2 ml-2 text-lg">
                {title}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableBody>
                        {createRows().map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((bit, colIndex) => {
                                    const bitIndex = rowIndex + (colIndex * Math.ceil(vector.length / columns));
                                    return (
                                        <TableCell 
                                            key={colIndex}
                                            className={bit === '1' ? 'bg-[hsl(142,76%,36%,0.5)] w-12' : 'w-12'}
                                        >
                                            {bitIndex < vector.length ? bitIndex : ''}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default TagStatusTable;