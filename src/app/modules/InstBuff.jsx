import TagStatusTable from "../tables/TagStatusTable"
import ROB from "./ROB"
import RS from "./RS"
import Map from "./Map"
import Free from "./Free"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import DebugTable from "../tables/DebugTable"
import BitTable from "../tables/BitTable"

export default function InstBuff({time, InstBuff_Data, title="inst buff"}){
    const [showAll, setShowAll] = useState(false)
    
    const disPacketKeys = [
        "PC",
        "tag_dest",
        "b_mask",
        "b_id"
    ]

    const ebrKeys = [
        "valid",
        "b_mask"
    ]

    const ebrPacketKeys = [
        "b_id",
        "b_mask"
    ]

    return (
        <div className="p-5">
            <div className="flex gap-5">
                <div>
                    <RS 
                        time={time} 
                        RS_Data={InstBuff_Data.rs_inst}
                    />
                    {/* <div className="flex"> */}
                        <TagStatusTable 
                            time={time}
                            timeline={InstBuff_Data.tag_ready.tv} 
                            columns={6}
                        />
                    {/* </div> */}
                </div>
                
                <ROB time={time} ROB_Data={InstBuff_Data.rob_inst}/>

                <div>
                    <Map 
                        time={time}
                        Map_Data={InstBuff_Data.dis_inst.map_inst}
                        title=""
                    />

                    <Free
                        time={time}
                        Free_Data={InstBuff_Data.dis_inst.free_inst}
                        title=""
                        columns={6}
                    />
                </div>

                <div className="">
                    <div className="flex">                        
                        <DebugTable 
                            time={time}
                            data={InstBuff_Data.dis_inst.ebr_inst.ebr_packet}
                            keysToDisplay={ebrPacketKeys}
                            title={"ebr_packet"}
                            defaultFormat="binary"
                        />
                        <div className="p-1"></div>
                        <BitTable
                            time={time}
                            timeline={InstBuff_Data.dis_inst.ebr_inst.ebr_valid.tv}
                            title={"ebr_valid"}
                            right={false}
                        />
                     </div>
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={InstBuff_Data.dis_inst.ebr_inst.ebr_data}
                        keysToDisplay={ebrKeys}
                        title={"ebr_data"}
                        defaultFormat="binary"
                    />
                </div>
            </div>
            <div className="flex">
                <BitTable
                    time={time}
                    timeline={InstBuff_Data.dis_inst.dis_packet_valid.tv}
                    title={"valid"}
                />
                <div className="p-1"></div>
                <DebugTable
                    time={time}
                    data={InstBuff_Data.dis_inst.dis_packet}
                    title={"dis_packet (b_res)"}
                    keysToDisplay={disPacketKeys}
                />
                <div className="p-5"></div>
                {/* <BitTable
                    time={time}
                    timeline={InstBuff_Data.dis_inst.dis_packet_valid_done.tv}
                    title={"valid"}
                /> */}
                <div className="p-1"></div>
                <DebugTable
                    time={time}
                    data={InstBuff_Data.dis_inst.dis_packet_done}
                    title={"dis_packet_done (clocked)"}
                    keysToDisplay={disPacketKeys}
                />
            </div>
        </div>
    )
}