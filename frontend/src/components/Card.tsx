import React, { useState } from 'react';

import "../App.css"
import Edit from './Edit';
import Delete from './Delete';

export default function Card() {
    const [isOpen, setisOpen] = useState(false);
    const [isChecked, setisChecked] = useState(false);
    const [editOpen,seteditOpen]=useState(false)
    const [deleteOpen,setdeleOpen]=useState(false)

    function handleCheckBox() {
        setisChecked(!isChecked);
        console.log(isChecked)
    }
    function handleOpen(){
        setisOpen(!isOpen)
    }
    function handleditOpen(){
        seteditOpen(!editOpen)
        console.log(editOpen)
    }
    function handleDeleteOpen(){
        setdeleOpen(!deleteOpen)
    }
    

    return (
        <>
            <div>
                <div>
                   <Edit editOpen={editOpen} handleditOpen={handleditOpen}></Edit>
                   <Delete deleteOpen={deleteOpen} toggleModal={handleDeleteOpen}></Delete>
                </div>
                <div className='w-[27rem] h-[13rem] bg-[#fff9de] px-4 py-5  rounded-sm shadow-lg relative'  >
                    <div className='flex justify-between pb-1'>
                        <div className={`${isChecked?`line-through`:""}  flex text-[#69665c] font-extrabold font-foundation text-lg `}>
                         go to gym
                        </div>
                        <div className='h-10 w-10  -translate-y-3' onClick={handleOpen} >
                            <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <rect x="8" y="200" width="70" height="70" rx="15" ry="15" fill="#b2afa1" />
                                <rect x="130" y="200" width="70" height="70" rx="15" ry="15" fill="#b2afa1" />
                                <rect x="258" y="200" width="70" height="70" rx="15" ry="15" fill="#b2afa1" />
                            </svg>
                        </div>
                       {
                        isOpen==true?(
                            <>
                            <div className='h-[6rem] w-36 absolute bg-white border-[#d2cdb7] border-[1px] rounded-md text-[#d2cdb7] justify-between flex flex-col p-1 pl-4 pr-3
                           translate-x-52
                            '>
                                <div className='flex mt-1 hover:bg-[#f8f9fa] pb-1 hover:text-black cursor-pointer' 
                                onClick={handleditOpen}>
                                    Edit...
                                </div>
                            
                                <hr className='flex mr-1 ml-[0.5px] '>
                                </hr>
                          
                                
                                <div className='flex pb-1 hover:bg-[#f8f9fa] hover:text-black cursor-pointer'
                                onClick={handleDeleteOpen}>
                                        Delete

                                </div>

                            </div>
                            </>
                        ):null
                       }
                    </div>

                    <div className={`${isChecked === true ? 'line-through' : ''} overflow-hidden pb-9 h-[4.5rem] font-kalam text-[#69665c] line-clamp-3`}>
                        
                        content vadnlvnadklnvdkfvd
                        todo content vadnlvnadklnvdkfvd
                        todo content vadnlvnadklnvdkfvd
                        content vadnlvnadklnvdkfvd
                        todo content vadnlvnadklnvdkfvd
                        todo content vadnlvnadklnvdkfvd  content vadnlvnadklnvdkfvd
                        todo content vadnlvnadklnvdkfvd
                        todo content vadnlvnadklnvdkfvd

                    </div>
                    <div className='flex  justify-between items-end  absolute bottom-0 inset-x-4 pb-5'>
                        <div className='rounded-full bg-red-500 w-10 h-10'>

                        </div>

                        <div className="checkbox-wrapper-65 -translate-y-1">
                            <label htmlFor="cbk1-65">
                                <input type="checkbox" id="cbk1-65" onChange={handleCheckBox}/>
                                <span className="cbx">
                                    <svg width="12px" height="11px" viewBox="0 0 12 11">
                                        <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                                    </svg>
                                </span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
