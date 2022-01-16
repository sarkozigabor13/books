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


// Send search form 
{
    const searchForm = document.querySelector('.search-form');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = e.target.elements.searchInput.value;

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyAkvnYin1tdFYA6D5PfQpNJpnj8yI0xjDM`)
            .then(response => response.json())
            .then(data => {

                //Call render function
                renderUI(data);
            })
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

    
    console.log(data);
}


