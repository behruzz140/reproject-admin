import { create } from "zustand";
import http from "../../config";


const useCategoryStore = create (() => ({
    getCategories: async () => {
       try{
        const response = await http.get('/categories');
        return response.data.payload
        
       }catch(err){
        console.log(err);
       }
    },
    removeCategory: async (data:any) => {
        try{
            const response = await http.delete(`/category/${data}`)
            return response
        }catch(err){
            console.log(err);
        }
    },
    addCategory: async (data:any) => {
        try{
            const response = await http.post(`/categories`, data)
            return response
        }catch(err){
            console.log(err);
        }
    }
}));




export default useCategoryStore;