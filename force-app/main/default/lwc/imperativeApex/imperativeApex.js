import { LightningElement } from 'lwc';
import getAccount from '@salesforce/apex/AccountLwc.getAccount';
export default class ImperativeApex extends LightningElement {


clickHandler(){

//we have to make a call to the imperative apex
//It means you are calling a method from apex and 
//returning the data or handling the response in the form of promise

getAccount().then(result =>{
    console.log("Account Records", result)
})
 .catch((error) =>{
 console.log("Account error", error)
});
}




}