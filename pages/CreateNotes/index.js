const token = localStorage.getItem("jwt");
const apiUrl = "https://your-note-taker-backend.onrender.com";

const createNoteButton = document.querySelector(".create-note-button");
const body = document.querySelector("body");
window.addEventListener("load", () => {
  body.classList.add("visible");
});
createNoteButton.addEventListener("click", (e) => {
  const heading = document.querySelector(".note-heading").value;
  const content = document.querySelector(".create-note-input").value;
  if (token) {
    //we will make a request to create new note
    fetch(`${apiUrl}/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      //from body, we will send note heading and note content
      body: JSON.stringify({ heading, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        const message = data; //we are just taking message from response
        location.href = `/pages/dashboard/dashboard.html`;
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding your note.");
      });
  } else {
    location.href='/';
    //console.log("No token.");
  }
});
