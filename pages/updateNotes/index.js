const urlParams=new URLSearchParams(window.location.search);
const noteId=urlParams.get("noteId");

const token = localStorage.getItem("jwt");
const apiUrl = "https://your-note-taker-backend.onrender.com";

const updateNoteButton = document.querySelector(".create-note-button");
const body = document.querySelector("body");
window.addEventListener("load", () => {
  body.classList.add("visible");
  const oldHeading = document.querySelector(".note-heading");
  const oldContent = document.querySelector(".create-note-input");
  //when the note is loaded, i want previous note info to be loaded
  //so we will make a request on backend and get the info of that note
  fetch(`${apiUrl}/notes/getnote/${noteId}`,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        authorization:token,
    },//we dont require a body 
  }).then((res)=>res.json())
  .then((resdata)=>{
    noteData=resdata.data; //there is a member data in response 
    oldHeading.value=noteData.heading;
    oldContent.value=noteData.content;
  }).catch((err)=>{
    console.log(err);
    alert("Error fetching your note.");
  });
});
updateNoteButton.addEventListener("click", (e) => {
  const heading = document.querySelector(".note-heading").value;
  const content = document.querySelector(".create-note-input").value;
  if (token) {
    //we will make a request to create new note
    fetch(`${apiUrl}/notes/update/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      //from body, we will send note heading and note content
      body: JSON.stringify({ heading,content }),
    })
      .then((res) => res.json())
      .then((data) => {
        const message = data; //we are just taking message from response
        console.log(message);
        location.href = `/pages/dashboard/dashboard.html`;
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating your note.");
      });
  } else {
    console.log("No token.");
  }
});
