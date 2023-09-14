import { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputWithLabel, { SelectWithLabel } from "@/shared/InputWithLabel";
import { useMutation } from "react-query";
import { createBookApi } from "@/api/book.api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const schema =  yup.object({
    name: yup.string().required(),
   status:yup.string().required(),
})
type FormI = yup.InferType<typeof schema>
const AddBook =()=>{
    const route = useRouter()
    const { 
        register,setValue, 
        handleSubmit,control,
        formState: { errors },
      } = useForm<FormI>({ resolver: yupResolver(schema) });
      const {isLoading,mutate} = useMutation(createBookApi,{
        'onSuccess':()=>{
        toast.success('Updated Successfully')
        route.push('/')
        }
      })
      const onSubmit=(data:FormI)=>{
        mutate(data)
      }
      return (
        <div className="row">
        <div className="col-lg-8 mx-auto">
          <h4 className="text-center">Add Book</h4>
          <hr />
          <form 
                      onSubmit={handleSubmit(onSubmit)}
          >
           <InputWithLabel
            label="Book Name"
            register={register('name')}
            errorMessage={errors.name?.message}
           />

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
            

            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary w-100 my-3">
                {
                    isLoading?
                    'Adding..':
                    'Add'
                }
              </button>
              <Link href="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddBook