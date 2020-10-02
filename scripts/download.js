setTimeout(() => {

    const film_or_search = document.querySelector(".film") || document.querySelector(".pack")
    console.log(`Value: ${film_or_search}`)

    if (film_or_search) {

        if (film_or_search.classList.contains("film")) {
            renderPageInitial()
        } else {
            renderPageSearch()
        }

        initMutaded()

    }


}, 1000)


function initMutaded() {

    const films = document.querySelector("div#pagination_target") || document.querySelector("#resultado_busca")

    const callback = mutationsList => {
        console.log(mutationsList)
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.target.getAttribute('id') === 'resultado_busca'
                    ? renderPageSearch() : renderPageInitial()
            }
        }
    }

    const observer = new MutationObserver(callback);

    observer.observe(films, {
        childList: true
    })

}

function destroyString(url) {
    let new_url = (url.split("/", 5)).pop()
    return `http://legendas.tv/downloadarquivo/${new_url}`
}


function renderPageInitial() {

    let spans = document.querySelectorAll(".bt_seta_download")
    console.log('Page inicial')

    for (let span of spans) {

        span.style.backgroundColor = "#698F3F"

        let links = span.childNodes
        let url_final = destroyString(links[0].href)

        for (let link of links) {
            link.removeAttribute("href")
            link.setAttribute("onclick", `window.open('${url_final}', '_self')`)
        }

    }
}

function renderPageSearch() {

    let packs = document.querySelectorAll(".f_left p:first-child a")
    console.log('Page search')

    for (let pack of packs) {

        let url_final = destroyString(pack.href)
        pack.removeAttribute("href")
        pack.setAttribute("onclick", `window.open('${url_final}', '_self')`)
        pack.style.color = "green"
    }

}