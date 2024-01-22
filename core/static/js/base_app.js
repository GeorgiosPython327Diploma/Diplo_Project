$(document).ready(function () {
       $("body").addClass("loaded");
       $("ul").css("transform", "translateX(0)");

       const shape = document.querySelector('.shape');
       const timeline = gsap.timeline({ repeat: -1, yoyo: true });

       timeline.to(shape, {
           borderRadius: '30%',
           scale: 1,
           duration: 1,
           ease: 'ease-in-out',
           rotation: 360,
       });

       timeline.to(shape, {
           scale: 0.8,
           duration: 1,
           ease: 'ease-in-out',
           rotation: 360,
       });

       let bookmarkios = document.querySelectorAll('.bookmarkio');

       bookmarkios.forEach(function (bookmarkio) {
               bookmarkio.addEventListener('mouseenter', function () {
               bookmarkio.classList.add('hovered');
           });

               bookmarkio.addEventListener('mouseleave', function () {
               bookmarkio.classList.remove('hovered');
           });
       });
   });