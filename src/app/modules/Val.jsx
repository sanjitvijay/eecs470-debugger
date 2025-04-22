import BitTable from "../tables/BitTable"
import DebugTable from "../tables/DebugTable"


export default function Val({time, Val_Data, title = "Val"}){
    const valCustomColumns = [
        {
            accessorKey: 'index',
            header: 'reg num',
            cell: ({ row }) => row.index  // This will display the row index
        }
    ]

    const dataKeys = [
        "word"
    ]


    const wbTagsData = Val_Data.wb_tags.map(tag => ({tag}))
   


    return(
        <div className="flex">
            <div className="">
                <div className="text-lg">
                    r_data
                </div>
                {Object.entries(Val_Data.r_data).map(([key, value], index) => {
                    return (
                        <div 
                            className=""
                            key={index}
                        >
                            <DebugTable
                                time={time}
                                data={value}
                                keysToDisplay={dataKeys}
                                title={key}
                            />
                            <div className="p-1"></div>
                        </div>
                    )
                })}
            </div>
            <div className="p-3"></div>
            <div className="">
                <div className="text-lg">
                    r_tags
                </div>
                {Object.entries(Val_Data.r_tags).map(([k, value], index) => {
                    const data = value.map(tag => ({tag}))
                    return (
                        <div 
                            className=""
                            key={index}
                        >
                            <DebugTable
                                time={time}
                                data={data}
                                keysToDisplay={["tag"]}
                                title={k}
                            />
                            <div className="p-1"></div>
                        </div>
                    )
                })}
            </div>

            <div className="p-3"></div>
            <div className="flex">
                <BitTable
                    time={time}
                    title={"wb_valid"}
                    timeline={Val_Data.wb_valid.tv}
                />
                <div className="p-1"></div>
                <DebugTable
                    time={time}
                    data={Val_Data.wb_data}
                    title={"wb_data"}
                    keysToDisplay={"word"}
                />

                <div className="p-1"></div>

                <DebugTable
                    time={time}
                    data={wbTagsData}
                    title={"wb_tags"}
                    keysToDisplay={"tag"}
                />
            </div>
            <div className="p-3"></div>
            <DebugTable
                time={time}
                data={Val_Data.val_t_inst.register}
                title={"register"}
                keysToDisplay={"word"}
                customColumns={valCustomColumns}
            />
        </div>
    )
}