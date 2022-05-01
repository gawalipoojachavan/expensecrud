var btnsubmit=document.querySelector("#btnsubmit")
var ul=document.querySelector("#listofexpense")
var category=document.querySelector("#optcategory")
var expense=document.querySelector("#txtexpense")
var description=document.querySelector("#txtdesc")
btnsubmit.addEventListener("click",Submit)
class Expense{
    constructor(expense,description,category){
        this.expense=expense;
        this.description=description;
        this.category=category
    }
}
document.addEventListener("DOMContentLoaded",refresh)
var expenseObj;
function refresh(){
    axios.get("https://crudcrud.com/api/98535e6316ae4017841c6a1c31b667ea/expenseApp")
    .then((response)=>{
        //console.log('load')
      for(var i=0;i<response.data.length;i++){
          addNewLine(response.data[i])
         // console.log(Response.data[i])
      }
    })
    .catch((error)=>{
        console.log(error)
    })
}
function Submit(){
var e=expense.value
var d=description.value
var c=category.options[category.selectedIndex].value
expenseObj=new Expense(e,d,c)
expense.value=''
description.value=''
category.options[category.selectedIndex].value=''
axios.post("https://crudcrud.com/api/98535e6316ae4017841c6a1c31b667ea/expenseApp",expenseObj)
.then((response)=>{
    addNewLine(response.data)
    //console.log(Response)
})
 .catch((error)=>console.log(error))   
}
function update(expense,desc,category,id){
    //console.log(userId)
    
   // removeLine(userId)
     //ul = document.querySelector("#listofexpense")
    category.value=category
    expense.value=expense
    description.value=desc
    deleteD(userId)
       
//console.log('hello')
}
function deleteD(userId){
    //console.log(userId)
   axios.delete(`https://crudcrud.com/api/98535e6316ae4017841c6a1c31b667ea/expenseApp/${userId}`)
    .then((response)=>{
        removeLine(userId)
    })
    .catch((error)=>{
        console.log(error)
    })
}
function removeLine(userId){
    const childToDelete=document.getElementById(userId)
    if(childToDelete)
    ul.removeChild(childToDelete)
}
function addNewLine(object){
    //console.log(object._id)
    //const childHTML=`<li id=${object._id}>${object._id} ${object.expense}  ${object.description}   ${object.category}
    //<button onclick=update('${object._id}')>Delete</button>
    //<button onclick=deleteD('${object._id}')>Edit</button>
    //</li>`
    //console.log(childHTML)
    //ul.innerHTML+=childHTML
    var li=document.createElement("li")
    li.setAttribute('id',object._id)
    var userId=object._id
    var edit=document.createElement("button")
    var del=document.createElement("button")
   edit.setAttribute('id',"btnedit")
    edit.innerHTML="Edit"
    edit.addEventListener("click",update(o))
    del.setAttribute('id',"btndel")
   del.innerHTML="Delete"
   del.addEventListener("click",deleteD(userId))
    li.appendChild(document.createTextNode(`${object.expense}  ${object.description}  ${object.category}`))
    console.log(li)
    li.appendChild(edit)
    li.appendChild(del)
    ul.appendChild(li)
}
