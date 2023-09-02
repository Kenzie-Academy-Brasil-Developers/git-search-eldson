const btnViewProfile = document.querySelector("#btn_view_profile")
const userInput = document.querySelector("#userName")

btnViewProfile.addEventListener("click", () => {
    const url = `https://api.github.com/users/${userInput.value}`

    fetch(url)
    .then(response => {
        if (!response.ok) {
            window.location.href = "src/pages/error.html"
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("githubUserInfo", JSON.stringify(data))
        window.location.href = "src/pages/profile.html"
        
      })
})