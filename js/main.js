const createCharacterCard = (character) => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const infoDiv = document.createElement("div")
    infoDiv.classList.add("character-info")

    const name = document.createElement("h1");
    name.classList.add("character-name")
    name.textContent = character.name

    const gender = document.createElement("h2");
    gender.classList.add("character-gender")
    gender.textContent = character.gender;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("character-image-container");

    const image = document.createElement("img");
    image.classList.add("character-image");
    image.src = character.image;
    image.alt = character.name;

    image.addEventListener("click", async () => {
        const detailsResponse =  await fetch(character.url)
        const detailsData = await detailsResponse.json();

        showCharacterDetails(detailsData)
    })

    infoDiv.appendChild(name)
    infoDiv.appendChild(gender)
    imageContainer.appendChild(image)

    card.appendChild(infoDiv)
    card.appendChild(imageContainer)

    return card;
}

const loadCharacters = async () => {
    const characterGrid = document.getElementById("character-grid");
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();

        characterGrid.innerHTML = '';

        const characters = data.results

        for (const character of characters) {
            const characterCard = createCharacterCard(character);
            characterGrid.appendChild(characterCard);
        }
        
    }catch (error) {
        console.warn("error fetch: ", error)
    }
}

let currentPage = 1;

const chargeCharacters = async (page = 1) => {
    const characterGrid = document.getElementById("character-grid");
    const currentPageSpan = document.getElementById("current-page")
    characterGrid.innerHTML = ``;

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();

        characterGrid.innerHTML = "";

        data.results.forEach((character) => {
        const card = createCharacterCard(character);
        characterGrid.appendChild(card);
        });

        currentPage = page;
        currentPageSpan.textContent = currentPage;

        document.getElementById("prev-button").disabled = !data.info.prev;
        document.getElementById("next-button").disabled = !data.info.next;

    } catch (error) {
        console.error("Error al cargar los personajes:", error);
    }
};

document.getElementById("next-button").addEventListener("click", () => {
    currentPage++;
    chargeCharacters(currentPage);
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        chargeCharacters(currentPage);
    }
});

document.addEventListener("DOMContentLoaded", () => loadCharacters(currentPage));

const showCharacterDetails = (details) => {
    const detailsContainer = document.getElementById("character-details");
    detailsContainer.innerHTML = `
        <h2>${details.name}</h2>
        <div class="image-wrapper">
            <img src="${details.image}" alt="imagen" class="details-image">
        </div>
        <p class="specie"><strong>Especie:</strong> ${details.species}</p>
        <p class="gender"><strong>Género:</strong> ${details.gender}</p>
        <p class="origen"><strong>Origen:</strong> ${details.origin.name}</p>
        <p class="status"><strong>Estado:</strong> ${details.status}</p>
        <p class="episode"><strong>Primer episodio:</strong> ${details.episode[0]}</p>
    `
    ;
    detailsContainer.style.display = 'block'
}

const searchCharacter = async () => {
    const characterName = document.getElementById('character-search').value.toLowerCase();
    if (characterName) {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterName}`);
            const characterGrid = document.getElementById("character-grid");
            characterGrid.innerHTML = '';
            const detailsContainer = showCharacterDetails(response.data);
            characterGrid.appendChild(detailsContainer);
        }catch (error) {
            console.warn('Error al buscar el personaje: ', error);
        }
    }
};

document.getElementById('search-button').addEventListener('click', searchCharacter);
document.getElementById('character-search').addEventListener('keypress', function (e) {
    if(e.key === 'Enter') {
        console.log("search")
        searchCharacter();
    }
});

