import React from 'react'
import { useNavigate } from 'react-router-dom'

const Task = () => {
    const navigate =useNavigate();
  return (
    <div>
       <button onClick={()=>{navigate('/task')}} className='bg-red-500'>
        Go to task page
       </button>
    </div>
  )
}

export default Task
