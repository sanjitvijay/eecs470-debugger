import DebugTable from "../tables/DebugTable"

export default function B_Res({time, B_Res_Data, title="B_Res"}){
    console.log(B_Res_Data)
    const issPacketKeys = [
        "iss_packet.PC",
        "iss_packet.NPC",
        "iss_packet.b_mask",
        "iss_packet.alu_func",
        "iss_packet.rs1_value",
        "iss_packet.rs2_value",
        "iss_packet.tag_dest",
        "iss_valid"        
    ]
    const exPacketKeys = [
        "ex_packet.b_mask",
        "ex_packet.result.word",
        "ex_packet.tag_dest",
        "ex_valid"
    ]

    const resolvedPacketKeys = [
        "resolved_packet.PC",
        "resolved_packet.b_id",
        "resolved_packet.is_cond_branch",
        "resolved_packet.is_mispred",
        "resolved_packet.take_branch",
        "resolved_packet.uncond_addr",
        "resolved_valid"
    ]

    const bResCombKeys = [
        "b_res_comb_inst.alu_result.word",
        "b_res_comb_inst.opa_mux_out.word",
        "b_res_comb_inst.opb_mux_out.word",
        "b_res_comb_inst.rs1.word",
        "b_res_comb_inst.rs2.word",
        
    ]
    
    const unitCustomColumns = [
        {
            accessorKey: 'index',
            header: 'unit',
            cell: ({row}) => row.index 
        }
    ]

    return(
        <div>
            {title}
            <div>
                <DebugTable 
                    time = {time} 
                    data = {B_Res_Data}
                    title = "iss_packet"
                    keysToDisplay={issPacketKeys}
                    customColumns={unitCustomColumns}
                />
                <div className="p-5"></div>
                <div className="flex">
                    <DebugTable 
                        time = {time} 
                        data = {B_Res_Data}
                        title = "resolved_packet"
                        keysToDisplay={resolvedPacketKeys}
                        customColumns={unitCustomColumns}
                    />
                </div>
                <div className="p-5"></div>
                <div className="">
                <div className="flex justify-between">
                        <div className=""> unit </div>
                        <div className=""> alu_result </div>
                        <div className=""> opa_mux_out </div>
                        <div className=""> opb_mux_out  </div>
                        <div className="">rs1</div>
                        <div className="">rs2</div>
                    </div>
                    <div className="p-1"></div>
                    <DebugTable 
                        time = {time} 
                        data = {B_Res_Data}
                        title = "b_res_comb"
                        keysToDisplay={bResCombKeys}
                        customColumns={unitCustomColumns}
                    />
                </div>
                
                <div className="p-5"></div>

                <DebugTable 
                    time = {time} 
                    data = {B_Res_Data}
                    title = "ex_packet"
                    keysToDisplay={exPacketKeys}
                    customColumns={unitCustomColumns}
                />

            </div>
        </div>
    )
}