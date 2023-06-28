const body=document.querySelector('body');
const signInSignUpButton=document.querySelector(".sign-in-sign-up");
window.addEventListener("load",()=>{
    body.classList.add("visible");
    //when website is loaded we can check whether token exists or not in website
    //if token exists we can directly redirect user to dashboard section
    const token=localStorage.getItem("jwt");
    if(token){
        location.href="/pages/dashboard/dashboard.html";
    }
});
signInSignUpButton.addEventListener("click",()=>{
    location.href="/pages/signInSignUp/authenticate.html";
    //we can specify where we need to be redirected using location.href
});

//particle js configuration
particlesJS.load("particles-js","particles.json");