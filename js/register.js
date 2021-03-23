let registration_input = document.getElementsByClassName('registration_input');
for(let i = 0 ; i< registration_input.length ; i++){
    registration_input[i].addEventListener("focusout" , registration_validation);
}
let btn = document.getElementById('btn');
btn.disabled= true ;
btn.addEventListener('click' , register);
let psw_p = document.getElementById('psw_p');
let psw_repeat_p = document.getElementById('psw_repeat_p');
let email_p = document.getElementById('email_p');
let name_p = document.getElementById('name_p')

function registration_validation(e){
    btn.disabled= true ;
    let a = false ; 
    let current_element = e.currentTarget;
    let next_element = current_element.nextElementSibling;
    next_element.style.display ="none";
        if( current_element.value.length < 4){
            next_element.style.display ="block"
    }

    let email_ends_array = ['gmail.com' , 'yahoo.com' , 'list.ru' , 'bk.ru' , 'mail.ru'];
    if(current_element.type == 'email' ){
       let end_index = current_element.value.substring(current_element.value.indexOf('@') + 1);
            if(current_element.value.split('@')[0] == "" || !current_element.value.includes("@") || current_element.value.match(/@/g).length !== 1 || !email_ends_array.includes(end_index)){
                a=true
            }
        if(a){
         next_element.style.display ="block"
    }
    }
    if(psw_p.style.display == "none" && psw_repeat_p.style.display == "none" && name_p.style.display == "none" && email_p.style.display == "none" ){
        btn.disabled= false ;
    }
}


function register(){
psw_p.innerHTML='The Password field is required';
    if(registration_input[2].value !== registration_input[3].value){
        psw_p.innerHTML = "the passwords aren't same";
        psw_p.style.display ="block";
        return;
    }
    
  axios.get('http://localhost:3000/users')
  .then(function (response) {
        let a = false;
        email_p.innerHTML = ' The Email field is required'
        const users = response.data;
        for(let i = 0 ; i < users.length ; i++){
            if( registration_input[1].value == users[i].email){
                a = true;
            }
        }
console.log(a)
        if(a) {
            email_p.innerHTML = ' This email has already used'
            email_p.style.display = 'block';
        } else {
            saveInDb();
        }
       
  })
  .catch(function (error) {
    console.log('error',error);
  })

}

function saveInDb() {

    axios.post('http://localhost:3000/register', {
        password: registration_input[2].value,
        email: registration_input[1].value,
        name: registration_input[0].value
  })
  .then(function (response) {
    console.log(response);
    window.location.href = 'users.html'
  })
  .catch(function (error) {
    console.log(error);
  });
}

let login_link = document.getElementById('login_link');
let users_link = document.getElementById('users_link');
login_link.addEventListener('click',goToLoginPage);
users_link.addEventListener('click',goToUsersPage);

function goToLoginPage(){
    window.location = `login.html`
}
function goToUsersPage(){
    window.location = `users.html`
}














