import { LightningElement, wire } from 'lwc';
import LOGO from '@salesforce/resourceUrl/MyLogo';    
import CONTENT_ASSET from '@salesforce/contentAssetUrl/My_Asset_Logo';
import GREETING from '@salesforce/label/c.greeting';
import SALESFORCE_PLATFORM from '@salesforce/label/c.salesforcePlatform';
import USER_ID from '@salesforce/user/Id';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import DISPLAY_TEXT  from '@salesforce/customPermission/displayText';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import ANIMATE_CSS from '@salesforce/resourceUrl/thirdpartycss'; 
import MOMENT_JS from '@salesforce/resourceUrl/thirdpartyjs'; 
export default class StaticResourceDemo extends LightningElement {

mylogoImage = LOGO;
mylogoAsset = CONTENT_ASSET;
userName = "";
isFirstLoad = true;
displayDate = "";
//if we import multiple labels the correct way is to store in a object
label = {
    greeting: GREETING,
    platform: SALESFORCE_PLATFORM
}

//if we want the user name and get the complete details of the logged in user we go for getrecord method 
//we need to import the user object

@wire(getRecord,{

    recordId: USER_ID,
     fields:[NAME_FIELD]
})wireduserDetails({data,error}){
    if(data){
        this.userName = getFieldValue(data, NAME_FIELD);
    }else if(error){
        console.log("Error", error)
    }
}

//When ever we use the third party file we use lifecycle hooks
//we can use connectedCallback, renderedCallback, disconnectedCallback
//rendered callback method runs multiple times instead of that we use one property
//to laod one time
renderedCallback(){
    if(this.isFirstLoad){
        //whenever the file is loaded we stop rendering it multiple times,so made it false
            this.isFirstLoad = false;
            Promise.all([
                 loadStyle(this, ANIMATE_CSS),
                loadScript(this, MOMENT_JS)
            ])
       
        .then((result)=>{
            console.log("Files Loaded Successfully", result);
            this.fetchDate();
        
    }).catch((error) =>{
            console.log("File Loaded Failed", error);
        })
        
    } 
      
    }

//I am checking whether the user have permission or not using get method

get checkPermisson(){
    return DISPLAY_TEXT;
}

fetchDate(){
    this.displayDate = moment().format('LLLL');
}

}