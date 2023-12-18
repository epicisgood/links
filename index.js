window.onload = function() {
  var newTab = window.open('about:blank', '_blank');

  if (!newTab) {
    alert('Please accept pop-ups and refresh the page in the top right corner!');
  } else {
    fetch('index.html')
    .then(response => response.text())
    .then(data => {
      newTab.document.write(data);
      // Redirect the original page after writing to the new tab
        })
    .catch(error => console.error('Error fetching the HTML:', error));
    window.location.href = 'https://spotsylvania.instructure.com/';

  }
};