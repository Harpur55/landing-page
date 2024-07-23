



function stripHtmlTags(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://203.194.114.133:1234/api/article/0') // Replace with your API URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const contentContainer = document.getElementById('contentContainer');
        const originalCard = document.getElementById('cardTemplate');

        data.data.forEach(article => {
          // Clone the original card
          const clone = originalCard.cloneNode(true);
          clone.removeAttribute('id'); // Remove the id attribute from the cloned card

          // Populate the cloned card with data from the API
          clone.querySelector('.card-img-top').src = "http://203.194.114.133:1234/" + article.cover;
          clone.querySelector('.card-img-top').alt = article.category_article;
          clone.querySelector('.card-title a').textContent = article.title;
          clone.querySelector('.card-title a').href = article.slug;
          clone.querySelector('.card-text').textContent = stripHtmlTags(article.description) || "No description available";
          clone.querySelector('.text-muted').textContent = new Date(article.publish_date).toLocaleDateString();

          // Append the cloned card to the container
          contentContainer.appendChild(clone);
        });

        // Remove the original card template
        contentContainer.removeChild(originalCard);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
  console.log(baseUrl);