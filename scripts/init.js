(function () {
    let build = (e, classes) => {
        let element = document.createElement(e);
        classes.split(" ").forEach((cssClass) => {
            element.classList.add(cssClass);
        })
        return element;
    }

    let meta = document.createElement('meta');
    meta.name="viewport";
    meta.content="width=device-width, initial-scale=1";
    meta.charset="UTF-8";
    document.head.append(meta);

    let bStyle = document.createElement('link');
    bStyle.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";
    bStyle.rel = "stylesheet";
    document.head.append(bStyle);

    let myStyle = document.createElement('link');
    myStyle.href = "css/main.css";
    myStyle.rel = "stylesheet";
    document.head.append(myStyle);

    let header = build('header', "container-fluid p-2 bg-purple");
    let img = build('img', "mx-auto my-2 d-block");
    img.src = "images/logo.png";
    img.alt = "James Madison University"
    header.append(img);
    document.body.prepend(header);

    let footer = build('footer', "nav justify-content-center fixed-bottom");
    let ul = build('ul', 'nav');
    [
        {href:"https://ottcs.netlify.app/", content: "&copy; Cooper Ott 2022"},
        {href:"#top", content: "Back to Top"},
        {href:"signup.html", content: "Sign Up"},
    ].forEach((fLink) => {
        let li = build('li', 'nav-item');
        let a = build('a', 'nav-link');
        a.href = fLink.href;
        a.innerHTML = fLink.content;
        li.append(a);
        ul.append(li);
    });
    footer.append(ul);
    document.body.append(footer);

    let bScript = document.createElement('script');
    bScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js";
    document.body.append(bScript);
})()