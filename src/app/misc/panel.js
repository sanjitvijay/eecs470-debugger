import { v4 as uuidv4 } from 'uuid';
import decodeInst from "./decode_inst";

export default function Panel({time, signals, title}) {
  function recursiveDisplay(signal) {
    if (signal["leaf"]) {
      return(
        <div key={uuidv4()} className="ml-4">
          <p>{signal["name"]}</p>
          <p>{(signal && getStringForValue(signal["tv"], time)) || "xxx"}</p>
        </div>
      );
    } else if (Array.isArray(signal)) {
      let displays = signal.map(sig => recursiveDisplay(sig));
      return(
        <div key={uuidv4()} className="ml-4">
          {displays}
        </div>
      );
    } else {
      let displays = [];
      Object.entries(signal).forEach(([key, value]) => {
        displays.push(<p key={uuidv4()}>{key}</p>)
        displays.push(recursiveDisplay(value))
      });
      return(
        <div key={uuidv4()} className="ml-4">
          {displays}
        </div>
      );
    }
  }

  function getStringForValue(arr, x) {
    let low = 0;
    let high = arr.length - 1;
    let result = undefined;
    
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const [n, s] = arr[mid];
      if (n <= x) {
        result = s;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    
    return result;
  }

  console.log(signals);
  const entries = signals.map(
    sig => 
      <div key={uuidv4()} className='ml-4'>
        <p>{sig.name}</p>
        {recursiveDisplay(sig.obj)}
      </div>
  );

  return(
    <div className="p-4 grid gap-4">
      <h2>{title}</h2>
      {entries}
    </div>
  );
}