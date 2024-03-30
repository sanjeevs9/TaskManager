import Half from "./Half";
import cupgril from "../assets/images/Person1.png"
import AuthForm from "./AuthForm";

export default function Signup(){
    return (
        <>
        <div className=" grid sm:grid-cols-2">
            <div className="hidden sm:grid">
                <Half text="superChange Your Day With todo! your tasks your way efortelss way fklsndfdasndfklasd
                fasdflasdnflkasdf
                asdfklasndfklnfkl-fds
                fdkfn" image={cupgril}></Half>
            </div>
            <div className="grid  ">
                <AuthForm formType="signup"></AuthForm>
            </div>


        </div>
        </>
    )
}