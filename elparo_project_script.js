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
//GENERATION INFOS PROJET
//**********************************************************************************
  const infos = ["dimension", "materials", "location", "mecenat", "photo_credit"];

  infos.forEach( info => {
    const content = document.querySelector("." + info + "_content");
    const title = document.querySelector("." + info + "_title");
  
    if(!content.innerHTML){
      content.style.display = "none";
      title.style.display = "none";
    }
  })

//**********************************************************************************
//GENERATION GRID
//**********************************************************************************
  const items = document.querySelectorAll(".grid_item");
  const containers = document.querySelectorAll(".item_container");

  for(let i = 0; i < items.length; i++) {
      console.log(items[i].width);
      if(items[i].height > items[i].width){
          containers[i].style.gridRow = "span 2";
          items[i].style.height = "100%";
          items[i].style.objectFit = "cover";
      }
  }

//**********************************************************************************
//BATCH
//**********************************************************************************
    gsap.set(".item_container", {y: 100});

    ScrollTrigger.batch(".item_container", {
        //interval: 0.1, // time window (in seconds) for batching to occur.
        onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 3]}, overwrite: true}),
        onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
        onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
        onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
    });
    
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".image", {y: 0}));
    }
});

//**********************************************************************************
//GENERATION CONTAINER VIDEO
//**********************************************************************************
  const video_content = document.querySelector(".video_content");
    const video_container = document.querySelector(".video_container");
    const video_close = document.querySelector(".video_close");
    const video_zoom = document.querySelector(".video_zoom");
    const video_buttons = document.querySelector(".video_buttons");
  const video_lightbox = document.querySelector(".video_lightbox");

    let src = video_content.getAttribute("src");
    console.log(src);

    if(src.trim === '' || !src || src === "undefinedenablejsapi=1&rel=0&controls=0&autoplay=1&mute=1&loop=1" || !video_content){
        video_lightbox.style.display = "none";
      console.log("no src");
    }
    else{
        video_container.style.display = "block";
      console.log("src found");
    }

    video_zoom.addEventListener("click", ()=>{
        if(video_container.style.width === "35vw"){
            video_container.style.width = "90vw";
            video_container.style.height = "90vh";
            video_buttons.style.width = "90vw";
        }
        else{
            video_container.style.width = "35vw";
            video_container.style.height = "auto";
            video_buttons.style.width = "35vw";
        }
    })

    video_close.addEventListener("click", ()=>{
        video_container.style.display = "none";
        video_buttons.style.display = "none";
        video_lightbox.style.display = "none";
    })
  
});
  

