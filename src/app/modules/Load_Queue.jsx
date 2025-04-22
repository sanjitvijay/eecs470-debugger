import BitTable from "../tables/BitTable"
import DebugTable from "../tables/DebugTable"
import { getStringForValue } from "@/lib/utils"

export default function Load_Queue({time, Load_Queue_Data, title = "Load Queue"}){
    const ldqDataKeys = [
        "addr_id.id",
        "addr_id.fields.is_upper_word",
        "addr_id.fields.mem_tag",
        "ld_info.addr",
        "ld_info.data.word",
        "ld_info.is_signed",
        "ld_info.mask",
        "packet.b_mask",
        "packet.tag_dest",
        "packet.PC",
        "stq_YOT_ptr.ptr"
    ]

    

    const ldqCustomColumns = [
        {
            accessorKey: 'mem_size',
            header: 'mem_size',
            cell: ({row}) => {
                
                const val = getStringForValue(row.original.ld_info.mem_size.tv, time)
                if(val.includes('x')) return val
                const num = parseInt(val, 2)
                
                switch(num){
                    case 0: 
                        return "BYTE"
                    case 1: 
                        return "HALF"
                    case 2: 
                        return "WORD"
                    case 3: 
                        return "DOUBLE"
                    default:
                        return val
                }
            }    
        }, 
        {
            accessorKey: 'state',
            header: 'state',
            cell: ({row}) => {
                
                const val = getStringForValue(row.original.state.tv, time)
                const num = parseInt(val, 2)
                
                switch(num){
                    case 0: 
                        return "LD_EMPTY"
                    case 1: 
                        return "LD_DISPATCHED"
                    case 2: 
                        return "DCACHE_LOAD"
                    case 3: 
                        return "WAIT_FOR_MEM"
                    case 4: 
                        return "WAIT_FOR_STQ"
                    case 5: 
                        return "COMPLETE"
                    default:
                        return val
                }
            }    
        }
    ]

    const resolvedIdData = Load_Queue_Data.resolved_id.map(id => ({id}))
    return(
        <div className="flex">
            <div>
                <BitTable
                    time={time}
                    timeline={Load_Queue_Data.dis_packet_valid.tv}
                    title={"dis_packet_valid"}
                />
                <div className="p-2"></div>
                <div className="flex gap-2">
                    <DebugTable
                        time={time}
                        data={Load_Queue_Data.dcache_gnt}
                        title={"dcache_gnt"}
                        keysToDisplay={"dcache_gnt"}
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={resolvedIdData}
                        keysToDisplay={"id"}
                        title={"resolved_id"}
                        defaultFormat="binary"
                    />
                    <BitTable
                        time={time}
                        timeline={Load_Queue_Data.id_is_mispred.tv}
                        title={"id_is_mispred"}
                    />
                    <BitTable
                        time={time}
                        timeline={Load_Queue_Data.id_valid.tv}
                        title={"id_valid"}
                    />

                </div>
                
            </div>
            <div className="p-1"></div>
            <div className="flex">
                {Load_Queue_Data.dcache_req_ptr.map((dr, index) => {
                    return(
                        <div
                            key={index}
                        >
                            
                            <BitTable
                                time={time}
                                timeline={dr.tv}
                                title={"dr " + index}
                            />
                        </div>
                    )
                })}
             </div>
            
            <div className="p-1"></div>
            <DebugTable
                time={time}
                data={Load_Queue_Data.ldq_data}
                keysToDisplay={ldqDataKeys}
                customColumns={ldqCustomColumns}
                title={title}
            />

            <div className="p-3"></div>
            <BitTable   
                time={time}
                timeline={Load_Queue_Data.next_empty_entries.tv}
                title={"next_empty_entries"}
            />
        </div>
    )
}