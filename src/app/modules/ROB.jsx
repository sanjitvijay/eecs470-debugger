import React from 'react';
import DebugTable from '../tables/DebugTable';
import BitTable from '../tables/BitTable';
import TagStatusTable from '../tables/TagStatusTable';
import { getStringForValue, oneHotEncoder } from '@/lib/utils';

function ROB({time, ROB_Data, title="ROB"}) {
    const ROBkeysToDisplay = ['valid', 'tag', 'tag_old']
    const ROBCustomColumns = [
        {
            accessorKey: 'index',
            header: 'index',
            cell: ({row}) => row.index + 1
        }
    ]

    const chKeysToDisplay = ['squash_entries']
    const chCustomColumns = [
        {
            accessorKey: 'index',
            header: 'index',
            cell: ({row}) => row.index + 1
        },
        {
            accessorKey: 'tail',
            header: 'tail',
            cell: ({row}) => oneHotEncoder(getStringForValue(row.original.tail.tv, time))
        }
    ]

    return (
        <div>
            <div className="text-xl mb-2">
                {title}
            </div>
            <div className='flex gap-2'>
                <BitTable
                    time = {time}
                    title = "head"
                    timeline = {ROB_Data.head.tv}
                />
                <BitTable
                    time = {time}
                    title = "tail"
                    timeline = {ROB_Data.tail.tv}
                />
                <DebugTable
                    time = {time}
                    data = {ROB_Data.rob_data}
                    title="rob_data"
                    keysToDisplay={ROBkeysToDisplay}
                    customColumns={ROBCustomColumns}
                />
            </div>
            <div className="p-4"></div>
            {/* <div className='flex'> */}
                <DebugTable
                        time = {time}
                        data = {ROB_Data.ch_rob_table}
                        title="ch_rob_table"
                        keysToDisplay={chKeysToDisplay}
                        customColumns={chCustomColumns}
                />
            {/* </div> */}
        </div>
    );
}

export default ROB;