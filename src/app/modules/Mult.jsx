import DebugTable from "../tables/DebugTable"

function Mult({time, Mult_Data, title="mult"}){
    const stages = Mult_Data.genblk1.map(genblk1 => genblk1.mstage)
    // console.log(stages)

    const inputDataStageKeysToDisplay = ['prev_sum', 'mplier', 'mcand', 'func', 'packet.b_mask', 'packet.tag_dest', 'packet.PC']
    const outputDataStageKeysToDisplay = ['product_sum', 'next_mplier', 'next_mcand', 'next_func', 'next_packet.b_mask', 'next_packet.tag_dest', 'next_packet.PC']

    const inputRVToDisplay = ['valid', 'ready']
    const outputRVToDisplay = ['next_valid', 'prev_ready']

    const stageCustomColumns = [
        {
            accessorKey: 'index',
            header: 'stage',
            cell: ({row}) => row.index + 1
        }
    ]

    return(
        <div>
            <div className="text-xl mb-2">
                {title}
            </div>
            
            <div className="flex gap-2">
                <DebugTable 
                    time = {time} 
                    data = {stages}
                    title = "input RV"
                    keysToDisplay={inputRVToDisplay}
                    customColumns={stageCustomColumns}
                />

                <DebugTable 
                    time = {time} 
                    data = {stages}
                    title = "input data"
                    keysToDisplay={inputDataStageKeysToDisplay}
                />

                <DebugTable 
                    time = {time} 
                    data = {stages}
                    title = "output data"
                    keysToDisplay={outputDataStageKeysToDisplay}
                />

                <DebugTable 
                    time = {time} 
                    data = {stages}
                    title = "output RV"
                    keysToDisplay={outputRVToDisplay}
                />  
            </div>
        </div>
    )
}

export default Mult