
import {AiFillCaretDown} from 'react-icons/ai'


type Prop ={
    label:string,
    register:any,
    errorMessage?:string
}
const InputWithLabel = ({label,register,errorMessage}:Prop)=>{


    return (
        <div className="form-group mb-3">
            <label className="form-label" htmlFor={label}>
            {label}
            </label>
            <input
            type="text"
            id={label}
            className="form-control"
            {...register}
            />
            {
          errorMessage?
            <small style={{'color':'crimson'}}>{errorMessage?.replace(/[^\s]*/,label?label:'')}</small>
            :''
        }
        </div>
    )
}

export default InputWithLabel


type SelectProp={
    options:{name:string,value:string}[],
    label:string,
    setValue:any,
    name:string,
    errorMessage?:string
}
export const SelectWithLabel = ({
    label,options,setValue,name,errorMessage,}:SelectProp)=>{
        

    return (
        <div className="form-group mb-3">
            <label className="form-label" htmlFor={label}>
                {label}
            </label>
            <div className="relative">

            <select 
            defaultValue={'to_read'}
            className="form-control"
            onChange={e=>{
                setValue(name,e.target.value)
            }}
            >
                
                <option 
                        selected
                        >Select Status</option>
               
                {
                    options.map(({name,value},index)=>(
                        <option 
                        key={index}
                        value={value}
                        >{name}</option>
                    ))
                       
                }
            </select>
            <AiFillCaretDown className='absolute right-3 bottom-2 pointer-events-none' />
            </div>
            {
          errorMessage?
            <small style={{'color':'crimson'}}>{errorMessage?.replace(/[^\s]*/,label?label:'')}</small>
            :''
            }
        </div>
    )
}