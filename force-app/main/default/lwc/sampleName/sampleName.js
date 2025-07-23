import { LightningElement } from 'lwc';

export default class SampleName extends LightningElement {
    firstname = "";
    lastname = "";
    fullname = "";
    display = false;
     result ="";

    // Method to handle changes in the name fields to calculate input fields
    nameChangeHandler(event) {
        let name = event.target.name;  // Capture 'name' from the event target
        let value = event.target.value; // Capture 'value' from the event target

        // Update firstname or lastname based on the input field's name
        if (name === "fname") {
            this.firstname = value;
        } else if (name === "lname") {
            this.lastname = value;
        }
        
        
    }

    // Method to concatenate and create the full name button clicking method
    clickHandler(event) {
        this.display = true;
       
        this.fullname = `${this.firstname} ${this.lastname}`; // Concatenate firstname and lastname
        this.result = this.fullname.toUpperCase(); // Convert fullname to uppercase
        console.log(this.result);

        //reset to original

      
        // Reset the firstname and lastname values after a brief delay we have to bind the variables in the value in the input in html file
        this.firstname = "";
        this.lastname = "";
       
        
    }
}
