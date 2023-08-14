var timeout;
var crsr = document.querySelector('#minicircle');

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleFollower(xscale, yscale) {
    window.addEventListener(`mousemove`,function(dets){
        document.querySelector(`#minicircle`).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}   

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,

    })
    tl.to(".boundingelem",{
        y: '0',
        delay: -1,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .2,
    })
    tl.from("#page1footer",{
        y: '-10',
        opacity : 0,
        duration: 1.5,
        delay: -1,
        ease : Expo.easeInOut,
    });
}

function circleChaptaKaro(){
    //default values
    var xscale = 1;
    var yscale = 1;

    var xperv = 0;
    var yperv = 0;
    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xperv);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yperv);

        xperv = dets.clientX;
        yperv = dets.clientY;

        circleFollower(xscale, yscale);
        
        setTimeout(function(){
            document.querySelector(`#minicircle`).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${1},${1})`;  
        },100);
    });
}

circleChaptaKaro();
firstPageAnim();
circleFollower();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseenter",function(){
      crsr.style.width = "52px"
      crsr.style.height = "52px"
      crsr.style.opacity = ".8"
    });
    elem.addEventListener("mouseleave",function(){
      crsr.style.width = "12px"
      crsr.style.height = "12px"
      crsr.style.opacity = "1"
    });
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
});

var buton = document.querySelector("#textbox button");
buton.addEventListener("mouseenter", function(){
  crsr.style.width = '20px'
  crsr.style.height = '20px'
});
buton.addEventListener("mouseleave", function(){
  crsr.style.width = '12px'
  crsr.style.height = '12px'
});

document.querySelectorAll('.right').forEach(function(elem){
  elem.addEventListener('mouseleave',function(){
    crsr.style.width = '12px'
  crsr.style.height = '12px'
  });
  elem.addEventListener('mouseenter',function(){
    crsr.style.width = '22px'
  crsr.style.height = '22px'
  });
});

var sus = document.querySelector("#sus h5");
sus.addEventListener("mouseenter",function(){
  crsr.style.width = '22px'
  crsr.style.height = '22px'
});
sus.addEventListener("mouseleave",function(){
  crsr.style.width = '12px'
  crsr.style.height = '12px'
});

var cynth = document.querySelector("#cynth",function(){

  cynth.addEventListener("mouseenter",function(){
    crsr.style.width = '22px';
    crsr.style.height = '22px';
  });

  cynth.addEventListener("mouseleave",function(){
    crsr.style.width = '12px';
    crsr.style.height = '12px';
  });
});

function updateClock() {
  const now = new Date();
    
  const hours = now.getHours();
  const minutes = now.getMinutes();
    
  // Convert to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
    
  const timeString = `${displayHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm} EST`;
    
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();