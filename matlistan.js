// Ladda JSON-data från GitHub
async function loadDishes() {
    try {
        const response = await fetch('https://glencocopop.github.io/matlistan/matlistan.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Problem loading the dishes data:', e);
    }
}

// Generera Matsedel och Inköpslista
function generateMenu(dishes) {
    const menu = {};
    const shoppingList = new Set();
    let totalCost = 0;

    for (const day in dishes) {
        const dayDishes = dishes[day];
        const selectedDish = dayDishes[Math.floor(Math.random() * dayDishes.length)];
        menu[day] = selectedDish;
        totalCost += selectedDish.pris;

        selectedDish.ingredienser.forEach(ingredient => shoppingList.add(ingredient));
    }

    return { menu, shoppingList: Array.from(shoppingList), totalCost };
}

// Visa Resultatet på Webbsidan
async function displayMenu() {
    const dishes = await loadDishes();
    const { menu, shoppingList, totalCost } = generateMenu(dishes);

    const menuElement = document.getElementById('menu');
    const shoppingListElement = document.getElementById('shoppingList');
    const totalCostElement = document.getElementById('totalCost');

    menuElement.innerHTML = '';
    for (const day in menu) {
        menuElement.innerHTML += `<p>${day}: ${menu[day].maträtt} - ${menu[day].pris} kr</p>`;
    }

    shoppingListElement.innerHTML = shoppingList.map(item => `<li>${item}</li>`).join('');
    totalCostElement.textContent = `Total kostnad: ${totalCost} kr`;
}

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', displayMenu);
});
