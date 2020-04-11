export var response = (inputValue, getData, getRequestPages) => {
    getData([], null, inputValue.toUpperCase());
    
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
                    getData([], false, inputValue.toUpperCase());
                    console.log('Книг не найдено');
                } else {
                    var lt118Tr = htmlDocument.querySelector('.lt118 tr');
                    
                    if(lt118Tr) {
                        var tdAll = lt118Tr.querySelectorAll('td');
                        var pAll = tdAll[1].querySelectorAll('a');
                        maxPage = +pAll[pAll.length-1].querySelector('div').textContent + 1;
                        
                        getData([], true, inputValue.toUpperCase());
                        console.log('несколько страниц');
                        forLoop();
                    } else {
                        maxPage = 2;
                        getData([], true, inputValue.toUpperCase());
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
    
    function des(page) {
        return fetch(proxyUrl+page, {
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

                var description = htmlDocument.querySelector('.right_content .island table.lt49').querySelector('table.lt102').querySelectorAll('tr')[0].querySelector('[itemprop="description"]').textContent;
                // console.log(description);
                return description
            })
            .catch((error) => {
                console.log(error)
            });
    }
                
    
    var searchedBooks = [];
                
    const getBooksOnPage = async page => {
        var bookItems = page.querySelectorAll('td.right_content table.island');
        
        for (const item of bookItems) {
            var itemSrc = item.querySelector('.book_name a').getAttribute('href');
            
            var itemUrl = `https://www.litmir.me${itemSrc}`;
            var itemImg = item.querySelector('tr td a img').dataset.src;
            var itemName = item.querySelector('span[itemprop="name"]').textContent;
            var itemAuthor = item.querySelector('span[itemprop="author"] a') ? item.querySelector('span[itemprop="author"] a').textContent : 'Не указан';
            var itemGenre = item.querySelector('span[itemprop="genre"] a').textContent;
            // var description = item.querySelectorAll('tr')[1].querySelector('.BBHtmlCodeInner').textContent;
            
            var itemPages = 0;
            var itemYears = 'Не указано';
            

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


            if(+itemPages > 100 && similarityCount >= similarity) {
                let description = await des(itemUrl);
                
                var itemInfo = {
                    url: itemUrl,
                    img: `https://www.litmir.me${itemImg}`,
                    name: itemName,
                    author: itemAuthor,
                    genre: itemGenre,
                    pages: itemPages,
                    years: itemYears,
                    desc: description
                }

                searchedBooks.push(itemInfo)
            }

            if(searchedBooks.length > 1 && pageCount === maxPage-1) {
                getData(searchedBooks, true, inputValue.toUpperCase())
            }

            if(searchedBooks.length < 1 && pageCount === maxPage-1) {
                getData(searchedBooks, false, 'СТРАНИЦА ПОИСКА')
            }
        }

        return searchedBooks
    }
}
