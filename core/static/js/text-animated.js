gsap.from("#welcomeText", {
  duration: 1,
  text: { value: "Welcome", newClass: "highlight" },
  ease: "power1.inOut",
  onComplete: function() {
    gsap.to(".rotate-char", {
      duration: 0.6,
      rotateY: -180,
      transformOrigin: "50% 50",
      ease: "power1.inOut",
      onComplete: function() {
        gsap.to(".rotate-char", {
          duration: 0.6,
          rotateY: 0,
          transformOrigin: "50% 50%",
          ease: "power1.inOut"
        });
      }
    });
  }
});