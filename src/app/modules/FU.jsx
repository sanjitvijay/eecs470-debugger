import ALU from "./ALU"
import Mult from "./Mult"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import B_Res from "./B_Res"
import Load_Res from "./Load_Res"
import Store_Res from "./Store_Res"

export default function FU({time, FU_data, title="FUs" }){
    const alu_units = FU_data.fu_alu_iss_etb_cdb_gen.map(alu => alu.alu_inst)
    const b_res_units = FU_data.fu_b_res_iss_cdb_gen.map(b_res => b_res.b_res_inst)
    // const mem_units = FU_data.fu_mem_iss_cdb_gen.map(mem => mem.mem_inst)
    const load_units = FU_data.fu_load_iss_cdb_gen.map(load => load.fu_load_inst)
    const store_units = FU_data.fu_store_iss_cdb_gen.map(store => store.fu_store_inst)
    const mult_units = FU_data.fu_mult_iss_etb_cdb_gen.map(mult => mult.mult_inst)
    
    const [view, setView] = useState('alu')
    // console.log(alu_units)
    return(
        <div>
            <div className="flex gap-5">
                <Button onClick={() => setView('alu')}>
                    alu
                </Button>

                <Button onClick={() => setView('b_res')}>
                    b_res
                </Button>

                <Button onClick={() => setView('mult')}>
                    mult
                </Button>

                <Button onClick={() => setView('load')}>
                    load
                </Button>

                <Button onClick={() => setView('store')}>
                    store
                </Button>


            </div>
            <div className="p-3"></div>
            <div className="flex gap-2">
                {view == 'alu' && <div className="p-3 border border-accent rounded">
                    <ALU
                        time={time}
                        ALU_Data={alu_units}
                        title={"alu unit"}
                    />
                </div>}

                {view == 'mult' && <div className="p-3 border border-accent rounded">
                    {mult_units.map((mult, index) => (
                        <Mult
                            time={time}
                            Mult_Data={mult}
                            title={"mult unit " + (index)}
                            key={index}
                        />
                    ))}
                </div>}

                {view == 'b_res' && <div className="p-3 border border-accent rounded">
                    <B_Res
                        time={time}
                        B_Res_Data={b_res_units}
                        title={"b_res unit"}
                    />
                </div>}

                {view == 'load' && <div className="p-3 border border-accent rounded">
                    <Load_Res
                        time={time}
                        Load_Res_Data={load_units}
                    />
                </div>}

                {view == 'store' && <div className="p-3 border border-accent rounded">
                    <Store_Res
                        time={time}
                        Store_Res_Data={store_units}
                    />
                </div>}
            </div>
        </div>  
    )
}
