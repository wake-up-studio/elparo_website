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
//GRID PROJET
//**********************************************************************************
  const items = document.querySelectorAll(".grid_item");
  const containers = document.querySelectorAll(".item_container");

  for(let i = 0; i < items.length; i++) {
    console.log(items[i].getAttribute("src"));
      if(items[i].height > items[i].width){
          containers[i].style.gridRow = "span 2";
      }
  }

  for(let i = 0; i < items.length; i++) {
      if(!items[i].getAttribute("src") || items[i].getAttribute("src").trim() ==="" || 
        items[i].getAttribute("src") === "data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSIxNDAiCiAgaGVpZ2h0PSIxNDAiCiAgdmlld0JveD0iMCAwIDYwMCA2MDAiCiAgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgPgogIDxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjREZFM0U2IiAvPgogIDxwYXRoCiAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgICBjbGlwLXJ1bGU9ImV2ZW5vZGQiCiAgICBkPSJNNDUwIDE3MEgxNTBDMTQxLjcxNiAxNzAgMTM1IDE3Ni43MTYgMTM1IDE4NVY0MTVDMTM1IDQyMy4yODQgMTQxLjcxNiA0MzAgMTUwIDQzMEg0NTBDNDU4LjI4NCA0MzAgNDY1IDQyMy4yODQgNDY1IDQxNVYxODVDNDY1IDE3Ni43MTYgNDU4LjI4NCAxNzAgNDUwIDE3MFpNMTUwIDE0NUMxMjcuOTA5IDE0NSAxMTAgMTYyLjkwOSAxMTAgMTg1VjQxNUMxMTAgNDM3LjA5MSAxMjcuOTA5IDQ1NSAxNTAgNDU1SDQ1MEM0NzIuMDkxIDQ1NSA0OTAgNDM3LjA5MSA0OTAgNDE1VjE4NUM0OTAgMTYyLjkwOSA0NzIuMDkxIDE0NSA0NTAgMTQ1SDE1MFoiCiAgICBmaWxsPSIjQzFDOENEIgogIC8+CiAgPHBhdGgKICAgIGQ9Ik0yMzcuMTM1IDIzNS4wMTJDMjM3LjEzNSAyNTUuNzIzIDIyMC4zNDUgMjcyLjUxMiAxOTkuNjM1IDI3Mi41MTJDMTc4LjkyNCAyNzIuNTEyIDE2Mi4xMzUgMjU1LjcyMyAxNjIuMTM1IDIzNS4wMTJDMTYyLjEzNSAyMTQuMzAxIDE3OC45MjQgMTk3LjUxMiAxOTkuNjM1IDE5Ny41MTJDMjIwLjM0NSAxOTcuNTEyIDIzNy4xMzUgMjE0LjMwMSAyMzcuMTM1IDIzNS4wMTJaIgogICAgZmlsbD0iI0MxQzhDRCIKICAvPgogIDxwYXRoCiAgICBkPSJNMTYwIDQwNVYzNjcuMjA1TDIyMS42MDkgMzA2LjM2NEwyNTYuNTUyIDMzOC42MjhMMzU4LjE2MSAyMzRMNDQwIDMxNi4wNDNWNDA1SDE2MFoiCiAgICBmaWxsPSIjQzFDOENEIgogIC8+Cjwvc3ZnPg=="
        ) {
          containers[i].style.display = "none";
          items[i].style.display = "none";
      }
  }
  
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

    if(src.trim === '' || !src){
        video_content.style.display = "none";
        video_container.style.display = "none";
        video_lightbox.style.display = "none";
    }
    else if(src){
        video_container.style.display = "block";
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
  

