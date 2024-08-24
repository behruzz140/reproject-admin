import { create } from "zustand";
import http from "../../config";


const useProductStore = create (() => ({
    products: [],
    getProducts: async(data:any) => {
        try{
            const response = await http.get(`/products?limit=${data?.limit}&skip=${data?.skip}`)
            return response?.data?.payload
        }catch(err){
            console.log(err);
        }
    },
    removeProducts: async(data:any) => {
        try{
            const response = await http.delete(`/product/${data}`)
            return response
        }catch(err){
            console.log(err);
        }
    },
    addProducts: async(data:any) => {
        try{
            const response = await http.post(`/product`, data)
            return response
        }catch(err){
            console.log(err);
        }
    },
}));




export default useProductStore;