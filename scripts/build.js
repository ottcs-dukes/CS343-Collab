let newsArticles, exportButton, loadButton, main, modalTitle, articleId, articleTitle, articleContent, articleLink, editForm, submitButton, modal, articleNew, deleteId = null;

function buildCard(article) {
  let outer = document.createElement('div');
  outer.classList.add("card", "mt-5", "mx-auto", "mb-5");
  outer.id = article.id;

  let title = document.createElement('h1');
  title.classList.add("card-header");
  if (article.new) {
    title.classList.add('bg-purple');
  }
  title.id = article.id + "-title";

  title.textContent = article.title;
  outer.append(title);

  let content = document.createElement('p');
  content.classList.add("card-body");
  content.id = article.id + "-content";
  content.innerText = article.content;
  outer.append(content);

  let footer = document.createElement('div');
  footer.classList.add("card-footer");

  let btn = document.createElement('a');
  btn.classList.add("btn", "btn-purple", "animate");
  btn.id = article.id + "-link";
  btn.textContent = "Read the full article";
  btn.href = article.href;
  footer.append(btn);

  let id = document.createElement('id');
  id.classList.add("badge", "bg-secondary", "animate", "mx-2");
  id.textContent = "ArticleID: " + article.id;
  footer.append(id);

  outer.append(footer);

  return outer;
}

function render() {
  main.innerHTML = ''; // Easiest way to clear all of the articles
  newsArticles.map((article) => { let card = buildCard(article); if (article.new) {main.prepend(card)} else {main.append(card)} });
}

function addModal() {
  clearModalForm();
  modalTitle.textContent = "Adding Content";
  articleId.value = performance.now() * 617 % 99991; // Cheap hash
  loadButton.style.display = "none";
}

function editModal() {
  clearModalForm();
  modalTitle.textContent = "Editing Content";
  articleId.value = null;
  loadButton.style.display = "inline-block";
}

function fillModal(id) {
  articleTitle.value = document.getElementById(id + '-title').innerText;
  articleContent.value = document.getElementById(id + '-content').textContent;
  articleLink.value = document.getElementById(id + '-link').href;
  articleNew.checked = document.getElementById(id + '-title').classList.contains('bg-purple');
}

function submitModal(id) {
  let target = null;
  for (let article of newsArticles) {
    if (article.id == id)
      target = article;
  }
  if (target == null) {
    target = {id: id}
    newsArticles.push(target);
  }
  target.title = articleTitle.value;
  target.content = articleContent.value;
  target.href = articleLink.value;
  target.new = articleNew.checked;
}

function exportData() {
  let a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(newsArticles, null, 2)], { type: "application/json" }));
  a.download = "articles.json";
  document.body.append(a);
  a.click();
}

function clearModalForm() {
  articleTitle.value = '';
  articleContent.value = '';
  articleLink.value = '';
}

function deleteArticle() {
  let deleteModal = new bootstrap.Modal(document.querySelector('#deleteModal'));
  deleteModal.show();
}

function pushDelete() {
  for (let article of newsArticles) {
    if (article.id == deleteId.value)
      target = article;
  }
  newsArticles = newsArticles.filter(entry => {return entry != target});
  render();
}

(function () {
  main = document.getElementsByTagName('main')[0];
  modal = document.getElementById('editModal');
  modalTitle = document.getElementById("modalTitle");
  editForm = document.getElementById('editForm');

  articleId = document.getElementById("articleId");
  articleTitle = document.getElementById("articleTitle");
  articleContent = document.getElementById("articleContent");
  articleLink = document.getElementById("articleLink");
  articleNew = document.getElementById("articleNew");

  clearModalForm();

  loadButton = document.getElementById("loadButton");
  loadButton.onclick = () => {
    fillModal(articleId.value);
  }

  submitButton = document.getElementById('submitButton');
  submitButton.onclick = () => {
    submitModal(articleId.value);
    render();
  }

  deleteId = document.getElementById('deleteId');

  fetch('articles.json').then(response => {
    response.text().then((text) => {
      newsArticles = JSON.parse(text)["content"];
      render();
    })
  });
})();



