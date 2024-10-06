import React from 'react'
import moment from 'moment/moment'
import {useEffect} from "react"
import { useDispatch,useSelector } from 'react-redux';
import { getinvoices,deleteinvoice } from '../../redux/actions/invoice';
import {getquotations} from "../../redux/actions/quotation"
import { getexpenses } from '../../redux/actions/expense';
import { getbanks } from '../../redux/actions/banks';
import {groupBy} from "underscore"
import Bargraph from './bargraph';
import LineGraphs from './line-graph';

function Dashboard({userData}) {
  const dispatch=useDispatch();
  const invoices=useSelector((state)=>state.getInvoices);
  const quotations=useSelector((state)=>state.getQuotations);
  const expenses=useSelector((state)=>state.getExpenses);
  const banks=useSelector((state)=>state.getBanks);
  console.log(expenses);

console.log(userData);
  const {loading,data,error}=invoices;
  console.log(invoices);
  let daily=loading ? "loading" : error ? "error" : data? data.map((item)=>{
    let info= {_id:item._id,totalPriceWithVat:item.totalPriceWithVat,currency:item.currency,createdAt:item.createdAt};
   return info
  }):null
  var grouping = groupBy(daily, function (date) {
    return moment(date).startOf('createdAt').format();
  });
  console.log(grouping);
let monthlySales= loading ? "loading" : error ? "error" : data? data.map((item)=>{
  let info= {_id:item._id,totalPriceWithVat:item.totalPriceWithVat,currency:item.currency,createdAt:item.createdAt};
 return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,7);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,7)}; // create an entry for bd
  else a[bd].totalPriceWithVat+=c.totalPriceWithVat;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{}) : null
let monthlyExpenses= expenses.loading ? "loading" : expenses.error ? "error" : expenses.data? expenses.data.map((item)=>{
  let info= {_id:item._id,totalPrice:item.totalPrice,createdAt:item.createdAt};
 return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,7);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,7)}; // create an entry for bd
  else a[bd].totalPrice+=c.totalPrice;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{}) : null

let dailyLinegraphSales= loading ? "loading" : error ? "error" : data? data.map((item)=>{
  let info= {_id:item._id,amount:item.totalPriceWithVat,createdAt:item.createdAt,type:"Sales"}
  return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,12);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,12)}; // create an entry for bd
  else a[bd].amount+=c.amount;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{})  : null
let monthlyLinegraphSales= loading ? "loading" : error ? "error" : data? data.map((item)=>{
  let info= {_id:item._id,amount:item.totalPriceWithVat,createdAt:item.createdAt,type:"Sales"}
  return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,7);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,7)}; // create an entry for bd
  else a[bd].amount+=c.amount;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{})  : null

 let monthlyLinegraphExpenses= expenses.loading ? "loading" : expenses.error ? "error" : expenses.data? expenses.data.map((item)=>{
  console.log(item);
  let info= {_id:item._id,amount:item.totalPrice,createdAt:item.createdAt,type:"Expenses"}
  console.log(info);
  return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,7);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,7)}; // create an entry for bd
  else a[bd].amount+=c.amount;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{})  : null


 console.log(quotations);

 let dailyLinegraphExpenses=expenses.loading ? "loading" : expenses.error ? "error" : expenses.data? expenses.data.map((item)=>{
  let info= {_id:item._id,amount:item.totalPrice,createdAt:item.createdAt,type:"Expenses"};
 return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,12);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,12)}; // create an entry for bd
  else a[bd].amount+=c.amount;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{}) : null
 console.log(monthlyLinegraphExpenses);
 console.log(dailyLinegraphExpenses);
 let dailySales= loading ? "loading" : error ? "error" : data? data.map((item)=>{
  let info= {totalPriceWithVat:item.totalPriceWithVat,createdAt:item.createdAt};
 return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,12);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,12)}; // create an entry for bd
  else a[bd].totalPriceWithVat+=c.totalPriceWithVat;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{}) : null


 let dailyExpenses=expenses.loading ? "loading" : expenses.error ? "error" : expenses.data? expenses.data.map((item)=>{
  let info= {totalPrice:item.totalPrice,createdAt:item.createdAt};
 return info
}).reduce((a,c)=>{ 
  const bd=c.createdAt.substr(0,12);             // generate a unique key for branch and month
  if (!a[bd]) a[bd]={...c,createdAt:c.createdAt.substr(0,12)}; // create an entry for bd
  else a[bd].totalPrice+=c.totalPrice;                        // add sales to existing bd entry
  return a;                                         // Object.values: create an array by
 },{}) : null
console.log(dailyExpenses);

let convertedDailySales=Object.values(dailySales)
let convertedMonthlySales=Object.values(monthlySales)

let convertedDailyExpenses=Object.values(dailyExpenses)
let convertedMonthlyExpenses=Object.values(monthlyExpenses)



let convertedMonthlyExpensesLinegraph=Object.values(monthlyLinegraphExpenses)
let convertedDailyExpensesLinegraph=Object.values(dailyLinegraphExpenses)
let convertedMonthlySalesLinegraph=Object.values(monthlyLinegraphSales)
let convertedDailySalesLinegraph=Object.values(dailyLinegraphSales)
console.log(convertedMonthlyExpensesLinegraph);
console.log(convertedDailyExpensesLinegraph);
  const groups= loading ? "loading": error ? "eror": data.reduce((groupss,game)=>{
    let totals=game.totalPriceWithVat;
    let date=game.createdAt.split('T')[0];

    if (!groupss[date]) {
      groupss[date]=[]
    }

   groupss[date].push(game)
let another=   groupss[date].push(totals)
console.log(another);

        return groupss
  },{})
  console.log(convertedDailyExpenses);
  //onst sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
  let objects=Object.keys(groups)
  let values= Object.values(groups)


console.log(dailyLinegraphExpenses);
 // console.log(objects.reduce((item,{totalPriceWithVat})=>item+totalPriceWithVat,0));
let totalSales=loading ? "loading" : error ? "error" :data? data.reduce((accumulator, { totalPriceWithVat }) => {
    return accumulator + totalPriceWithVat
  }, 0): null;
let totalExpenses=expenses.loading ? "loading" : expenses.error ? "error" :expenses.data? expenses.data.reduce((accumulator, { totalPrice }) => {
    return accumulator + totalPrice
  }, 0): null;
 

let signature= userData.signature;

console.log(invoices);


  useEffect(() => {
   
  dispatch(getinvoices(signature))
  dispatch(getexpenses(signature))
  dispatch(getquotations(signature))
  dispatch(getbanks(signature))
    
  }, [dispatch])
  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }


  console.log(groups);
  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
 let totalBanks= banks.loading ? "loading" : banks.error? "error" : banks.data ? banks.data.length : null
  return (
    <div class="page-wrapper">
    
    <div class="page-header d-print-none">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            
            <div class="page-pretitle">
              Overview
            </div>
            <h2 class="page-title">
              Dashboard
            </h2>
          </div>
          
       
        </div>
      </div>
    </div>
    <div class="page-body">
    <div class="container-xl">
        <div class="row row-deck row-cards">
        
        
        
          <div class="col-12">
            <div class="row row-cards">
              <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="bg-success text-white avatar">                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                        </span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                          ${
                         totalSales
                         }
                        </div>
                        <div class="text-secondary">
                          Sales
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
             
                        <span class="bg-primary text-white avatar">   
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-list">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
  <path d="M9 12l.01 0" />
  <path d="M13 12l2 0" />
  <path d="M9 16l.01 0" />
  <path d="M13 16l2 0" />
</svg>             
                        </span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                        {
  quotations.loading ? "loading" : quotations.error ? "error" : quotations.data? quotations.data.length : null
} Quotations
                        </div>
                        <div class="text-secondary">
                          {
                            loading ? "loading" :error ? "error":
                            data? data.length :null
                          } Converted
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="bg-danger text-white avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-coin-off">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-1m-2.82 1.171a2 2 0 0 0 1.82 2.829h1m2.824 2.822a2 2 0 0 1 -1.824 1.178h-2a2 2 0 0 1 -1.8 -1" />
  <path d="M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73" />
  <path d="M12 6v2m0 8v2" />
  <path d="M3 3l18 18" />
</svg>
                       
                        </span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                         ${totalExpenses}
                        </div>
                      <div className="text-secondary">
                      Expenses
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="bg-outline  avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-coin-pound">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M15 9a2 2 0 1 0 -4 0v5a2 2 0 0 1 -2 2h6" />
  <path d="M9 12h4" />
</svg>
                    
                        </span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                         {totalBanks}
                        </div>
                      <div className="text-secondary">
                        Banks
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          </div>

      

    
      
       
         
        </div>
      </div>
<br />

    <Bargraph loading={loading} error={error} data={data} convertedMonthlyExpenses={convertedMonthlyExpenses} convertedDailyExpenses={convertedDailyExpenses} convertedDailySales={convertedDailySales} monthlySales={monthlySales} convertedMonthlySales={convertedMonthlySales}/>
           
    
    </div>
 
  </div>
    
  )
}

export default Dashboard