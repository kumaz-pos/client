import {applyMiddleware, combineReducers, compose} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';

import { shopOwnerRegisterReducer,shopOwnerLoginReducer } from './reducers/shopownerReducer';
import Cookie from 'js-cookie';
import { getProductReducer,getProductsReducer,updateProductReducer,deleteProductReducer,createProductsReducer } from './reducers/productReducer';
import { getShopsReducer,getShopReducer,updateShopReducer,deleteShopReducer,createShopReducer } from './reducers/shopReducer';
import { getBranchReducer,getBranchesReducer,updateBranchReducer,deleteBranchReducer,createBranchReducer } from './reducers/branchReducer';
import { getStoreKeeperReducer,getStoreKeepersReducer,updateStoreKeeperReducer,deleteStoreKeeperReducer,storeKeeperLoginReducer,storeKeeperRegisterReducer } from './reducers/storeKeeperReducer';
import {cartReducer} from "./reducers/cartReducer";
import { weeklySalesReducer,dailySalesReducer,monthlySalesReducer,cumulativeSalesReducer,yearlySalesReducer } from './reducers/aggregationsReducer';
import { createSaleReducer,getSalesReducer,getStorekeeperSalesReducer } from './reducers/salesReducer';
import { developerLoginReducer,developerRegisterReducer } from './reducers/developerReducer';
import {deleteManagerPasswordReducer,updateManagerPasswordReducer,managerLoginReducer,managerRegisterReducer ,getManagerReducer,getManagersReducer,updateManagerReducer} from './reducers/managerReducer';
import {updateAdminReducer,adminLoginReducer,adminRegisterReducer ,getAdminReducer,getAdminsReducer,deleteAdminReducer} from './reducers/adminReducer';
import {cashierLoginReducer,cashierRegisterReducer,getCashierReducer,getCashiersReducer,updateCashierReducer,deleteCashierReducer } from './reducers/cashierReducer';

import {getBankReducer,getBanksReducer,createBankReducer,updateBankReducer,deleteBankReducer } from './reducers/bankReducer';
import {getQuotationReducer,getQuotationsReducer,createQuotationReducer,updateQuotationReducer,deleteQuotationReducer } from './reducers/quotationReducer';
import {getInvoiceReducer,getInvoicesReducer,updateInvoiceReducer,deleteInvoiceReducer,createInvoiceReducer } from './reducers/invoice';
import {getPoReducer,getPosReducer,updatePoReducer,createPoReducer,deletePoReducer } from './reducers/poReducer';
import {getExpensesReducer,getExpenseReducer,updateExpenseReducer,deleteExpenseReducer,createExpenseReducer } from './reducers/expenseReducer';
const storeKeeperInfo = localStorage.getItem('storeKeeperInfo') ? JSON.parse(localStorage.getItem('storeKeeperInfo')): null
const cartItems = Cookie.get('cartItems') ? JSON.parse(Cookie.get("cartItems")):[];
let shopOwnerInfo= localStorage.getItem('shopOwnerInfo') ? JSON.parse(localStorage.getItem('shopOwnerInfo')): null
let devInfo= localStorage.getItem('devInfo') ? JSON.parse(localStorage.getItem('devInfo')): null;
let managerInfo= localStorage.getItem('managerInfo') ? JSON.parse(localStorage.getItem('managerInfo')): null;
let adminInfo= localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')): null;
let cashierInfo= localStorage.getItem('cashierInfo') ? JSON.parse(localStorage.getItem('cashierInfo')): null;

const initialState={
    shopOwnerSignin:{
      
        shopOwnerInfo
    },
    devSignin:{
      
        devInfo
    },
    managerSignin:{
      
        managerInfo
    },
    adminSignin:{
      
        adminInfo
    },
    cashierSignin:{
      
        cashierInfo
    },
    storeKeeperLogin:{
      
        storeKeeperInfo
    },
    
    cart:{cartItems}


};



 const reducer= combineReducers({
    devSignin:developerLoginReducer,
    devSignup:developerRegisterReducer,
    managerSignin:managerLoginReducer,
    managerSignup:managerRegisterReducer,
    adminSignin:adminLoginReducer,
    adminSignup:adminRegisterReducer,
    cashierSignin:cashierLoginReducer,
    cashierSignup:cashierRegisterReducer,
  shopOwnerSignin:shopOwnerLoginReducer,
   shopOwnerRegister:shopOwnerRegisterReducer,
   getProducts:getProductsReducer,
   getProduct:getProductReducer,
   updateProduct:updateProductReducer,
   deleteProduct:deleteProductReducer,
   addProduct:createProductsReducer,
   getQuotations:getQuotationsReducer,
   getQuotation:getQuotationReducer,
   updateQuotation:updateQuotationReducer,
   deleteQuotation:deleteQuotationReducer,
   createQuotation:createQuotationReducer,
   getManagers:getManagersReducer,
   getManager:getManagerReducer,
   updateManager:updateManagerReducer,
   updateManagerPassword:updateManagerPasswordReducer,
   deleteManager:deleteManagerPasswordReducer,
   getAdmins:getAdminsReducer,
   getAdmin:getAdminReducer,
   deleteAdmin:deleteAdminReducer,
   updateAdmin:updateAdminReducer,
   getCashiers:getCashiersReducer,
   getCashier:getCashierReducer,
   deleteCashier:deleteCashierReducer,
   updateCashier:updateCashierReducer,

   updateInvoice:updateInvoiceReducer,
   getInvoices:getInvoicesReducer,
   getInvoice:getInvoiceReducer,
   deleteInvoice:deleteInvoiceReducer,
   createInvoice:createInvoiceReducer,
   updateInvoice:updateInvoiceReducer,
   getExpenses:getExpensesReducer,
   getExpense:getExpenseReducer,
   deleteExpense:deleteExpenseReducer,
   createExpense:createExpenseReducer,
   updateExpense:updateExpenseReducer,
   getPos:getPosReducer,
   getPo:getPoReducer,
   deletePo:deletePoReducer,
   createPo:createPoReducer,
   addProduct:createProductsReducer,
   getShops:getShopsReducer,
   getShop:getShopReducer,
   deleteShop:deleteShopReducer,
   getBanks:getBanksReducer,
   getBank:getBankReducer,
   deleteBank:deleteBankReducer,
   updateBank:updateBankReducer,
   addBank:createBankReducer,
   addBranch:createBranchReducer,
   getBranches:getBranchesReducer,
   getBranch:getBranchReducer,
   updateBranch:updateBranchReducer,
   deleteBranch:deleteBranchReducer,
   getStoreKeepers:getStoreKeepersReducer,
   getStoreKeeper:getStoreKeeperReducer,
   storeKeeperLogin:storeKeeperLoginReducer,
   storeKeeperRegister:storeKeeperRegisterReducer,
   deleteStoreKeeper:deleteStoreKeeperReducer,
   updateStoreKeeper:updateStoreKeeperReducer,
   cart:cartReducer,
addSale:createSaleReducer,
getSales:getSalesReducer,
dailySales:dailySalesReducer,
weeklySales:weeklySalesReducer,
monthlySales:monthlySalesReducer,
yearlySales:yearlySalesReducer,
cumulativeSales:cumulativeSalesReducer,
getStorekeeperSales:getStorekeeperSalesReducer


   
   
});

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
 const store= createStore(reducer,initialState,compose(applyMiddleware(thunk)));


 export default store