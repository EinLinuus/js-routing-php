console.log("Hello from JS")
setInterval(() => {
    console.log("Still here :)")
}, 5000)

document.addEventListener("click", async (event) => {
    if (!event.target.matches("a[href]")) return
    event.preventDefault()
    event.stopPropagation()
    const href = event.target.getAttribute("href")
    try {
        const [html, title] = await getPageHTML(href)
        loadPage(html, title)
        window.history.pushState({ html, title }, "", href)
    } catch (error) {}
    document.body.classList.add("page-loading")
    document.body.setAttribute("style", `--page-load-percent: 0%;`)
})

window.onpopstate = function (e) {
    if (e.state) {
        loadPage(e.state.html, e.state.title)
    }
}

function loadPage(html, title) {
    document.querySelector("body").innerHTML = html
    document.title = title
}

async function getPageHTML(url) {
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()

        xhttp.onprogress = (event) => {
            if (!event.lengthComputable) return
            const percentage = Math.round((event.loaded / event.total) * 100)
            document.body.setAttribute("style", `--page-load-percent: ${percentage}%;`)
        }

        xhttp.addEventListener(
            "load",
            (event) => {
                console.log("Loading successful")
            },
            false
        )
        xhttp.addEventListener(
            "error",
            (event) => {
                console.log("Loading failed")
                reject()
            },
            false
        )
        xhttp.addEventListener(
            "abort",
            (event) => {
                console.log("Loading cancelled")
                reject()
            },
            false
        )

        xhttp.onreadystatechange = (event) => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                resolve([xhttp.responseText, xhttp.getResponseHeader("x-page-title")])
            }
        }

        xhttp.open("GET", url, true)
        xhttp.setRequestHeader("x-req-type", "from-js")
        xhttp.send()
        document.body.classList.add("page-loading")
    })
}
