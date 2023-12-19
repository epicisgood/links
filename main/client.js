// Inside a new file named 'client.js' that you'll link to your 'index.html'
window.onload = function() {
    var newTab = window.open('about:blank', '_blank');
    
    if (!newTab) {
      alert('Please accept pop-ups and refresh the page in the top right corner!');
    } else {
      window.location.href = 'https://spotsylvania.instructure.com/';
      fetch('index.html')
      .then(response => response.text())
      .then(data => {
        newTab.document.write(data);
      })
      .catch(error => console.error('Error fetching the HTML:', error));
    }
  };

