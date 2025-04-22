import DebugTable from "../tables/DebugTable"
import { getStringForValue } from "@/lib/utils"

export default function Load_Res({time, Load_Res_Data, title="load res units"}){
    const issPacketKeys = [
        "iss_packet.b_mask",
        "iss_packet.alu_func",
        "iss_packet.rs1_value",
        "iss_packet.rs2_value",
        "iss_packet.tag_dest",
        "iss_valid"        
    ]
    const exPacketKeys = [
        "ex_packet.b_mask",
        "ex_packet.result",
        "ex_packet.tag_dest",
        "ex_valid"
    ]

    const ldInfoKeys = [    
        "ld_info.addr",
        "ld_info.data",
        "ld_info.is_signed",
        "ld_info.mask",
    ]
    
    const unitCustomColumns = [
        {
            accessorKey: 'index',
            header: 'unit',
            cell: ({row}) => row.index 
        },
        {
            accessorKey: 'mem_size',
            header: 'mem_size',
            cell: ({row}) => {
                
                const val = getStringForValue(row.original.ld_info.mem_size.tv, time)
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
        }
    ]
    

    return (
        <div>
            {title}
            <div className="flex">
                <DebugTable 
                    time = {time} 
                    data = {Load_Res_Data}
                    title = "iss_packet"
                    keysToDisplay={issPacketKeys}
                    customColumns={unitCustomColumns}
                />
                <div className="p-3"></div>
                <DebugTable 
                    time = {time} 
                    data = {Load_Res_Data}
                    title = "ex_packet"
                    keysToDisplay={exPacketKeys}
                    customColumns={unitCustomColumns}
                />
                                <div className="p-3"></div>

                <DebugTable 
                    time = {time} 
                    data = {Load_Res_Data}
                    title = "ld_info"
                    keysToDisplay={ldInfoKeys}
                    customColumns={unitCustomColumns}
                />
            </div>
        </div>
    )
}