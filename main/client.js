
window.onload = function() {
  var newTab = window.open('about:blank', '_blank');

  if (!newTab) {
    alert('Please accept pop-ups and refresh the page in the top right corner!');
  } else {
    window.location.href = "https://spotsylvania.instructure.com/"
    fetch('index.html')
    .then(response => response.text())
    .then(data => {
      newTab.document.write(data);
    })
    .catch(error => console.error('Error fetching the HTML:', error));
  }
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const anchor = button.querySelector("a");
    if (anchor) {
      const link = anchor.href;
      window.open(link, '_blank')
    }
  });
});




