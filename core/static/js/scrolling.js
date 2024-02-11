document.addEventListener("DOMContentLoaded", function () {
    var articleItems = document.querySelectorAll(".article-item");
    var triggerPoint = window.innerHeight * 0.3;

    if (articleItems.length > 0) {
        articleItems.forEach(function (articleItem) {
            articleItem.style.transition = "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out";

            var timeoutId;

            window.addEventListener("scroll", function () {
                clearTimeout(timeoutId);

                timeoutId = setTimeout(function () {
                    var rect = articleItem.getBoundingClientRect();
                    var isVisible = (rect.top >= -triggerPoint && rect.bottom <= window.innerHeight + triggerPoint);

                    if (isVisible) {
                        articleItem.style.transform = "scale(1.03)";
                        articleItem.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                    } else {
                        articleItem.style.transform = "scale(1)";
                        articleItem.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0)";
                    }
                }, 50);
            });
        });
    }
});