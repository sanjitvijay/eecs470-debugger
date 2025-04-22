import BitTable from "../tables/BitTable"
import DebugTable from "../tables/DebugTable"

export default function TagInfo({time, TagInfo_Data}){
    // console.log(TagInfo_Data.tag_comp)
    const tagKeysToDisplay = ["PC", 'tag_dest', 'data.word', 'b_mask']
    const tagCustomColumns = [
        {
            accessorKey: 'index',
            header: 'index',
            cell: ({ row }) => row.index  // This will display the row index
        }
    ]

    const robPacketKeys = ['tag', 'tag_old']
    const tagCompKeys = ['PC', 'b_mask', 'data', 'tag_dest']



    return(
        <div>
            <div className="flex gap-2">
                <DebugTable
                    time = {time}
                    data={TagInfo_Data.tag_info_inst.tag_status.tag_comp_packet_vec}
                    title="tag_comp_packet_vec"
                    keysToDisplay={tagKeysToDisplay}
                    customColumns={tagCustomColumns}
                    defaultFormat="hex"
                />
                <BitTable
                    time = {time}
                    timeline = {TagInfo_Data.tag_info_inst.tag_status.tag_plus_bit_vec.tv}
                    title = "tag+"
                />
                <div className="p-2"></div>
                <DebugTable
                    time = {time}
                    data={TagInfo_Data.tag_info_inst.tag_status_cdb.tag_comp_packet_vec}
                    title="tag_status_cdb"
                    keysToDisplay={tagKeysToDisplay}
                    customColumns={tagCustomColumns}
                    defaultFormat="hex"
                />  
                <BitTable
                    time = {time}
                    timeline = {TagInfo_Data.tag_info_inst.tag_status_cdb.tag_plus_bit_vec.tv}
                    title = "tag+"
                />
                <div className="p-2"></div>
                <DebugTable
                    time = {time}
                    data={TagInfo_Data.tag_info_inst.tag_status_dis.tag_comp_packet_vec}
                    title="tag_status_dis"
                    keysToDisplay={tagKeysToDisplay}
                    customColumns={tagCustomColumns}
                    defaultFormat="hex"
                />
                <BitTable
                    time = {time}
                    timeline = {TagInfo_Data.tag_info_inst.tag_status_dis.tag_plus_bit_vec.tv}
                    title = "tag+"
                />          
                <div className="p-5"></div>
                <BitTable
                    time = {time}
                    timeline = {TagInfo_Data.rob_valid.tv}
                    title = "rob_valid"
                />
                <DebugTable
                    time = {time}
                    data={TagInfo_Data.rob_packet}
                    title="rob_packet"
                    keysToDisplay={robPacketKeys}
                />
                <div className="p-5"></div>
                <DebugTable
                    time = {time}
                    data={TagInfo_Data.tag_comp_packet}
                    title="tag_comp_packet"
                    keysToDisplay={tagCompKeys}
                />
            </div>
        </div>
        
    )
}