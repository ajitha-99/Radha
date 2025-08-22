import { LightningElement, api } from 'lwc';

export default class ShowMessageInParentAura extends LightningElement {

    @api firstName;
    @api lastName;

@api changeHandler(event){
    let {name,value} = event.target;
    if(name ==="fname"){
        this.firstName = value;
    }
    else if(name ==="lname"){
        this.lastName = value;
    }
}

@api clickHandler(){
    let fullname = `${this.firstName} ${this.lastName}`.toUpperCase();
   //1. send the fullname to parent component
   
   let myCustomEvent = new CustomEvent("message",{
       detail:{
        fullName: fullname},
       bubbles:true,
       composed:true
   });
   //dispatch the event
   this.dispatchEvent(myCustomEvent);
}
}