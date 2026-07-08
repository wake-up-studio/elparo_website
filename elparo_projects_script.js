document.addEventListener("DOMContentLoaded", (event) => {
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
  
