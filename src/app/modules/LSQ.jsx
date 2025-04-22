import DebugTable from "../tables/DebugTable";
import Load_Queue from "./Load_Queue";
import Load_WB from "./Load_WB";
import Store_Queue from "./Store_Queue";

export default function LSQ({time, LSQ_Data, title = "LSQ"}){
    const ageTableKeys = [
        "data.word",
        "unresolved",
        "resolved"
    ]

    const ldqAgeTableKeys = [
        "addr",
        "mask",
        "stq_YOT_ptr"
    ]

    return(
        <div>
            <div className="flex">
                <Load_Queue
                    time={time}
                    Load_Queue_Data={LSQ_Data.ldq_inst}
                />
                <div className="p-3"></div>
                <DebugTable
                    time={time}
                    data={LSQ_Data.ldq_age_table}
                    keysToDisplay={ldqAgeTableKeys}
                    defaultFormat="hex"
                    title={"ldq_age_table"}
                />
                <div className="p-3"></div>
                <DebugTable
                    time={time}
                    data={LSQ_Data.age_table}
                    keysToDisplay={ageTableKeys}
                    defaultFormat="hex"
                    title={"age_table"}
                />
            </div>

            <div className="p-5"></div>
            <Store_Queue
                time={time}
                Store_Queue_Data={LSQ_Data.stq_inst}
            />
            <div className="p-5"></div>
            <Load_WB
                time={time}
                Load_WB_Data={LSQ_Data.ldq_inst}
            />
        </div>
    )
}