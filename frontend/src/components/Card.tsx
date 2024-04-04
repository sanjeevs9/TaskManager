import { useState } from 'react';

import "../App.css"
import Edit from './Edit';
import Delete from './Delete';
import blue from "../assets/images/blue.png"
import red from "../assets/images/red.png"
import purple from "../assets/images/purple.png"
import green from "../assets/images/green.png"
import axios from 'axios';
import { network } from '../network';

export default function Card({width,height,title,description,tag,id,completed,updateState,deleteState}:
    {width:string,height:string,title:string,description:string,tag:string,id:string,completed:boolean,updateState:Function,deleteState:Function}) {
    const [isOpen, setisOpen] = useState(false);
    const [isChecked, setisChecked] = useState(completed);
    const [editOpen,seteditOpen]=useState(false)
    const [deleteOpen,setdeleOpen]=useState(false)
    const update=`${network}/api/todo/update/${id}`
    const token =localStorage.getItem("token")

   async function handleCheckBox() {
    const newCheckedState=!isChecked
    setisChecked(newCheckedState)

      await  axios.post(`${update}`,{
            title,
            description,
            tag,
            completed:newCheckedState
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        ).then(_=>{
      
        }).catch(err=>{
           
            alert(err)
        })
    }
    


    function handleOpen(){
        setisOpen(!isOpen)
    }
    function handleditOpen(){
        seteditOpen(!editOpen)
       
    }
    function handleDeleteOpen(){
        setdeleOpen(!deleteOpen)
    }

    return (
        <>
            <div > 
                <div>
                   <Edit updateState={updateState} title={title} description={description} completed={completed} id={id} tag={tag} editOpen={editOpen} handleditOpen={handleditOpen}></Edit>
                   <Delete deleteState={deleteState} id={id} deleteOpen={deleteOpen} toggleModal={handleDeleteOpen}></Delete>
                </div>
                <div className={`${width} ${height} bg-[#fff9de] px-4 py-5  rounded-sm shadow-xl relative `}  >
                    <div className='flex justify-between pb-1'>
                        <div className={`${isChecked?`line-through`:""}  flex text-[#69665c] font-extrabold font-foundation text-lg overflow-hidden overflow-y-hidden h-8 `}>
                        {title}
                        </div>
                        <div className='h-10 w-10  -translate-y-3 flex' onClick={handleOpen}>
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

                    <div className={`${isChecked === true ? 'line-through' : ''} overflow-hidden pb-9  font-kalam text-[#69665c] h-[3rem] lg:h-[4.6rem] 2xl:h-[5.9rem] `}>
                        
                      {description}

                    </div>
                    <div className='flex  justify-between items-end  absolute bottom-0 inset-x-4 pb-5 '>
                        <div className='h-8 w-8 sm:h-10 sm:w-10'>
                            {tag=="other"?<img src={purple}></img>:
                            tag=="work"?<img src={red}></img>:
                            tag=="study"?<img src={green}></img>:
                           tag=="self"?<img src={blue}></img>:
                           <img src={purple}></img>
                            }
                            
                        </div>

                        <div className="checkbox-wrapper-65 -translate-y-1">
                            <label htmlFor={id}>
                                <input checked={isChecked}    type="checkbox" id={id} onChange={handleCheckBox}/>
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
