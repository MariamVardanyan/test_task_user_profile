const params = new URLSearchParams(window.location.search);
let id = params.get('id');
let img = document.getElementById('img');
let user_name = document.getElementById('user_name');
let user_email = document.getElementById('user_email');
let comment = document.getElementById('comment');
let about_name = document.getElementById('about_name');
let save_btn = document.getElementById('save_btn');
save_btn.addEventListener('click',saveUserDescription)
axios.get(`http://localhost:3000/users/${id}`)
  .then(function (response) {
      if(!(response.data && response.data[0])) return false;
      user_email.innerHTML = 'email: '+response.data[0].email;
      user_name.innerText = response.data[0].name;
      about_name.innerHTML = response.data[0].name;
      img.src = (!response.data[0].image) ? 'images/users/default.jpeg'  : 'images/users/'+response.data[0].image;
      img.style.display = "block";
      if(response.data[0].description) {
         comment.value = response.data[0].description
      }
  })
  .catch(function (error) {
    console.log(error);
  })


function saveUserDescription() {

    axios.post(`http://localhost:3000/users/description/${id}`, {
    text: comment.value,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

















