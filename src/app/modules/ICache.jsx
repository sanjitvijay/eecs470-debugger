import BitTable from "../tables/BitTable";
import DebugTable from "../tables/DebugTable";
import { getStringForValue } from "@/lib/utils";

export default function ICache({time, ICache_Data, title = "ICache"}){
    //console.log(ICache_Data)
    const iCacheCommandCustomColumns = [
        {
            accessorKey: 'mem_command',
            header: 'mem_command',
            cell: ({row}) => {
                const val = getStringForValue(row.original.proc2Imem_command.tv, time)
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

    const imshrKeys = [
        "gnt",
        "addr_tag",
        "mem_tag",
        "valid"
    ]

    const mcacheKeys = [
        "tag",
        "valid"
    ]

    const icacheKeys = [
        "PC",
        "inst.inst",
    ]

    const lowerMemData = ICache_Data.mcache.lower_bmcache_mem.memData.map((mem) => ({mem}))
    const upperMemData = ICache_Data.mcache.upper_bmcache_mem.memData.map((mem) => ({mem}))
    const memCustomColumns = [
        {
            accessorKey: 'index',
            header: 'index',
            cell: ({ row }) => row.index  // This will display the row index
        }
    ]

    return(
        <div className="">
            <div className="flex gap-2">
                <DebugTable
                    time={time}
                    data={ICache_Data.pc_addr}
                    title={"pc_addr"}
                    keysToDisplay={"pc_addr"}
                    defaultFormat="hex"
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.pc_mispredict}
                    title={"pc_mispredict"}
                    keysToDisplay={"pc_mispredict"}
                    defaultFormat="hex"
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.iq_ready}
                    title={"iq_ready"}
                    keysToDisplay={"iq_ready"}
                    defaultFormat="binary"
                />
                <div className="p-5"></div>
                <DebugTable
                    time={time}
                    data={ICache_Data.proc2Imem_addr}
                    title={"proc2Imem_addr"}
                    keysToDisplay={"proc2Imem_addr"}
                    defaultFormat="hex"
                />

                <DebugTable
                    time={time}
                    data={ICache_Data.proc2Imem_command}
                    title={"proc2Imem_command"}
                    keysToDisplay={[]}
                    customColumns={iCacheCommandCustomColumns}
                />
                <div className="p-5"></div>
                <DebugTable
                    time={time}
                    data={ICache_Data.mcache_hits}
                    title={"mcache_hits"}
                    keysToDisplay={"mcache_hits"}
                    defaultFormat="binary"
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.imshr_hits}
                    title={"imshr_hits"}
                    keysToDisplay={"imshr_hits"}
                    defaultFormat="binary"
                />
            </div>
            <div className="p-3"></div>
            <div className="flex gap-2">
                <DebugTable
                    time={time}
                    data={ICache_Data.Imem2proc_data.dbbl_level}
                    title={"Imem2proc_data"}
                    keysToDisplay={"Imem2proc_data"}
                    defaultFormat="hex"
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.Imem2proc_data_tag}
                    title={"Imem2proc_data_tag"}
                    keysToDisplay={"Imem2proc_data_tag"}
                    defaultFormat="hex"
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.Imem2proc_transaction_tag}
                    title={"transaction_tag"}
                    keysToDisplay={"transaction_tag"}
                    defaultFormat="hex"
                />
            </div>
            <div className="p-3"></div>
            <div className="flex gap-2">
                <BitTable
                    time={time}
                    timeline={ICache_Data.mcache_inst_valid.tv}
                    title={"inst_valid"}
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.mcache_inst}
                    title={"mcache_inst"}
                    keysToDisplay={"inst"}
                    defaultFormat="hex"
                />
                <div className="p-3"></div>
                <BitTable
                    time={time}
                    timeline={ICache_Data.imshr_inst_valid.tv}
                    title={"inst_valid"}
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.imshr_inst}
                    title={"imshr_inst"}
                    keysToDisplay={"inst"}
                    defaultFormat="hex"
                />
                <div className="p-3"></div>
                <BitTable
                    time={time}
                    timeline={ICache_Data.icache_valid.tv}
                    title={"icache_valid"}
                />
                <DebugTable
                    time={time}
                    data={ICache_Data.icache_packet}
                    title={"icache_packet"}
                    keysToDisplay={icacheKeys}
                    defaultFormat="hex"
                />
            </div>
            <div className="p-3"></div>
            <div className="flex">
                <DebugTable
                    time={time}
                    data={ICache_Data.mcache.lower_mcache}
                    title={"mcache(L)"}
                    keysToDisplay={mcacheKeys}
                />
                <div className="p-1"></div>
                <DebugTable 
                    time={time}
                    data={lowerMemData}
                    keysToDisplay={"mem"}
                    title={"memory(L)"}
                    customColumns={memCustomColumns}
                    defaultFormat="hex"
                />  
                <div className="p-3"></div>
                <DebugTable
                    time={time}
                    data={ICache_Data.mcache.upper_mcache}
                    title={"mcache(U)"}
                    keysToDisplay={mcacheKeys}
                />
                <div className="p-1"></div>
                <DebugTable 
                    time={time}
                    data={upperMemData}
                    keysToDisplay={"mem"}
                    title={"memory(U)"}
                    customColumns={memCustomColumns}
                    defaultFormat="hex"
                />  
                <div className="p-3"></div>
                <BitTable
                    time={time}
                    timeline={ICache_Data.imshr.head.tv}
                    title={"head"}
                />
                <div className="p-1"></div>
                <BitTable
                    time={time}
                    timeline={ICache_Data.imshr.tail.tv}
                    title={"tail"}
                />
                <div className="p-1"></div>
                <BitTable
                    time={time}
                    timeline={ICache_Data.imshr.gnter.tv}
                    title={"gnter"}
                />
                <div className="p-1"></div>
                <DebugTable 
                    time={time}
                    data={ICache_Data.imshr.imshr_t}
                    title={"imshr_t"}
                    keysToDisplay={imshrKeys}
                />
            </div>
        </div>
    )
}