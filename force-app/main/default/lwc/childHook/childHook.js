
import { LightningElement } from 'lwc';

export default class ChildHook extends LightningElement {


constructor(){
        super();
        console.log("Constructor from child");

    }

    connectedCallback(){
        console.log("Connected Callback from child");
        throw new Error("Error while component is loading");
    }
    


    renderedCallback(){
        console.log("Rendered Callback from child");
    }
    

    errorCallback(error, stack){
        console.log("Error callback from child");
    }

 disconnectedCallback(){

        console.log("Disconnected Callback from child");
    }






}