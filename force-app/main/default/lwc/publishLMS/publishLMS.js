import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendMessage__c';
export default class PublishLMS extends LightningElement {


    @wire(MessageContext)
    messageContext;

publishMessage(){
// we do the business logic here in the payload and rest of the things are common
    const payload = { lmsData: "Welcome to Publish and Subscribe Model" };

        publish(this.messageContext, recordSelected, payload);

}




}