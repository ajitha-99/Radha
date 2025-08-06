import { LightningElement, wire } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import {getRecords} from 'lightning/uiRecordApi';

export default class GetRecordsDemo extends LightningElement {

    outputNames;
    errors;

@wire(getRecords, {
    records: [{
        recordIds: ["0015g00000RzlJVAAZ", "0015g00000RzlJRAAZ"],
        fields: [ACCOUNT_NAME_FIELD]
    },{
        recordIds: ["0035g00000FXdeiAAD"],
        fields: [CONTACT_NAME_FIELD]
    }]

}) outputFunction({data, error}){
    if(data){
        this.outputNames = data;
        this.errors = null;
        console.log("data",data);
    }else(error)
    this.errors = error;
    this.outputNames = null;
    console.log("error", error);


}
}