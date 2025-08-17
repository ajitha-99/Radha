import { LightningElement,api, wire } from 'lwc';
import getParentAccounts from '@salesforce/apex/AccountLwc.getParentAccounts';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import ACCOUNT_SLA_TYPE  from '@salesforce/schema/Account.SLA__c';
import ACCOUNT_NAME  from '@salesforce/schema/Account.Name';
import ACCOUNT_DESCRIPTION  from '@salesforce/schema/Account.Description';
import ACCOUNT_SLA_EXPIRY_DATE  from '@salesforce/schema/Account.SLAExpirationDate__c';
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import ACCOUNT_NO_OF_LOCATIONS  from '@salesforce/schema/Account.NumberofLocations__c';
import { createRecord, updateRecord, deleteRecord, getFieldValue, getRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

const fieldsToLaod = [
    ACCOUNT_NAME,
    ACCOUNT_DESCRIPTION,
    ACCOUNT_SLA_EXPIRY_DATE,
    ACCOUNT_SLA_TYPE,
    ACCOUNT_NO_OF_LOCATIONS,
    ACCOUNT_PARENT
];
export default class WireAccountDetailsForm extends NavigationMixin(
    LightningElement
) {

//options or parent accounts that to be displayed in the dropdown is
//defined as parentoptions
//date is of type object so we make it as null. we do not leave as blank.
parentoptions = [];
selParentAcc = "";
selAccName = "";
selSlaExpDate = null;
selSlaType = "";
selNoOfLocations = "1";
selDescription = "";
@api recordId;
@api objectApiName;

@wire(getRecord,{
    recordId: "$recordId",
    fields: fieldsToLaod

}) wiredgetRecordFunction({data, error}){
    if(data){
        console.log("data",data);
    
    this.selParentAcc = getFieldValue(data, ACCOUNT_PARENT);
    this.selAccName = getFieldValue(data, ACCOUNT_NAME);
    this.selSlaExpDate = getFieldValue(data, ACCOUNT_SLA_EXPIRY_DATE);
    this.selSlaType = getFieldValue(data, ACCOUNT_SLA_TYPE);
    this.selNoOfLocations = getFieldValue(data, ACCOUNT_NO_OF_LOCATIONS);
    this.selDescription = getFieldValue(data, ACCOUNT_DESCRIPTION);
    }else if(error){
        console.log("Error", error);
    }

}
@wire(getParentAccounts)
handleParentAccounts({  data, error}) {
    this.parentoptions = [];
 if(data){
//map contains current item, index and an array
//round() braces in the map help to return array
//curly{} braces help to return the object
   this.parentoptions = data.map((currItem) =>({
        label : currItem.Name,
        value : currItem.Id

    })
     );
}else if(error){
    console.log("Error", error)
 }

}

@wire(getObjectInfo, {
     objectApiName: ACCOUNT_OBJECT
}
) accountobjectinfo;

@wire(getPicklistValues, {
    recordTypeId: "$accountobjectinfo.data.defaultRecordTypeId",
    fieldApiName:  ACCOUNT_SLA_TYPE
}) slapicklistvalues;


handleChange(event){
  let{name, value} = event.target;
   if(name === "parentacc"){
    this.selParentAcc = value;
   }
   if(name === "accname"){
    this.selAccName = value;
   }
   if(name === "slaexpdate"){
    this.selSlaExpDate = value;
   }
   if(name === "slatype"){
    this.selSlaType = value;
   }
    if(name === "nooflocations"){
    this.selNoOfLocations = value;
   }
   if(name === "descripton"){
    this.selDescription = value;
   }
}
handleSave(){
 console.log("ACCOUNT_OBJECT", ACCOUNT_OBJECT);
 console.log("ACCOUNT_NAME",ACCOUNT_NAME );
    if(this.validateInput()){ 
         let inputfields ={};
//two ways to define object. using dot. notation or using object notation[]

    inputfields[ACCOUNT_PARENT.fieldApiName] = this.selParentAcc;
    inputfields[ACCOUNT_NAME.fieldApiName] = this.selAccName;
    inputfields[ACCOUNT_SLA_EXPIRY_DATE.fieldApiName] = this.selSlaExpDate;
    inputfields[ACCOUNT_SLA_TYPE.fieldApiName] = this.selSlaType;
    inputfields[ACCOUNT_NO_OF_LOCATIONS.fieldApiName] = this.selNoOfLocations;
    inputfields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selDescription;
    let recordInput = {
        apiName: ACCOUNT_OBJECT.objectApiName,
        fields: inputfields
    }
    if(this.recordId){
        //update record
        inputfields[ACCOUNT_ID.fieldApiName] = this.recordId;
        let recordInput = {
            fields: inputfields
        };        updateRecord(recordInput)
        .then(result =>{
            console.log("Record Updated Successfully",result);
            this.showToast();
        })
                    .catch(error =>{
                console.log("Error in updating record ",error);
            });
    }else{
    //create record returns promise so we have to use then and catch block
        createRecord(recordInput)
        .then(result =>{
            console.log("Account Created Successfully",result);
            let pageref={
    type: 'standard__recordPage',
        attributes: {
            recordId: result.id,
            objectApiName: ACCOUNT_OBJECT.objectApiName,
            actionName: 'view'
        }
    }
    this[NavigationMixin.Navigate](pageref);
    console.log("Record Is ",pageref );
        })
        .catch(error =>{
            console.log("Error in creation",error);
        });
    }
}else{
    console.log("Input is not valid");
}
  
}



validateInput(){
    // this always return the array. so store it in a property
    // query.selectorall returns the node list. to convert to an array 
    // we have to use Array.from or spread opertor
    //.every method checks each and every value in the array meets the conditions or not
    
let fields = Array.from(this.template.querySelectorAll(".validateMe"));

let isValid = fields.every((currItem) =>
     currItem.checkValidity()
);
 return isValid;
}

get formTitle(){
    if(this.recordId){
        return "Edit Account";
    }else{
        return "Create Account";
    }

}

//delete button to be available on edit account record page only

get isDeleteAvailable(){
    if(this.recordId){
        return true;
    }else
        return false;

}

showToast() {
        const event = new ShowToastEvent({
            title: "Success",
            message: "Record Updated Successfully",
            variant: "success"
        });
        this.dispatchEvent(event);
    }

    // delete record always returns void
    deleteHandler(){
        deleteRecord(this.recordId)
        .then((result) =>{
            console.log("Record Deleted Successfully",result);
        let pageRef = {
             type: 'standard__objectPage',
    attributes: {
        objectApiName: 'ACCOUNT_OBJECT',
        actionName: 'home'
  
        }  
       }
      this[NavigationMixin.Navigate](pageRef);
})
        .catch(error =>{
            console.log("Error in deletion",error);
        });
    }
     
}
