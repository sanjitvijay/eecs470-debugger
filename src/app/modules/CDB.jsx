import BitTable from "../tables/BitTable"
import DebugTable from "../tables/DebugTable"

export default function CDB({time, CDB_data}){
    const fuPacketKeys = ['b_mask', 'result', 'tag_dest', 'valid']
    const IndexCustomColumns = [
        {
            accessorKey: 'index',
            header: 'index',
            cell: ({ row }) => row.index  // This will display the row index
        }
    ]

    const cdb_tags_data = CDB_data.cdb_tags.map(tag => ({ tag }))

    const N = 3


    return (
        <div>
            <div className="flex gap-5">
                <div>
                    cdb_ETB_req
                    <div className="flex gap-5">
                        {Object.entries(CDB_data.cdb_ETB_req).map(([key, value], index) => {
                            return <BitTable
                                time={time}
                                timeline={value.tv}
                                title={key}
                                key={index}
                            />
                        })}
                    </div>
                </div>
                <div className="p-5"></div>
                <div>
                    cdb_ETB_gnt
                    <div className="flex gap-5">
                        {Object.entries(CDB_data.cdb_ETB_gnt).map(([key, value], index) => {
                            return <BitTable
                                time={time}
                                timeline={value.tv}
                                title={key}
                                key={index}
                            />
                        })}
                    </div>
                </div>
               
                

                <DebugTable
                    time={time}
                    data={cdb_tags_data}
                    keysToDisplay={['tag']}
                    title={"cdb_tags"}
                />

                <BitTable
                    time={time}
                    title={"cdb_valid"}
                    timeline={CDB_data.cdb_valid.tv}
                />

                
                
            </div>
            <div className="p-5"></div>
            
            <div>
                fu_packet

                <div className="">
                    {Object.entries(CDB_data.fu_packet).map(([key, value], index) => {
                        return (
                            <div className="flex gap-2" key={index}>
                                
                                <DebugTable 
                                    time={time} 
                                    data={value} 
                                    title="index" 
                                    keysToDisplay={[]} 
                                    customColumns={IndexCustomColumns}
                                />
                                
                                <DebugTable
                                    time={time}
                                    data={value}
                                    title={key}
                                    keysToDisplay={fuPacketKeys}
                                />

                                <BitTable
                                    time={time}
                                    title={"valid "}
                                    timeline={CDB_data.fu_valid[key].tv}
                                />

                                {Array.from({ length: N }).map((_, i) => (
                                    <BitTable
                                        key={i}
                                        time={time}
                                        title={`req ${i}`}
                                        timeline={CDB_data.p_cdb_WB_sel[i][key].tv}
                                    />
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="p-5"></div>
            

            
            
        </div>
    )
}