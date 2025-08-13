import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactLwcEventController.getContactList';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendContact__c';
export default class ContactList extends LightningElement {


@wire(getContactList) contacts;
 @wire(MessageContext)
    messageContext;


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

 const payload = { lmsData: this.selectedContactId };

        publish(this.messageContext, recordSelected, payload);
//the settimeout clears the output that is displayed in the contact item 
//after 1000 seconds.
setTimeout(() =>{
    this.display = false;
},500)
}
 
}