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



fetch('https://www.googleapis.com/books/v1/volumes?q=svejk&key=AIzaSyAkvnYin1tdFYA6D5PfQpNJpnj8yI0xjDM')
    .then(response => response.json())
    .then(data => {
        let searchNumbers = data.totalItems;
        let searchNumbersUI = document.querySelector('.search-result__number');
        searchNumbersUI.innerHTML = `${searchNumbers} books were founded...`;

        console.log(searchNumbers);
    })