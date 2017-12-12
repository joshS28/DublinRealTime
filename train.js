var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
     
        var xmlDoc = this.responseXML;
    //console.log(xmlDoc);

    var ArrayOfObjStation = xmlDoc.documentElement;
    //console.log(ArrayOfObjStation);
    var sib = ArrayOfObjStation.firstChild;
    //console.log(sib);
    var station = sib.nextSibling;
    //console.log(station);
    var nextSt = station.nextElementSibling;
    //console.log(nextSt);
    var nextSt1 = nextSt.nextElementSibling;
    //console.log(nextSt1);

    var myNodes=xmlDoc.documentElement.getElementsByTagName("StationCode");
    var stName2 = xmlDoc.documentElement.getElementsByTagName("StationDesc");
    //console.log(myNodes); TESTING

    var stationCodes = [];

    for(var x = 0; x < myNodes.length; x++){

      var nameSt = myNodes[x].firstChild.nodeValue;
      //console.log(nameSt);
      var actualName = stName2[x].firstChild.nodeValue;
      //console.log(actualName);
      stationCodes.push({
        name: actualName,
        code: nameSt,
      });

    }

    //console.log(stationCodes[15]); // FOR TESTING PURPOSES
    var selectID = document.getElementById('stationsList');
    //var opt = document.createElement();

    for(var r = 0; r < stationCodes.length; r++){

      var opt = document.createElement('option');
      //console.log("Created element");
      opt.innerHTML = stationCodes[r].name;
      opt.value = stationCodes[r].code;
      selectID.appendChild(opt);

    }

     }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML", true);
  xhttp.send();


function showTrains() {
    var x = document.getElementById("TrainTable");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


var stationChosen = "";
//console.log(stationChosen);
function changeSelect(){

  var stChoice = document.getElementById("stationsList");

    stationChosen = stChoice.options[stChoice.selectedIndex].value;
    //console.log(stationChosen);
    //var stationChosen = stChoice.options[stChoice.selectedIndex].text;
    //console.log(stationChosen);
    getST();
}


function getST(){
  $("table").children().remove();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
     }
  };
  xhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML", true);
  xhttp.send();
}

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    //console.log(xmlDoc);

    var ArrayOfObjStation = xmlDoc.documentElement;
    //console.log(ArrayOfObjStation);
    var sib = ArrayOfObjStation.firstChild;
    //console.log(sib);
    var station = sib.nextSibling;
    //console.log(station);
    var nextSt = station.nextElementSibling;
    //console.log(nextSt);
    var nextSt1 = nextSt.nextElementSibling;
    //console.log(nextSt1);

    var myNodes=xmlDoc.documentElement.getElementsByTagName("StationCode");
    var stName2 = xmlDoc.documentElement.getElementsByTagName("StationDesc");
    //console.log(myNodes); TESTING

    var stationCodes = [];

    for(var x = 0; x < myNodes.length; x++){

      var nameSt = myNodes[x].firstChild.nodeValue;
      //console.log(nameSt);
      var actualName = stName2[x].firstChild.nodeValue;
      //console.log(actualName);
      stationCodes.push({
        name: actualName,
        code: nameSt,
      });
      //console.log(stationCodes[x].name + " " + stationCodes[x].code);
      //console.log(nameSt);   FOR TESTING PURPOSES

    }

    //console.log(stationCodes[15]); // FOR TESTING PURPOSES
    var selectID = document.getElementById('stationsList');
    //var opt = document.createElement();

    for(var r = 0; r < stationCodes.length; r++){

      var opt = document.createElement('option');
      //console.log("Created element");
      opt.innerHTML = stationCodes[r].name;
      opt.value = stationCodes[r].code;
      selectID.appendChild(opt);

    }


    getStationInfo(stationChosen);

    
}
function getStationInfo(statCode){

  var stCode = statCode;
  var createURLTrain = "https://cors-anywhere.herokuapp.com/https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=" + stCode;
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        stationFind(this);

      }
  };


  xhttp.open("GET", createURLTrain, true);
  xhttp.send();

}

  function stationFind(xml){

    var xmlSt = xml.responseXML;
    //console.log(xmlSt);

    var ArrayOfObjStation = xmlSt.documentElement;
    //console.log(ArrayOfObjStation);
    var sib = ArrayOfObjStation.firstChild;
      //console.log(sib);
      var train = sib.nextSibling;
      //console.log(train);
      var nextTrain = train.nextElementSibling;
      //console.log(nextTrain);

      var myDestinations=xmlSt.documentElement.getElementsByTagName("Destination");
      var myDueins=xmlSt.documentElement.getElementsByTagName("Duein");
      var currLocation=xmlSt.documentElement.getElementsByTagName("Lastlocation");
      var origins=xmlSt.documentElement.getElementsByTagName("Origin");
      var direction=xmlSt.documentElement.getElementsByTagName("Direction");

      var TRNS = [];

      for(var i = 0; i < myDestinations.length; i++){

        var destTrain = myDestinations[i].firstChild.nodeValue;
        var originTrain = origins[i].firstChild.nodeValue;
        var dueTrain = myDueins[i].firstChild.nodeValue;
        var dirTrain = direction[i].firstChild.nodeValue;
        //console.log(dirTrain);
        //xmlSt.documentElement.getElementsByTagName("Lastlocation")[0]..childNodes.length == 0
        if(xmlSt.documentElement.getElementsByTagName("Lastlocation")[i].childNodes.length == 0){
          //alert("No Location for " + dueTrain);
          var location = "Yet to depart";
        }
        else{
          var location = currLocation[i].firstChild.nodeValue;
        }

        TRNS.push({

          dest: destTrain,
          orig: originTrain,
          due: dueTrain,
          loc: location,
          dir: dirTrain,

        });

        //console.log(TRNS[i].due + " " + TRNS[i].orig + " -> " + TRNS[i].dest + " " + TRNS[i].loc + " " + TRNS[i].dir);

        

    



      }

      //console.log(" SEPARATE ");

      TRNS.sort(function(a, b) {
          return parseFloat(a.due) - parseFloat(b.due);
      });

      for(var w = 0; w < myDestinations.length; w++){

      //console.log(TRNS[w].due + " " + TRNS[w].orig + " -> " + TRNS[w].dest + " " + TRNS[w].loc + " " + TRNS[w].dir);

    }

    var body = document.getElementById('TrainTable');
    var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var row = document.createElement("tr");


        for (var q = 0; q < 5; q++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            if(q == 0){
              var cell = document.createElement("td");
              var cellText = document.createTextNode("Direction");
            }
            else if(q == 1){

              var cell = document.createElement("td");
              var cellText = document.createTextNode("Destination");

            }

            else if(q == 2){
              var cell = document.createElement("td");
              var cellText = document.createTextNode("Origin");
            }

            else if(q == 3){
              var cell = document.createElement("td");
              var cellText = document.createTextNode("Due In");
            }


            else if(q == 4){
              var cell = document.createElement("td");
              var cellText = document.createTextNode("Last Location");
            }

            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          tblBody.appendChild(row);
          tbl.appendChild(tblBody);
          body.appendChild(tbl);
        // creating all cells
        for (var i = 0; i < myDestinations.length; i++) {
          // creates a table row
           var row = document.createElement("tr");
  
          for (var j = 0; j < 5; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            if(j == 0){
              var cell = document.createElement("td");
              var dirTrain1 = TRNS[i].dir;
              var cellText = document.createTextNode(dirTrain1);
            }
            else if(j == 1){

                var cell = document.createElement("td");
                var destTrain = TRNS[i].dest;
                var cellText = document.createTextNode(destTrain);

            }

            else if(j == 2){
                var cell = document.createElement("td");
                var originTrain = TRNS[i].orig;
                var cellText = document.createTextNode(originTrain);
            }

            else if(j == 3){
              var cell = document.createElement("td");
              var dueTrain = TRNS[i].due;
                var cellText = document.createTextNode(dueTrain + " mins");
            }
            else if(j == 4){
              var cell = document.createElement("td");
              var locate = TRNS[i].loc;
                var cellText = document.createTextNode(locate);
            }
            
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
       
          // add the row to the end of the table body
          tblBody.appendChild(row);
        }
       
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tbl);

        $('body').css('width', '500px');


  }
