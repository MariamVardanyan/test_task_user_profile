 let email_p = document.getElementById('email_p');

login_btn = document.getElementById('login_btn') ;
login_btn.disabled = true ;
let login_input_val = document.getElementsByClassName('login_input');
for(let j = 0 ; j < login_input_val.length ; j++){
    login_input_val[j].addEventListener("focusout" , login_validation);
    login_input_val[j].addEventListener("change" , change_func);
}

function login_validation(){
    let a = false
    let pass_p = document.getElementById('pass_p');
    email_p.style.display ="none";
    pass_p.style.display ="none"
        if(login_input_val[1].value.length < 4){
            pass_p.style.display ="block"
    }
    let email_ends_array = ['gmail.com' , 'yahoo.com' , 'list.ru' , 'bk.ru' , 'mail.ru'];
    
    if(login_input_val[0].type == 'email' ) {
       let end_index = login_input_val[0].value.substring(login_input_val[0].value.indexOf('@') + 1);
        if(login_input_val[0].value.split('@')[0] == "" || !login_input_val[0].value.includes("@") ||      login_input_val[0].value.match(/@/g).length !== 1 || !email_ends_array.includes(end_index))
        {
            a=true
        }
        
        if(a) {
            email_p.innerHTML = ' The Email field is required';
            email_p.style.display ="block";
        }
    }
}

function change_func(){
    login_btn.disabled = true ;
    let a = false
    let email_ends_array = ['gmail.com' , 'yahoo.com' , 'list.ru' , 'bk.ru' , 'mail.ru'];
    
    if( login_input_val[0].type == 'email' && login_input_val[0].value.match(/@/g) && login_input_val[0].value.match(/@/g).length == 1 && login_input_val[1].value.length>3) {
        let end_index = login_input_val[0].value.substring(login_input_val[0].value.indexOf('@') + 1);
        
        if(email_ends_array.includes(end_index)) {
           a = true;
        }
    }
    
    if(a) {
        login_btn.disabled = false ;
    }
}


login_btn.addEventListener('click' , login_func);

function login_func(){
    axios.post('http://localhost:3000/login', {
        email: login_input_val[0].value,
        password: login_input_val[1].value
    })
      .then(function (response) {
        console.log(response)

            email_p.innerHTML = 'The Email field is required'
            const user = response.data;
          
            if(!user) {
                email_p.innerHTML = ' Invalid email or password'
                email_p.style.display = 'block';
            } else {
                window.location.href = 'profilePage.html'
            }
      })
      .catch(function (error) {
        // handle error
        console.log('error',error);
      })

}

let users_link = document.getElementById('users_link');
let register_link = document.getElementById('register_link');
users_link.addEventListener('click',goToUsersPage);
register_link.addEventListener('click',goToRegisterPage)
function goToUsersPage(){
    window.location = `users.html`
}
function goToRegisterPage(){
    window.location = `register.html`
}








