import { useEffect, useState } from "react"
import { getStringForValue } from "@/lib/utils"
import DebugTable from "../tables/DebugTable"
import BitTable from "../tables/BitTable"

export default function TournamentBP({time, BP_Data, title = "Tournament BP"}){
    console.log(BP_Data)
    function findValidEntries(entries){
        return entries.filter(entry => getStringForValue(entry.valid.tv, time) == "1")
    }

    const [BTBData, setBTBData] = useState([])
    const BTBKeysToShow = [
        "jmp",
        "ret",
        "tag",
        "target",
        "uncond",
    ]

    const rasData = BP_Data.ras_inst.ras_stack.map(addr => ({addr}))
    useEffect(() => {
        setBTBData(findValidEntries(BP_Data.btb_inst.btb_table))
        
    }, [time])

    return(
        <div className="">
            <div className="flex gap-5">
                <DebugTable
                    time={time}
                    title={"ras_stack"}
                    data={rasData}
                    keysToDisplay={["addr"]}
                    defaultFormat="hex"
                />
                <div className="p-5"></div>
                <div className="">
                    btb_table
                
                    {BTBData.length !== 0 && 
                        <DebugTable
                            time={time}
                            data={BTBData}
                            keysToDisplay={BTBKeysToShow}
                        />
                    }
                    <div className="p-5"></div>
                    <DebugTable 
                        time={time}
                        data={BP_Data.dirp_inst.path_history}
                        title={"path_history"}
                        keysToDisplay={"path_history"}
                    />
                </div>
                
            </div>
        </div>
    )
}