function getUserFromLocalStorage() {
    const userInfo = JSON.parse(localStorage.getItem("githubUserInfo"))
    
    if (userInfo) {
        renderUserInfo(userInfo.avatar_url, userInfo.login)
        renderUserRepos(userInfo.login)
    }
}

function renderUserInfo(avatar_url, login) {
    const userName = document.querySelector("#profile__username")
    const userAvatar = document.querySelector("#profile__image")

    userName.innerText = login
    userAvatar.src = avatar_url
}

async function renderUserRepos(login) {
    const url = `https://api.github.com/users/${login}/repos`
    let repositories;
    const profileUl = document.querySelector("#profile__ul")

    await fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            repositories = data
        })

    repositories.map(dataRepo => {
        const createLi = document.createElement("li")
        const createH4 = document.createElement("h4")
        const createP = document.createElement("p")
        const createA = document.createElement("a")

        createH4.textContent = dataRepo.name
        createP.textContent = dataRepo.description
        createA.href = dataRepo.html_url
        createA.target = "_blank"
        createA.textContent = "Repositório"

        createLi.appendChild(createH4)
        createLi.append(createP)
        createLi.append(createA)

        profileUl.appendChild(createLi)
    })
}

const btnOtherUSer = document.querySelector("#btn_other_user")
btnOtherUSer.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

getUserFromLocalStorage()