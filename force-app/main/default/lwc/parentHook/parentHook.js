
import { LightningElement, api } from 'lwc';

export default class ParentHook extends LightningElement {
       @api displayChild = false;

    constructor(){
        super();
        console.log("Constructor from Parent");
        

    }

    connectedCallback(){
        console.log("Connected Callback from Parent");
    }
    


    renderedCallback(){
        console.log("Rendered Callback from Parent");
    }
    

    errorCallback(error, stack){
        console.log("Error callback from Parent");
        console.log("error",error);
        console.log("stack",stack);
        console.log("Error Message is:",error.message);
        
    }

    disconnectedCallback(){

        console.log("Disconnected Callback from Parent");
    }

    handleChange(event){
    this.displayChild = event.target.checked;
    console.log(this.displayChild);
}


}