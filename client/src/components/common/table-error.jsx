import React from 'react'

function TableError({error}) {
  console.log(error);
  return (
    <div style={{display:"flex",justifyContent:"center",width:"100%"}} class="alert alert-danger w-100" role="alert">
    {error}
  </div>
  )
}

export default TableError