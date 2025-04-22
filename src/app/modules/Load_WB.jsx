import DebugTable from "../tables/DebugTable"

export default function Load_WB({time, Load_WB_Data, title="Load Wb"}){
    const WBKeys = [
        "result.word",
        "tag_dest"
    ]

    const ETB_stage_keys = [
        "tag_dest"
    ]

    const ETB_stage_ld_info = [
        "data.word",
        "mask"
    ]

    return(
        <div className="">
            {title}
            <div className="p-2"></div>
            <div className="flex">
                <DebugTable
                    time={time}
                    data={Load_WB_Data.ETB_stage_ld_info}
                    title={"ETB_stage_ld_info"}
                    keysToDisplay={ETB_stage_ld_info}
                />  
                <div className="p-2"></div>
                <DebugTable
                    time={time}
                    data={Load_WB_Data.ETB_stage_packet}
                    title={"ETB_stage_packet"}
                    keysToDisplay={ETB_stage_keys}
                />
                
                <div className="p-10"></div>
                <DebugTable
                    time={time}
                    data={Load_WB_Data.ld_packet}
                    title={"ld_packet"}
                    keysToDisplay={WBKeys}
                />
                {/* <DebugTable
                        time = {time}
                        data = {ROB_Data.ch_rob_table}
                        title="ch_rob_table"
                        keysToDisplay={chKeysToDisplay}
                        customColumns={chCustomColumns}
                /> */}
            </div>
        </div>
    )
}