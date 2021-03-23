

axios.get('http://localhost:3000/users')
  .then(function (response) {
    let table = document.getElementById('table');
    let tBody = document.createElement ("tbody");
    table.appendChild (tBody);
    let row = tBody.insertRow(0);
    
    const attributes = ['email', 'name', 'id']
    for(let i = 0 ; i < response.data.length ; i++) {
        let row = tBody.insertRow(0);
        row.setAttribute("user", response.data[i].id);
        row.style.cursor = 'pointer'
        row.addEventListener('click' , gotoProfilePage)
        for(let j = 0 ; j < 3 ; j++) {
            let cells = row.insertCell(0);
            cells.innerText = response.data[i][attributes[j]]
        }
        
    }
  })
  .catch(function (error) {
    console.log(error);
  })

function gotoProfilePage(e) {
    const user = e.currentTarget.getAttribute("user");
    window.location = `profilePage.html?id=${user}`;
}