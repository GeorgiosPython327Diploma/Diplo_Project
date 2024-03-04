function truncateText(text, maxWords) {
  const words = text.split(' ');

  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }

  return text;
}

$(document).ready(function () {
  const searchInput = $("#search-input");
  const resultsContainer = $(".container");
  const originalArticlesUrl = "/";

  searchInput.on("input", function () {
    const query = $(this).val();

    if (query.trim() !== "") {
      resultsContainer.find(".article-list").hide();
    } else {
      resultsContainer.find(".article-list").show();
    }

    resultsContainer.empty();

    $.ajax({
      type: "GET",
      url: "/articles/search/",
      data: { query: query },
      success: function (data) {
        if (data.results.length > 0) {
          resultsContainer.addClass("has-results");

          data.results.forEach(function (result) {
            const truncatedContent = truncateText(result.content, 40);

            const articleItem = $(`
              <li class="article-item">
                <a class="open_review" href="#" data-pk="${result.id}">
                  <h3>${result.title}</h3>
                </a>
                ${result.photo ? `<img class="image-article" src="${result.photo}" alt="${result.title || 'Изображение статьи'}">` : ''}
                <p class="content-article">${truncatedContent}</p>
              </li>
            `);

            gsap.set(articleItem, {
              'text-align': 'center',
              'margin': '116px auto -70px',
              'opacity': 0,
              'transform': 'translateY(-100px)',
            });

            gsap.set(articleItem.find('h3'), {
              'color': 'rgba(88, 87, 87, 0.74)',
              'font-weight': '517',
              'font-family': 'Play, serif',
              'font-size': '1.6em',
            });

            gsap.set(articleItem.find('a'), {
              'text-decoration': 'none',
              'color': 'inherit',
            });

            gsap.set(articleItem.find('p'), {
              'font-family': 'Spectral SC, serif',
              'font-weight': '400',
              'font-size': '1em',
              'color': 'rgb(82, 82, 80)',
            });

            gsap.to(articleItem, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

            articleItem.find('.open_review').on('click', function (event) {
              event.preventDefault();
              const pk = $(this).data('pk');
              window.location.href = `${pk}/review/`;
            });

            resultsContainer.append(articleItem);
          });

          resultsContainer.css({
            justifyContent: 'center',
            alignItems: 'center',
            display: 'grid',
            overflow: 'scroll',
            height: '790',
            listStyleType: 'none',
          });
        } else {
          resultsContainer.removeClass("has-results");
          resultsContainer.hide();
          window.location.href = originalArticlesUrl;
        }
      },
      error: function () {
        console.log("Ошибка поиска.");
      },
    });
  });
});