import axios from "axios"
import { useState } from "react"
import { network } from "../network"

export default function Add({editOpen,handleditOpen,addState}: {editOpen: boolean,handleditOpen:Function,addState:Function}) {
    if(!editOpen){
        return
    }
    const [data, setdata] = useState({ title: "", description: "" })
    const[selecttag,setSelectedtag]=useState("work");
    const token =localStorage.getItem("token")
    const addUrl=`${network}/api/todo/create`

    async function handleClick(){
        // console.log(data)
        // const value={
        //     title:data.title,
        //     description:data.description,
        //     tag:selecttag,
        //     completed:false,
        // }
        await axios.post(`${addUrl}`,{
            title:data.title,
            description:data.description,
            tag:selecttag,
            completed:false
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data.newTodo)
            addState(res.data.newTodo)
            alert(res.data.message)
            handleditOpen()
            
        }).catch(error=>{
            console.log(error)
            alert(error.response.data.message)
            handleditOpen()
        })
    }

    return (
        <>
        
            <div className="z-50 bg-transparent items-center justify-center flex fixed inset-0 backdrop-brightness-50 backdrop-opacity-100">

                <div className="w-[30rem] h-28rem] bg-white rounded-lg">
                    <div className="flex flex-col">
                        <div className=" w-full flex p-4 justify-between">
                            <div className="font-semibold text-lg">
                                 Add Item
                            </div>
                            <div onClick={()=>{handleditOpen()}} className="hover:bg-gray-200 rounded-md">
                                <svg className=" rotate-45  cursor-pointer h-7 w-7  text-gray-500 rounded-lg hover:" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>

                            </div>
                        </div>
                        <hr className="h-[0.08px] my-1 bg-gray-500 border-0 dark:bg-gray-700" />
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col pl-3 pr-3 gap-1 pt-4">
                                <div className="text-left">
                                    Title
                                </div>

                                <input className="p-2 border rounded-md" placeholder="" onChange={(e)=>{setdata({...data,title:e.target.value})}}>
                                </input>
                            </div>
                            <div className="flex flex-col pl-3 pr-3 gap-1">
                                <div className="text-left">
                                    Description
                                </div>

                                <textarea className="p-2 border rounded-md" placeholder="" onChange={(e)=>{setdata({...data,description:e.target.value})}}></textarea>
                            </div>
                            <div className="flex flex-col pl-3 pr-3 gap-1">
                                <div className="text-left">
                                    Tag
                                </div>
                                <form className="w-full mx-auto">

                                    <select id="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e)=>{setSelectedtag(e.target.value)}}>
                                        <option value="work">Work</option>
                                        <option value="life">Life</option>
                                        <option value="self">Self</option>
                                        <option value="others">Others</option>
                                    </select>
                                </form>


                            </div>
                            <hr className="h-[0.08px] my-2 bg-gray-500 border-0 dark:bg-gray-700" />
                            <div className="flex  pr-3 gap-2 justify-end pb-3 -translate-y-1">
                                <div className="flex">
                                    <button className="p-2 border rounded-md hover:bg-[#515151] hover:text-white" 
                                    onClick={()=>{handleditOpen()}}> 
                                        close

                                    </button>
                                </div>
                                <div className="flex">
                                    <button className="p-2 bg-[#b9e9b0] rounded-md "
                                    onClick={handleClick}>
                                Add
                                    </button>
                                </div>
                            </div>



                        </div>
                    </div>

                </div>


            </div>


        </>
    )
}