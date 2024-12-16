
async function fetchHouses() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/tbennett/Basic-Fetch/refs/heads/master/houses.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching houses:", error);
        return [];
    }
}

async function fetchRandomColor() {
    try {
        const response = await fetch("https://www.thecolorapi.com/random");
        const data = await response.json();
        return data.hex.value;
    } catch (error) {
        console.error("Error fetching color:", error);
        return "#ffffff";
    }
}

function renderHouses(houses) {
    let html = '<dl class="house-list">';
    
    houses.forEach(house => {
        html += `
            <div class="house-item">
                <dt class="house-name">${house.name} (${house.code})</dt>
                <dd class="house-members">
                    <strong>Members:</strong> ${house.members.join(", ")}
                </dd>
            </div>
        `;
    });
    
    html += '</dl>';
    
    const container = document.querySelector("#container");
    container.innerHTML = html;
}

async function updateBackgroundColor() {
    const color = await fetchRandomColor();
    document.body.style.backgroundColor = color;
}

async function init() {
    try {
        const houses = await fetchHouses();
        renderHouses(houses);
        
        await updateBackgroundColor();
        const colorButton = document.createElement('button');
        colorButton.textContent = 'Change Background Color';
        colorButton.style.margin = '1rem';
        colorButton.addEventListener('click', updateBackgroundColor);
        document.body.insertBefore(colorButton, document.body.firstChild);
        
    } catch (error) {
        console.error("Error initializing page:", error);
    }
}

// Start the application
init();