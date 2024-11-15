export const InputField = ( {input_type, placeholder, input_value, handleinputchange, field_name} ) => {
    return(
        <div className="input-conatiner">
            <input type={input_type} placeholder={placeholder} value={input_value} name={field_name} onChange={handleinputchange} className="bg-transparent px-2 py-1 border-indigo-950 rounded-md border-2 w-[25vw] text-indigo-950 placeholder-purple-950 min-[320px]:w-[65vw] md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px]"/>
        </div>
    )
}