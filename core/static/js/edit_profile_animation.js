document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.querySelector('.form-container');
    const bioAvatar = document.querySelector('.form-bio-avatar');
    const additionalInfo = document.querySelector('.edit-form-country-city-occupation-gender-age');
    const saveButton = document.querySelector('.but-edit-profile');

    gsap.set(formContainer, { transform: 'translateY(100%)' });
    gsap.set(bioAvatar, { transform: 'translateY(-40%)' });
    gsap.set(additionalInfo, { transform: 'translateY(-25%)' });
    gsap.set(saveButton, { opacity: 0 });

    gsap.to(formContainer, { transform: 'translateY(0)', duration: 1, ease: 'power1.inOut' });
    gsap.to(bioAvatar, { transform: 'translateY(0)', duration: 0.7, ease: 'power1.inOut', delay: 0.7 });
    gsap.to(additionalInfo, { transform: 'translateY(0)', duration: 0.7, ease: 'power1.inOut', delay: 0.6 });

    gsap.to(saveButton, { opacity: 1, duration: 0.6, ease: 'power3.inOut', delay: 1.1 });
});