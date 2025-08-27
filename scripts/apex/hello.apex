// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

// string tempvar = 'Enter_your_name_here';
// System.debug('Hello World!');
// System.debug('My name is ' + tempvar);

for(List<Contact> conList: [Select Id,Picture__c,Rank__c,Title from Contact LIMIT 10])
{
 for(Contact con: conList)
 {
  con.Picture__c = 'https://yt3.googleusercontent.com/y9piLaXzea8Z805cDMdh2yjRdxRiWJ0w_wTrtFjiPhA8P9iKN4L8IOW1DFFlZY8hNFSouTKvv7c=s900-c-k-c0x00ffffff-no-rj';
  if(String.isBlank(con.Title)){
    con.Rank__c = 3;
  }else {
    con.Rank__c = 8;
  }
 }

update conList;


}