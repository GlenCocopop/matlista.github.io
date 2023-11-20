document.getElementById('generateButton').addEventListener('click', function() {
    fetch('https://glencocopop.github.io/matlistan/matlista.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data loaded:', data); // Logga den laddade datan
        generateMenu(data);
    })
    .catch(error => console.error('Error:', error));
});

function generateMenu(data) {
    const menuDiv = document.getElementById('menu');
    const shoppingList = document.getElementById('shoppingList');
    const totalCostDiv = document.getElementById('totalCost');

    menuDiv.innerHTML = '';
    shoppingList.innerHTML = '';
    totalCostDiv.innerHTML = '';

    let totalCost = 0;
    let ingredientsList = [];

    for (const day in data) {
        const dishes = data[day];
        console.log(`${day}:`, dishes); // Logga rätter för varje dag

        const selectedDish = dishes[Math.floor(Math.random() * dishes.length)];
        menuDiv.innerHTML += `<p>${day}: ${selectedDish.maträtt} - ${selectedDish.pris} kr</p>`;
        totalCost += selectedDish.pris;

        selectedDish.ingredienser.forEach(ingredient => {
            if (!ingredientsList.includes(ingredient)) {
                ingredientsList.push(ingredient);
                shoppingList.innerHTML += `<li>${ingredient}</li>`;
            }
        });
    }

    totalCostDiv.innerHTML = `<p>Total kostnad: ${totalCost} kr</p>`;
}
