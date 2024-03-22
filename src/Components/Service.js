export async function fetchCharacters() {
    try {
        const response = await fetch("http://localhost:3005/characters");
        if (!response.ok) {
            throw new Error("Something went wrong! >:(");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function fetchCharacter(id) {
  return fetch(`http://localhost:3005/characters/${id}`)
    .then((response) => response.json())
    .then((response) => {
        if(!response.ok){
            throw new Error("Something went wrong! >:(");
        }
        return response.json()})
    .catch(error => console.log(error));
}

export function deleteCharacter(id) {
    return fetch(`http://localhost:3005/characters/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Something went wrong! >:(");
        }
        return response.json();
    })
    .catch(error => console.log(error));
}
