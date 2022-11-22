(function () {
    let build = (e, classes) => {
        let element = document.createElement(e);
        classes.split(" ").forEach((cssClass) => {
            element.classList.add(cssClass);
        })
        return element;
    }

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
})()