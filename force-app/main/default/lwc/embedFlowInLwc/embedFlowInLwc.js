import { LightningElement, api } from 'lwc';

export default class EmbedFlowInLwc extends LightningElement {

    @api recordId;
 get inputVariables() { 
    return[
        {
            name: "AccountId",
            type: "String",
            value: this.recordId
        },
        {
            name: "OperationType",
            type: "String",
            value: "Create Record"
        }];

}


handleStatusChange(event){

    if(event.detail.status === 'FINISHED'){
        let outputvalues = event.detail.outputVariables;
        
        for(let i=0; i<outputvalues.length; i++){
            let outputItem = outputvalues[i];
           if(outputItem.name === "outputAccountId"){
                console.log("output Item",outputItem.value);
            }
            if(outputItem.name === "outputOperationType"){
                console.log("output Item opertaion type is",outputItem.value);
            }
        }
    }
}




}