import { useState } from "react";
import { network } from "../network";
import "../App.css"
import cupgirl from "../assets/images/Person1.png"
import { useNavigate } from "react-router-dom";

type formType = "signup" | "signin";

export default function AuthForm({ formType }: { formType: formType }) {
  const [data, setData] = useState({ username: "", password: "" });
  const signUp = `${network}/api/user/signup`;
  const signin = `${network}/api/user/signin`;
  const navigate =useNavigate();

  function handle() {}

  return (
    <>
      <div className="min-h-screen">
        <div className="hidden sm:block text-[#69665c] font-semibold text-2xl text-end w-full p-4 pr-9 mt-1 cursor-pointer" onClick={()=>{navigate("/")}}>
                todo
        </div>
        <div className="flex flex-col p-20 mt-24  ">
          <div className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl mb-24 sm:mb-32 w-full text-center font-semibold  ">
            {formType == "signup" ? " Create an account" : "Login"}
          </div>
          <div className="flex sm:hidden w-full  justify-center">


          
          <div className=" h-[9rem] w-[6.5rem] ">
                <img src={cupgirl}></img>
          </div>
          </div>
          <div className="flex flex-col gap-8 ">
            <input
              className="p-2 rounded-md border-[1.5px] shadow-lg border-[#69665c] focus:outline-6 focus:outline-stone-600 focus:border-[2px] "
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              placeholder="Username"
            />
            <input
              className="p-2 rounded-md border-[1.5px] shadow-lg border-[#69665c] focus:outline-6 focus:outline-stone-600 focus:border-[2px] "
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              placeholder="Password"
            />
            <button className="bg-[#69665c] p-3 text-white rounded-md" onClick={handle}>
              {formType == "signup" ? "Sign Up" : "Signin"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
