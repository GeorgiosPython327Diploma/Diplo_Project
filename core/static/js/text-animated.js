gsap.registerPlugin(TextPlugin);

gsap.from(".rotate-char", {
  duration: 1,
  rotateY: 360,
  transformOrigin: "50% 50%",
  stagger: {
    each: 0.1,
    from: "start"
  },
  onComplete: function () {
    gsap.to(".rotate-char", {
      duration: 1,
      rotateY: 0,
      transformOrigin: "50% 50%",
      ease: "power1.inOut",
      stagger: {
        each: -0.1,
        from: "end"
      },
    });
  }
});