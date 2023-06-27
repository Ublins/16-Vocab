let state ={
    word: '',
    meanings: [],
    phonetics: [],
}


const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.getElementById('word-input');
const form = document.querySelector('.form');
const containerWord = document.querySelector(".results-word");
const soundButton = document.querySelector(".results-sound");

const insertWord = () => {
    containerWord.innerText = state.word;
};



const handelSubmit = async (e) =>{
    e.preventDefault();

    if (!state.word.trim()) return;


    try {
        const response = await fetch(`${url}${state.word}`);
        const data = await response.json();
    
        if (response.ok && data.length) {
            const item = data[0];   
            insertWord();

            state = {
                ...state,
                meanings: item.meanings,
                phonetics: item.phonetics,
              };

              insertWord ();
        }
    } catch (err) {
        console.log (err); 
    }
};

const handelKeyup = (e) =>{
    const value = e.target.value;
    state.word = value;
}

const handelSound = () => {
    if (state.phonetics.length) {
    const sound = state.phonetics[0];

    if (sound.audio) {
        new Audio(sound.audio).play();
    }
    }
};


input.addEventListener('keyup', handelKeyup);
form.addEventListener('keyup', handelSubmit);
soundButton.addEventListener ('click', handelSound);