/**
    Script for making a reading list of the books at http://www.entrepreneuronfire.com/books/ sorted by number of recommendations
**/

var result = {};
Array.prototype.slice.call(document.querySelectorAll('.entry-content p')).filter(function(pTag){
    return pTag.querySelectorAll('a').length >= 2;
}).map(function(element){
    var author = element.querySelectorAll('a')[0].innerHTML.replace(/([\d;:]|(&nbsp))/g, '').trim();
    var nameOfBook = element.querySelectorAll('a')[1].innerHTML.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
    return {
        author: author,
        nameOfBook: nameOfBook
    };
}).forEach(function(book){
    
    if(result[book['nameOfBook']]){
        result[book['nameOfBook']]['numberOfRecommendations'] = result[book['nameOfBook']]['numberOfRecommendations'] + 1;
    }else{
        result[book['nameOfBook']] = {
            numberOfRecommendations : 1,
            author: book['author'],
            bookTitle: book['nameOfBook']
        };
    }
});

var sortable = [];

for(var book in result){
    if(result.hasOwnProperty(book)){
        sortable.push([result[book]['author'], book, result[book]['numberOfRecommendations'], ]);
    }
}

sortable.sort(function(book1, book2){
    var numberOfRecommendationsBook1 = book1[2];
    var numberOfRecommendationsBook2 = book2[2];

    if(numberOfRecommendationsBook1 === numberOfRecommendationsBook2){
        return 0;
    }else if(numberOfRecommendationsBook1 > numberOfRecommendationsBook2){
        return -1;
    }else{
        return 1;
    }
});

sortable.map(function(book){
return 'Title: ' + book[1]  + ' Author: ' + book[0] + ' Number of recommendations: ' + book[2];
}).join("\n");