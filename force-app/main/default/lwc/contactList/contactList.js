import { LightningElement, api, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactLwcEventController.getContactList';

export default class ContactList extends LightningElement {


@wire(getContactList) contacts;

selectedContactId;
 display = false;

selectionHandler(event){
    
    let selectedContact = event.detail;
    this.display = true;
   
// It will return the selected contact id for further use. 
//let me store that id in selectedContactId variable. 
   this.selectedContactId = this.contacts.data.find((currItem) =>
       currItem.Id === selectedContact);
    
console.log("Selected Contacts", this.selectedContactId);
//the settimeout clears the output that is displayed in the contact item 
//after 1000 seconds.
setTimeout(() =>{
    this.display = false;
},1000)
}
 
}