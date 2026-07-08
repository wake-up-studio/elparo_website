document.addEventListener("DOMContentLoaded", (event) => {
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
            //markers: true,
            start: "-15% bottom",
            end: "60% 75%",
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
//BATCH
//**********************************************************************************
    gsap.set(".projetFromProjets", {y: 100});

    ScrollTrigger.batch(".projetFromProjets", {
        //interval: 0.1, // time window (in seconds) for batching to occur.
        onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
        onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
        onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
        onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
    })
    
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".image", {y: 0}));

});
  
