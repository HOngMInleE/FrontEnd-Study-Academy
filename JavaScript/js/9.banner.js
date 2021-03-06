// 필요한 요소들을 객체화.

var banner = document.getElementById('banner');
var img = document.getElementsByTagName('img'); // img 에 id, class 속성이 없어서 TagName 메소드로 가져옴.
var toggle = document.getElementById('toggle'); // Elements 's'가 붙으면 배열형태로 가져와짐.
var sound_btn = document.getElementById('sound_btn');

var banner_height = getComputedStyle(banner).height;
// console.log(banner_height); // 190px 나옴   //banner.active 의 height값.

// 각자 다른 값으로 떨어지는 풍선

var cast = [];

function set_balloon(num) { // num(매개변수) = 풍선 10개에 대한 정보를 이 번호로 구분할것이다.

    var x = Math.floor(Math.random() * (500 - 10) + 10),
        y = Math.floor(Math.random() * (400 - 120) + 120),
        size = Math.floor(Math.random() * (200 - 100) + 100),
        angle = Math.floor(Math.random() * (360 - 0) + 0),
        speed = Math.random() * (2 - 0) + 0;

    cast[num] = {   // 객체 형식. / 변수 여러개를 묶어서 처리할 수 있는 형식.
        x: x,           // 만드는 방법 : 함수생성, 괄호로 만드는 방식, 
        y: -y,      // 10개 모두 값이 고정, 다 다르게 하기 위해 예측불가능한 '난수'를 사용.
        size: size,        // 난수가 (x,y)값이 넓이에 벗어나지 않게 설정해야함.
        angle: angle,
        speed: speed
    }
}

// function set_balloon(num){

//     var x = Math.floor(Math.random() * (500 - 10) + 10),
//       y = Math.floor(Math.random() * (400 - 120) + 120),
//       size = Math.floor(Math.random() * (200 - 100) + 100),
//       angle = Math.floor(Math.random() * (360 - 0) + 0),
//       speed = Math.random() * (2 - 0) + 0;

//     cast[num] = {
//         x:x,
//         y:-y,
//         size:size,
//         angle:angle,
//         speed:speed
//     }
// }

function ball_init() {
    for (i = 0; i < img.length; i++) {
        set_balloon(i);
        img[i].style.left = '-9999px';  // 화면에 보이지 않게됨.
        img[i].style.top = '-9999px';
    }
}

function animate_balloon() {
    for (i = 0; i < img.length; i++) {
        img[i].style.left = cast[i].x + 'px';  // cast 라는 변수의 x라는 객체를 가져옴. / 움직이게 될 x 좌표값.
        img[i].style.top = cast[i].y + 'px';    // style, css 속성이기 떄문에 단위설정. ex) "px"
        img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)'; // 회전각도를 구성하는 css 속성.

        if (cast[i].y < parseInt(banner_height)) {
            cast[i].y += 1 + cast[i].speed;  // 떨어지는 속도 값 
            cast[i].angle += cast[i].speed;  // 돌아가는 앵글값    
        } else {
            set_balloon(i); // 떨어진 풍선의 값 초기화.(원래 상태로)
        }
    }
}

// function animate_balloon(){
//     for(i=0; i < img.length;i++){
//         img[i].style.left = cast[i].x + 'px';
//         img[i].style.top = cast[i].y + 'px';
//         img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)'

//         if(cast[i].y < parseInt(banner_height)){
//             cast[i].y += 1 + cast[i].speed;
//             cast[i].angle += cast[i].speed;
//         }else{
//             set_balloon(i);
//         }
       
//     }
// }

// 오디오 실행 함수
function bgm_init() {
    var bgm = new Audio();
    bgm.src = 'images/bgm.mp3';         // .. 붙이지 않아도 잘 됨. 이유는?      // html에 넣을 값이기 때문에 html 이 기준이 됨.
    bgm.loop = true;
    bgm.volume = 0.1;
    document.body.appendChild(bgm);        // body태그에 child 를 추가할건데 append 할거다(마지막에 두겠다.)
}





ball_init();
setInterval(function () {
    animate_balloon();
}, 1000 / 30);
bgm_init();

sound_btn.onclick = function(event) {
    var attr = sound_btn.getAttribute('class');     // getAttribute = 특정 속성을 가져와달라.
    var bgm = document.getElementsByTagName('audio');
    if (attr == 'active') {
        sound_btn.removeAttribute('class');
        sound_btn.setAttribute('src','images/sound_off.png');   // .. 붙이지 않아도 잘 됨. 이유는? // html에 넣을 값이기 때문에 html 이 기준이 됨.
        bgm[0].pause();
    } else {
        sound_btn.setAttribute("class","active");
        sound_btn.setAttribute("src","images/sound_on.png");
        bgm[0].play();
    }
    event.stopPropagation();
}

toggle.onclick = function () {
    var attr = banner.getAttribute('class');
    if (attr == "active") {
        banner.removeAttribute("class");
        toggle.innerHTML = "배너 열기";
        return false;                       // a 태그가 실행되지 않게 하겠다.
    } else {
        banner.setAttribute("class", "active");
        toggle.innerHTML = "배너 닫기";
        return false;
    }
}

banner.onclick = function () {
    window.open("http://www.naver.com","");

    // var attr = banner.getAttribute("class");
    // if ( attr == "active") {
    //     banner.
    //     banner.getAttribute("href", "https://www.naver.com")
    // }
}