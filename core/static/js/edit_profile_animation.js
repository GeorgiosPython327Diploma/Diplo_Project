document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.querySelector('.form-container');
    const bioAvatar = document.querySelector('.form-bio-avatar');
    const additionalInfo = document.querySelector('.edit-form-country-city-occupation-gender-age');

    gsap.set(formContainer, { transform: 'translateY(100%)' });
    gsap.set(bioAvatar, { transform: 'translateY(-40%)' });
    gsap.set(additionalInfo, { transform: 'translateY(-25%)' });

    gsap.to(formContainer, { transform: 'translateY(0)', duration: 1, ease: 'ease-in-out' });
    gsap.to(bioAvatar, { transform: 'translateY(0)', duration: 0.7, ease: 'ease-in-out', delay: 0.7 });
    gsap.to(additionalInfo, { transform: 'translateY(0)', duration: 0.7, ease: 'ease-in-out', delay: 0.6 });
});
