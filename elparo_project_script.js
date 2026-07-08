document.addEventListener("DOMContentLoaded", (event) => {
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
//GENERATION CONTAINER VIDEO
//**********************************************************************************
  const video_content = document.querySelector(".video_content");
    const video_container = document.querySelector(".video_container");
    const video_close = document.querySelector(".video_close");
    const video_zoom = document.querySelector(".video_zoom");
    const video_buttons = document.querySelector(".video_buttons");
  const video_lightbox = document.querySelector(".video_lightbox");

console.log(video_content);
  console.log(document.querySelector(".video_container iframe"));
  
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

//**********************************************************************************
//GENERATION DATE FORMAT
//**********************************************************************************

  let dateDOM = document.getElementById("date");
  let dateValue = dateDOM.innerHTML;
  let date = new Date(dateValue);

  let intl = new Intl.DateTimeFormat('en-US', {month : "long", year: "numeric"}).format(date);

  dateDOM.innerHTML = intl;

  
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
  
});
  

