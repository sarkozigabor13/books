fetch('https://www.googleapis.com/books/v1/volumes?q=svejk&key=AIzaSyAkvnYin1tdFYA6D5PfQpNJpnj8yI0xjDM')
.then(response => response.json())
.then(data => {
    let searchNumbers = data.totalItems;
    let searchNumbersUI = document.querySelector('.search-result__number');
    searchNumbersUI.innerHTML = `${searchNumbers} találat erre a keresésre...`;

    console.log(searchNumbers);
})