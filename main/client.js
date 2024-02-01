
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
    
    const doc = popup.document
    const iframe = doc.createElement('iframe')
    const style = iframe.style
    const link = doc.createElement('link')

    const name = localStorage.getItem('name') || 'My Drive - Google Drive'
    const icon = localStorage.getItem('icon') || 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png'

    doc.title = name
    link.rel = 'icon'
    link.href = icon

    iframe.src = location.href
    style.position = 'fixed'
    style.top = style.bottom = style.left = style.right = 0
    style.border = style.outline = 'none'
    style.width = style.height = '100%'

  }
};

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    const anchor = button.querySelector("a");
    if (anchor) {
      event.preventDefault(); // This line prevents the default anchor action to navigate away on the same page.
      const link = anchor.href;
      window.open(link, '_blank');
    }
  });
});



