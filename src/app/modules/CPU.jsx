import { useState } from "react"
import TagStatusTable from "../tables/TagStatusTable"
import InstBuff from "./InstBuff"
import IQ from "./IQ"
import RS from "./RS"
import { Button } from "@/components/ui/button"
import FU from "./FU"
import CDB from "./CDB"
import TagInfo from "./TagInfo"
import DebugTable from "../tables/DebugTable"
import BP from "./BP"
import LSQ from "./LSQ"
import Val from "./Val"
import Cache from "./Cache"
import TournamentBP from "./TournamentBP"
export default function CPU({time, CPU_Data,signals, title="Branch Buster"}){
    const [view, setView] = useState('lsq')
    return(
        <div>
            <div className="flex justify-center gap-5 items-center">
               
                    <Button onClick={() => setView('iq')}>
                        IQ
                    </Button>
                    <Button onClick={() => setView('bp')}>
                        BP
                    </Button>
                    <Button onClick={() => setView('inst buff')}>
                        Inst Buff
                    </Button>

                    <Button onClick={() => setView('fu')}>
                        FU
                    </Button>
                    <Button onClick={() => setView('lsq')}>
                        LSQ
                    </Button>
                    <Button onClick={() => setView('cache')}>
                        Cache
                    </Button>
                    <Button onClick={() => setView('cdb')}>
                        CDB
                    </Button>
                    <Button onClick={() => setView('tag info')}>
                        Tag
                    </Button>
                    <Button onClick={() => setView('val')}>
                        Val
                    </Button>
                    <Button onClick={() => console.log(CPU_Data)}>
                        CPU Log
                    </Button>
                    <Button onClick={() => console.log(signals)}>
                        Testbench Log
                    </Button>


                    <DebugTable
                        time={time}
                        data={CPU_Data.pc_addr}
                        title={"pc_addr"}
                        keysToDisplay={["pc_addr"]}
                        hideTitle={true}
                        defaultFormat="hex"
                    />
            </div>

            <div className="p-5"></div>
            <div>
                {view == 'iq' && 
                    <IQ time={time} IQ_Data={CPU_Data.iq_inst}/>
                }

                {view == 'inst buff' && 
                    <InstBuff time={time} InstBuff_Data={CPU_Data.inst_buff_inst}/>
                }

                {view == 'bp' && 
                    <TournamentBP 
                        time={time} 
                        BP_Data={CPU_Data.branch_predictor_inst}    
                    />
                }

                {view == 'fu' && 
                    <FU 
                        time={time}
                        FU_data={CPU_Data.fu_inst}
                    />
                }

                {view == 'lsq' && 
                    <LSQ
                        time={time}
                        LSQ_Data={CPU_Data.lsq_unit_inst}
                    />
                }

                {view == 'cdb' &&
                    <CDB
                        time={time}
                        CDB_data={CPU_Data.inst_buff_inst.comp_inst.cdb_inst}
                    />
                }

                {
                    view == 'tag info' &&
                    <TagInfo
                        time={time}
                        TagInfo_Data={CPU_Data.inst_buff_inst.comp_inst}
                    />
                }

                {
                    view == "val" &&
                    <Val
                        time={time}
                        Val_Data={CPU_Data.inst_buff_inst.iss_inst}
                    />
                    
                }
                {
                    view == "cache" &&
                    <Cache
                        time={time}
                        DCache_Data={CPU_Data.dcache}
                        ICache_Data={CPU_Data.icache_inst}
                        Mem_Arb_Data={CPU_Data.mem_arb}
                    />
                }

                
            </div>
            <div className="p-20"></div>
        </div>
    )
   
}

