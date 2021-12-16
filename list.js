let position = [ // 기본 위치. 1번부터 3번까지 위치를 이미지 크기에 맞추어 조절해주세요
    -200, 
    -85,
    155,
    395,
    510
];

let nowPos = [0,0,0,0];

let scaleVal = [
    0,
    0.4,
    0.6,
    0.4,
    0
];

let nowScale = [0,0,0,0];

let itemSrc = [
    'img/curry1.png',
    'img/curry2.png',
    'img/curry3.png',
    'img/curry4.png',
    'img/curry5.png'
];

let myAni;
let direction;
let isAni;
let stopVal; // 애니메이션 멈추기 위한 값

const listItem = document.querySelectorAll('.list'); // 리스트
const arrowLeft = document.querySelector('#leftArrow');
const arrowRight = document.querySelector('#rightArrow');

arrowLeft.addEventListener('click', clickLeft); // 좌우 이벤트 등록
arrowRight.addEventListener('click', clickRight);

init();

function init() //시작함수
{
    resetPos();
}

function resetPos()
{
    listItem[0].style.left = position[1] + 'px';
    listItem[1].style.left = position[2] + 'px';
    listItem[2].style.left = position[3] + 'px';

    nowPos[0] = position[1];
    nowPos[1] = position[2];
    nowPos[2] = position[3];

    listItem[0].style.transform = 'scale('+scaleVal[1]+')';
    listItem[1].style.transform = 'scale('+scaleVal[2]+')';
    listItem[2].style.transform = 'scale('+scaleVal[3]+')';

    nowScale[0] = scaleVal[1];
    nowScale[1] = scaleVal[2];
    nowScale[2] = scaleVal[3];

    listItem[3].style.transform = 'scale(0)'; // 마지막 리스트

    listItem[0].style.background = 'url('+ itemSrc[0]+')';
    listItem[1].style.background = 'url('+ itemSrc[1]+')';
    listItem[2].style.background = 'url('+ itemSrc[2]+')';
}



function clickLeft()
{
    if(!isAni)
    {console.log('click Left');
        listItem[3].style.left = position[4] + 'px';
        nowPos[3] = position[4];
        nowScale[3] = 0;
        listItem[3].style.background = 'url('+ itemSrc[3]+')';
        direction = 'left';
        makeAni();
    }
}

function clickRight()
{
    if(!isAni)
    {console.log('click Right');
        listItem[3].style.left = position[0] + 'px';
        nowPos[3] = position[0];
        nowScale[3] = 0;
        listItem[3].style.background = 'url('+ itemSrc[itemSrc.length-1]+')';
        direction = 'right';
        makeAni();
    }
}

function makeAni()
{
    if(direction == 'left')
    {
        for(let i=0; i<4; i++)
        {
            nowPos[i] += (position[i] - nowPos[i]) * 0.1;
            nowScale[i] += (scaleVal[i]-nowScale[i]) * 0.1;
            listItem[i].style.left = nowPos[i] + 'px';
            listItem[i].style.transform = 'scale('+nowScale[i]+')';;
        }
        stopVal = position[0] - nowPos[0];
    }
    else if(direction == 'right')
    {
        console.log('right ani');
        for(let i=0; i<3; i++)
        {
            nowPos[i] += (position[i+2] - nowPos[i]) * 0.1;
            nowScale[i] += (scaleVal[i+2]-nowScale[i]) * 0.1;
            listItem[i].style.left = nowPos[i] + 'px';
            listItem[i].style.transform = 'scale('+nowScale[i]+')';;
        }
        nowPos[3] += (position[1] - nowPos[3]) * 0.1; // 3번 list 따로 설정
        nowScale[3] += (scaleVal[1]-nowScale[3]) * 0.1;
        listItem[3].style.left = nowPos[3] + 'px';
        listItem[3].style.transform = 'scale('+nowScale[3]+')';

        stopVal = position[1] - nowPos[3];
        console.log(stopVal);
    }

    if(Math.abs(stopVal)<0.1)
    {
        cancelAnimationFrame(myAni);
        isAni = false;
        if(direction == 'left')
        {
            itemSrc.push(itemSrc[0]); 
            itemSrc.shift();
        }
        else if(direction == 'right')
        {
            itemSrc.unshift(itemSrc[itemSrc.length-1]); 
            itemSrc.pop();
        }
        
        resetPos();
    }
    else
    {
        isAni = true;
        myAni = requestAnimationFrame(makeAni);
    }
}

