// 26th JULY 2016: CODE TO ITERATE AND READ THROUGH PUBLIC GOOGLE SHEETS AND THEN WRITE THE READ DATA INTO A NEW SHEET

NOTES: 
//1. This script must be associated with a Google Sheet that has the Google Sheets IDs in Column E of the active Sheet
//2. Google Sheet IDS look like this: 1ZURs4DIC4WZes0O95EfZhc2ZfIDf36WhOvYqRDknniY 
//3. For each Google Sheet, data is pulled from a Source Row and written to a destination row in the active Sheet. 

function statusChecker() {
  
  // Open the current spreadsheet that has a list of spreadsheets. 
  var internDirectory = SpreadsheetApp.getActiveSpreadsheet();
  
  // Next read through the GCRI Spreadsheet IDS. Column E has the spreadsheet IDs. This pulls data in 200 rows in Column E
  var internURLs = internDirectory.getRange("E2:E200").getValues();  
  
  // Iterate through each spreadsheet 
  for(var i=0; i < internURLs.length; i++)
  {
       Logger.log("Beginning to gather data for Intern " + i);
        
       var internSS = SpreadsheetApp.openById(internURLs[i]);
       var firstRow = 3;  //cos first two rows are the header and we don't need those 
       var maxRow = internSS.getLastRow();
            
                   
       //Iterate through each row of filled in data 
       for(var j=firstRow; j < maxRow; j++)
       {    
         //Pull from Source Row
         var sourceRow = internSS.getRange("A"+j+":AL"+j).getValues();
                  
         //ID last row in the target sheet and write to it 
         var last_row = internDirectory.getSheetByName("datadump").getLastRow() + 1;
         internDirectory.getSheetByName("datadump").getRange("A"+last_row+":AL"+last_row).setValues(sourceRow);              
                      
       } 
       
       Logger.log("Finished gathering data for Intern " + i);
    };  
}
