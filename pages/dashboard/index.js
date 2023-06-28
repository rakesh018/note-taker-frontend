const apiUrl = "https://your-note-taker-backend.onrender.com";
const body = document.querySelector("body");
const token = localStorage.getItem("jwt");
const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".logout");
const newNote = document.querySelector(".new-note");
var parents = [];
let children = [];
const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");
let cardData = [];
/*const cardData = [
  {
    heading: "heading1",
    content:
      "its just inside of a card bro! its just inside of a card bro! its just inside of a card bro! its just inside of a card bro! its just inside of a card bro! its just inside of a card bro! its just inside of a card bro!",
    id: 1,
  },
  { heading: "heading2", content: "its just inside of a card bro!", id: 2 },
  { heading: "heading3", content: "its just inside of a card bro!", id: 3 },
  { heading: "heading4", content: "its just inside of a card bro!", id: 4 },
  { heading: "heading5", content: "its just inside of a card bro!", id: 5 },
  { heading: "heading6", content: "its just inside of a card bro!", id: 6 },
  { heading: "heading7", content: "its just inside of a card bro!", id: 7 },
];*/
window.addEventListener("load", () => {
  body.classList.add("visible");
  if (token) {
    //we will also fetch all notes of user from backend
    fetch(`${apiUrl}/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((resdata) => {
        //in response we have member named data which is an array of notes
        cardData = resdata.data;
        if (cardData.length === 0) {
          //if there is no notes, i will display a picture saying to user that his dashboard is empty
          cardContainer.innerHTML = `<div class="empty-notes-container"><img src="../../assets/empty-notes.svg" alt="empty-notes-illustration" class="empty-notes-svg"><div class="empty-notes-warning">Your Dashboard is empty. Create your first Note.</div></div>`;
        } else createNotes(resdata.data);
      })
      .then(() => {
        //we fetch all of these below only after data is fethed from backend
        parents = document.getElementsByClassName("delete-img");
        for (let i = 0; i < parents.length; i++) {
          parents[i].addEventListener("click", () => {
            const noteid =
              parents[i].parentElement.parentElement.parentElement.parentElement
                .id;
            const result = confirm("Do you want to delete this note?");
            if (result) {
              //by using this note id we make a request onto backend
              fetch(`${apiUrl}/notes/delete/${noteid}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  authorization: token,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  alert("Note deleted successfully");
                  location.href = "/pages/dashboard/dashboard.html";
                })
                .catch((err) => {
                  console.log(err);
                  alert("Error deleting note.");
                });
            }
          });
        }
      })
      .catch((err) => {
        alert("Error fetching your notes.");
      });
  } else {
    //user willbe redirected to home page
    location.href = "/";
  }
});
logout.addEventListener("click", () => {
  //we will delete jwt token
  localStorage.removeItem("jwt");
  location.href = "/";
});
const createNotes = (array) => {
  cardContainer.innerHTML = "";
  //we start everytime from an empty string and we start appending then
  array.forEach((cardObj) => {
    const { heading, content, noteId } = cardObj;
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = noteId;
    const insideHtml = `<div class="card-header">
    <div class="card-heading">${heading}</div>
    <div class="note-update-delete-containers">
      <a href="../updateNotes/updateNotes.html?noteId=${noteId}">
        <div class="edit-note">
          <img src="../../assets/edit-note.svg" alt="edit-note" />
        </div>
      </a>
      <div class="delete-note">
        <img src="../../assets/delete-2-svgrepo-com.svg"alt="delete-note" class="delete-img"/>
      </div>
    </div>
  </div>
  <div class="card-content">
    ${content}
  </div>`;
    card.innerHTML = insideHtml;
    cardContainer.appendChild(card);
  });
  /*First we take an input array from backend, then we run a loop for each object
    in the array. For each object, we first create an element with class name card
    and also give it an id and we add inner html according to template we made and
    then we append the card to cardcontainer*/
};
newNote.addEventListener("click", (e) => {
  //we will first redirect to create notes folder
  location.href = `/pages/CreateNotes/createNotes.html`;
});
particlesJS.load("particles-js","particles.json");
