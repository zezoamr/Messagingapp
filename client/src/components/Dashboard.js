import React from 'react'
import Sidebar from './Sidebar'

function Dashboard({id}) {
  return (
    <div style={{height: '100vh'}} className='d-flex'>
        <Sidebar id={id}/>
    </div>
    
  )
}

export default Dashboard