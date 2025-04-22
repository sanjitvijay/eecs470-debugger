import BitTable from "../tables/BitTable"
import DebugTable from "../tables/DebugTable"

export default function IQ({time, IQ_Data, title = "iq"}){
    const IQkeysToDisplay = ['packet.NPC', 'packet.PC', 'packet.inst.inst', 'packet.is_predicted_taken', 'valid']

    return (
        <div>
            <div className="flex gap-2">
                <BitTable
                    time={time}
                    title={'head'}
                    timeline={IQ_Data.head.tv}
                />

                <BitTable
                    time={time}
                    title={'tail'}
                    timeline={IQ_Data.tail.tv}
                />

                <DebugTable
                    time={time}
                    data={IQ_Data.iq_data}
                    title={'IQ'}
                    keysToDisplay={IQkeysToDisplay}
                    defaultFormat="hex"
                />

                <div>

                    <DebugTable
                        time={time}
                        data={IQ_Data.iq_ready}
                        title={'iq_ready'}
                        keysToDisplay={'iq_ready'}
                        defaultFormat="binary"
                    />

                    <DebugTable
                        time={time}
                        data={IQ_Data.dis_ready}
                        title={'dis_ready'}
                        keysToDisplay={'dis_ready'}
                        defaultFormat="binary"
                    />
                </div>
            </div>
        </div>
        
    )
}