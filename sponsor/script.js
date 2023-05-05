
var typed=new Typed(".type",{
  strings:["Sponsors","Organizors","Students","Events"],
  typeSpeed:110,
  backSpeed:75,
  loop:false
})

let formBtn=document.querySelector('#login-btn');
let loginform=document.querySelector('.login-form-container');
let formClose=document.querySelector('#form-close');
formBtn.addEventListener('click',()=>{
    loginform.classList.add('active');
})
formClose.addEventListener('click',()=>{
    loginform.classList.remove('active');
})
document.onscroll = () => {
    if(window.scrollY > 0){
        document.querySelector('.header') .classList.add('active');
    } else{
        document.querySelector('.header') .classList.remove('active');
    }
};

document.onload = () => {
    if(window.scrollY > 0){
        document.querySelector('.header') .classList.add('active');
    } else{
        document.querySelector('.header') .classList.remove('active');
    }
};

const navbar = document.querySelector('.header .navbar');
const menuButton = document.querySelector('.header .menu');

menuButton.addEventListener('click', () => {
  navbar.classList.toggle('show');
  menuButton.classList.toggle('rotate');
});

document.onscroll = () => {
  navbar.classList.remove('show');
  menuButton.classList.remove('rotate');
  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active');
  } else {
    document.querySelector('.header').classList.remove('active');
  }
};

document.onload = () => {
  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active');
  } else {
    document.querySelector('.header').classList.remove('active');
  }
};

let themetoggler =document.querySelector('.theme-toggler');
let togglebtn = document.querySelector('.toggle-btn');

togglebtn.onclick = () =>{
  themetoggler.classList.toggle('active');
}

window.onscroll =() => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  themetoggler.classList.remove('active');
}
document.querySelectorAll('.theme-toggler .theme-btn').forEach(btn =>{
btn.onclick= () =>{
  let color = btn.style.background;
  document.querySelector(':root').style.setProperty('--main-color',color);
}})




