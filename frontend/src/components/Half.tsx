
export default function Half({text,image}:{text:string,image:string}){
    return(
        <>
        <div className="min-h-screen flex flex-col bg-[#fff9de] justify-between p-8">
        <div className="leading-relaxed text-[#69665c] font-bold text-3xl mt-20 sm:mt-32 xl:mt-36">
            {text}
        </div>
        <div className="w-full bg-black justify-center">
            
        <div className="h-[18rem] w-[13.5rem] mb-20 sm:mb-36 xl:mb-40 fixed  bottom-0 translate-y-36 translate-x-10 xl:translate-x-64">
            <img src={image} />
        </div>
        </div>
        </div>
        </>
    )
}