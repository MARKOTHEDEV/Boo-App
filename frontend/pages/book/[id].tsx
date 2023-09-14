import { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputWithLabel, { SelectWithLabel } from "@/shared/InputWithLabel";
import { useMutation ,useQuery,useQueryClient} from "react-query";
import { createBookApi, getBookDetailApi, updateBookApi ,} from "@/api/book.api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";


const schema =  yup.object({
    name: yup.string().required(),
   status:yup.string().required(),
})
type FormI = yup.InferType<typeof schema>
const EditBook =()=>{
    const route = useRouter()
    const {id} = route.query
    const client = useQueryClient()

    const { 
        register,setValue, 
        handleSubmit,control,
        formState: { errors },
      } = useForm<FormI>({ resolver: yupResolver(schema) });
    //   watching fields
      const [changeStatus,setChangeStatus] = useState(false)
      const {isLoading,mutate} = useMutation(updateBookApi,{
        'onSuccess':()=>{
        client.invalidateQueries('getBookApi')
        toast.success('Updated Successfully')
        route.push('/')

        }
      })

      const {isLoading:loadingDetail,data} = useQuery('getBookDetailApi',()=>getBookDetailApi({'id':typeof id==='string'?id:'-1'}),{
        'refetchOnWindowFocus':false,
        enabled:typeof id==='string'?true:false,
        'onSuccess':(d)=>{
            setValue('name',d.name)
            if(d.completed){
                setValue('status','completed')
            }

            if(d.reading){
                setValue('status','reading')
            } if(d.to_read){
                setValue('status','to_read')
            }           
            
        }
      })
      const onSubmit=(data:FormI)=>{
        if(typeof id == 'string'){
            mutate({
                'id':id,
                'bookData':data
            })
        }
      }
      return (
        <div className="row">
        <div className="col-lg-8 mx-auto">
          <h4 className="text-center">Edit Book</h4>
          <hr />
          {
            loadingDetail?
            <h3>Loading book detail....</h3>
            :
          <form 
        onSubmit={handleSubmit(onSubmit)}
          >
           <InputWithLabel
            label="Book Name"
            register={register('name')}
            errorMessage={errors.name?.message}
           />


    {
        changeStatus?
        <SelectWithLabel 
        options={[
            {name:'reading',value:'reading'},
            {name:'to_read',value:'to_read'},
            {name:'completed',value:'completed'},
        ]}
        name="status"
        label="Status"
        setValue={setValue}
        errorMessage={errors.status?.message}
        />        
        :<div style={{ color: "blue", cursor: "pointer",'display':'flex','alignItems':'center' }} onClick={(e)=>{
            setChangeStatus(!changeStatus)
        }}>
        Update Status {' '}<BiEdit />
      </div>
    }

            

            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary w-100 my-3">
                {
                    isLoading?
                    'Updateing..':
                    'Update'
                }
              </button>
              <Link href="/">Cancel</Link>
            </div>
          </form>
        }
        
        </div>
      </div>
    )
}

export default EditBook