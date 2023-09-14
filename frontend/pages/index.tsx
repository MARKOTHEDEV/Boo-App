import Link from 'next/link';
import Table from '@/shared/Table'
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import {useQuery , useMutation,useQueryClient} from 'react-query'
import { deleteApi, getBookApi ,} from '@/api/book.api';
import toast from "react-hot-toast";
export default function Home() {
  const prop_columns=[
    {
      Header:'Book Name',
      accessor:'name',
      id:1
    },
    {
      Header:'Reading',
      accessor:'reading',
      id:2,
      Cell:(tableProps:any)=>(
        <div>
            {tableProps.row.original.reading ? (
                        <div style={{ color: "green" }}>✓</div>
                ) : null}
        </div>
      )
    },
    {
      Header:'To Read',
      accessor:'to_read',
      id:3,
      Cell:(tableProps:any)=>(
        <div>
            {tableProps.row.original.to_read ? (
                        <div style={{ color: "green" }}>✓</div>
                ) : null}
        </div>
      )
    },
    {
      Header:'Completed',
      accessor:'completed',
      id:4,
      Cell:(tableProps:any)=>(
        <div>
            {tableProps.row.original.completed ? (
                        <div style={{ color: "green" }}>✓</div>
                ) : null}
        </div>
      )
    },
    {
      Header:'Action',
      accessor:'b',
      id:5,
      Cell:(tableProps:any)=>(
       <TableAction id={tableProps.row.original.id as string} />
      )
    }
  
  ]
  const client = useQueryClient()

  const {isLoading,data} = useQuery('getBookApi',getBookApi)
 
  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
          <Link href="/add-book">
            <div className="btn btn-outline-primary my-3" >
              Add book
            </div>
          </Link>
          {
          (isLoading)?<p>Loading...</p>:
          <Table prop_columns={prop_columns} custom_data={data?data:[]}/>
        }


      </div>
    </div>    
  )
}




const TableAction = ({id}:{id:string})=>{
  const client = useQueryClient()
  const {isLoading:deleteing,mutate} = useMutation(deleteApi,{
    'onSuccess':()=>{
      client.invalidateQueries('getBookApi')
      toast.success('Deleted Successfully')

    }
  })
  return (
    <div className="d-flex justify-content-around">
         <Link
        href={`/book/${id}`}
        > 
          <div style={{ color: "blue", cursor: "pointer" }}>
            <BiEdit />
          </div>
         </Link> 
        <div
          style={{ color: "red", cursor: "pointer" }}
          onClick={e=>{
            mutate({'id':id})
          }}
          // onClick={() => deleteBook(book.id)}
        >
          {
            deleteing?
            'Deleting'
            :
          <FaTrash />
          }
        </div>
      </div>
  )
}