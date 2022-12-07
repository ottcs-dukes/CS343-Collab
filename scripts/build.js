let newsArticles, exportButton, main;

function buildCard(article) {
  let outer = document.createElement('div');
  outer.classList.add("card", "mt-5", "mx-auto", "mb-5");

  let title = document.createElement('h1');
  title.classList.add("card-header");

  if (article.new) {
    title.classList.add('bg-purple', 'text-white');
  }

  title.textContent = article.title;
  outer.append(title);

  let content = document.createElement('p');
  content.classList.add("card-body");
  content.innerText = article.content;
  content.innerText += '\n\n Views: ' + article.views;
  outer.append(content);

  let footer = document.createElement('div');
  footer.classList.add("card-footer");

  let btn = document.createElement('a');
  btn.classList.add("btn", "btn-purple", "text-white", "animate");
  btn.textContent = "Read the full article";
  btn.href = article.href;
  footer.append(btn);

  outer.append(footer);

  return outer
}

function exportData(data) {
  let a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  a.download = "articles.json";
  document.body.append(a);
  a.click();
}

(function () {
  main = document.getElementsByTagName('main')[0];
  fetch('articles.json').then(response => {
    response.text().then((text) => {
      newsArticles = JSON.parse(text)["content"];
      console.log(newsArticles);
      // get the target page element where the articles will be inserted

      // iterate over the news articles and create HTML elements for each article
      for (const article of newsArticles) {
        // add the article element to the target page
        main.appendChild(buildCard(article));
      }

      createButtons();
    })
  });
})();



