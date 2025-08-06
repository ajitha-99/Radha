
import { LightningElement, api } from 'lwc';

export default class ContactItem extends LightningElement {

@api contact;

// the default behaviour of the anchor tag is to reload the entire page
// on every click. we want to prevent that.
//we use event.preventDefault() to avoid that behaviour
handleClick(event){

//prevent the anchor element from navigating to a new page
event.preventDefault();

//custom event creation
const selectedevent = new CustomEvent("contactselect",{
detail: this.contact.Id
});
//dispatch the event

this.dispatchEvent(selectedevent);

}


}