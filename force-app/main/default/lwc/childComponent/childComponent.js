// we are displaying data from the child component not from parent component here
import { LightningElement, api} from 'lwc';

export default class ChildComponent extends LightningElement {

 // I want that the display should accept the data that is coming from parent component we have to annotate with @api decorator. so that the property is public and can accept the data from the parent component.
// whenever the property is in camel case we have to define it in the parent component in Kebab case
    //primitive property
@api display;//lowercase
//with camelcase
    @api displayGreeting; // camelcase
//object property. we are defining it in the setter and getter to populate the value in the template
   // @api user;
//boolean property

@api isUserAvailable = false;
displayuser;

// set always have one value method
// we are cloning the object userDetails as we are referencing as user here we use spread operator to clone it into one variable and not changing the original object
set user(value) {
    let cloneuser = {...value};
 //   this.displayuser = cloneuser.fname.toUppercase();
  if(cloneuser.fname){
        cloneuser.fname = cloneuser.fname.toUpperCase();
    }
    if(cloneuser.lname){
        cloneuser.lname = cloneuser.lname.toUpperCase();
    }
    this.displayuser = cloneuser;
}

@api 
 get user(){
    return this.displayuser;
 }
}