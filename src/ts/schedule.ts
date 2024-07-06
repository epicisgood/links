async () => await fetch('../json/classes.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Handle your data here
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });


