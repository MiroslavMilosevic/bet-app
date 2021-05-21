console.log('admin script');
let addUserButtons = document.getElementsByClassName('delete-button');

for(let i = 0;i<addUserButtons.length;i++){ 
    addUserButtons[i].addEventListener('click',()=>{
        console.log(addUserButtons[i].dataset.id);
    })
}