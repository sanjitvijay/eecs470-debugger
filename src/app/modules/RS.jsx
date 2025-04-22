import DebugTable from '../tables/DebugTable';
import TagStatusTable from '../tables/TagStatusTable';
import BitTable from '../tables/BitTable';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
function RS({time, RS_Data, title = "reservation station"}){
    const RSkeysToDisplay = ['valid', 'packet.tag1', 'packet.tag2', 'packet.tag_dest', 'packet.b_mask', "packet.PC"]
    const RSkeysStage1 = ['']
    const RSCustomColumns = [
      {
        accessorKey: 'index',
        header: 'index',
        cell: ({ row }) => row.index  // This will display the row index
      }
    ]

    const [showExtra, setShowExtra] = useState(false)

    return (
        <div>
            <div className="flex justify-between">
                <div className="text-lg">
                    {title}
                </div>
            </div>
            

            <div className='flex mt-5 w-full gap-2'>
                <DebugTable 
                    time={time} 
                    data={RS_Data.rs_data} 
                    title="rs_data" 
                    keysToDisplay={RSkeysToDisplay} 
                    customColumns={RSCustomColumns}
                />

                {/* {Object.entries(RS_Data.RS_stage1.rs_entries_req).map(([key, value], index) => {
                    return showExtra && <BitTable
                        time={time}
                        timeline={value.tv}
                        title={key}
                        key={index}
                    />
                })} */}

            </div>

            <div className="p-4"></div>

            {/* <div className='grid grid-cols-3 gap-4'>
                <DebugTable 
                    time={time} 
                    data={RS_Data.dut.rs_data_b_res} 
                    title="rs_data_b_res" 
                    keysToDisplay={RSkeysToDisplay} 
                    customColumns={RSCustomColumns}
                />

                <DebugTable 
                    time={time} 
                    data={RS_Data.dut.rs_data_dis} 
                    title="rs_data_dis" 
                    keysToDisplay={RSkeysToDisplay} 
                    customColumns={RSCustomColumns}
                />

                <DebugTable 
                    time={time} 
                    data={RS_Data.dut.rs_data_iss} 
                    title="rs_data_iss" 
                    keysToDisplay={RSkeysToDisplay} 
                    customColumns={RSCustomColumns}
                />
            </div> */}

            
        </div>
    );
};

export default RS;