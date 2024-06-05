import Link from 'next/link'
import React from 'react'

const Loginpage = () => {
  return (
    <div className='flex justify-center items-center bg-[#F8D247] h-screen'>
      <div className='bg-white w-[70vw] rounded-[40px] shadow-2xl'>
        <div className='flex flex-col justify-center h-full ml-[10vw] gap-12 w-[742px]'>
          <h1 className='text-[40px] font-bold items-center justify-center'>
            About Us
          </h1>
          <p className='padding-[0px] margin-top-[-20px]'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
