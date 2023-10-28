let searchInput = document.querySelector("#search");
let mainBox = document.querySelector("#main");

class User {
  static async getUserDetails(userName) {
    try {
      if (userName) {
        let response = await fetch(`https://api.github.com/users/${userName}`);
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          User.createUserCard(data);
          cardContainer.style.display = "block"; // Show the card container
        } else {
          console.error("User not found");
          cardContainer.style.display = "none"; // Hide the card container
        }
      } else {
        cardContainer.style.display = "none"; // Hide the card container
      }
    } catch (error) {
      console.error("Error fetching data: " + error);
      cardContainer.style.display = "none"; // Hide the card container on error
    }
  }

  static createUserCard({
    name,
    bio,
    avatar_url,
    followers,
    following,
    public_repos,
    twitter_username,
    location
  }) {
    let cardContainer = document.getElementById("card-container");
    let contentCard = ` 
    <div class="rounded-circle w-25">
    <img src=${avatar_url} class="card-img-top rounded-circle border border-info">
    </div>
    <div class="card-body">
      <div class="ml-3 mb-2 p-2"> 
        <h5 class="card-title">${name}</h5>
      </div> 
      <div class="ml-3 mb-2 p-2"> 
        <p class="card-text">${bio}</p>
      </div>
      <div class="ml-3 p-2">
        <section class="mb-2">  
        <p class="card-text d-inline "> Followers: ${followers}</p>
        <p class="card-text d-inline ml-2 p-2"> Following: ${following}</p>
        <p class="card-text d-inline ml-2 p-2"> Repos: ${public_repos}</p>
        </section>
        <p class="card-text mb-2 d-inline"> Twitter: ${twitter_username}</p>
        <p class="card-text d-inline ml-2 p-2"> Location: ${location}</p>
  
      </div>
    </div>`;
    cardContainer.innerHTML = contentCard;
    mainBox.appendChild(cardContainer);
  }
}
searchInput.addEventListener("input", (event) => {
  event.preventDefault();
  let userName = event.target.value;
  if (userName.trim() === "") {
    // Hide card-container when user input is empty
    let cardContainer = document.getElementById("card-container");
    cardContainer.style.display = "none";
  } else {
    // Show card-container when user input is not empty
    User.getUserDetails(userName);
  }
});

searchInput.addEventListener("input", (event) => {
  event.preventDefault();
  let userName = event.target.value;
  User.getUserDetails(userName);
});
