import { form } from 'interfaces/interfaces';
const checkForm = (form:form) => {
   
    if ( !form.id || !form.name ||!form.surname || !form.phone ||!form.address || !form.email){ return {error:'Todos los campos son requeridos',done:false}}
    if(isNaN(form.id)){
        console.log('typeof',typeof(form.id));
        return {error:'ID field must be a number',done:false}}
    if(isNaN(form.phone)){return {error:'Phone Field must be a number',done:false}}
  
  
  
    return {error:'',done:true}
}
export default checkForm
