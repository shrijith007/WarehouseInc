import { createRouter, createWebHistory } from "vue-router";
import Warehouselist from "../Pages/Warehouselist.vue";
import Warehousedetail from "../Pages/Warehousedetail.vue"

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:"/",component:Warehouselist},
        {path:"/warehouseslist",component:Warehouselist},
        {path:"/warehouseslist/:id",component:Warehousedetail,props:true}
    ]


})

export default router;