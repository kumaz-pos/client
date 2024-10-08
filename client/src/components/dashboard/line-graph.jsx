import React from 'react'
import {LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend,Line} from "recharts"
function LineGraphs(dailySales) {
    console.log(dailySales);
    let dailyExpenses=dailySales.dailyExpenses
  return (
   <LineChart width={730} height={250} data={dailyExpenses}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
  )
}

export default LineGraphs