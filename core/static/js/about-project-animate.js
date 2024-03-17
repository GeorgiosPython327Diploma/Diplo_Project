document.addEventListener("DOMContentLoaded", function () {
  const projectImg = document.querySelector(".project-img");
  const pProject = document.querySelector(".p-project");

  gsap.set(projectImg, { scale: 0 });
  gsap.set(pProject, { y: '100%' });

  gsap.to(projectImg, { scale: 1, duration: 1, ease: "power1.out" });
  gsap.to(pProject, { y: 0, duration: 1, ease: "power1.out", delay: 0.5 });
});
