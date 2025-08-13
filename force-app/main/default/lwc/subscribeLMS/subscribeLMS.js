import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';

import recordSelected from '@salesforce/messageChannel/sendMessage__c';


export default class SubscribeLMS extends LightningElement {

subscription = null;
pubMessage = "";

    @wire(MessageContext)
    messageContext;

      connectedCallback() {
        this.subscribeToMessageChannel();
    }
    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
// in real time we mostly do the business here and rest of the things are common
     handleMessage(message) {
        this.pubMessage = message.lmsData;
    }
 disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
     unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }


}