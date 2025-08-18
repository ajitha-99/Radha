import { LightningElement,api, wire } from 'lwc';
import ACCOUNT_TICKERSYMBOL from '@salesforce/schema/Account.TickerSymbol';
import ACCOUNT_NAME  from '@salesforce/schema/Account.Name';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import updateTickerRecord from '@salesforce/apex/AccountLwc.updateTickerRecord';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
export default class ImperativeApexForm extends LightningElement {

@api recordId;
accname = "";
accticker = "";


//getfielddisplayvalue gives proper format or
//it should be displayed on the UI
//getfieldvalue gives the actual value from the database


@wire(getRecord, {
    recordId: "$recordId",
    fields: [ACCOUNT_NAME,ACCOUNT_TICKERSYMBOL]
})
outputFunction({data, error}){
    if(data){
        this.accname = getFieldValue(data,ACCOUNT_NAME);
        this.accticker = getFieldValue(data,ACCOUNT_TICKERSYMBOL);
    }else if(error){
         console.log("Error", error)
    }
}

changeHandler(event){
 this.accticker = event.target.value;
 
}

updateTicker(){
 updateTickerRecord({
    recordId: this.recordId,
    newTicker: this.accticker
}).then((result)=>{
    console.log("Record Updated Succesfully", result);
      notifyRecordUpdateAvailable([{recordId: this.recordId}]);
 }).catch((error)=>{
    console.log("Account error", error);
 })
}



}