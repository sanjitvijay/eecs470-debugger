import React, { useEffect, useState, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getStringForValue } from '@/lib/utils';

function MapTable({ time, title, data, columns }) {
    const [tags, setTags] = useState([]);
    const [changedTags, setChangedTags] = useState([]);
    const prevTagsRef = useRef([]);

    useEffect(() => {
        const newTags = data.map(tag => {
            const bitstring = getStringForValue(tag.tv, time);
            return bitstring.includes('x') ? bitstring : parseInt(bitstring, 2);
        });

        // Compare newTags with previous tags to see which ones changed.
        if (prevTagsRef.current.length > 0) {
            const changes = newTags.map((tag, index) => tag !== prevTagsRef.current[index]);
            setChangedTags(changes);
        } else {
            // First render: mark none as changed.
            setChangedTags(newTags.map(() => false));
        }

        setTags(newTags);
        prevTagsRef.current = newTags;
    }, [time, data]);

    const createRows = () => {
        const rows = [];
        const numRows = Math.ceil(tags.length / columns);

        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                const index = i + (j * numRows);
                if (index < tags.length) {
                    row.push({
                        index: index,
                        value: tags[index],
                        changed: changedTags[index] // Pass along whether this cell changed.
                    });
                }
            }
            rows.push(row);
        }
        return rows;
    };

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
                                {row.map((item, colIndex) => (
                                    <React.Fragment key={colIndex}>
                                        <TableCell className="text-center bg-accent">
                                            {item.index}
                                        </TableCell>
                                        <TableCell
                                            className={`text-center w-12 ${
                                                item.changed ? 'bg-chart-1' : ''
                                            }`}
                                        >
                                            {item.value}
                                        </TableCell>
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default MapTable;