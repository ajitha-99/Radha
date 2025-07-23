global class AccountApi{
 
 webservice static string Name(string accName){
     string msg='';
     
    Account acc= new Account (
             Name = accName);
             
             try{
             
             insert acc;
             msg= 'Account has been inserted successfully.Record Id :' + acc.Id;
             }
             
             catch(Exception e){
           msg =  'Account is not inserted : ' + e.getMessage() + 'in line number: ' + e.getLineNumber();
           }
     
     return msg;  
    
    
     } 
 
 }