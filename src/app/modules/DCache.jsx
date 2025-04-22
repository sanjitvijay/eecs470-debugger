import BitTable from "../tables/BitTable"
import DebugTable from "../tables/DebugTable"

export default function DCache({time, DCache_Data, title="DCache"}){
    const paramCacheKeys = [
        "valid",
        "dirty",
        "tag",
        "lru"
    ]

    const vCacheKeys = [
        "valid",
        "dirty",
        "lru",
        "tag"
    ]

    const dmshrKeys = [
        "addr",
        "data.dbbl_level",
        "mem_mask",
        "ready",
        "req_lower",    
        "req_upper",
        "store",
        "valid"
    ]

    const bufferKeys = [
        "addr",
        "data_block.dbbl_level",
        "valid"
    ]

    const dataFifoKeys = [
        "tag",
        "valid"
    ]

    const memData = DCache_Data.param_cache.param_cache_mem.memData.map((mem) => ({mem}))
    const vCacheMemData = DCache_Data.v_cache.victim_cache_mem.memData.map((mem) => ({mem}))
    const memCustomColumns = [
        {
            accessorKey: 'index',
            header: 'index',
            cell: ({ row }) => row.index  // This will display the row index
        }
    ]

    // const vCacheMemData = 

  


    return (
        <div className="">
            <div className="flex">
                <div className="">
                    lsq
                    <DebugTable
                        time={time}
                        data={DCache_Data.lsq_addr}
                        title={"addr"}
                        keysToDisplay={"addr"}
                        defaultFormat="hex"
                    />
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={DCache_Data.lsq_str_data.word}
                        title={"str_data"}
                        keysToDisplay={"str_data"}
                        defaultFormat="hex"
                    />
                    <div className="p-2"></div>
                    <div className="flex">
                        <DebugTable
                            time={time}
                            data={DCache_Data.lsq_store}
                            title={"store"}
                            keysToDisplay={"store"}
                            defaultFormat="binary"
                        />
                        <div className="p-1"></div>
                        <DebugTable
                            time={time}
                            data={DCache_Data.lsq_valid}
                            title={"valid"}
                            keysToDisplay={"valid"}
                            defaultFormat="binary"
                        />
                    </div>
                    <div className="p-2"></div>
                    <DebugTable
                        time={time}
                        data={DCache_Data.lsq_wr_mask}
                        title={"wmask"}
                        keysToDisplay={"wmask"}
                        defaultFormat="binary"
                    />
                    <div className="p-3"></div>
                </div>
                <div className="p-5"></div>
                <div className="">
                    param cache
                    <div className="grid grid-cols-4 gap-4">
                        {DCache_Data.param_cache.pcache_sets.map((set, index) => {
                            return (
                                <div className="" key={index}>
                                    <DebugTable
                                        time={time}
                                        data={set.ways}
                                        keysToDisplay={paramCacheKeys}
                                        title={"set " + index}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-5"></div>
                <div className="flex">
                    <div className="">
                        <DebugTable 
                            time={time}
                            data={DCache_Data.wb_buffer.buffer}
                            keysToDisplay={bufferKeys}
                            title={"wb_buffer"}
                            defaultFormat="hex"
                        />
                        <div className="p-5"></div>
                        <div className="flex">
                            <DebugTable 
                                time={time}
                                data={DCache_Data.dcache_data_data}
                                title={"dcache_mem_data"}
                                keysToDisplay={"word"}
                                customColumns={memCustomColumns}
                                defaultFormat="hex"
                            />
                            <div className="p-2"></div>
                            <DebugTable 
                                time={time}
                                data={DCache_Data.dcache_data_tag}
                                title={"dcache_mem_tag"}
                                keysToDisplay={"id"}
                            />
                            <div className="p-2"></div>
                            <BitTable 
                                time={time}
                                timeline={DCache_Data.dcache_valid.tv}
                                title={"dcache_valid"}
                            />
                        </div>
                        <div className="p-5"></div>
                        <div className="flex">
                            <DebugTable 
                                time={time}
                                data={DCache_Data.v_cache.vcache}
                                keysToDisplay={vCacheKeys}
                                title={"vcache"}
                            />
                            <div className="p-2"></div>
                            <DebugTable 
                                time={time}
                                data={vCacheMemData}
                                keysToDisplay={"mem"}
                                title={"memory"}
                                defaultFormat="hex"
                            />
                        </div>
                        
                        
                    </div>
                </div>
                
                
            </div>
            <div className="p-5"></div>
            <div className="flex">
            
                <DebugTable 
                    time={time}
                    data={memData}
                    keysToDisplay={"mem"}
                    title={"memory"}
                    customColumns={memCustomColumns}
                    defaultFormat="hex"
                />
                <div className="p-3"></div>
                <DebugTable 
                    time={time}
                    data={DCache_Data.dmshr.dmshr_t}
                    keysToDisplay={dmshrKeys}
                    title={"dmshr"}
                    defaultFormat="hex"
                    customColumns={memCustomColumns}
                />
                <div className="p-3"></div>
                <BitTable 
                    time={time}
                    timeline={DCache_Data.dmshr.head.tv}
                    title={"head"}
                />
                <div className="p-1"></div>
                <BitTable 
                    time={time}
                    timeline={DCache_Data.dmshr.tail.tv}
                    title={"tail"}
                />
                <div className="p-1"></div>
                <DebugTable 
                    time={time}
                    data={DCache_Data.dmshr.data_fifo}
                    keysToDisplay={dataFifoKeys}
                    title={"data_fifo"}
                />
            </div>
        </div>
    );
}