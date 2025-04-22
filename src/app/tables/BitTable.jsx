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
import { Button } from '@/components/ui/button';

function BitTable({time, title, timeline}) {
    const [vector, setVector] = useState('')

    useEffect(()=>{
        setVector(getStringForValue(timeline, time))
    }, [time])
    
    return (
        <div>
            <div className="mb-2 ml-2 text-lg">
                {title}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className>
                        <TableRow>
                            <TableHead>
                                Value 
                                <Button variant="ghost" size="sm">
                                    #
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vector.split('').reverse().map((bit, index) => (
                            <TableRow key={index}>
                                <TableCell>{bit === '0' ? '\u00A0' : bit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default BitTable;