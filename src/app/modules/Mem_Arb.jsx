import { useEffect } from "react"
import DebugTable from "../tables/DebugTable"
import { getStringForValue } from "@/lib/utils"

export default function Mem_Arb({time, Mem_Arb_Data, title="Mem Arb"}){
    const memArbSizeCustomColumns = [
        {
            accessorKey: 'mem_size',
            header: 'mem_size',
            cell: ({row}) => {
                const val = getStringForValue(row.original.size.tv, time)
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
        }
    ]

    const memArbCommandCustomColumns = [
        {
            accessorKey: 'mem_command',
            header: 'mem_command',
            cell: ({row}) => {
                
                const val = getStringForValue(row.original.command.tv, time)
                if(val.includes('x')) return val
                const num = parseInt(val, 2)
                
                switch(num){
                    case 0: 
                        return "NONE"
                    case 1: 
                        return "LOAD"
                    case 2: 
                        return "STORE"
                    case 3: 
                        return "DOUBLE"
                    default:
                        return val
                }
            }    
        }
    ]
    
    return(
        <div className="">
            <div className="flex">
                <div className="">
                    Imem2proc
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.Imem2proc_data}
                        keysToDisplay={ "data.dbbl_level"}
                        title={"data"}
                        defaultFormat="hex"
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.Imem2proc_data_tag}
                        title={"tag"}
                        keysToDisplay={"tag"}
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.Imem2proc_transaction_tag}
                        title={"trans_tag"}
                        keysToDisplay={"trans_tag"}
                    />
                </div>

                <div className="p-3"></div>

                <div className="">
                    mem2proc
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.mem2proc_data}
                        keysToDisplay={"data.dbbl_level"}
                        title={"data"}
                        defaultFormat="hex"
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.mem2proc_data_tag}
                        title={"tag"}
                        keysToDisplay={"tag"}
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.mem2proc_transaction_tag}
                        title={"trans_tag"}
                        keysToDisplay={"trans_tag"}
                    />
                </div>
                <div className="p-3"></div>
                <div className="flex">
                <div>
                    proc2mem
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.proc2mem_addr}
                        keysToDisplay={"addr"}
                        title={"addr"}
                        defaultFormat="hex"
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.proc2mem_data}
                        keysToDisplay={"data.dbbl_level"}
                        title={"data"}
                        defaultFormat="hex"
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.proc2mem_size}
                        keysToDisplay={[]}
                        title={"size"}
                        customColumns={memArbSizeCustomColumns}
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={Mem_Arb_Data.proc2mem_command}
                        keysToDisplay={[]}
                        title={"command"}
                        customColumns={memArbCommandCustomColumns}
                    />
                </div>
            </div>
            
            </div>
            <div className="p-5"></div>
            
        </div>
    )
}