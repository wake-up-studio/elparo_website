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


});
  
