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
//HOVER
//**********************************************************************************
  const projets = document.querySelectorAll(".projetFromProjets");
  console.log(projets);

    for(let i=0; i<projets.length; i++) {
        projets[i].addEventListener('mouseenter', () => {
            const tl = gsap.timeline();

            tl.fromTo(
                `.hover_projets${i}`,
                {translateY: "-100%"},
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
        });
        projets[i].addEventListener('mouseleave', () => {
            const tl = gsap.timeline();

            tl.fromTo(
                `.hover_projets${i}`,
                {translateY: "0"},
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
        })
    }
});
  
