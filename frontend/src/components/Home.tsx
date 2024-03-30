import { useEffect, useState } from "react";
import "../App.css"
import girl from "../assets/images/girl2.png"
import hometodo from "../assets/images/hometodo.png"
import {network} from "../../src/network"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todoList } from "../atom";

export default function Home() {
  const [displayAnimation, setDisplayAnimation] = useState(true);
  const[load,setload]=useState(false);
  const token=localStorage.getItem("token");
  const getTodo=`${network}/api/todo/get`
  const navigate=useNavigate();
  const [todoItem,setTodoItem]=useRecoilState(todoList);

  useEffect(() => {
    const animation1 = document.querySelector(".animation1");
    const animation2 = document.querySelector(".animation2");
  

    if (animation1 && animation2) {
      const timeoutId = setTimeout(() => {
        animation2.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          setDisplayAnimation(false);
        }, 2100);
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const logo = document.querySelectorAll("#logo path");
    for (let i = 0; i < logo.length; i++) {
        console.log(` ${i} is ${(logo[i] as SVGPathElement).getTotalLength()}`);
    }
}, []);


async function verifyJwt(){
  setload(true);
  if(token){
    try{
      await axios.post(getTodo,{},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(res=>{
        setTodoItem(res.data);
        navigate("/todo")
      })
    }catch(error){
      navigate("/signin")
    }
    
  }else{
    navigate("/signup")
  }
}
  return (
    <>{
      load?<div>

      </div>:""
    }
      <div
        className={` bg-yellow-200 min-h-screen animation1 items-center justify-center flex ${displayAnimation ? `` : "hidden"
          } `}
      >
        <div className="flex justify-center items-center ">

        <svg id="logo" width="299" height="107" viewBox="0 0 299 107" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M238.299 98.8491L238.306 98.8532L238.314 98.8574C244.087 102.064 250.482 103.652 257.448 103.652C264.493 103.652 270.969 102.067 276.824 98.8654C282.691 95.6568 287.33 91.1061 290.713 85.2562C294.205 79.2806 295.916 72.4361 295.916 64.8C295.916 57.1796 294.255 50.3822 290.852 44.4895C287.557 38.6381 283.001 34.1205 277.209 30.9912C271.435 27.7864 264.999 26.204 257.96 26.204C250.921 26.204 244.485 27.7864 238.711 30.9912C232.91 34.125 228.315 38.6892 224.939 44.6193L224.939 44.6192L224.933 44.6303C221.622 50.5169 220.004 57.2653 220.004 64.8C220.004 72.4039 221.572 79.2225 224.783 85.1852L224.794 85.2056L224.805 85.2257C228.094 91.0718 232.598 95.6307 238.299 98.8491ZM275.9 77.8705L275.89 77.8881L275.88 77.9059C273.874 81.4543 271.261 84.0432 268.045 85.7635C264.74 87.5312 261.22 88.412 257.448 88.412C253.665 88.412 250.241 87.5687 247.131 85.9043C244.103 84.2007 241.616 81.6312 239.687 78.0889C237.878 74.6123 236.908 70.2187 236.908 64.8C236.908 59.4785 237.916 55.1333 239.805 51.6578C241.735 48.1051 244.221 45.5818 247.238 43.9629L247.247 43.9579L247.257 43.9527C250.456 42.2007 253.966 41.316 257.832 41.316C261.604 41.316 265.072 42.1965 268.279 43.9527L268.3 43.9638L268.32 43.9746C271.43 45.6034 273.998 48.1384 276.008 51.6941C277.967 55.1616 279.012 59.4932 279.012 64.8C279.012 70.0919 277.931 74.4102 275.9 77.8705Z" stroke="#69665C" stroke-width="5"/>
<path d="M151 31.0246L150.992 31.0292L150.984 31.0339C145.535 34.2667 141.256 38.8368 138.152 44.676C135.025 50.4736 133.504 57.1647 133.504 64.672C133.504 72.1046 135.029 78.8258 138.141 84.7747C141.239 90.6977 145.512 95.3552 150.958 98.6781L150.966 98.683L150.974 98.6877C156.5 102.003 162.622 103.652 169.284 103.652C175.716 103.652 181.456 102.244 186.418 99.342L186.433 99.3332L186.448 99.3242C188.881 97.8553 191.034 96.1783 192.896 94.2914V100V102.5H195.396H207.172H209.672V100V5.28V2.78H207.172H195.396H192.896V5.28V35.3518C190.86 33.421 188.498 31.7516 185.826 30.3408C180.761 27.5817 175.276 26.204 169.412 26.204C162.685 26.204 156.528 27.8002 151 31.0246ZM182.213 44.1642L182.243 44.182L182.274 44.199C185.503 46.0017 188.077 48.6326 189.999 52.1698C191.9 55.6667 192.896 59.8495 192.896 64.8C192.896 69.7443 191.902 73.9763 189.994 77.5681C188.07 81.1052 185.489 83.7853 182.244 85.674C179.06 87.4912 175.526 88.412 171.588 88.412C167.654 88.412 164.124 87.4934 160.944 85.6804C157.785 83.7956 155.24 81.1156 153.31 77.5679C151.405 73.9817 150.408 69.7089 150.408 64.672C150.408 59.7215 151.404 55.5387 153.305 52.0418C155.235 48.4897 157.777 45.8572 160.924 44.0586C164.11 42.2383 167.647 41.316 171.588 41.316C175.51 41.316 179.033 42.2714 182.213 44.1642Z" stroke="#69665C" stroke-width="5"/>
<path d="M69.924 98.8491L69.9314 98.8532L69.9389 98.8574C75.7117 102.064 82.1075 103.652 89.073 103.652C96.1183 103.652 102.594 102.067 108.449 98.8654C114.316 95.6568 118.955 91.1061 122.338 85.2562C125.83 79.2806 127.541 72.4361 127.541 64.8C127.541 57.1796 125.88 50.3822 122.477 44.4895C119.182 38.6381 114.626 34.1205 108.834 30.9912C103.06 27.7864 96.6245 26.204 89.585 26.204C82.5455 26.204 76.1104 27.7864 70.3362 30.9912C64.5354 34.125 59.9399 38.6892 56.5643 44.6193L56.5643 44.6192L56.5581 44.6303C53.2469 50.5169 51.629 57.2653 51.629 64.8C51.629 72.4039 53.1971 79.2225 56.4078 85.1852L56.4188 85.2056L56.4301 85.2257C59.7185 91.0718 64.2229 95.6307 69.924 98.8491ZM107.525 77.8705L107.515 77.8881L107.505 77.9059C105.499 81.4543 102.886 84.0432 99.6699 85.7635C96.3651 87.5312 92.845 88.412 89.073 88.412C85.29 88.412 81.8661 87.5687 78.7559 85.9043C75.7283 84.2007 73.2407 81.6312 71.3117 78.0889C69.5026 74.6123 68.533 70.2187 68.533 64.8C68.533 59.4785 69.5407 55.1333 71.4296 51.6578C73.3603 48.1051 75.846 45.5818 78.863 43.9629L78.8724 43.9579L78.8818 43.9527C82.0812 42.2007 85.5908 41.316 89.457 41.316C93.2288 41.316 96.6972 42.1965 99.9042 43.9527L99.9245 43.9638L99.945 43.9746C103.055 45.6034 105.623 48.1384 107.633 51.6941C109.592 55.1616 110.637 59.4932 110.637 64.8C110.637 70.0919 109.556 74.4102 107.525 77.8705Z" stroke="#69665C" stroke-width="5"/>
<path d="M46.868 90.144V87.644H44.368H35.792C32.4256 87.644 30.73 86.9836 29.9807 86.3008C29.2388 85.537 28.564 83.9288 28.564 80.8V41.956H44.368H46.868V39.456V29.856V27.356H44.368H28.564V12.192V9.69199H26.064H14.416H11.916V12.192V27.356H5.328H2.828V29.856V39.456V41.956H5.328H11.916V80.8C11.916 87.9467 13.6052 93.692 17.5863 97.3589C21.4673 100.933 27.05 102.5 33.872 102.5H44.368H46.868V100V90.144Z" stroke="#69665C" stroke-width="5"/>
</svg>

</div>
      </div>
      <div className=" min-h-screen  animation2 flex flex-col items-center">
      <div className="pt-10">
              <span className="font-bold display-2 text-7xl ">
                <span className="purple">t</span>
                <span className="red">o</span>
                <span className="green">d</span>
                <span className="blue">o</span>
              </span>
            </div>
            <div className="">
              <p className="font-semibold text-center pt-10">
                Get stuff done with our minimal pastel aesthetic todo app.{" "}
                <br />
                Simplify your day, one task at a time!
              </p>
            </div>
            <div className="pt-20">
              <button
                onClick={verifyJwt}
                className=" bg-[#69665c] px-5 fw-bold p-2 w-40 text-white font-semibold rounded-md"
              >
                Get Started
              </button>
            </div>
            <div className=" mt-6 ">
              <img src={girl} alt="" className="h-36 w-36 translate-y-9 z-1" />
            </div>
            <div className="z-20 p-3">
              <img
                style={{ height: "11rem", width: "30rem" }}
                src={hometodo}
                alt=""
                className="todo-img "
              />
            </div>
            <div className=" pt-10 hidden sm:flex">
              <span className="font-kalam text-base opacity-75">
                Made with ❤️ by{" "}
                <a target="_blank" href="" className="underline">
                  Sanjeev
                </a>
              </span>
            </div>
      </div>
    </>
  )
}