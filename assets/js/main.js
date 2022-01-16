// Search bar 
{
    // Get search bar elements
    let searchInput = document.querySelector('.search-form__input');
    let searchCollapse = document.querySelector('.search-help');

    // Add event listener to search bar click event
    searchInput.addEventListener('click', () => {
        setTimeout(() => {

            // If search bar empty after 3s show categories
            if (searchInput.value === '') {
                searchInput.classList.toggle("active");
                if (searchCollapse.style.maxHeight) {
                    searchCollapse.style.maxHeight = null;
                } else {
                    searchCollapse.style.maxHeight = searchCollapse.scrollHeight + "px";
                }
            }
        }, 3000)
    })
}

// Fetch by search input 
let searchFetch = (e) => {

    e.preventDefault();
    const searchInput = e.target.elements.searchInput.value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyAkvnYin1tdFYA6D5PfQpNJpnj8yI0xjDM`)
        .then(response => response.json())
        .then(data => {

            // Call render function
            renderUI(data);
        })
}

// Send search form 
{
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', searchFetch)
}

// Apply filters 
{
    let applyBtn = document.querySelector('.btn-filter-apply');
    applyBtn.addEventListener('click', () => {

        let filterFree = document.querySelector('#filterPriceFree');
        let filterPaid = document.querySelector('#filterPricePaid');
        console.log(filterFree.checked, filterPaid.checked);
    })
}

// Render UI
function renderUI(data) {

    // Show founded items div
    let searchInfo = document.querySelector('.search-info');
    searchInfo.classList.remove('d-none');

    // Show founded items number
    let searchNumbers = data.totalItems;
    let searchNumbersUI = document.querySelector('.search-result__number');
    searchNumbersUI.innerHTML = `${searchNumbers} books were founded...`;


    // Creating books cards
    let books = data.items;
    let bookCardHtml = '';

    console.log(data.items);

    for (const book of books) {

        let bookTitle = book.volumeInfo.title;
        let bookAuthor = book.volumeInfo.authors;
        let bookCategory = book.volumeInfo.categories === undefined ? "Ismeretlen" : book.volumeInfo.categories; book.volumeInfo.categories;
        let smallThumbnail = book.volumeInfo.readingModes.image === true ? book.volumeInfo.imageLinks.smallThumbnail : "./assets/img/missing_photo.png";
        let bookPrice = book.saleInfo.saleability === "NOT_FOR_SALE" ? "Nem eladó" : book.saleInfo.listPrice.amount + 'HUF';

        console.log(bookCategory);
        bookCardHtml += `
        <div class="col-md-6 d-block search-result__col">
            <div class="row">
                <div class="col-8">
                    <p class="mb-1">${bookTitle}</p>
                    <p class="mb-1"><small class="text-muted">Author: ${bookAuthor}</small></p>
                    <p class="mb-1"><small class="text-muted">Category: ${bookCategory}</small></p>
                    <p class="mb-1"><small class="text-muted">Price: ${bookPrice}</small></p>
                    <div class="search-result__action">
                        <button class="btn btn-primary">Bővebb információ</button>
                    </div>
                </div>
                <div class="col-4">
                    <img src="${smallThumbnail}"
                        class="img-fluid search-result__img" alt="svejk">
                </div>
            </div>
        </div>
        `
    };

    document.querySelector('.search-result').innerHTML = bookCardHtml;



}


