import React, { useState } from 'react';

export default function Card() {
  const[isOpen,setisOpen]=useState(false);
  const[isChecked,setisChecked]=useState(false);  

  function handleCheckBox(){
    setisChecked(!isChecked);
  }

    return (
        <>
        <div>
        <div className='w-[27rem] h-[12rem] bg-[#fff9de] px-3 py-4'  >
            <div className='flex justify-between'>
                    <div className='flex '>
                        "Download Todo"
                    </div>
                    <div className='flex h-10 w-10' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#b2afa1" d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
                    </div>
            </div>
            <div className='flex  justify-between'>
                <div>
                    <input type="checkbox" checked={isChecked} className=''onChange={handleCheckBox}></input>
                </div>
            </div>
        
        </div>
        </div>      
        </>
    );
}
