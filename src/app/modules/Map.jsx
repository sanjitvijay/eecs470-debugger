import MapTable from "../tables/MapTable";

export default function Map({time, Map_Data, title="map table", numToShow=1}){
    const regex = /^map_data_stages\[\d+\]$/;

    // Extract values of matching keys
    const stages = Object.entries(Map_Data)
    .filter(([key, _]) => regex.test(key)) // Keep only matching keys
    .map(([_, value]) => value); // Extract values

    return(
        <div>
            <div className="text-xl mb-2">
                {title}
            </div>
            <div className="flex">
                    <MapTable
                        time={time}
                        title={"map table stage 1"}
                        data={stages[0]}
                        columns={4}
                    />
            </div>
        </div>
    )
}