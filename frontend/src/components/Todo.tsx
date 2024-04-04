import { useNavigate } from "react-router-dom"
import "../App.css"
import blue from "../assets/images/blue.png"
import red from "../assets/images/red.png"
import purple from "../assets/images/purple.png"
import green from "../assets/images/green.png"
import yoga from "../assets/images/MeditatingDoodle.png"
import Add from "./Add"
import dance from "../assets/images/DancingDoodle.png"
import { useEffect, useState } from "react"
import axios from "axios"
import { network } from "../network"
import Card from "./Card"
import leftArrow from "../assets/images/left-arrow-backup-2-svgrepo-com.svg"
import rightArrow from "../assets/images/right-arrow-backup-2-svgrepo-com.svg"


interface AddValue{
  title:string,
  description:string,
  completed:boolean,
  tag:string,
  _id:string
}
interface Todo{
  title:string,
  description:string,
  completed:boolean,
  tag:string,
  _id:string
}

export default function Todo() {
  const navigate = useNavigate();
  const [addOpen, setOpen] = useState(false);
  const [todo, setTodo] = useState<Todo[]>([])
  const token = localStorage.getItem("token")
  const[tag,setTag]=useState("work")
  const[currrentPage,setCurrPage]=useState(1);
  const todosInPage=4;
  const[curr,setcurr]=useState<Todo[]>([]);
  const [lastPage,setlastPage]=useState(true);
  const getTodo = `${network}/api/todo/get`



  function handleditOpen() {
    setOpen(!addOpen)
  }
  useEffect(() => {
    if (token) {
      try {
        axios.get(`${getTodo}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => {
            setTodo(res.data.todos.reverse())
            console.log(todo)
          }).catch(error => {
            console.log(error)
            //navigate("/signin")
          })
      } catch (error: any) {
        console.log(error)
        //navigate("/signin")
      }
    } else {
      navigate("/signin")
    }
  }, [])

  useEffect(()=>{
    const filterdata=todo.filter(x=>x.tag==tag)
    const lastTodo=currrentPage* todosInPage;
    const FirstTodoIndex=lastTodo-todosInPage;
    console.log(FirstTodoIndex+"first")
    console.log(lastTodo+"last")
   const LP=lastTodo>=filterdata.length || filterdata.length<=4
   setlastPage(LP)
   console.log(LP)
    const c=filterdata.slice(FirstTodoIndex,lastTodo);
    setcurr(c)
    console.log(c)
  },[todo,tag,currrentPage])

  //update 
  async function updateState(value: Todo) {
    const newTodo={
      title:value.title,
      description:value.description,
      tag:value.tag,
      completed:value.completed,
      _id:value._id
     }

    const TodoToUpdate = todo.findIndex((x) => x._id === value._id);
      const updatedTodo = [...todo];
      updatedTodo[TodoToUpdate] = newTodo;
      setTodo(updatedTodo);
  }
  //delete
  async function deleteState(id: string) {
    console.log("curr")
    console.log(curr)
    const deleted=curr.filter((x)=>x._id !==id)
    console.log(deleted)
    console.log(deleted.length+"lengh")
    console.log(currrentPage+"curr")
    console.log(deleted.length %4 ==0 )
    if(deleted.length % 4===0 && currrentPage>1){
      prevPage();
    }
    setcurr(deleted)
    
  }
//addd
  function addState(addValue: AddValue) {
   const newTodo={
    title:addValue.title,
    description:addValue.description,
    tag:addValue.tag,
    completed:addValue.completed,
    _id:addValue._id
   }
   setTodo([newTodo, ...todo])
  }

  function nextPage(){
    setCurrPage(c=>c+1);
  }
  function prevPage(){
    setCurrPage(c=>c-1);
  }

  
  return (
    <>
      <Add addState={addState} editOpen={addOpen} handleditOpen={handleditOpen}></Add>
      <div className="min-h-screen justify-center items-center  relative">

        <div className="h-screen    px-3  sm:px-16 2xl:px-72  md:px-18 pt-4 lg:px-20  relative ">
          <div className="flex justify-between">
            <div className=" text-[#69665c] font-semibold text-3xl  cursor-pointer" onClick={() => { navigate("/") }}>
              todo
            </div>
            <div className="h-5 w-5 py-2 cursor-pointer" onClick={() => { handleditOpen() }}>
              <svg fill="#69665c" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.402 45.402" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full  md:pt-10">
            <div className="flex md:flex-col gap-3 sm:gap-6 md:h-[40rem]  justify-center md:pt-4  w-full   md:w-52 xl:w-44 pt-16 pl-10 sm:pl-0">
              <button
                className="bg-[#f5f5f5] flex p-2 gap-1 sm:gap-2 rounded-md items-center  hover-effect hover:shadow-lg  hover:bg-white"
                onClick={() => { setTag("work")
                setCurrPage(1)}}
              >
                <div className="md:pl-1 w-6 md:w-auto md:ml-1">
                  <img src={red} className="tag md:h-8 md:w-8" alt="" />
                </div>
                <p data-value={"work"} className="pr-2 md:pr-1 sm:mt-1 text-sm sm:text-base">
                  Work
                </p>
              </button>
              <button value="study"
                className="bg-[#f5f5f5] flex p-2  gap-1 sm:gap-2 rounded-md  items-center  hover-effect hover:shadow-lg  hover:bg-white "
                onClick={() => {setTag("study")
                setCurrPage(1)}}
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
                onClick={() => {setTag("self")
              setCurrPage(1)}}
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
                onClick={() => {setTag("other")
                setCurrPage(1)}}
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
            {curr.length >= 1 ? <div className=" w-full gap-2 sm:gap-4   grid md:grid-cols-2   justify-center  items-center gap-y-4 md:p-5 md:pt-16 md:pb-16 md:-translate-x-3 2xl:">
              {
                curr[0]?<Card deleteState={deleteState} updateState={updateState} key={curr[0]._id} id={curr[0]._id} completed={curr[0].completed} title={curr[0].title} description={curr[0].description} tag={curr[0].tag} width=" md:w-full w-[29rem] sm:w-[29rem] md:w-1/2 " height="h-[11rem] md:h-[12rem] lg:h-[13rem] 2xl:h-[14rem]"></Card>:""}
                {
                curr[1]?<Card deleteState={deleteState} updateState={updateState} key={curr[1]._id} id={curr[1]._id} completed={curr[1].completed} title={curr[1].title} description={curr[1].description} tag={curr[1].tag} width="md:w-full  w-[29rem] sm:w-[29rem] md:w-1/2 " height="h-[11rem] md:h-[12rem]  lg:h-[13rem] 2xl:h-[14rem]"></Card>:  <div  
                className="md:w-full w-[29rem] sm:w-[29rem] md:w-1/2 h-[11rem] md:h-[12rem] lg:h-[13rem] 2xl:h-[14rem]"
            />}
                {
                curr[2]?<Card deleteState={deleteState} updateState={updateState} key={curr[2]._id} id={curr[2]._id} completed={curr[2].completed} title={curr[2].title} description={curr[2].description} tag={curr[2].tag} width="md:w-full w-[29rem] sm:w-[29rem]  md:w-[20rem] " height="h-[11rem] md:h-[12rem] lg:h-[13rem] 2xl:h-[14rem]"></Card>:  <div  
                className="md:w-full w-[29rem] sm:w-[29rem] md:w-1/2 h-[11rem] md:h-[12rem] lg:h-[13rem] 2xl:h-[14rem]"
            />}
                {
                curr[3]?<Card deleteState={deleteState} updateState={updateState} key={curr[3]._id} id={curr[3]._id} completed={curr[3].completed} title={curr[3].title} description={curr[3].description} tag={curr[3].tag} width="md:w-full w-[29rem] sm:w-[29rem] md:w-[20rem] " height="h-[11rem] md:h-[12rem] lg:h-[13rem] 2xl:h-[14rem]"></Card>:""
              }

            </div> :
              <div className="w-full  ">
                <div className="flex w-full  pt-20 justify-center  ">
                  <img src={dance} style={{ width: "25rem", height: "20rem" }}></img>
                </div>
                <div className="text-center p-5 pt-10">
                  Your Study list is currenty on vacation.Must be nice ! Feel free to bring it
                  back to the hustle whenever you're ready.
                </div>
                <div className=" justify-center flex">
                  <button className="  bg-[#69665c] p-2 text-white rounded-md" onClick={() => { handleditOpen() }}>
                    Add curr
                  </button>

                </div>
              </div>}
              
              <div className=" flex  md:flex-col justify-between">
                  <div className={`${currrentPage==1?`hidden`:`flex`} cursor-pointer`} onClick={()=>{prevPage()}}>
                    <div className="h-5 w-5 ">
                  <img className="" src={leftArrow}></img>
                  </div>
                  </div>
                  <div className={` ${lastPage===true?`hidden`:`flex`} cursor-pointer`} onClick={()=>{nextPage()}}>
                    <div className="h-5 w-5">
                  <img src={rightArrow}></img>
                  </div>
                  </div>
              </div>

          </div>


        </div>
      </div>
    </>
  )
}