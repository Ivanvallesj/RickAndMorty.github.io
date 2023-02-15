let urlRiclAnMorty = "https://rickandmortyapi.com/api/character/?page=1";
let btnNext = '';
let btnPrevious = '';
let done

const contendaorBtn = document.querySelector('.footer-paginacion');


function getCharacters(done){
    const results = fetch(urlRiclAnMorty);

    results
        .then(response => response.json())
        .then(data =>{
            done(data)
        })
}

        
getCharacters(data => {

    if(data.info.next !== null){
        btnNext = data.info.next
    }else{
        btnNext = ''
    }
    
    if(data.info.prev !== null){
        btnPrevious = data.info.prev
    }else{
        btnPrevious = ''
    }

    const btns = document.createRange().createContextualFragment(
        `
        <button id="btn-previous" class="btn-paginacion-previous" data-ur="${btnPrevious}">Anterior</button>
        <button id="btns-next" class="btn-paginacion-next" data-ur="${btnNext}">siguiente</button>
        `
        )

    contendaorBtn.append(btns)

    
    const buttonNext = document.querySelector('#btns-next')
    const buttonPrevious = document.querySelector('#btn-previous')

    
    buttonNext.addEventListener('click', (e) =>{
        console.log()
        if(e.target.classList.contains('btn-paginacion-next')){
            let value= e.target.dataset.ur
            console.log(value)
            urlRiclAnMorty = value
            getCharacters(done)
        }
    })

    buttonPrevious.addEventListener('click', (e) =>{
        if(e.target.classList.contains('btn-paginacion-previous')){
            let value= e.target.dataset.ur
            console.log(value)
            urlRiclAnMorty = value
            getCharacters(done) 
        }
    })


    data.results.forEach(personaje => {
        const article = document.createRange().createContextualFragment(
        `
            <article>
            <div class="card" style="width: 18rem;">
                <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
                <div class="card-body">
                    <div class="card-description">
                        <span class="card-text">${personaje.name}</span>
                        <h2>Location</h2>
                        <p class="card-text">${personaje.location.name}</p>
                        <h2>First seen in:</h2>
                        <p class="card-text">${personaje.origin.name}</p>
                    </div>
                </div>
            </div>
            </article>
        `
        )
        const main = document.querySelector('main');

        main.append(article);
        
    });
    
});





