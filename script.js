const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const receipeContainer = document.querySelector('.receipe-container');
const receipeDetailsContent = document.querySelector('.receipe-details-content');
const receipeCloseBtn = document.querySelector('.receipe-close-btn');

const fetchReceipes = async (query) => {
    receipeContainer.innerHTML = `<h2 style="margin-left:200px">Fetching Receipes...</h2>`;

    try {  
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    //console.log(response.meals[0]);

    receipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const receipeDiv = document.createElement('div');
        receipeDiv.classList.add('receipe');
        receipeDiv.innerHTML = `
        <img src = "${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p><span> ${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement('button');
        button.textContent = "View Receipe";
        receipeDiv.appendChild(button);

        //Adding element to receipe button
        button.addEventListener('click',()=>{
            openReceipePopUp(meal);
        })

        receipeContainer.appendChild(receipeDiv);
    });

    }catch(error){
     receipeContainer.innerHTML = `<h2 style="margin-left:200px;">Error in Fetching Receipes..</h2>`
    };
}

const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];

    if(ingredient) {
        const measure = meal[`strMeasure${i}`];
         ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else {
       break;
    }
    }
    return ingredientsList;
}

const openReceipePopUp=(meal)=>{
    receipeDetailsContent.innerHTML = `
    <h2 class="receiptName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="receipeInstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    receipeDetailsContent.parentElement.style.display = "block";
}

receipeCloseBtn.addEventListener('click',()=>{
    receipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput) {
        receipeContainer.innerHTML = `<h2 style="margin-left:200px">Type the meal in the search box</h2>`
        return;
    }
    fetchReceipes(searchInput);
})