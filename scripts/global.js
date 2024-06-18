let data;

fetch('../data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    const footerLink = document.querySelector('#footer-link');
    const link = data["youtubeLink"];
    footerLink.setAttribute('href', link);
  });