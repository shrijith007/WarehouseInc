import { createStore } from "vuex"
import data from "./data"

const store =createStore({
    state(){
        return{
            warehouselist:data
        }
    },

    mutations:{
        addcustomfield(state,payload){
            let id=payload.id;
            let obj=payload.value;
            for (var key in state.warehouselist){
                if(state.warehouselist[key].id===parseInt(id)){
                 state.warehouselist[key].customfields.push(obj);
                }
               
               }
                }
        }
    }
)
export default store;