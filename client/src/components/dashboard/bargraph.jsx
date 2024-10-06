import React from 'react'
import { ResponsiveContainer,BarChart,Bar ,CartesianGrid,XAxis,YAxis} from 'recharts'

import {useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux';
import { getinvoices,deleteinvoice } from '../../redux/actions/invoice';

function Bargraph({loading,error,data,convertedDailySales,monthlySales,convertedMonthlySales,convertedDailyExpenses,convertedMonthlyExpenses}) {
  console.log(convertedMonthlySales);
  console.log(monthlySales);
 
   let sales=loading? "loading": error? "error": convertedDailySales.map((item)=>{
    return item.totalPriceWithVat
   })
   let createdAt= convertedDailySales.map((item)=>{
    return item.createdAt
   })

console.log(convertedDailySales);
  return (
 
    <div class="container-xl">
        <div class="row row-deck row-cards">
        <div class="col-sm-6 col-lg-3">
   <div class="card">
                  <div class="card-body">
                    <div class="d-flex">
                      <h3 class="card-title">Daily Sales</h3>
                     
                    </div>
                    <div className="row">
                    <BarChart  data={convertedDailySales} width={300} height={300} >
            <Bar dataKey='totalPriceWithVat' fill='blue'/>
           
            <XAxis dataKey='createdAt'/>
            <YAxis />
        </BarChart>

                    </div>
                   
                  </div>
                </div>

               
   </div>

   <div className="col-sm-6 col-lg-3">
   <div class="card">
                  <div class="card-body">
                    <div class="d-flex">
                      <h3 class="card-title">Monthly Sales</h3>
                     
                    </div>
                    <div className="row">
                    <BarChart  data={convertedMonthlySales} width={300} height={300} >
            <Bar dataKey='totalPriceWithVat' fill='blue'/>
           
            <XAxis dataKey='createdAt'/>
            <YAxis />
        </BarChart>

                    </div>
                   
                  </div>
                </div>
            
   </div>
   <div className="col-sm-6 col-lg-3" >
   <div class="card">
                  <div class="card-body">
                    <div class="d-flex">
                      <h3 class="card-title">Daily Expenses</h3>
                     
                    </div>
                    <div className="row">
                    <BarChart  data={convertedDailyExpenses} width={300} height={300} >
            <Bar dataKey='totalPrice' fill='red'/>
           
            <XAxis dataKey='createdAt'/>
            <YAxis />
        </BarChart>

                    </div>
                   
                  </div>
                </div>
              
   </div>
   <div className="col-sm-6 col-lg-3">
   <div class="card">
                  <div class="card-body">
                    <div class="d-flex">
                      <h3 class="card-title">Monthly Expenses</h3>
                     
                    </div>
                    <div className="row">
                    <BarChart  data={convertedMonthlyExpenses} width={300} height={300} >
            <Bar dataKey='totalPrice' fill='red'/>
           
            <XAxis dataKey='createdAt'/>
            <YAxis />
        </BarChart>

                    </div>
                   
                  </div>
                </div>
   </div>
        </div>

    </div>
   
 
  
    
     
    
    
    
    
  )
}

export default Bargraph