document.addEventListener("DOMContentLoaded", (event) => {
console.log("Hey cruel world 3");
//**********************************************************************************
//TRANSITION
//**********************************************************************************
  document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if(!href || href.startsWith("#") || href === window.location.pathname) {
                return;
            }

            e.preventDefault();

            animateTransition().then (() => {
                window.location.href = href;
            });
        });
    });

    gsap.set(".transition", {
        visibility: "visible",
        translateY: 0,
    })  //set pour anim intro

    revealTransition().then (() => {
        gsap.set(".transition", { visibility: "hidden" });
    }) //réalise anim intro

    function revealTransition() {
        return new Promise(resolve => {
            const tl = gsap.timeline({
                onComplete: resolve,
            });
            tl.fromTo(
                ".transition",
                {translateY: 0},
                {
                    translateY: "-100vh",
                    duration: 1.5,
                    delay: 0.2,
                    stagger: {
                        each: 0.1,
                        from: "start",
                        grid: [1,3],
                    },
                    ease: "expo.inOut",
                },
                0
            );
        });
    }

    function animateTransition() {
        return new Promise(resolve => {
            gsap.set(".transition", {
                visibility: "visible",
                translateY: "-100vh",
            });

            const tl = gsap.timeline({
                onComplete: resolve,
            });

            tl.fromTo(
                ".transition",
                {translateY: "-100vh"},
                {
                    translateY: 0,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: "start",
                        grid: [1,3],
                    },
                    ease: "expo.out",
                },
                0
            );
        });
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
//APPARITION TEXTE
//**********************************************************************************
   const tl_scroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll_effect_text",
            markers: true,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            duration: 5000,
        }
    });

    tl_scroll.to(
        ".scroll_effect_text_item", {
            translateX: "100vw",
            stagger: {
                each: 0.1,
                from: "start",
                grid: [1,3],
            },
            ease: "power3.in",
        }
    )
  
  
//**********************************************************************************
//TAGCLOUD
//**********************************************************************************

  // const words = document.querySelector(".tagCloud_words");

  // let tags = [
  //     "Wood", "Upcycling",  "Metal", "Origami",
  //     "Rorschach",  "Land Art", "Model",  "Featuring", "Ceramic",
  //     "Wood 2",  "Upcycling 2", "Metal 2",  "Origami 2",
  //     "Rorschach 2", "Land Art 2",  "Model 2", "Featuring 2", "Ceramic 2",
  //     "Wood 3",  "Upcycling 3", "Metal 3", "Origami 3",
  //     "Rorschach 3",  "Land Art 3", "Model 3",  "Featuring 3"
  // ];
  
  // function createLi(i, j, g){
  //     let div = document.createElement("div");
  //     let newLi = document.createElement("p");
  //     let a = document.createElement("a");
  
  //     div.className = "word_container";
  //     div.style.gridRow = `${i+1} / ${i+1}`;
  //     div.style.gridColumn = `${g} / ${g}`;
  
  //     newLi.className = `word word_${i}`;
  //     a.textContent = tags[j];
  
  //     a.setAttribute("href", `projets/${tags[j].toLowerCase().replaceAll(' ', '')}`);
  
  //     words.appendChild(div);
  //     div.appendChild(newLi);
  //     newLi.appendChild(a);
  // }
  
  // function getRandomInt(min, max) {
  //     min = Math.ceil(min);
  //     max = Math.floor(max);
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  // } //Nombre aléatoire entre deux valeurs incluses
  
  // function addWordsRandomly(){
  
  //     for(let i = 0; i < 13; i++){
  //         let j = getRandomInt(0, tags.length - 1);
  //         let g = getRandomInt(0,20);
  
  //         createLi(i, j, g);
  //         tags.splice(j, 1);
  //         if(j<tags.length - 4){
  //             j+= getRandomInt(0, 3);
  //         }
  //         else{
  //             j++;
  //         }
  
  //         if(g<5){
  //             g += getRandomInt(5, 10);
  //         }
  //         else if(g>13){
  //             g -= getRandomInt(3, 10);
  //         }
  //         else if(g<=8){
  //             g += getRandomInt(3, 7);
  //         }
  //         else if(g>=9){
  //             g -= getRandomInt(3, 8);
  //         }
  //         createLi(i, j, g);
  //         tags.splice(j, 1);
  
  //     }
  
  // } //Permet de randomiser la génération des mots
  
  // addWordsRandomly();

});
  
