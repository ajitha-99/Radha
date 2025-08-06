import { LightningElement, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountLwc.getAccount'

const columns = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Industry', fieldName: 'Industry'},
    { label: 'Account Rating', fieldName: 'Rating'},
    
];

export default class WireDecoratorProperty extends LightningElement {

// referencing the method with some property name as accounts
columns = columns;
@wire(getAccount) accounts;

//whenever we read the data we have to use
//accounts.data
//to display error: accounts.error


}