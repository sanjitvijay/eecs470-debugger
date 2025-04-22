import { useState } from "react"
import { Button } from "@/components/ui/button"
import Mem_Arb from "./Mem_Arb"
import DCache from "./DCache"
import ICache from "./ICache"

export default function Cache({time, DCache_Data, ICache_Data, Mem_Arb_Data, title = "Cache"}){
    const [view, setView] = useState('dcache')
    // console.log(Mem_Arb_Data)
    return(
        <div className="">
            <div className="flex gap-5">
                <Button onClick={() => setView('mem_arb')}>
                    mem arb
                </Button>
                <Button onClick={() => setView('dcache')}>
                    dcache
                </Button>
                <Button onClick={() => setView('icache')}>
                    icache
                </Button>
            </div>
             <div className="p-5"></div>
            {view == "mem_arb" && 
                <Mem_Arb
                    time={time}
                    Mem_Arb_Data={Mem_Arb_Data}
                />
            }
            {view == "dcache" && 
                <DCache
                    time={time}
                    DCache_Data={DCache_Data}
                />
            }
            {view == "icache" && 
                <ICache
                    time={time}
                    ICache_Data={ICache_Data}
                />
            }
        </div>
    )
}