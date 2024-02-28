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

    $.ajax({
      type: "GET",
      url: "/articles/search/",
      data: { query: query },
      success: function (data) {
        resultsContainer.empty();

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

            articleItem.find('h3').css({
              'padding-bottom': '40px',
              'text-align': 'center',
              'color': 'rgba(88, 87, 87, 0.74)',
              'font-weight': '517',
              'font-family': 'Play, serif',
              'font-size': '1.6em',
            });

            articleItem.css({
              'margin': '116px auto -70px',
            });

            articleItem.find('a').css({
              'text-decoration': 'none',
              'color': 'inherit',
            });

            articleItem.find('p').css({
              'font-family': 'Spectral SC, serif',
              'font-weight': '400',
              'font-size': '1em',
              'color': 'rgb(82, 82, 80)',
            });

            articleItem.find('.open_review').on('click', function (event) {
              event.preventDefault();
              const pk = $(this).data('pk');
              console.log(pk);

              window.location.href = `${pk}/review/`;
            });

            resultsContainer.append(articleItem.hide().fadeIn({
              duration: 1000,
            }));
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