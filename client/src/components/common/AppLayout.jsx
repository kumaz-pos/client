import React from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom";
function AppLayout({data}) {
  document.title="Japan Direct Point Of Sale"
  return (
    <>
    <Navbar data={data}/>
<Outlet/>
        
    </>
  )
}

export default AppLayout
