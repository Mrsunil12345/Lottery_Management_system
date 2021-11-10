//check function will send and receive ajax request 
function check() {
  var req = new XMLHttpRequest();
  var url = "/data";
  req.open("GET", url, true); // set this to POST if you would like
  // Getting the user detail from database using Ajax request
  req.onreadystatechange = function () {
    // In local files, status is 0 upon success in Mozilla Firefox
    if (req.readyState === XMLHttpRequest.DONE) {
      var status = req.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);
        // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...
        var messageToDisplay = parsedResponse["message"];
        console.log(parsedResponse);
// randomSelction function randomly select two value from given aaray
        const randomSelection = (n) => {
          let newArr = [];
          if (n >= parsedResponse.length) {
            return parsedResponse;
          }
          for (let i = 0; i < n; i++) {
            let newElem =
              parsedResponse[Math.floor(Math.random() * parsedResponse.length)];
            while (newArr.includes(newElem)) {
              newElem =
                parsedResponse[
                  Math.floor(Math.random() * parsedResponse.length)
                ];
            }
            newArr.push(newElem);
          }

          return newArr;
        };
       
        var len = parsedResponse.length;
        if (len > 1) {
          var data = randomSelection(2);//calling the randomSelection function

          var d1 = data[0]._id;//selecting the 1st object id 
          var d2 = data[1]._id;//selecting the 2st object id 
        
         var sdata = {  
            d1: d1,
            d2: d2,
          };
          if (len > 2) { 
            document.getElementById("n1").innerHTML = data[0].name;
            document.getElementById("n2").innerHTML = data[0].phone;
            document.getElementById("n3").innerHTML = data[1].name;
            document.getElementById("n4").innerHTML = data[1].phone;
            sendData();
          }
          if (len == 2) {
            document.getElementById("n1").innerHTML = data[0].name;
            document.getElementById("n2").innerHTML = data[0].phone;
            document.getElementById("n3").innerHTML = data[1].name;
            document.getElementById("n4").innerHTML = data[1].phone;
            sendData();
            
          }
        } else {
          if (len == 1) {
            var data = randomSelection(1);
            var d1 = data[0]._id;

            var sdata1 = {
              d1: d1,
            };
            document.getElementById("n1").innerHTML = data[0].name;
            document.getElementById("n2").innerHTML = data[0].phone;
            document.getElementById("n3").innerHTML = "No data to display"
            document.getElementById("n4").innerHTML = "No data to display"
            sendData1();

          }
          if (len == 0) {
            document.getElementById("n1").innerHTML = "No data to display"
            document.getElementById("n2").innerHTML = "No data to display"
            document.getElementById("n3").innerHTML = "No data to display"
            document.getElementById("n4").innerHTML = "No data to display"
            document.getElementById("btn").remove();
          }
        }
        // Sending ajax request for updating status field when length is more than one
        function sendData() {
          var xhr = new XMLHttpRequest();
          var url = "/update";
          xhr.open("POST", url, true);

          //xhr.setRequestHeader('Content-Type: application/json')
          xhr.send(JSON.stringify(sdata));
        }
        // Sending ajax request for updating status field when length is equal to one
        function sendData1() {
          var xhr = new XMLHttpRequest();
          var url = "/update1";
          xhr.open("POST", url, true);

          //xhr.setRequestHeader('Content-Type: application/json')
          xhr.send(JSON.stringify(sdata1));
        }
      }
    }
  };
  req.send();
}
