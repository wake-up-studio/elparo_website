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
//SLIDER DESKTOP
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
//SLIDER MOBILE
//**********************************************************************************
  // create an infinite loop
let loop = horizontalLoop(".slider_container_mobile a", {repeat: -1});
// create a tween that'll always decelerate the timeScale of the timeline back to 0 over the course of 0.5 seconds (or whatever)
let slow = gsap.to(loop, {timeScale: 0, duration: 0.5});
// make the loop stopped initially.
loop.timeScale(0);

// now use an Observer to listen to pointer/touch/wheel events and set the timeScale of the infinite looping timeline accordingly. 
Observer.create({
  target: ".slider_container_mobile",
  type: "pointer,touch,wheel",
  wheelSpeed: -1,
  onChange: self => {
    loop.timeScale(Math.abs(self.deltaX) > Math.abs(self.deltaY) ? -self.deltaX : -self.deltaY); // whichever direction is bigger
    slow.invalidate().restart(); // now decelerate
  }
});

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

//**********************************************************************************
//APPARITION TEXTE
//**********************************************************************************
   gsap.set(".scroll_effect_text_item", {height: "240vh"})

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
  
