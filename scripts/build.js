let newsArticles, exportButton, loadButton, main, modalTitle, articleId, articleTitle;

function buildCard(article) {
  let outer = document.createElement('div');
  outer.classList.add("card", "mt-5", "mx-auto", "mb-5");
  outer.id = article.id;

  let title = document.createElement('h1');
  title.classList.add("card-header");

  if (article.new) {
    title.classList.add('bg-purple');
  }

  title.textContent = article.title;
  outer.append(title);

  let content = document.createElement('p');
  content.classList.add("card-body");
  content.innerText = article.content;
  outer.append(content);

  let footer = document.createElement('div');
  footer.classList.add("card-footer");

  let btn = document.createElement('a');
  btn.classList.add("btn", "btn-purple", "animate");
  btn.textContent = "Read the full article";
  btn.href = article.href;
  footer.append(btn);

  let id = document.createElement('id');
  id.classList.add("badge", "bg-secondary", "animate", "mx-2");
  id.textContent = "ArticleID: " + article.id;
  footer.append(id);

  // <button class="btn btn-gold animate m-1" data-bs-toggle="modal" data-bs-target="#editModal" onclick="addModal()">Add article</button>

  outer.append(footer);

  return outer;
}

function render() {
  newsArticles.map((article) => { main.appendChild(buildCard(article)) });
}

function addModal() {
  modalTitle.textContent = "Adding Content";
  articleId.value = performance.now() * 617 % 99991; // Cheap hash
  loadButton.style.display = "none";
}

function editModal() {
  modalTitle.textContent = "Editing Content";
  articleId.value = null;
  loadButton.style.display = "inline-block";
}

function fillModal() {

}

function exportData() {
  let a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(newsArticles, null, 2)], { type: "application/json" }));
  a.download = "articles.json";
  document.body.append(a);
  a.click();
}

(function () {
  main = document.getElementsByTagName('main')[0];
  modalTitle = document.getElementById("modalTitle");
  articleId = document.getElementById("articleId");
  loadButton = document.getElementById("loadButton");
  loadButton.onclick = () => {
    fillModal(articleId);
  }
  fetch('articles.json').then(response => {
    response.text().then((text) => {
      newsArticles = JSON.parse(text)["content"];
      render();
    })
  });
})();



