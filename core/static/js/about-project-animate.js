document.addEventListener("DOMContentLoaded", function () {
  // Находим элементы с классами "project-img" и "p-project" и сохраняем их в переменные
  const projectImg = document.querySelector(".project-img");
  const pProject = document.querySelector(".p-project");

  // Устанавливаем начальное значение масштаба изображения на 0 с помощью GSAP
  gsap.set(projectImg, { scale: 0 });
  // Устанавливаем начальное значение позиции текста на 100% относительно его изначального положения
  gsap.set(pProject, { y: '100%' });

  // Анимация масштабирования изображения до единицы за 1 секунду с эффектом "power1.out"
  gsap.to(projectImg, { scale: 1, duration: 1, ease: "power1.out" });
  // Анимация перемещения текста на его изначальное положение за 1 секунду с эффектом "power1.out",
  // с задержкой в 0.6 секунды после начала анимации масштабирования изображения
  gsap.to(pProject, { y: 0, duration: 1, ease: "power1.out", delay: 0.6 });
});