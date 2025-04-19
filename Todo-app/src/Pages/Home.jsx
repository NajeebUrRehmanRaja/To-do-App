import React from 'react'
import Navbar from '../Pages/Navbar'

const Home = () => {
  return (
    <div >
        <Navbar />
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 calssName='text-2xl'>Create Your Daily Tasks Here</h1>
            <div>
                <label htmlFor="" className="">
                    <input type="text" className='border-2 border-gray-300 rounded-lg p-2' placeholder='Enter your task here...' />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Task</button>

                </label>
            </div>
        </div>
    </div>
  )
}

export default Home