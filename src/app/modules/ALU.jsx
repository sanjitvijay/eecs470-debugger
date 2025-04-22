import BitTable from "../tables/BitTable";
import DebugTable from "../tables/DebugTable";

export default function ALU({time, ALU_Data, title="alu"}){
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
            <div>
                <DebugTable 
                    time = {time} 
                    data = {ALU_Data}
                    title = "iss_packet"
                    keysToDisplay={issPacketKeys}
                    customColumns={unitCustomColumns}
                />
                <div className="p-5"></div>
                <DebugTable 
                    time = {time} 
                    data = {ALU_Data}
                    title = "ex_packet"
                    keysToDisplay={exPacketKeys}
                    customColumns={unitCustomColumns}
                />
            </div>
        </div>
    )
}