let newsArticles;

function buildCard(article) {
  let outer = document.createElement('div');
  outer.classList.add("card", "mt-5", "mx-auto", "mb-5");

  let title = document.createElement('h1');
  title.classList.add("card-header");
  title.textContent = article.title;
  outer.append(title);

  let content = document.createElement('p');
  content.classList.add("card-body");
  content.textContent = article.content;
  outer.append(content);

  let footer = document.createElement('div');
  footer.classList.add("card-footer");

  let btn = document.createElement('a');
  btn.classList.add("btn", "btn-purple", "text-white", "animate");
  btn.textContent = "Read the full article";
  footer.append(btn);

  outer.append(footer);

  return outer
}

fetch('articles.json').then(response => {
  response.text().then((text) => {
    newsArticles = JSON.parse(text)["content"];
    console.log(newsArticles);
    // get the target page element where the articles will be inserted
    const targetPage = document.getElementsByTagName('main')[0];

    // iterate over the news articles and create HTML elements for each article
    for (const article of newsArticles) {
      // add the article element to the target page
      targetPage.appendChild(buildCard(article));
    }
  })
});

