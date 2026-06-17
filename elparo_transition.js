 const main = document.querySelector('.main');
const links = [...document.querySelectorAll('a')];
const transition_left = document.querySelector('.transition_left');
const transition_center = document.querySelector('.transition_center');
const transition_right = document.querySelector('.transition_right');

links.forEach(link => {
    link.addEventListener('click', async e => {
        e.preventDefault();
        const url = link.href;
        console.log(url);
        startTransition(url);
        const pathname = new URL(url); //Création d'un url
        history.pushState(null, '', pathname); //Permet de changer l'adresse
    })
}) //Parcourt chaque lien pour que sur le click cela appelle startTransition

window.addEventListener('popstate', () => {
    const url = window.location.pathname;
    startTransition(url);
}) //Permet la transition même par le bouton précédent

const startTransition = async (url) => {
    const html = await fetch(url, { method: "POST", "credentials": "includes"});
    console.log(html);
    const htmlStr = await html.text(); //récupère le HTML sous string
    console.log(htmlStr);
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlStr, 'text/html').querySelector('.main');
    // Convertit et récupère le HTML code depuis la string puis garde le main
    console.log(parsedHtml);

    transition_left.classList.add('animate_in');
    setTimeout(() => transition_center.classList.add('animate_in'), 100) ;
    setTimeout(() => transition_right.classList.add('animate_in'), 200) ;

    transition_left.addEventListener("transitionend", () => {
            // console.log(parsedHtml);
            main.innerHTML = parsedHtml.innerHTML;

        setTimeout( () => transition_left.classList.remove('animate_in'), 400);

            setTimeout(() => {
                transition_left.style.transition = "0s"; //Mise à 0s pour un repositionnement invisible
                transition_left.classList.remove('animate_out'); //repositionnement
                setTimeout(() => {
                    transition_left.style.transition = "0.7s";
                }, 100) //reset de la transition
            }, 100); //reset de la transition après une seconde
    });

    setTimeout(() =>
        transition_center.addEventListener("transitionend", () => {
            main.innerHTML = parsedHtml.innerHTML;

            setTimeout( () => transition_center.classList.remove('animate_in'), 400);

            setTimeout(() => {
                transition_center.style.transition = "0s"; //Mise à 0s pour un repositionnement invisible
                transition_center.classList.remove('animate_out'); //repositionnement
                setTimeout(() => {
                    transition_center.style.transition = "0.7s";
                }, 100) //reset de la transition
            }, 100); //reset de la transition après une seconde
        }), 100);

    setTimeout(() =>
        transition_right.addEventListener("transitionend", () => {
            main.innerHTML = parsedHtml.innerHTML;

            setTimeout( () => transition_right.classList.remove('animate_in'), 400);

            setTimeout(() => {
                transition_right.style.transition = "0s"; //Mise à 0s pour un repositionnement invisible
                transition_right.classList.remove('animate_out'); //repositionnement
                setTimeout(() => {
                    transition_right.style.transition = "0.7s";
                }, 100) //reset de la transition
            }, 100); //reset de la transition après une seconde
        }), 200);
}
