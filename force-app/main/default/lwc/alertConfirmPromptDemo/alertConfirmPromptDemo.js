import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
export default class AlertConfirmPromptDemo extends LightningElement {

    async handleAlert(){
        await LightningAlert.open({
            message: 'this is the alert message',
            theme: 'error', // a red theme intended for error states
            label: 'Error!', // this is the header text
        });
        //Alert has been closed
    
    }
     async  handleConfirm(){
        const result = await LightningConfirm.open({
            message: 'Are you Sure?',
            variant: 'header',
            label: 'Are you Sure',
            theme: "success"
            // setting theme would have no effect
        });
        console.log("result is", result)
        //Confirm has been closed
        //result is true if OK was clicked
        //and false if cancel was clicked
    }
    handlePrompt(){
        LightningPrompt.open({
            message: 'Enter your favourite color',
            //theme defaults to "default"
            theme: "yellow",
            label: 'Please Respond', // this is the header text
            defaultValue: 'Enter Color Name', //this is optional
        }).then((result) => {
            //Prompt has been closed
            //result is input text if OK clicked
            //and null if cancel was clicked
            console.log("result is", result);
        });
    }
}