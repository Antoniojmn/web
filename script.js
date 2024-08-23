function generateCards() {
    const cardContainer = document.getElementById('cardContainer');
    const cardCount = Math.min(52, document.getElementById('cardCount').value); // Limitar a 52 cartas
    const suits = ['D', 'H', 'C', 'S']; // D: Diamonds, H: Hearts, C: Clubs, S: Spades
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cardOccurrences = {};
function getCardImage(value, suit) {
    const suitNames = {
        'D': 'diamonds',
        'H': 'hearts',
        'C': 'clubs',
        'S': 'spades'
    };
    
    // Asegurarnos de que '10' se use en la URL tal como es
    const valueCode = (value === '10') ? '0' : value;
    
    return `https://deckofcardsapi.com/static/img/${valueCode}${suit}.png`;
}
        
    clearCards(); // Limpiar antes de generar nuevas cartas

    for (let i = 0; i < cardCount; i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        const card = document.createElement('div');
        card.classList.add('card', 'shuffling');

        const cardName = `${value}${suit}`;
        const cardImage = getCardImage(value, suit);

        card.innerHTML = `<img src="${cardImage}" alt="${cardName}">`;

        // Contar ocurrencias de cartas
        if (cardOccurrences[cardName]) {
            cardOccurrences[cardName]++;
        } else {
            cardOccurrences[cardName] = 1;
        }

        cardContainer.appendChild(card);

        // Remover la clase de animación después de un tiempo
        setTimeout(() => {
            card.classList.remove('shuffling');
        }, 300);
    }

    // Mostrar la tabla de resultados
    updateTable(cardOccurrences);
}

function getCardImage(value, suit) {
    const suitNames = {
        'D': 'diamonds',
        'H': 'hearts',
        'C': 'clubs',
        'S': 'spades'
    };
    return `https://deckofcardsapi.com/static/img/${value}${suit}.png`;
}

function clearCards() {
    const cardContainer = document.getElementById('cardContainer');
    const cardTableBody = document.querySelector('#cardTable tbody');
    cardContainer.innerHTML = '';
    cardTableBody.innerHTML = '';
}

function updateTable(cardOccurrences) {
    const cardTableBody = document.querySelector('#cardTable tbody');
    const totalCards = 13; // Un palo completo tiene 13 cartas

    for (const [card, count] of Object.entries(cardOccurrences)) {
        const percentage = ((count / totalCards) * 100).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${card}</td>
            <td>${count}</td>
            <td class="${percentage >= 100 ? 'green' : ''}">${percentage}%</td>
        `;

        cardTableBody.appendChild(row);
    }
}

