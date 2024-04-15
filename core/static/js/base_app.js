document.addEventListener('DOMContentLoaded', function () {
    const shape = document.querySelector('.shape');
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    shape.style.width = '20px';
    shape.style.height = '20px';

    timeline.to(shape, {
        borderRadius: '25%',
        scale: 1,
        duration: 1,
        ease: 'power1.inOut',
        rotation: 360,
    });

    timeline.to(shape, {
        scale: 0.8,
        duration: 1,
        ease: 'power1.inOut',
        rotation: -360,
        onComplete: function () {
            gsap.to(shape, {
                scale: 1,
                duration: 0,
                rotation: 0,
            });
        },
    });

    gsap.to('body', {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.inOut',
    });

    let categoryList = document.querySelector('.category-list');
    if (categoryList) {
        categoryList.addEventListener('click', function(event) {
            let target = event.target;
            if (target.tagName === 'LI') {
                let link = target.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    } else {
        console.error("Элемент не найден");
    }
});
