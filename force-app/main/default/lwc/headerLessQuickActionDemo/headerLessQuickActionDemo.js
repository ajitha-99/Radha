import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class HeaderLessQuickActionDemo extends NavigationMixin(LightningElement)  {

@api invoke(){
//navigate to standard contact home page
this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'home',
            },
        });
    }

}


