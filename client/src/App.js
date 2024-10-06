import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom"
import DeveloperRegister from './components/developers/developer-register';
import DeveloperSignin from "./components/developers/developer-signin"
import ManagerSignin from './components/managers/manager-signin';
import AdminSignin from './components/adminstrators/admin-signin';
import CashierSignin from './components/cashier/cashier-signin';
import AppLayout from './components/common/AppLayout';
import Products from './components/products/products';
import Product from './components/products/product';
import UpdateProduct from './components/products/update-product';
import AddProduct from './components/products/add-product'
import Banks from './components/banks/banks';
import AddBank from './components/banks/add-bank';
import UpdateBank from "./components/banks/update-bank"
import { useSelector } from 'react-redux';
import Quotations from './components/quotations/quotations';
import Invoices from './components/invoices/invoices';
import CreateQuotation from './components/quotations/create-quotation';
import ManagerRegister from './components/developers/manager-register';
import Expenses from './components/expenses/expenses';
import UpdateAdmin from './components/developers/update-admin';
import Managers from './components/developers/managers';
import AdminRegister from './components/developers/admin-register';
import CashierRegister from './components/developers/cashier-register';
import UpdateManager from './components/managers/update-manager';
import Manager from './components/developers/manager';
import Admins from './components/adminstrators/admins';
import Admin from './components/adminstrators/admin';
import Cashiers from "./components/cashier/cashiers"
import UpdateCashier from "./components/cashier/update-cashier"
import Template from './components/quotations/template';
import NotFoundPage from './components/common/404-page';
import InvoiceTemplate from "./components/invoices/invoice-template"
import PurchaseOrders from './components/po/pos';
import CreatePo from './components/po/create-po';
import PoTemplate from './components/po/po-template';
import CreateExpense from './components/expenses/create-expense';
import Expense from "./components/expenses/expense"
import Dashboard from './components/dashboard/dashboard';
function App() {
  const devSignin= useSelector((state)=>state.devSignin);
  const managerSignin= useSelector((state)=>state.managerSignin);
  const adminSignin= useSelector((state)=>state.adminSignin);
  const cashierSignin= useSelector((state)=>state.cashierSignin);
  const devInfo=devSignin.devInfo
  const managerInfo=managerSignin.managerInfo
  const adminInfo=adminSignin.adminInfo
  const cashierInfo=cashierSignin.cashierInfo
  let data;
  if (devInfo) {
    data=devInfo
  }
  else if (managerInfo) {
    data=managerInfo
  }else if(adminInfo){
data=adminInfo
  }else  {
    data= cashierInfo
  }
  let userData=data
  return (
   <Routes>
    <Route path='/developer-register' element={ <DeveloperRegister/>}/> 
    <Route path='/developer-signin' element={ <DeveloperSignin/>}/> 
    <Route path='/manager-signin' element={ <ManagerSignin/>}/> 
    <Route path='/admin-signin' element={ <AdminSignin/>}/> 
    <Route path='/cashier-signin' element={  <CashierSignin/>}/> 
    <Route path='/home'  element={<AppLayout data={data}/>} >
    <Route path='/home/products'  element={<Products userData={userData}/>} />
    <Route path='/home/users/register-manager'  element={<ManagerRegister userData={userData}/>} />
    <Route path='/home/users/managers'  element={<Managers userData={userData}/>} />
    <Route path='/home/users/admins'  element={<Admins userData={userData}/>} />
    <Route path='/home/users/cashiers'  element={<Cashiers userData={userData}/>} />
    <Route path='/home/users/add-cashier'  element={<CashierRegister userData={userData}/>} />
    <Route path='/home/users/update-cashier/:id'  element={<UpdateCashier userData={userData}/>} />
    <Route path='/home/users/admin/:id'  element={<Admin userData={userData}/>} />
    <Route path='/home/users/register-admin'  element={<AdminRegister userData={userData}/>} />
    <Route path='/home/users/manager/:id'  element={<Manager userData={userData}/>} />
    <Route path='/home/users/manager/update/:id'  element={<UpdateManager userData={userData}/>} />
    <Route path='/home/users/admin/update/:id'  element={<UpdateAdmin userData={userData}/>} />
    <Route path='/home/products/add-product'  element={<AddProduct userData={userData}/>} />
    <Route path='/home/product/:id'  element={<Product userData={userData}/>} />
    <Route path='/home/products/update-product/:id'  element={<UpdateProduct userData={userData}/>} />
    <Route path='/home/banks'  element={<Banks userData={userData}/>} />
    <Route path='/home/banks/add-bank'  element={<AddBank userData={userData}/>} />
    <Route path='/home/banks/update-bank/:id'  element={<UpdateBank userData={userData}/>} />
    <Route path='/home/quotations'  element={<Quotations userData={userData}/>} />
    <Route path='/home/invoices'  element={<Invoices userData={userData}/>} />
    <Route path='/home/pos'  element={<PurchaseOrders userData={userData}/>} />
    <Route path='/home/expenses'  element={<Expenses userData={userData}/>} />
    <Route path='/home/expense/:id'  element={<Expense userData={userData}/>} />
    <Route path='/home/quotations/create-quotation'  element={<CreateQuotation userData={userData}/>} />
    <Route path='/home/purchase-order/create-po'  element={<CreatePo userData={userData}/>} />
    <Route path='/home/expense/create-expense'  element={<CreateExpense userData={userData}/>} />
    <Route path='/home/purchase-order/get-po/:id'  element={<PoTemplate userData={userData}/>} />
    <Route path='/home/template/:id'  element={<Template userData={userData}/>} />
    <Route path='/home/invoice-template/:id'  element={<InvoiceTemplate userData={userData}/>} />
 
    <Route index element={<Dashboard   userData={userData}/>}/> 
    </Route>

    <Route path='/template/:id'  element={<Template userData={userData}/>} />
    <Route path='*' element={<NotFoundPage to="/" replace/>}/>
   </Routes>
  );
}

export default App;
