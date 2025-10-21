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
        console.log(detailsData)
    })

    infoDiv.appendChild(name)
    infoDiv.appendChild(gender);
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

const showCharacterDetails = (details) => {
    /*
    const card = document.createElement("div");
    card.classList.add("details-card");

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
    */
    // Aquí puedes personalizar cómo mostrar los detalles. Por ejemplo:
    const detailsContainer = document.getElementById("character-details");
    detailsContainer.innerHTML = `
        <h2>${details.name}</h2>
        <div class="image-wrapper">
            <img src="${details.image}" alt="imagen" class="details-image">
        </div>
        <p class="specie"><strong>Especie:</strong> ${details.species}</p>
        <p class="genero"><strong>Género:</strong> ${details.gender}</p>
        <p class="origen"><strong>Origen:</strong> ${details.origin.name}</p>
        <p class="estado"><strong>Estado:</strong> ${details.status}</p>
        <p class="episode"><strong>Primer episodio:</strong> ${details.episode[0]}</p>
    `
    
    ;
    detailsContainer.style.display = 'block'; // Asegúrate de que se muestre
};

/*
const showCharacterDetails = (details) => {
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("character-details")
    
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("character-info")

    const name = document.createElement("h1");
    name.classList.add("character-name")
    name.textContent = details.name

    const gender = document.createElement("h2");
    gender.classList.add("character-gender")
    gender.textContent = details.gender;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("character-image-container");

    const image = document.createElement("img");
    image.classList.add("character-image");
    image.src = details.image;
    image.alt = details.name;

    detailsContainer.style.display= "block";
};
*/
document.addEventListener("DOMContentLoaded", loadCharacters);

/*
const loadCharacters = async () => {
    try {
        const response = await fetch(URL)
        const data = await response.json();
    }catch (error) {
        console.warn("error de fetch", error)
    }
}

loadCharacters();
*/



/*
fetch(URL)
    .then(res => res.json())
    .then(data => {
        const name = document.querySelector('h2');
        name.textContent = data.name
        console.log(name)

        const gender = document.querySelector('p');
        gender.textContent = data.gender
        });}
*/