import { LightningElement,api, wire } from 'lwc';
import getContactListBasedOnAccount from '@salesforce/apex/ContactLwcEventController.getContactListBasedOnAccount';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];
export default class EditDatatableRows extends LightningElement {

    @api recordId;
//list of contacts is populated in the array
    contactList= [];
    columns = columns;
@wire(getContactListBasedOnAccount,{
    accountId: "$recordId"
}) getContactOutput({data, error}){

    if(data){
        this.contactList = data;
        console.log('data', data)

    }else if(error){
        console.log('Error while loading', error)
    }
}




}