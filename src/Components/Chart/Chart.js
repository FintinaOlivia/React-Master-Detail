import { LineChart, Line, Tooltip } from 'recharts';
import { CartesianGrid, Legend } from 'recharts';
import { XAxis, YAxis } from 'recharts';
import { ResponsiveContainer } from 'recharts';

import { useEffect, useState } from 'react';
import { fetchCharacters } from '../Service';



export function ChartPage(){

  const [characterData, setCharacterData] = useState([]);
  const lineStyle = {
    marginLeft: "20%"
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const characters = await fetchCharacters();
        setCharacterData(characters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }

    fetchData();
  }, []);

  // Count characters for each creator
  const creators = {};
  characterData.forEach(character => {
    const creator = character.creator;
    if (creators[creator]) {
      creators[creator]++;
    } else {
      creators[creator] = 1;
    }
  });

  // Convert creators object to array of objects for recharts
  const data = Object.keys(creators).map(creator => ({
    name: creator,
    characters: creators[creator],
  }));

  console.log(data)

  return (
      <LineChart width={1000} height={400} data={data} style={lineStyle}>
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="characters" stroke="#8884d8" />
        <Tooltip 
        label={() => 'Creator'} 
        formatter={(value, _name, props) => [value, `${props.payload.name}`]} 
        />
         <Legend formatter={(value) => `Number of ${value} per Creator`} /> {/* Custom legend formatter */}
        <XAxis dataKey="name" />
        <YAxis /> 
      </LineChart>
  );
}