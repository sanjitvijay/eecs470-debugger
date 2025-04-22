import DebugTable from "../tables/DebugTable"
import TagStatusTable from "../tables/TagStatusTable"
import { getStringForValue } from "@/lib/utils"

function Free({time, Free_Data, title="free list", columns=8}){
    // console.log(Free_Data.dut.ch_free_table)
    const chFreeCustomColumns = [
        {
            accessorKey: 'index',
            header: 'checkpoint',
            cell: ({ row }) => row.index + 1  // This will display the row index
        },
        {
            accessorKey: 'tag_status',
            header: 'tag_status',
            cell: ({ row }) => {
                const bitstring = getStringForValue(row.original.tv, time)
                const formattedBitstring = bitstring.replace(/(.{4})/g, '$1 '); // Adds space every 4 bits
                return formattedBitstring.trim(); // Trim in case of trailing space
            }  // This will display the row index
        }
    ]
    return(
        <div className="w-full">     
            <div className="text-xl mb-2">
                {title}
            </div> 
            
            <div className="flex gap-2">
                <TagStatusTable 
                    time={time}
                    title="free_list"
                    timeline={Free_Data.free_list.tv}
                    columns={columns}
                />

                <TagStatusTable 
                    time={time}
                    title="returned_list"
                    timeline={Free_Data.returned_list.tv}
                    columns={columns}
                />

                {/* <TagStatusTable 
                    time={time}
                    title="last dispatch port"
                    timeline={Free_Data.next_free_list.at(-1).tv}
                    columns={columns}
                /> */}

                
            </div>
            <div className="p-3"></div>
            
            <div className="flex">
                <DebugTable
                        time={time}
                        data={Free_Data.ch_free_table}
                        title={"checkpoint tag status"}
                        keysToDisplay={[]}
                        defaultFormat="binary"
                        customColumns={chFreeCustomColumns}
                    />
               

            </div>
            
        </div>
    )
}

export default Free