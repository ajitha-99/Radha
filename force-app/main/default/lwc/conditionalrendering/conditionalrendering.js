import { LightningElement } from 'lwc';

export default class Conditionalrendering extends LightningElement {
  
    displayMessage = false;
    
    changeHandler(event){

//whenever we have to access the value of the checkbox we have to use event.target.checked
  // the below is initially false when the user click first time on the checkbox then the !this.dispalymessage is populated and it will become from false to true.
  //  if  the user click again on the checkbox it will become false and false to true.
  // It is referred as toggle handling  in javascript 
  // we use toggle when ever the user has to switch the values on every input of the user.
  //  we don't need to switch on every use of the user, so toggle is not required here
  
this.displayMessage = !this.displayMessage;
    }

}