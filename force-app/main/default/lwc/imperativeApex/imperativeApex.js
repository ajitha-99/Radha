import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountLwc.getAccount';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INDUSTRY  from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class ImperativeApex extends LightningElement {

    data = [];
    options = [];
    columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Industry', fieldName: 'Industry'},
    { label: 'Account Rating', fieldName: 'Rating' },
    
];

//whatever the data that the user is selected we have to store it in a variable/property
selectedIndustry;

@wire(getObjectInfo,{ 
    objectApiName: ACCOUNT_OBJECT 
})accountInfo;


@wire(getPicklistValues,{

        recordTypeId: "$accountInfo.data.defaultRecordTypeId",
        fieldApiName: ACCOUNT_INDUSTRY
})industryPicklist;

handleChange(event){
    this.selectedIndustry = event.target.value;
}

clickHandler(){

//we have to make a call to the imperative apex
//It means you are calling a method from apex and 
//returning the data or handling the response in the form of promise
//the value we are passing or selecting in the industry we are passing to the getAccount method

getAccount({
    inputIndustry: this.selectedIndustry
})
.then(result =>{
    console.log("Account Records", result);
    this.data=result;
})
 .catch((error) =>{
 console.log("Account error", error)
});
}




}