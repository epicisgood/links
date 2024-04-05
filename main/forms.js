document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var url = document.getElementById("urlInput").value;
    var information = document.getElementById("infoInput").value;

    // You can process the form data here, for example, send it to a server or display it
    console.log("URL:", url);
    console.log("Information:", information);

    // Create an iframe
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.id = "myIframe";

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Create a div element to display information
    var infoDiv = document.createElement("div");
    infoDiv.id = "infoDiv";
    infoDiv.innerText = information;

    // Append the div element to the body
    document.body.appendChild(infoDiv);

    // Optionally, you can reset the form after submission
    // document.getElementById("urlInput").value = "";
    // document.getElementById("infoInput").value = "";
});
