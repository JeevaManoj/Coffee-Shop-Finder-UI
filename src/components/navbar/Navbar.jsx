import React from 'react'
import coffee from '../../assets/images/coffee-cup.png'
import { useNavigate } from 'react-router-dom'

// Header Code

function Navbar() {

  const navigate = useNavigate()

  return (
    <div>
      <div className='row mt-4 mb-4'>
        <div className='col-md-2 alignCenter'>
           <img onClick={() => navigate('/')} className='logo' src={coffee}></img>
        </div>
        <div className='col-md-8 alignCenter head'>
          <h2 className='mt-3'>Find Coffee Shops and Cafes</h2>
        </div>
        <div className='col-md-2'>
           
        </div>

      </div>

    </div>
  )
}

export default Navbar