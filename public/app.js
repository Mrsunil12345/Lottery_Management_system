function check() {
    var req = new XMLHttpRequest();
    var url = '/data';

    req.open('GET', url, true); // set this to POST if you would like
    req.addEventListener('load', onLoad);
    req.addEventListener('error', onError);

    req.send();

    function onLoad() {
        var response = this.responseText;
        var parsedResponse = JSON.parse(response);

        // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...
        var messageToDisplay = parsedResponse['message'];

        const randomSelection = (n) => {
            let newArr = [];
            if (n >= parsedResponse.length) {
                return parsedResponse;
            }
            for (let i = 0; i < n; i++) {
                let newElem = parsedResponse[Math.floor(Math.random() * parsedResponse.length)];
                while (newArr.includes(newElem)) {
                    newElem = parsedResponse[Math.floor(Math.random() * parsedResponse.length)];
                }
                newArr.push(newElem);
            }
            return newArr;
        }

        var data = randomSelection(2)
        console.log(data);
        console.log(data[0]._id);
        var d1 = data[0]._id
        var d2 = data[1]._id
        var sdata = {
            'd1': d1,
            'd2': d2
        }


        function sendData() {
            console.log('inside the senddata function');
            var xhr = new XMLHttpRequest;
            var url = '/update';
            // xhr.onreadystatechange = () => {
            //     if (this.readyState == 4 && this.status == 200) {
            //         // console.log("hello post");
            //         console.log("inside the onredy state change");
            //     }

            console.log("after onready");
            xhr.open('POST', url, true);
            //xhr.setRequestHeader('Content-Type: application/json')
            xhr.send(JSON.stringify(sdata))
        }
        sendData()


        // append child (with text value of messageToDisplay for instance) here or do some more stuff
        document.getElementById('n1').innerHTML = data[0].name
        document.getElementById('n2').innerHTML = data[0].phone
        document.getElementById('n3').innerHTML = data[1].name
        document.getElementById('n4').innerHTML = data[1].phone
            // document.getElementById('n1').innerHTML=data[0].name
    }

    function onError() {
        // handle error here, print message perhaps
        console.log('error receiving async AJAX call');
    }
}