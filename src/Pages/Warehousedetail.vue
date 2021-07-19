<template>
<div v-if="customtoggle">
<basecard>
<h3>Enter custom field Value: <input type="text"  v-model="customfieldvalue" placeholder="Enter value" > </h3>       
<button @click="Addcustomfield">Add custom field</button> 
</basecard>
</div>

<basecard>
  <li>
        <h3>Name: <input type="text" :disabled="edit" v-model="selectedwhi.name"></h3>
        <h3>City: <input type="text" :disabled="edit" v-model="selectedwhi.city"> </h3>
        <h3>Cluster:<input type="text" :disabled="edit" v-model="selectedwhi.cluster"> </h3>
        <h3>Type:<input type="text" :disabled="edit" v-model="selectedwhi.type" >   </h3>
        <h3>Code:  <input type="text" :disabled="edit" v-model="selectedwhi.code"> </h3>
        <h3>Registration:<input type="text" :disabled="edit" v-model="selectedwhi.is_registered">  </h3>
        <h3>Active:<input type="text" :disabled="edit" v-model="selectedwhi.is_live">  </h3>
        <h3>Space Available:<input type="text" :disabled="edit" v-model="selectedwhi.space_available">sqft </h3>
        <div v-for="Field in customfields" :key="Field.id">
        <h3>Custom field :  {{Field.customfieldname}} </h3>
        </div>
        <button type="button" @click="edit=!edit" :disabled="!edit">Edit</button>
        <button type="button" @click="edit=!edit;savingdetail()"  :disabled="edit">Save</button>
<button type="button" @click="customtoggle=!customtoggle">Custom</button>
</li> 
</basecard>
</template>

<script>
import Basecard from '../Component/Basecard.vue'
export default{
  components: { Basecard },
    props:["id"],
    data(){
        return{
            
            selectedwh:{},
        customtoggle:false,
        customfields:[],
        customfieldname:'',
        customobj:null,
        customfieldvalue:"",
            edit:true
        } },



computed:{
selectedwhi(value){ 
   for (var key in this.whlist){
 if(this.whlist[key].id===parseInt(this.id)){
     console.log("heylo")
     value=this.whlist[key]
 }
}

console.log(value)
return value
}
,whlist(){
return  this.$store.state.warehouselist
}},
methods:{
savingdetail(){
    for (var key in this.whlist){
 if(this.whlist[key].id===parseInt(this.id)){
     Object.assign(this.$store.state.warehouselist[key],{
    "name" : this.selectedwhi.name,
    "code" :this.selectedwhi.code ,
    "city": this.selectedwhi.city,
    "space_available": this.selectedwhi.space_available,
    "type" : this.selectedwhi.type,
    "cluster" : this.selectedwhi.cluster,
    "is_registered" : this.selectedwhi.is_registered,
    "is_live" : this.selectedwhi.is_live,
    "customfields":this.selectedwhi.customfields
  })

}
 }
},

Addcustomfield(){
  this.customobj={customfieldname: this.customfieldvalue}
  this.customfields.push(this.customobj);
  this.savingdetail()
  this.customfieldvalue=""
  this.customtoggle=!this.customtoggle
this.$store.commit("addcustomfield",{value:this.customobj,id: this.id} )
}
},

}
</script>

<style scoped>
li {
  margin: 1rem 0;
  padding: 1rem;
  list-style: none;
}

h3 {
  font-size: 1.0rem;
  padding: 2px;
  flex: inherit;
  align-content: flex-start;
}

h3,
h4 {
  margin: 0.5rem 0;
}
input{
    padding: 10px;
    margin: 10px;
}
button{
    flex: inherit;
    padding:1rem;
    margin: 2rem;
    border-radius:.5rem ;
}
</style>