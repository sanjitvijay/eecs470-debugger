import BitTable from "../tables/BitTable";
import DebugTable from "../tables/DebugTable";
import { getStringForValue, oneHotEncoder } from "@/lib/utils";
export default function Store_Queue({time, Store_Queue_Data, title = "Store Queue"}){
    const stqKeys = [
        "st_info.addr",
        "st_info.mask",
        "st_info.data.word",
        "tag"
    ]
    
    const stqCustomColumns = [
         {
            accessorKey: 'state',
            header: 'state',
            cell: ({row}) => {
                
                const val = getStringForValue(row.original.state.tv, time)
                if(val.includes('x')) return val

                const num = parseInt(val, 2)
                
                switch(num){
                    case 0: 
                        return "ST_EMPTY"
                    case 1: 
                        return "ST_DISPATCHED"
                    case 2: 
                        return "ISSUED"
                    case 3: 
                        return "RETIRED"
                    default:
                        return val
                }
            }    
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
            cell: ({row}) => {
                return oneHotEncoder(getStringForValue(row.original.tail.ptr.tv, time))
            }
        }
    ]
    return(
        <div className="flex">
            <BitTable
                time={time}
                timeline={Store_Queue_Data.head.ptr.tv}
                title={"head"}
            />
            <div className="p-1"></div>

            <BitTable
                time={time}
                timeline={Store_Queue_Data.tail.ptr.tv}
                title={"tail"}
            />
            
            <div className="p-1"></div>

            <DebugTable
                time={time}
                data={Store_Queue_Data.stq_data}
                title={"stq_data"}
                keysToDisplay={stqKeys}
                customColumns={stqCustomColumns}
            />

            <div className="p-3"></div>

            <DebugTable
                time={time}
                data={Store_Queue_Data.YOT_ptr}
                title={"YOT_ptr"}
                keysToDisplay={"YOT_ptr"}
                defaultFormat="binary"
            />
            <div className="p-1"></div>

            <BitTable
                time={time}
                timeline={Store_Queue_Data.tag_valid.tv}
                title={"tag_valid"}
            />
            

            <div className="p-5"></div>
            <DebugTable
                    time = {time}
                    data = {Store_Queue_Data.ch_stq_table}
                    title="ch_stq_table"
                    keysToDisplay={chKeysToDisplay}
                    customColumns={chCustomColumns}
            />
        </div>
    )
}