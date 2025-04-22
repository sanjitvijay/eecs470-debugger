import DebugTable from "../tables/DebugTable"

export default function Store_Res({time, Store_Res_Data, title="store res units"}){
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

    const strInfoKeys = [
        "str_info.addr",
        "str_info.data.word",
        "str_info.mask",
    ]
    
    const unitCustomColumns = [
        {
            accessorKey: 'index',
            header: 'unit',
            cell: ({row}) => row.index 
        }
    ]

    return (
        <div>
            {title}
            <div className="flex">
                <DebugTable 
                    time = {time} 
                    data = {Store_Res_Data}
                    title = "iss_packet"
                    keysToDisplay={issPacketKeys}
                    customColumns={unitCustomColumns}
                />
                <div className="p-3"></div>
                <DebugTable 
                    time = {time} 
                    data = {Store_Res_Data}
                    title = "ex_packet"
                    keysToDisplay={exPacketKeys}
                />
                <div className="p-3"></div>
                <DebugTable 
                    time = {time} 
                    data = {Store_Res_Data}
                    title = "str_info"
                    keysToDisplay={strInfoKeys}
                />
            </div>
        </div>
    )
}