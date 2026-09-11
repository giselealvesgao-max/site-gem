const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const id = entry.target.getAttribute("id");

            document
                .querySelector('.menu a[href="#' + id + '"]')
                .classList.add("active");
        }

    });

}, {
    threshold: 0.6
});

sections.forEach(section => {
    observer.observe(section);
});