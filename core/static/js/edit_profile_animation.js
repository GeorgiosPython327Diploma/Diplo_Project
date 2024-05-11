document.addEventListener("DOMContentLoaded", function () {
    // Находим контейнер формы, биографии, дополнительную информацию и кнопку сохранения профиля
    const formContainer = document.querySelector('.form-container');
    const bioAvatar = document.querySelector('.form-bio-avatar');
    const additionalInfo = document.querySelector('.edit-form-country-city-occupation-gender-age');
    const saveButton = document.querySelector('.but-edit-profile');

    // Устанавливаем начальные значения трансформации для каждого элемента с помощью GSAP
    gsap.set(formContainer, { transform: 'translateY(100%)' });
    gsap.set(bioAvatar, { transform: 'translateY(-11%)' });
    gsap.set(additionalInfo, { transform: 'translateY(-18%)' });
    gsap.set(saveButton, { opacity: 0 });

    // Анимация появления контейнера формы с переводом в положение "translateY(0)"
    gsap.to(formContainer, { transform: 'translateY(0)', duration: 1, ease: 'power1.inOut' });
    // Анимация появления аватара биографии с переводом в положение "translateY(0)" с задержкой 0.7 секунды
    gsap.to(bioAvatar, { transform: 'translateY(0)', duration: 0.7, ease: 'power1.inOut', delay: 0.7 });
    // Анимация появления дополнительной информации с переводом в положение "translateY(0)" с задержкой 0.6 секунды
    gsap.to(additionalInfo, { transform: 'translateY(0)', duration: 0.7, ease: 'power1.inOut', delay: 0.6 });

    // Анимация появления кнопки сохранения профиля с изменением прозрачности до 1 с задержкой 1.1 секунды
    gsap.to(saveButton, { opacity: 1, duration: 0.6, ease: 'power3.inOut', delay: 1.1 });
});