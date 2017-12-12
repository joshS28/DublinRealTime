

  function Refresh(){
    $("table").children().remove();
    var stopnumber = document.getElementById("stopNum").value;
    busData(stopnumber);
  }

  function showBus() {
    var x = document.getElementById("chart");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

  function busData(stopid){
    var createURL = "https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=" + stopid + "&format=json";
    console.log(createURL);
    $.ajax({
      type: 'GET',
      url: createURL,
      dataType: "JSON", // data type expected from server
      success: function (data) {

        var busjson = data;
        console.log(busjson);
        var numberofbuses = busjson.numberofresults;
        var buses = busjson.results;

        var i =0;
        for(i;i<numberofbuses;i++){
          var bus = buses[i].route;
          var dueTime = buses[i].duetime;
          //console.log(bus)
        }
              // get the reference for the body
        var body = document.getElementById('chart');
       
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var row = document.createElement("tr");

        for (var q = 0; q < 2; q++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            if(q == 0){

              var cell = document.createElement("td");
              var cellText = document.createTextNode("Route");

            }

            else if(q == 1){
              var cell = document.createElement("td");
              var cellText = document.createTextNode("Due In");
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          tblBody.appendChild(row);
          tbl.appendChild(tblBody);
          body.appendChild(tbl);
        // creating all cells
        for (var i = 0; i < numberofbuses; i++) {
          // creates a table row
           var row = document.createElement("tr");
  
          for (var j = 0; j < 2; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            if(j == 0){

              var cell = document.createElement("td");
              var cellText = document.createTextNode(buses[i].route);

            }

            else if(j == 1){
              var cell = document.createElement("td");
              var cellText = document.createTextNode(buses[i].duetime + " mins");
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
        // sets the border attribute of tbl to 2;
        //tbl.setAttribute("border", "2");
        //tbl.setAttribute("style", "text-align: center");

        

      },
      error: function() {
          console.log('Error: ' + data);
          //document.getElementById('')
      }
    });
  }



