import api from "./api"


type Book ={
    name: string,
    reading: boolean,
    to_read: boolean,
    completed: boolean,
}
export const createBookApi = async ({name,status}:{name:string,status:string})=>{
    const book = {
        name,
        reading: status=='reading'?true:false,
        to_read: status=='to_read'?true:false,
        completed:  status=='completed'?true:false,
    }
    const resp= await api.post('api/v1/add-book/',book)
    return resp.data
}


export const updateBookApi = async ({id,bookData}:{id:string,bookData:{name:string,status:string}})=>{
    const book = {
        name:bookData.name,
        reading: bookData.status=='reading'?true:false,
        to_read: bookData.status=='to_read'?true:false,
        completed:  bookData.status=='completed'?true:false,
    }
    const resp= await api.put(`api/v1/book-update/${id}/`,book)
    return resp.data
}
export const getBookApi = async ():Promise<Book[]>=>{
    const resp= await api.get('api/v1/books-list/',)
    // @ts-ignore
    return resp
}


export const getBookDetailApi = async ({id}:{id:string}):Promise<Book>=>{
    const resp= await api.get(`api/v1/book-details/${id}/`,)
    // @ts-ignore
    return resp
}
export const deleteApi = async ({id}:{id:string}):Promise<Book>=>{
    const resp= await api.delete(`api/v1/delete-book/${id}/`,)
    // @ts-ignore
    return resp
}