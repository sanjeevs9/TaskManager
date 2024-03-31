import { useNavigate } from "react-router-dom"
import "../App.css"
import blue from "../assets/images/blue.png"
import red from "../assets/images/red.png"
import purple from "../assets/images/purple.png"
import green from "../assets/images/green.png"
import yoga from "../assets/images/MeditatingDoodle.png"
import Add from "./Add"
import dance from "../assets/images/DancingDoodle.png"
import { useState } from "react"

export default function Todo() {
    const navigate = useNavigate();
    const[addOpen,setOpen]=useState(false);

  function handleditOpen(){
    setOpen(!addOpen)
  }


    return (
        <>
        <Add editOpen={addOpen} handleditOpen={handleditOpen}></Add>
            <div className="min-h-screen justify-center items-center  ">
              
                <div className="h-screen    px-3  sm:px-16 2xl:px-72  md:px-24 pt-4 lg:px-20 ">
                    <div className="flex justify-between">
                        <div className=" text-[#69665c] font-semibold text-3xl  cursor-pointer" onClick={() => { navigate("/") }}>
                            todo
                        </div>
                        <div className="h-5 w-5 py-2 cursor-pointer" onClick={() => {handleditOpen()}}>
                            <svg fill="#69665c" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.402 45.402" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full  ">
                    <div className="flex sm:flex-col gap-3 sm:gap-6 sm:h-[40rem]  justify-center sm:pt-4  w-full   sm:w-52 xl:w-44 pt-16 ">
                    <button
  className="bg-[#f5f5f5] flex p-2 gap-1 sm:gap-2 rounded-md items-center  hover-effect hover:shadow-lg  hover:bg-white"
  onClick={(e) => {}}
>
  <div className="sm:pl-1 w-6 sm:w-auto sm:ml-1">
    <img src={red} className="tag sm:h-8 sm:w-8" alt="" />
  </div>
  <p data-value={"work"} className="pr-2 sm:pr-1 sm:mt-1 text-sm sm:text-base">
    Work
  </p>
</button>
              <button
                className="bg-[#f5f5f5] flex p-2  gap-1 sm:gap-2 rounded-md  items-center  hover-effect hover:shadow-lg  hover:bg-white "
                onClick={(e) => {}}
              >
                
                <div className="sm:pl-1 w-6 sm:w-auto sm:ml-1">
                <img src={green} className="tag sm:h-8 sm:w-8  " alt="" />
                </div>
                <p data-value={"study"} className="pr-2 sm:pr-1 sm:mt-1 text-sm sm:text-base">
                  Study
                </p>
              </button>
              <button
                className="bg-[#f5f5f5] flex p-2  gap-1 sm:gap-2 rounded-md  items-center hover-effect hover:shadow-lg  hover:bg-white "
                onClick={(e) => {}}
              >
                <div className="sm:pl-1 w-6 sm:ml-1 sm:w-auto">
                <img src={blue} className="tag sm:h-8 sm:w-8 " alt="" />
                </div>
                <p data-value={"self"} className="pr-2 sm:pr-1 sm:mt-1 text-sm sm:text-base">
                  Self
                </p>
              </button>
              <button
                className="bg-[#f5f5f5] flex p-2  gap-1 sm:gap-2 rounded-md  items-center hover-effect hover:shadow-lg  hover:bg-white "
                onClick={(e) => {}}
              >
                <div className="sm:pl-1 w-6 sm:ml-1 sm:w-auto"> 
                <img src={purple} className="tag sm:h-8 sm:w-8  " alt="" />
                </div>
                <p data-value={"other"} className="pr-2 sm:pr-1 sm:mt-1 text-sm sm:text-base">
                  other
                </p>
              </button>
              <div className="hidden md:flex translate-y-10">
                        <img src={yoga}></img>
              </div>
             
                    </div>
                    <div className="w-full">
                   <div className="flex w-full  pt-20 justify-center  "> 
                    <img src={dance}  style={{ width: "25rem" ,height:"20rem" }}></img>
                   </div>
                   <div className="text-center p-5 pt-10">
                      Your Study list is currenty on vacation.Must be nice ! Feel free to bring it 
                      back to the hustle whenever you're ready.
                   </div>
                   <div className=" justify-center flex">
                    <button className="  bg-[#69665c] p-2 text-white rounded-md" onClick={()=>{handleditOpen()}}>
                      Add Todo
                    </button>

                   </div>
                   </div>

                   </div>
                    

                </div>
            </div>
        </>
    )
}