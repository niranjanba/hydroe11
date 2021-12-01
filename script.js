const sections = document.querySelectorAll("section");
let observerConfig = {
    root: null,
    rootMargin: "-268px 0px -300px 0px",
    threshold: 0,
};

function observerFn(entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            switch (entry.target.id) {
                case "intro":
                    document.querySelector(".home").classList.remove("hilight");
                    break;
                case "aboutUs":
                    document
                        .querySelector(".about")
                        .classList.remove("hilight");
                    break;
                case "services":
                    document
                        .querySelector(".service")
                        .classList.remove("hilight");
                    break;
                case "teams":
                    document
                        .querySelector(".teams")
                        .classList.remove("hilight");
                    break;
                case "contact":
                    document
                        .querySelector(".contact")
                        .classList.remove("hilight");
                    break;
                default:
                    break;
            }
            return;
        }
        switch (entry.target.id) {
            case "intro":
                document.querySelector(".home").classList.toggle("hilight");
                break;
            case "aboutUs":
                document.querySelector(".about").classList.toggle("hilight");
                break;
            case "services":
                document.querySelector(".service").classList.toggle("hilight");
                break;
            case "teams":
                document.querySelector(".teams").classList.toggle("hilight");
                break;
            case "contact":
                document.querySelector(".contact").classList.toggle("hilight");
                break;
            default:
                break;
        }
    });
}
let observer = new IntersectionObserver(observerFn, observerConfig);
sections.forEach((section) => {
    observer.observe(section);
});

window.addEventListener("scroll", (e) => {
    if (window.scrollY > 100) {
        document.querySelector(".nav_bar").classList.add("shrink-nav");
        document.querySelector("#navbar-brand").classList.remove("nav-font");
        document.querySelector("#navbar-brand").style.transition =
            "0.3s all ease-in-out";
    } else {
        document.querySelector("#navbar-brand").classList.add("nav-font");
        document.querySelector(".nav_bar").classList.remove("shrink-nav");
    }
});
