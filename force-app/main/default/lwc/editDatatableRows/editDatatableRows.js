import { LightningElement,api, wire } from 'lwc';
import getContactListBasedOnAccount from '@salesforce/apex/ContactLwcEventController.getContactListBasedOnAccount';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from "@salesforce/apex";
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LEAD_SOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';

const columns = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Title', fieldName: 'Title', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    { label: 'Lead Source', fieldName: 'LeadSource', type: 'customPicklist', 
        editable: true,
        typeAttributes: {
            options: {fieldName:'picklistOptions'},
            value: {fieldName:'LeadSource'},
            context: {fieldName:'Id'}
    }
},
];
export default class EditDatatableRows extends LightningElement {

    @api recordId;
//list of contacts is populated in the array
    contactList= [];
    columns = columns;
    draftValues = [];
    contactRefreshProp;
    leadSourceOptions = [];

@wire(getObjectInfo, { 
    objectApiName: CONTACT_OBJECT 
}) contactsInfo;
//whatever data/picklistvalues I get I have to move to this.contactList
//  to populate the data in the datatable
@wire(getPicklistValues,{
     recordTypeId: "$contactsInfo.data.defaultRecordTypeId",
    fieldApiName: LEAD_SOURCE_FIELD
       
}) wiredPicklistValues({data,error}){
    if(data){
        //whatever data I am getting I am storing in leadSourceOptions
        this.leadSourceOptions = data.values;
    }else if(error){
        console.log('Error while loading');
    }
    }


@wire(getContactListBasedOnAccount,{
    accountId: "$recordId",
    //to populate the picklist data in the datatable
    picklist: "$leadSourceOptions"
}) getContactOutput(result){
    this.contactRefreshProp = result;
//iterate over the result.data and populate the data in the contactList
    if(result.data){
        this.contactList = result.data.map((currItem) => {
            let picklistOptions = this.leadSourceOptions;
             return{
                ...currItem,
                picklistOptions: picklistOptions
            };
    });


    }else if(result.error){
        console.log('Error while loading')
    }
}
//use async await to get the data by using updateRecord method 
// because it is asynchronous and have more than one record to process
async saveHandler(event){
    //access the draft values that user has edited 
    let draftRecords = event.detail.draftValues;//Array of modified records
//we have to get the fields in the form of object from the draft values. 
   let updateRecordsArray = draftRecords.map((currItem) =>{
        let fieldInput = {...currItem}
      // the fieldInput are in the form of array so we have to convert it into object  
        return {
            fields: fieldInput
        };
    });
    this.draftValues = [];
    //iterating over the updatedRecordsArray
    let updateRecordsArrayPromise = updateRecordsArray.map((currItem) => updateRecord(currItem));

    await Promise.all(updateRecordsArrayPromise);

    const toastevent = new ShowToastEvent({
            title: 'Success',
            message:
                'Record Updated Successfully',
            variant: 'success'
        });
        this.dispatchEvent(toastevent);
        //it makes a call to apex class to refresh the data in the datatable
        await refreshApex(this.contactRefreshProp);
    
}

}