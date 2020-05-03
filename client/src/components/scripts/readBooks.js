export var resReadBook = (url, getResTextBook, page) => {
    
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    
    fetch(proxyUrl+url+`&p=${page}`, {
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
                
                var bookText = htmlDocument.querySelector('.BookText .page_text').outerHTML;

                getResTextBook(bookText);
            })
            .catch((error) => {
                console.log(error)
            });
    

}
