import { useEffect, useState } from "react";
import BitTable from "../tables/BitTable";
import DebugTable from "../tables/DebugTable";
import { getStringForValue } from "@/lib/utils";

export default function BP({time, BP_Data, title="branch predictor"}){
    console.log(BP_Data)
    const fetchPacketKeys = ["inst.inst", "PC"]
    const btbOutKeys = ["jmp", "ret", "output_PC"]
    const btbTableKeys = ["valid", "uncond", "ret", "jmp", "tag", "target", "index_debug"]

    const phtData = BP_Data.dirp_inst.PHT.map(entry => ({entry}))
    const rasData = BP_Data.ras_inst.ras_stack.map(addr => ({addr}))

    const modifiedPacketKeys = ["PC", "inst.inst", "NPC", "is_predicted_taken", "valid"]

    const [btbTable, setBtbTable] = useState([])

    useEffect(() => {
        const validBTBTable = BP_Data.btb_inst.btb_table.filter(
            btbEntry => getStringForValue(btbEntry.valid.tv, time) == "1"
        )

        setBtbTable(validBTBTable)
    }, [time])
    return(
        <div>
            <div className="flex gap-5">
                <div className="flex gap-2">
                    <BitTable
                        time={time}
                        title={"output_valid"}
                        timeline={BP_Data.output_valid.tv}
                    />
                    <DebugTable
                        time={time}
                        title={"modified_packets"}
                        data={BP_Data.modified_packets}
                        keysToDisplay={modifiedPacketKeys}
                        defaultFormat="hex"
                    />
                </div>
                
                <DebugTable
                    time={time}
                    title={"predict_PC"}
                    data={BP_Data.predict_PC}
                    keysToDisplay={["predict_PC"]}
                    defaultFormat="hex"
                />

                <DebugTable
                    time={time}
                    title={"valid_predict"}
                    data={BP_Data.valid_predict}
                    keysToDisplay={["valid_predict"]}
                    defaultFormat="hex"
                />

            </div>
            <div className="p-5"></div>
            <div className="flex gap-5">
                <DebugTable
                    time={time}
                    title={"taken_index"}
                    data={BP_Data.taken_index}
                    keysToDisplay={["taken_index"]}
                    defaultFormat="hex"
                />

                <DebugTable
                    time={time}
                    title={"taken_branches"}
                    data={BP_Data.taken_branches}
                    keysToDisplay={["taken_branches"]}
                    defaultFormat="hex"
                />

                <DebugTable
                    time={time}
                    title={"final_taken"}
                    data={BP_Data.final_taken}
                    keysToDisplay={["final_taken"]}
                    defaultFormat="hex"
                />

                <DebugTable
                    time={time}
                    title={"r_final_taken"}
                    data={BP_Data.r_final_taken}
                    keysToDisplay={["r_final_taken"]}
                    defaultFormat="hex"
                />
            </div>
            <div className="p-5"></div>
            <div className="flex gap-2">
                <BitTable
                    time={time}
                    title={"uncond"}
                    timeline={BP_Data.uncond_branches.tv}
                />

                <BitTable
                    time={time}
                    title={"cond"}
                    timeline={BP_Data.cond_branches.tv}
                />

                <DebugTable
                    time={time}
                    title={"if_packet"}
                    data={BP_Data.if_packet}
                    keysToDisplay={fetchPacketKeys}
                    defaultFormat="hex"
                />
                <div className="p-3"></div>
                <DebugTable
                    time={time}
                    title={"btb_out_packets"}
                    data={BP_Data.btb_out_packets}
                    keysToDisplay={btbOutKeys}
                />

            <div className="p-5"></div>
                <div>
                    <div className="text-lg">
                        DIRP
                    </div>
                    <div className="p-2"></div>
                    <div className="flex gap-5">
                        <DebugTable
                            time={time}
                            title={"bhr"}
                            data={BP_Data.dirp_inst.bhr}
                            keysToDisplay={["bhr"]}
                            defaultFormat="binary"
                        />

                        <DebugTable
                            time={time}
                            title={"prediction"}
                            data={BP_Data.dirp_inst.prediction}
                            keysToDisplay={["prediction"]}
                            defaultFormat="binary"
                        />
                    </div>
                </div>          
            </div>
            <div className="p-5"></div>
            <div className="flex gap-10">
                <div className="">
                    {btbTable.length == 0 ? 
                        <div>
                            No valid BTB entries
                        </div> 
                        :
                        <DebugTable
                            time={time}
                            title={"btb_table"}
                            data={btbTable}
                            keysToDisplay={btbTableKeys}
                        />
                    }
                </div>
                <div className="p-5"></div>
                <DebugTable
                    time={time}
                    title={"pht_table"}
                    data={phtData}
                    keysToDisplay={["entry"]}
                    defaultFormat="binary"
                />
                <div className="flex gap-2">
                    <BitTable
                        time={time}
                        title={"top"}
                        timeline={BP_Data.ras_inst.top.tv}
                    />
                    <BitTable
                        time={time}
                        title={"n_top"}
                        timeline={BP_Data.ras_inst.next_top.tv}
                    />

                    <DebugTable
                        time={time}
                        title={"ras_stack"}
                        data={rasData}
                        keysToDisplay={["addr"]}
                        defaultFormat="hex"
                    />

                </div>
                
                
               
                
                
            </div>
            
            <div className="flex">
                
            </div>
        </div>
    )
}