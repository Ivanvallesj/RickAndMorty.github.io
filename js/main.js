
let urlRiclAnMorty = "https://rickandmortyapi.com/api/character/?page=1";

let btnNext = '';
let btnPrevious = '';
let pages


const listRick = document.querySelector('main')

const contendaorBtn = document.querySelector('.footer-paginacion');

const getRick = async (url) =>{
    try {
        const response =  await fetch(url)
        const resultados = await response.json()
        dataRick(resultados.results)
        
        
        console.log(resultados)
        
        btnNext = resultados.info.next ? `<button id="btns-next" class="btn" data-ur="${resultados.info.next}">Siguiente</button>` : ''
        btnPrevious = resultados.info.prev ? `<button id="btns-prev" class="btn" data-ur="${resultados.info.prev}">Anterior</button>` : ''

        contendaorBtn.innerHTML = btnPrevious + " " + btnNext
    } catch (err) {
        console.log(err);
    }
}

getRick(urlRiclAnMorty);

const dataRick = async (data) =>{
    listRick.innerHTML = '';
    try {

        for( let index of data){
            const resp = await fetch(index.url)
            const result = await resp.json()
            //console.log(result)

            const article = document.createRange().createContextualFragment(
                `
                    <article>
                    <div class="card" style="width: 18rem;">
                        <img src="${result.image}" class="card-img-top" alt="${result.name}">
                        <div class="card-body">
                            <div class="card-description">
                                <span class="card-text">${result.name}</span>
                                <h2>Location</h2>
                                <p class="card-text">${result.location.name}</p>
                                <h2>First seen in:</h2>
                                <p class="card-text">${result.origin.name}</p>
                            </div>
                        </div>
                    </div>
                    </article>
                `
                )
            const main = document.querySelector('main');
    
            main.append(article);
        }
    } catch (err) {
        console.log(err);
    }
    console.log(data)
}

contendaorBtn.addEventListener('click', (e) =>{
    if(e.target.classList.contains('btn')){
        let value = e.target.dataset.ur
        console.log(value)
        getRick(value)
    }
})


