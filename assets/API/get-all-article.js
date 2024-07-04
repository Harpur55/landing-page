document.addEventListener('DOMContentLoaded', () => {
    fetch('http://203.194.114.133:1234/api/article/0') // Replace with your API URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const contentContainer = document.getElementById('content-container');
            const originalCard = document.querySelector('.col-lg-4');

            data.data.forEach(article => {
                // Clone the original card
                const clone = originalCard.cloneNode(true);

                // Populate the cloned card with data from the API
                clone.querySelector('.card-img-top img').src = article.cover;
                clone.querySelector('.card-img-top img').alt = article.category_article;
                clone.querySelector('.card-title a').textContent = article.title;
                clone.querySelector('.card-title a').href = article.slug;
                clone.querySelector('.card-body .entry-meta a').textContent = article.category_article;
                clone.querySelector('.card-body .entry-summary').textContent = article.description || "No description available";
                clone.querySelector('.card-footer .entry-meta .fs-7').textContent = new Date(article.publish_date).toLocaleDateString();

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
