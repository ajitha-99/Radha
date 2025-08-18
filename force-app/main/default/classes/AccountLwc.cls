/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-13-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Salesforce best pratices to use user_mode
**/
public with sharing class AccountLwc {
    @AuraEnabled(cacheable=true)
    
    public static List<Account> getAccount(String inputIndustry) {

    return [
        SELECT id, Name, Industry, Rating
        FROM Account
    //whatever the user is inputting we are selecting that industry value
     where Industry =: inputIndustry
        WITH USER_MODE];  
    }

    @AuraEnabled(cacheable=true)
   
    public static List<Account> getParentAccounts(){
        return [select Id, Name, Industry from Account 
        where AnnualRevenue != null
        WITH USER_MODE];
    }

     @AuraEnabled
        public static String updateTickerRecord(String recordId, String newTicker){
            Account acc = new Account(Id = recordId, TickerSymbol = newTicker);
            try {
                update acc;
                return 'Success: Account updated successfully';
            }
            catch (Exception e) {
                return 'The following exception has occurred: ' + e.getMessage();
        }

     }
}