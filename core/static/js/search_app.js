$(document).ready(function () {
    $("#search-input").on("input", function () {
        const query = $(this).val();

        const articlesContainer = $(".article-list");
        articlesContainer.find(".article-item").hide();

        $.ajax({
            type: "GET",
            url: "/articles/search/",
            data: { query: query },
            success: function (data) {

                const resultsContainer = articlesContainer;
                resultsContainer.empty();

                data.results.forEach(function (result) {

                    const listItem = $("<li>").html(`<h3>${result.title}</h3><p>${result.content}</p><p>Автор: ${result.author}</p>`);
                    resultsContainer.append(listItem);
                });
            },
            error: function () {
                console.log("Error searching articles.");
            }
        });
    });
});