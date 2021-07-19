<template>
<div class="dropdown">
  <button class="dropbtn" type="button" @click="filterbox" >Filter by</button>
  <div class="dropdown-content">
    <button class="filterdrop" type="button" @click="SelectCity" placeholder="City"> City</button>
    <button class="filterdrop" type="button" @click="SelectCluster" placeholder="Cluster">Cluster</button>
    <button class="filterdrop" type="button" @click="SelectSpace" placeholder="Space">Space</button>
  </div>
</div>



    
<basecard v-if="Selectedfilter==='City'">
<div >
<h1>City</h1>   
<span v-for="city in cityfilteroptions" :key="city.key">
<input type="checkbox" v-model="selectedcities" v-bind:value="city">  {{city}}
</span >
</div>
</basecard>

<basecard v-if="Selectedfilter==='Cluster'">
<div >
<h1>Cluster</h1>   
<span v-for="cluster in  clusterfilteroptions" :key="cluster.key">
<input type="checkbox" v-model="selectedclusters" v-bind:value="cluster">  {{cluster}}
</span >
</div>
</basecard>

<basecard v-if="Selectedfilter==='Space'">
<div >
<h1>Space</h1>   
<vue-slider  max=10000  v-model="value"   />
</div>
</basecard>

<basecard>
<input class="searchbar" type="text" placeholder="Warehouse Name.." v-model="Searchvalue" name="search">
  <button type="submit">Search </button>
</basecard>


<basecard v-if="whlist.length>0">
<ul>
    <Warehouse 
    v-for="wh in searchfilteredlist" 
    :key="wh.id" 
    :id="wh.id"
    :name="wh.name" 
    :city="wh.city" 
    :cluster="wh.cluster" 
    :spaceavailable="wh.space_available">
    </Warehouse>
</ul>    
</basecard>
</template>

<script>
import Basecard from '../Component/Basecard.vue'
import Warehouse from "../Component/Warehouse.vue"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default{
data(){
    return{
        Searchvalue:"",
        filter:false,
        Sf:"",
        value:0,
        selectedcities:[],
        selectedclusters:[],
        spacefitlered:[],
        tempmax:0
    }
},

components:{
Warehouse,
Basecard,
VueSlider
},

computed:{
   
    Selectedfilter(value){
        value=this.Sf
        return value
    },
        whlist(){
        if (this.selectedcities.length>0 && this.selectedclusters.length===0 && this.value===0){
return this.filterwarehousebycity(this.$store.state.warehouselist)
        }  
        else if(this.selectedclusters.length>0 && this.selectedcities.length===0 && this.value===0 ){
return this.filterwarehousebycluster(this.$store.state.warehouselist)
        }
        else if(this.value>0&& this.selectedclusters.length===0&& this.selectedcities.length===0 ){
    
        return this.filterwarehousebyspace(this.$store.state.warehouselist)
         }   
    else{
        return this.$store.state.warehouselist
    }
           },


searchfilteredlist(){
return this.whlist.filter(item => {
        return item.name.toLowerCase().includes(this.Searchvalue.toLowerCase())
      })
     
     
},
cityfilteroptions(){
    return [...new Set(this.searchfilteredlist.map(item=>item.city))]


},
clusterfilteroptions(){
    return [...new Set(this.searchfilteredlist.map(item=>item.cluster))]
}
        
},
   

methods: {
    SelectCity(){
        this.Sf="City"
    },

SelectCluster(){
    this.Sf="Cluster"
},
SelectSpace(){
    this.Sf="Space"
},
    filterbox(){
        this.filter=!this.filter
        
    },
    filterwarehousebycity(){
        return this.$store.state.warehouselist.filter(item => {
        return item.city.includes(this.selectedcities)
    })},
    filterwarehousebycluster(){
        return this.$store.state.warehouselist.filter(item => {
        return item.cluster.includes(this.selectedclusters)
    })},
    filterwarehousebyspace(){ 
        for (const key in this.$store.state.warehouselist){
             if(this.$store.state.warehouselist[key].space_available < this.value){
                 this.spacefitlered.push(this.$store.state.warehouselist[key])
             }
         }
         return [...new Set(this.spacefitlered)] 
}
    
    

}   
    }


</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

input.searchbar{
    height: 30px;
    width:25rem;
}
button{
    height: 2rem;
    width: 10rem;
}
button.filterdrop{
    margin:2px;
}
h1{
    font-size: smaller;
}
.dropbtn {
    background: #3d008d;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  padding: 10px;
  
}

.dropdown {
  position: relative;
  display: inline-block;
  padding: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding: 10px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1;}
.dropdown:hover .dropdown-content {display: block;}
.dropdown:hover .dropbtn {background-color: grey;}
</style>