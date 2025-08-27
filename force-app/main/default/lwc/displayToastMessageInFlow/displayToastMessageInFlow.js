import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DisplayToastMessageInFlow extends LightningElement {
    handleStatusChange(event){
       if(event.detail.status === "FINISHED"){
       const event = new ShowToastEvent({
            title: "success",
            message:
                "Record Created successfully",
            variant: "success"
        });
        this.dispatchEvent(event);
    }
}


}