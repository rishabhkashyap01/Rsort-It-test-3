import React from 'react'
import { useNavigate } from "react-router-dom";

const Message = () => {
    const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => {
          navigate("/message");
        }}
        className='bg-[#00a99d]'
        >Message</button>
    </div>
  )
}

export default Message
