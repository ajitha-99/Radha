/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-04-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class ContactBrowserController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(string accountId, string industry) {
    
        String query = 'SELECT Id, Name, Email, Phone,PhotoUrl, Title, Account.Name, AccountId FROM Contact';
       
       List<String> filters = new List<String>();
        if (!String.isNotBlank(accountId)) {
            filters.add('accountId = :accountId');
        }
         if (!String.isNotBlank(industry)) {
            filters.add('Contact.Account.Industry = :industry');
        }
        
// string.join will convert the list into string
        if (!filters.isEmpty()) {
            query += ' where ' + String.join(filters, 'AND');

            query += ' WITH USER_MODE ';
            query += 'Order By Name';
        }
// System.debug is used for testing the error messages.
            
system.debug('query is'+ query);

List<Contact> contactList = Database.query(query);
        return contactList;
        
        


    
}
}

