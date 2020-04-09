export var response = (inputValue, getData, getRequestPages) => {
    getData([], null);
    
    var nameBookWords = inputValue.split(' ');
    var nameBook = nameBookWords.join('+');
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var url = `https://www.litmir.me/bs?
                                        name=${nameBook}&`
    
    
    var pageCount = 1;
    var maxPage = null;
    
    const forLoop = async () => {
        while(pageCount !== maxPage) {
            
            await req(pageCount);
            // getInputValue(searchedBooks)
            
            pageCount++
        } 
    }


    fetch(proxyUrl+url, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                // 'Connection': 'keep-alive'
            }})
            .then(response => response.text())
            .then(async text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");
                
                if(htmlDocument.querySelector('.xs_msg')) { // if books was not searched
                    getData([], false);
                    console.log('Книг не найдено');
                } else {
                    var lt118Tr = htmlDocument.querySelector('.lt118 tr');
                    
                    if(lt118Tr) {
                        var tdAll = lt118Tr.querySelectorAll('td');
                        var pAll = tdAll[1].querySelectorAll('a');
                        maxPage = +pAll[pAll.length-1].querySelector('div').textContent + 1;
                        
                        getData([], true);
                        // getRequestPages(pageCount, maxPage-1);
                        console.log('несколько страниц');
                        forLoop();
                    } else {
                        maxPage = 2;
                        getData([], true);
                        console.log('одна страница');
                        forLoop();
                    }
                    getRequestPages(pageCount, maxPage-1);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    

    function req(page) {
        return fetch(proxyUrl+url+`p=${page}`, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Access-Control-Allow-Origin': '*',
                // 'Connection': 'keep-alive'
            }})
            .then(response => response.text())
            .then(async text => {
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(text, "text/html");

                getRequestPages(pageCount, maxPage-1);
                getBooksOnPage(htmlDocument);
            })
            .catch((error) => {
                console.log(error)
            });
    }
        
                
    
    var searchedBooks = [];
                
    const getBooksOnPage = page => {
        var bookItems = page.querySelectorAll('td.right_content table.island');
        
        for (const item of bookItems) {
            var itemSrc = item.querySelector('.book_name a').getAttribute('href');
            
            var itemUrl = `https://www.litmir.me${itemSrc}`;
            var itemImg = item.querySelector('tr td a img').dataset.src;
            var itemName = item.querySelector('span[itemprop="name"]').textContent;
            var itemAuthor = item.querySelector('span[itemprop="author"] a') ? item.querySelector('span[itemprop="author"] a').textContent : 'Не указан';
            var itemGenre = item.querySelector('span[itemprop="genre"] a').textContent;
            var itemPages = 0;
            var itemYears = '';
            

            // 
            var desc1All = item.querySelector('tr').querySelectorAll('span.desc1');

            for(const item of desc1All) {
                let itemText = item.textContent;
                if(itemText === 'Год:') {
                    itemYears = item.nextElementSibling.textContent;
                }
                if(itemText === 'Страниц:') {
                    itemPages = item.nextElementSibling.textContent;
                }
            }
            // 


            // 
            var similarity = nameBookWords.length;
            var similarityCount = 0;

            var itemWords = itemName.replace(/[^A-Za-zА-Яа-яЁё]/g, ' ').split(' ');
            
            for(const inputWord of nameBookWords) {
                for(const word of itemWords) {
                        if(inputWord.toLowerCase() === word.toLowerCase()) {
                        similarityCount++
                    }
                }
            }
            // 

            // console.log(similarityCount, similarity);
            // console.log(nameBookWords, itemWords);

            if(+itemPages > 100 && similarityCount >= similarity) {
                
                var itemInfo = {
                    url: itemUrl,
                    img: `https://www.litmir.me${itemImg}`,
                    name: itemName,
                    author: itemAuthor,
                    genre: itemGenre,
                    pages: itemPages,
                    years: itemYears
                }

                searchedBooks.push(itemInfo)
                // getData(searchedBooks, true)
            }

            if(searchedBooks.length > 1 && pageCount === maxPage-1) {
                getData(searchedBooks, true)
            }

            if(searchedBooks.length < 1 && pageCount === maxPage-1) {
                getData(searchedBooks, false)
            }
        }

        return searchedBooks
    }
}
