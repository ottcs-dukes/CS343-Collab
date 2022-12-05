let json;

const newsArticles = JSON.parse('articles.json').then(response => { response.text().then(text => {json = JSON.parse(text)})});

// get the target page element where the articles will be inserted
const targetPage = document.getElementsByTagName('main')[0];
console.log(targetPage);

// iterate over the news articles and create HTML elements for each article
for (const article of newsArticles) {
  const articleElement = document.createElement('div');
  const articleTitle = document.createElement('h1');
  const articleAuthor = document.createElement('p');
  const articleDate = document.createElement('p');
  const articleContent = document.createElement('p');

  // set the text content of the article's title, author, date, and content
  articleTitle.textContent = article.title;
  articleAuthor.textContent = article.author;
  articleDate.textContent = article.date;
  articleContent.textContent = article.content;

  // add the article's title, author, date, and content to the article element
  articleElement.appendChild(articleTitle);
  articleElement.appendChild(articleAuthor);
  articleElement.appendChild(articleDate);
  articleElement.appendChild(articleContent);

  // add the article element to the target page
  targetPage.appendChild(articleElement);
}