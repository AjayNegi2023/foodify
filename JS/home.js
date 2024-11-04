const recipeModal = document.querySelector(".recipe-Modal");
const addRecipeBTN = document.getElementById("nav-add-recipe-btn");
const navItems = document.getElementById("nav-items");
const searchContainer = document.querySelector(".search-container");
const favIcons = document.getElementsByClassName("fav-icon");
const addErrorAddTOItem = document.getElementById("error-add-item");
const favoritesCountElement = document.getElementById("favorites-count");
const favoritesDropdown = document.getElementById("favorites-dropdown");
const favoritesButton = document.getElementById('nav-favorites-btn'); // Added for dropdown positioning

let recipeCategorie = [
    {
        id: 1,
        restaurantName: "Meghna Foods",
        category: "North Indian",
        recipeName: "Egg Biryani",
        recipeImg: "https://kreafolk.com/cdn/shop/articles/30-best-food-illustration-ideas-you-should-check-kreafolk_a03aa195-be4c-4ac4-bba5-27d0343d577e.jpg?v=1717725779&width=1024",
        ingredients: "Eggs, Rice, Spices",
        price: 400,
        rating: "4.6",
    },
    {
        id: 2,
        restaurantName: "Burger House",
        category: "Fast Food",
        recipeName: "Hamburger",
        recipeImg: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        ingredients: "Beef, Patty, Lettuce, Tomato, Cheese",
        price: 250,
        rating: "4.5",
    },
    {
        id: 3,
        restaurantName: "Healthy Eats",
        category: "Salads",
        recipeName: "Fruits",
        recipeImg: "https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg",
        ingredients: "Assorted Fruits",
        price: 150,
        rating: "4.7",
    },
    {
        id: 4,
        restaurantName: "Pancake House",
        category: "Breakfast",
        recipeName: "Pancakes with Honey",
        recipeImg: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg",
        ingredients: "Flour, Eggs, Honey",
        price: 200,
        rating: "4.5",
    },
    {
        id: 5,
        restaurantName: "Pasta Place",
        category: "Italian",
        recipeName: "Pasta",
        recipeImg: "https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybrid",
        ingredients: "Pasta, Bolognese Sauce, Parmesan Cheese",
        price: 300,
        rating: "4.6",
    },
    {
        id: 6,
        restaurantName: "Taco Town",
        category: "North Indian",
        recipeName: "Chole Bhature",
        recipeImg: "https://static.vecteezy.com/system/resources/previews/015/933/115/non_2x/chole-bhature-is-a-north-indian-food-dish-a-combination-of-chana-masala-and-bhatura-or-puri-free-photo.jpg",
        ingredients: "Chana Masala, Bhatura",
        price: 350,
        rating: "4.8",
    }
];

let recipeCategories = JSON.parse(localStorage.getItem("recipe-category")) || recipeCategorie;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Show Recipe Modal
addRecipeBTN.addEventListener('click', () => {
    recipeModal.style.display = "block";
});

// Close Recipe Modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.style.display = "none";
    }
});

// Toggle Search and Favorites Dropdown
navItems.addEventListener('click', (e) => {
    if (e.target.id === "nav-search-btn") {
        searchContainer.classList.toggle("hidden");
    }
    if (e.target.id === "nav-favorites-btn") {
        renderFavorites();
        toggleFavoritesDropdown(e.target);
    }
});

// Initial rendering of recipes and favorites
document.addEventListener('DOMContentLoaded', () => {
    renderRecipes(recipeCategories);
    attachFavIconListeners();
    updateFavoritesCount();
    renderFavorites(); // Initial render of favorites
});

// Function to render recipes
function renderRecipes(recipeCategories) {
    let markup = recipeCategories.map((recipe) => {
        return `<div class="item-card">
                    <div class="card-header">
                        <img src="${recipe.recipeImg}" alt="${recipe.recipeName}" />
                    </div>
                    <div class="card-body">
                        <div class="body-header dflex">
                            <h3>${recipe.restaurantName}</h3>
                            <div class="body-subheader">
                                <button>Add+</button>
                                <span><i class="bi bi-heart fav-icon" data-id="${recipe.id}"></i></span>
                            </div>
                        </div>
                        <div class="body-content">
                            <div class="dflex">
                                <h4>${recipe.rating} ⭐</h4>
                                <p>$${recipe.price} for two</p>
                            </div>
                            <div class="item-discription">
                                <p>${recipe.ingredients}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');

    const recipeContainer = document.querySelector(".cards-container");
    recipeContainer.innerHTML = markup;
}

// Attach event listeners to favorite icons
function attachFavIconListeners() {
    const favIcons = document.querySelectorAll(".fav-icon");
    favIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            const recipeId = parseInt(icon.getAttribute("data-id"));
            const recipe = recipeCategories.find(r => r.id === recipeId);
            if (icon.classList.contains("bi-heart")) {
                icon.classList.replace("bi-heart", "bi-heart-fill");
                favorites.push(recipe);
            } else {
                icon.classList.replace("bi-heart-fill", "bi-heart");
                favorites = favorites.filter(fav => fav.id !== recipeId);
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavoritesCount();
            renderFavorites(); // Update favorites dropdown
        });
    });
}

// Update favorites count
function updateFavoritesCount() {
    favoritesCountElement.innerText = favorites.length;
}

// Render favorites in dropdown
function renderFavorites() {
    favoritesDropdown.innerHTML = favorites.map(fav => `
        <div class="favorite-item">
            <img src="${fav.recipeImg}" alt="${fav.recipeName}" class="favorite-img"/>
            <span>${fav.recipeName}</span>
        </div>
    `).join('');
}

// Toggle favorites dropdown visibility and position
function toggleFavoritesDropdown(favoritesButton) {
    const rect = favoritesButton.getBoundingClientRect();
    
    // Check if the dropdown is already open
    if (favoritesDropdown.style.display === 'block') {
        favoritesDropdown.style.display = 'none'; // Close it
    } else {
        favoritesDropdown.style.display = 'block'; // Open it
        favoritesDropdown.style.position = 'absolute'; // Ensure it’s positioned absolutely
        favoritesDropdown.style.top = `${rect.bottom + window.scrollY}px`; // Position it below the button
        favoritesDropdown.style.left = `${rect.left}px`; // Align left with the button
    }
}


// Function to handle adding recipes
function handleAddRecipes(e) {
    e.preventDefault();

    const recipeName = e.target[0].value;
    const recipeImg = e.target[1].value;
    const price = e.target[2].value;
    const rating = e.target[3].value;
    const ingredients = e.target[4].value;

    let recipe = {
        id: recipeCategories.length + 1,
        restaurantName: "Mghana",
        category: "North Indian",
        recipeName: recipeName,
        recipeImg: recipeImg,
        ingredients: ingredients,
        price: price,
        rating: rating,
    };

    recipeCategories.push(recipe);
    localStorage.setItem("recipe-category", JSON.stringify(recipeCategories));

    renderRecipes(recipeCategories);
    attachFavIconListeners();

    const recipeModalForm = document.querySelector(".recipe-modal-content form");
    recipeModalForm.reset();
    recipeModal.style.display = "none";
}

// Event listener for adding recipes
const recipeModalForm = document.querySelector(".recipe-modal-content form");
recipeModalForm.addEventListener("submit", handleAddRecipes);

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!favoritesDropdown.contains(e.target) && !favoritesButton.contains(e.target)) {
        favoritesDropdown.style.display = 'none';
    }
});
