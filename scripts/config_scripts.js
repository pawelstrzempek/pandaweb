var tdcAddr = [];
var numberOfTdc = 2;

  function loadConfigurationFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	     var contents = e.target.result;
        var data = r.result;
        var words = data.split('\n');            
        tdcAddr = words[10].split(','); 
        numberOfTdc = tdcAddr.length; 
        //setting up tdc addresses form in html index
        var elem = document.getElementById("tdcAddrForm");
        elem.value = words[10];
        createPanel();//creating panel based on data read in from configuration file
			//iterating through tdc's
			for (var j=0; j< numberOfTdc*8; j++) {
				var dec = words[11+16*j].split(' ');//dec[2] contains id number
				//var asicNb = dec[2].substr(dec[2].length-1, 1); //taking last digit
				//var cableNb = dec[2].substr(dec[2].length-2, 1);
				//var tdcNb = dec[2].substr(0, dec[2].length-2);
				document.getElementById("AMPLI_asic"+dec[2]).selectedIndex = words[12+16*j];
			   	document.getElementById("PEAK_Pasic"+dec[2]).selectedIndex = words[13+16*j];
			   	document.getElementById("TC1C_Pasic"+dec[2]).selectedIndex = words[14+16*j];
			   	document.getElementById("TC1R_Pasic"+dec[2]).selectedIndex = words[15+16*j];
			   	document.getElementById("TC2C_Pasic"+dec[2]).selectedIndex = words[16+16*j];
			   	document.getElementById("TC2R_Pasic"+dec[2]).selectedIndex = words[17+16*j];	
				//bars				
				jQuery("#bar"+dec[2]+"0").val(words[18+16*j]);//threshold bar
				jQuery("#bar"+dec[2]+"0value").val(words[18+16*j]);//threshold value field				
				jQuery("#bar"+dec[2]+"1").val(words[19+16*j]);//baseline1 bar
				jQuery("#bar"+dec[2]+"1value").val(words[19+16*j]);//baseline1 value field				
				jQuery("#bar"+dec[2]+"2").val(words[20+16*j]);//baseline2 bar
				jQuery("#bar"+dec[2]+"2value").val(words[20+16*j]);//baseline2 value field				
				jQuery("#bar"+dec[2]+"3").val(words[21+16*j]);//baseline3 bar
				jQuery("#bar"+dec[2]+"3value").val(words[21+16*j]);//baseline3 value field				
				jQuery("#bar"+dec[2]+"4").val(words[22+16*j]);//baseline4 bar
				jQuery("#bar"+dec[2]+"4value").val(words[22+16*j]);//baseline4 value field				
				jQuery("#bar"+dec[2]+"5").val(words[23+16*j]);//baseline5 bar
				jQuery("#bar"+dec[2]+"5value").val(words[23+16*j]);//baseline5 value field				
				jQuery("#bar"+dec[2]+"6").val(words[24+16*j]);//baseline6 bar
				jQuery("#bar"+dec[2]+"6value").val(words[24+16*j]);//baseline6 value field				
				jQuery("#bar"+dec[2]+"7").val(words[25+16*j]);//baseline7 bar
				jQuery("#bar"+dec[2]+"7value").val(words[25+16*j]);//baseline7 value field				
				jQuery("#bar"+dec[2]+"8").val(words[26+16*j]);//baseline8 bar
				jQuery("#bar"+dec[2]+"8value").val(words[26+16*j]);//baseline8 value field				
			}        
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
     //for (var j =0 ;  j < words.length; j++ )
  
   // var fs = require('fs');
   // var array = fs.readFileSync(r).toString().split("\n");
    //document.getElementById("tdcAddrForm").value = words[3];

  }
  
function tdcNumberUpdate(){
  var elem = document.getElementById("tdcAddrForm");
  var str = (elem.value).split(',');
  numberOfTdc = str.length;
 // alert("change to "+numberOfTdc);
}  
function tdcAddrUpdate(){
	  var elem = document.getElementById("tdcAddrForm");
	  tdcAddr = (elem.value).split(',');
	 // alert("change to "+tdcAddr[0]);
	}  

function selectAll(){//Dagmara: zaznaczenie wszystkich cable conn i asic po wybran iu checkbox'a select all

}

function saveSettings(){
//we add whole configuration into one string table which is later saved
var stringTable = ["CONFIGURATION FILE FOR PANDA FE\n","=============================================\n"];
stringTable.push("Explanation: In this file consecutive settings for ASIC are saved. \"settings for TCA\" means settings for\n");
stringTable.push("asic number A (A can be of value 1 or 2), connected to tdc via cable connection number C (1-4) where\n");
stringTable.push("tdc is described by number T (1-...). After the line \"settings for TCA\" the settings go as following:\n"); 
stringTable.push("Amplification, Peaking time, TC1C2..0, TC1R2..0, TC2C2..0, TC2R2..0, For threshold and baseline given\n");
stringTable.push("number means exact value, whereas for the rest of the settings given number determines the position in\n"); 
stringTable.push("drop down list in web GUI.\n"); 
stringTable.push("=============================================\n");
stringTable.push("trb tdc addresses:\n");

//adding information about TDC addresses values -take from text field
stringTable.push(document.getElementById("tdcAddrForm").value+"\n");
for (var xx = 1 ; xx<= numberOfTdc; xx++) {
	for(var yy=1 ; yy <= 4 ; yy++){
		for (var zz=1; zz<=2 ; zz++ ) {
			var currentId = ''+xx+yy+zz;
			stringTable.push("settings for "+currentId+"\n");
			stringTable.push(""+document.getElementById("AMPLI_asic"+currentId).selectedIndex+"\n");
			stringTable.push(""+document.getElementById("PEAK_Pasic"+currentId).selectedIndex+"\n");
			stringTable.push(""+document.getElementById("TC1C_Pasic"+currentId).selectedIndex+"\n");
			stringTable.push(""+document.getElementById("TC1R_Pasic"+currentId).selectedIndex+"\n");
			stringTable.push(""+document.getElementById("TC2C_Pasic"+currentId).selectedIndex+"\n");
			stringTable.push(""+document.getElementById("TC2R_Pasic"+currentId).selectedIndex+"\n");	
			//here go baselines and threshold			
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"0")[0].scrollLeft/253)+"\n");			
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"1")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"2")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"3")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"4")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"5")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"6")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"7")[0].scrollLeft/1024)+"\n");
			//stringTable.push(""+Math.round(document.getElementsByName("b"+currentId+"8")[0].scrollLeft/1024)+"\n");		
			stringTable.push(""+document.getElementsByName("b"+currentId+"0")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"1")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"2")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"3")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"4")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"5")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"6")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"7")[0].value+"\n");
			stringTable.push(""+document.getElementsByName("b"+currentId+"8")[0].value+"\n");

		}//iteration through asics
	}//iteration through cable connections	
}//iteration through tdc


//the following two lines save the file
var blob = new Blob(stringTable, {type: "text/plain;charset=utf-8"});
saveAs(blob, "PANDA_FEE_CONF.txt");	
}
