import { LightningElement } from 'lwc';

export default class ShareCssDemo extends LightningElement {

 // displayMessage = false;
  message = "";

    handleClick(event){
    //this.displayMessage = true;
let labelelement = event.target.label;
        if(labelelement=== "Success"){
        this.message = "Submitted Successfully";
        console.log(message);

    }else{
        this.message = "Submission Failed";
    }
}
}