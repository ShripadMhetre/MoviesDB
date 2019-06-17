$(document).ready(function() {
    $('#button').on('click', function() {
        let searchText = $('#input').val();
        moviesList(searchText);
    })
})

function moviesList(searchText) {
    //used "www.omdbapi.com" which is opensource movies database collection
    //apikey is my personal registration key.
    var url = 'https://www.omdbapi.com/?s=' + searchText + '&apikey=aa93b9f0';
    
    //Used 'axios' which is promise-based HTTP client for Javascript
    $.get(url)
        .done(function(data) {
            //console.log(data);
            var movies = data.Search;
            console.log(movies);
            var output = '';
            $.each(movies, function(index, movie) {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h4>${movie.Title}</h4>
                            <a class="btn btn-primary" href="movie.html" onclick="sessionId('${movie.imdbID}')">Movie Details</a>
                        </div>
                    </div>
                `
            })

            $("#movies").html(output);
        })
        .fail(function() {
            console.log('Failed');
        })
}

function sessionId(id) {
    sessionStorage.setItem('movieId', id);
    window.location('movie.html');
    return false;
}

function movieDetails() {
    var movieId = sessionStorage.getItem('movieId');
    var url = 'https://www.omdbapi.com/?i=' + movieId + '&apikey=aa93b9f0';
    $.get(url, function(movie) {
        console.log(movie);
        var output = `
            <div class="row mt-5">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <table class="table table-hover bg-active text-justify">
                        <tr>
                            <td colspan="2"><h1 style="font-family:Georgia, 'Times New Roman', Times, serif">${movie.Title}</h1></td>
                        </tr>
                        <tr>
                            <th class="h4">Cast :</th>
                            <td class="bold">${movie.Actors}</td>
                        </tr>
                        <tr>
                            <th class="h4">Director :</th>
                            <td class="bold">${movie.Director}</td>
                        </tr>
                        <tr>
                            <th class="h4">Language :</th>
                            <td class="bold">${movie.Language}</td>
                        </tr>
                        <tr>
                            <th class="h4">Genre :</th>
                            <td class="bold">${movie.Genre}</td>
                        </tr>
                        <tr>
                            <th class="h4">Release Date :</th>
                            <td class="bold">${movie.Released}</td>
                        </tr>
                        <tr>
                            <th class="h4">Production :</th>
                            <td class="bold">${movie.Production}</td>
                        </tr>
                        <tr>
                            <th class="h4">Awards :</th>
                            <td class="bold">${movie.Awards}</td>
                        </tr>
                        <tr>
                            <th class="h4">Plot :</th>
                            <td class="bold">${movie.Plot}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;

        $("#movie").html(output);
     })
}
