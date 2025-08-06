import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name'
import ANNUAL_REVENUE from '@salesforce/schema/Account.AnnualRevenue'
import { getFieldDisplayValue, getFieldValue, getRecord } from 'lightning/uiRecordApi';

export default class GetRecordDemo extends LightningElement {

    @api recordId;
    accName;
    accRevenue;

@wire(getRecord,{
    recordId: "$recordId",
    fields: [ACCOUNT_NAME, ANNUAL_REVENUE]

}) outputFunction({data, error}){
    if(data){
        // instead of traversing the record i.e,to go to data then fields,then fieldname then value, we can also use getFieldValue()
       //  this.accName = data.fields.Name.value;
        // this.accRevenue = data.fields.AnnualRevenue.value;
        this.accName = getFieldValue(data,ACCOUNT_NAME);
        this.accRevenue = getFieldDisplayValue(data,ANNUAL_REVENUE);
        console.log("data",data);
    }else(error)
    console.log("error", error);
};






}