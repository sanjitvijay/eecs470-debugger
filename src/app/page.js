"use client";

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

import DebugTable from './tables/DebugTable';
import RS from './modules/RS';
import ROB from './modules/ROB';
import Mult from './modules/Mult';
import Free from './modules/Free';
import Map from './modules/Map';
import CPU from './modules/CPU';

export default function Home() {
  const debugTime = 0

  function calculateProgramTime(){
    return Math.floor(debugTime / 12.5) * 12.5
  }
    
  const [time, setTime] = useState(calculateProgramTime());
  const [interval, setInterval] = useState(12.5);
  const [debugData, setDebugData] = useState(null); // use null to check if loaded
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/output.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch debug data');
        return res.json();
      })
      .then(setDebugData)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  const { signals, max_time } = useMemo(() => {
    if (!debugData || Object.keys(debugData).length === 0) {
      return { signals: {}, max_time: 0 };
    }

    let localMaxTime = 0;

    function groupSignals(data, lowerBound, upperBound) {
      const tree = {};
      Object.entries(data).forEach(([dummyKey, valueStr]) => {
        const jsonStr = valueStr
          .replace(/'/g, '"')
          .replace(/\(/g, "[")
          .replace(/\)/g, "]");
        let obj;
        try {
          obj = JSON.parse(jsonStr);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return;
        }
        if (!obj.references || !obj.tv) return;

        localMaxTime = Math.max(localMaxTime, obj["endtime"]);
        const filteredTV = obj.tv.filter(pair => pair[0] >= lowerBound && pair[0] <= upperBound);
        const fullName = obj.references[0];
        const parts = fullName.split(".");

        let curr = tree;
        parts.forEach((part, index) => {
          const arrMatch = part.match(/^(.+?)\[(\d+)\](?:\[[^\]]+\])?$/);
          if (arrMatch) {
            const baseName = arrMatch[1];
            const idx = Number(arrMatch[2]);
            if (index === parts.length - 1) {
              if (!curr[baseName]) curr[baseName] = [];
              curr[baseName][idx] = { name: part, leaf: true, tv: filteredTV };
            } else {
              if (!curr[baseName]) curr[baseName] = [];
              if (!curr[baseName][idx]) curr[baseName][idx] = {};
              curr = curr[baseName][idx];
            }
          } else {
            const bitMatch = part.match(/^(.+)\[.*\]$/);
            const prop = bitMatch ? bitMatch[1] : part;
            if (index === parts.length - 1) {
              curr[prop] = { name: part, leaf: true, tv: filteredTV };
            } else {
              if (!curr[prop]) curr[prop] = {};
              curr = curr[prop];
            }
          }
        });
      });
      return tree;
    }

    const signals = groupSignals(debugData, 0, Infinity);
    return { signals, max_time: localMaxTime };
  }, [debugData]);

  if (error) return <div className="p-5 text-red-600">Error: {error}</div>;
  if (!debugData) return <div className="p-5">Loading debug data...</div>;
  if (!signals?.testbench?.V) return <div className="p-5">Waiting for signal structure...</div>;

  return (
    <div className='p-5'>
      <CPU time={time} CPU_Data={signals.testbench.V} signals={signals.testbench} />

      <div className='grid grid-rows-2 grid-cols-1 gap-4 fixed bottom-4 right-4'>
        <div>
          <p>Enter clock period:</p>
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="border rounded px-2 py-1 text-black"
          />
        </div>

        <div className="grid grid-rows-1 grid-cols-4 gap-4 ">
          <Button 
            className="px-4 py-2 h-full rounded"
            onClick={() => setTime(0)}
          >
            Reset
          </Button>
          <Button 
            className="px-4 py-2 h-full rounded"
            onClick={() => setTime((prev) => Math.max(prev - interval * 10, 0))}
          >
            Prev
          </Button>
          <Button 
            className="px-4 py-2 h-full rounded"
            onClick={() => setTime((prev) => Math.min(prev + interval * 10, max_time))}
          >
            Next
          </Button>
          <div className="flex bg-accent text-white px-4 py-2 rounded items-center">
            Time: {time / 10}{time === max_time && " (MAX)"}
          </div>
        </div>
      </div>
    </div>
  );
}
