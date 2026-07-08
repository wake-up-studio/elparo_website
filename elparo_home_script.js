document.addEventListener("DOMContentLoaded", (event) => { 
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
//FOOTER
//**********************************************************************************
    gsap.set(".col_footer", {height: "0%"})
    gsap.set(".text_footer", {opacity: "0%"})

    let tl_footer = gsap.timeline({
        scrollTrigger: {
            trigger: ".cols_footer",
            pin: true,
            //markers: true,
            scrub: 1,
            start: "bottom bottom",
            end: "bottom -50%%",
        }
    });

    tl_footer
        .to(".col_footer_1", {height: "90%", ease: "power3.out"})
        .to(".col_footer_2", {height: "95%", ease: "power3.out"}, "-=75%")
        .to(".col_footer_3", {height: "100%", ease: "power3.out"}, "-=60%")
        .to(".text_footer", {opacity: "100%", stagger:{each: 0.15}, ease: "power3.out"})

//**********************************************************************************
//HOVER
//**********************************************************************************
  const projets = document.querySelectorAll(".projetFromProjets");

    for(let i=0; i<projets.length; i++) {
        let isComplete = false;

        projets[i].addEventListener('mouseenter', () => {
            let tl = gsap.timeline();

            let hoverAnim = tl.fromTo(
                `.hover_projets${i}`,
                {
                    translateY: "-100%"
                },
                {
                    translateY: 0,
                    duration: 1,
                    stagger: {
                        each: 0.1,
                        from: "start",
                        grid: [1, 3],
                    },
                    ease: "expo.out",
                },
                0
            );

            hoverAnim.eventCallback("onComplete", () => {
                isComplete = true;
            });

            projets[i].addEventListener('mouseleave', () => {
                if(isComplete === false) {
                    tl.reverse();
                }
                else{
                    let tl2 = gsap.timeline();
                    tl2.to(
                        `.hover_projets${i}`,
                        {
                            translateY: "100%",
                            duration: 1,
                            stagger: {
                                each: 0.1,
                                from: "start",
                                grid: [1, 3],
                            },
                            ease: "expo.inOut",
                        },
                        0
                    );
                    tl2.eventCallback("onComplete", () => {isComplete = false;});
                }
            })
        })
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
   gsap.set(".scroll_effect_text_item", {height: "220vh"})

    const tl_scroll = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll_effect_text",
            //markers: true,
            start: "-100% bottom",
            end: "0% 110%",
            scrub: 1,
            duration: 5000,
        }
    });

    tl_scroll.to(
        ".scroll_effect_text_item", {
            height: "105vh",
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
  
