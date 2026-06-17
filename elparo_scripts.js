document.addEventListener("DOMContentLoaded", (event) => {

//**********************************************************************************
//TRANSITION
//**********************************************************************************
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
  
//**********************************************************************************
//SLIDER
//**********************************************************************************
  
  const project_container = document.querySelectorAll('.project_container');
  const title = document.querySelectorAll('.project_title');
  const project_location = document.querySelectorAll('.project_location');
  
  for( let i = 0; i < project_container.length; i++ ) {
      project_container[i].addEventListener('mouseover', () => {
  
          project_container[i].style.width = "35vw";
          title[i].style.opacity = "100%";
          project_location[i].style.opacity = "100%";
  
              project_container[i].addEventListener('mouseout', () => {
                  project_container[i].style.width = "7vw";
                  title[i].style.opacity = "0";
                  project_location[i].style.opacity = "0";
              });
      });
  }

//**********************************************************************************
//TAGCLOUD
//**********************************************************************************

  const words = document.querySelector(".tagCloud_words");

  let tags = [
      "Wood", "Upcycling",  "Metal", "Origami",
      "Rorschach",  "Land Art", "Model",  "Featuring", "Ceramic",
      "Wood 2",  "Upcycling 2", "Metal 2",  "Origami 2",
      "Rorschach 2", "Land Art 2",  "Model 2", "Featuring 2", "Ceramic 2",
      "Wood 3",  "Upcycling 3", "Metal 3", "Origami 3",
      "Rorschach 3",  "Land Art 3", "Model 3",  "Featuring 3"
  ];
  
  function createLi(i, j, g){
      let div = document.createElement("div");
      let newLi = document.createElement("p");
      let a = document.createElement("a");
  
      div.className = "word_container";
      div.style.gridRow = `${i+1} / ${i+1}`;
      div.style.gridColumn = `${g} / ${g}`;
  
      newLi.className = `word word_${i}`;
      a.textContent = tags[j];
  
      a.setAttribute("href", `projets/${tags[j]}`);
  
      words.appendChild(div);
      div.appendChild(newLi);
      newLi.appendChild(a);
  }
  
  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  } //Nombre aléatoire entre deux valeurs incluses
  
  function addWordsRandomly(){
  
      for(let i = 0; i < 13; i++){
          let j = getRandomInt(0, tags.length - 1);
          let g = getRandomInt(0,20);
  
          createLi(i, j, g);
          tags.splice(j, 1);
          if(j<tags.length - 4){
              j+= getRandomInt(0, 3);
          }
          else{
              j++;
          }
  
          if(g<5){
              g += getRandomInt(5, 10);
          }
          else if(g>13){
              g -= getRandomInt(3, 10);
          }
          else if(g<=8){
              g += getRandomInt(3, 7);
          }
          else if(g>=9){
              g -= getRandomInt(3, 8);
          }
          createLi(i, j, g);
          tags.splice(j, 1);
  
      }
  
  } //Permet de randomiser la génération des mots
  
  addWordsRandomly();
    
});
