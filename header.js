let toggleBtn = document.querySelector('#toggleBtn');
let menuList = document.querySelector('.menuBarItems');
let link = document.querySelector('.menuBarLink');

toggleBtn.addEventListener('click', clickFn);

function clickFn()
{
    menuList.classList.toggle('active');
    link.classList.toggle('active');
}

