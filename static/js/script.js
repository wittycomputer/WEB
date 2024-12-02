document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 스크롤 부분 - 인기 캠핑장 추천 부분
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// 메인 태그 선택
const main = document.querySelector('.main');

// 슬라이드 이미지 배열
const images = [
    "static/img/main.jpg",          // 첫 번째 이미지
    "static/img/gongju_hanok.jpg",  // 두 번째 이미지
    "static/img/barbeque.png",      // 세 번째 이미지
    "static/img/lohas_camping.jpg", // 네 번째 이미지
    "static/img/seogwipo.jpg",      // 다섯 번째 이미지
    "static/img/surfer_beach.jpg"   // 여섯 번째 이미지
];

// 현재 슬라이드 인덱스
let currentIndex = 0;

// 두 개의 배경 레이어 생성
const layer1 = document.createElement('div');
const layer2 = document.createElement('div');

// 공통 레이어 스타일 설정
[layer1, layer2].forEach(layer => {
    layer.style.position = 'absolute';
    layer.style.top = '0';
    layer.style.left = '0';
    layer.style.width = '100%';
    layer.style.height = '100%';
    layer.style.backgroundSize = 'cover';
    layer.style.backgroundPosition = 'center';
    layer.style.transition = 'opacity 1.5s ease-in-out'; // 부드러운 전환 효과
    layer.style.opacity = '0'; // 기본적으로 숨김
    main.appendChild(layer);
});

// 초기 상태 설정
layer1.style.backgroundImage = `url('${images[0]}')`;
layer1.style.opacity = '1'; // 첫 번째 레이어 표시

// 슬라이드 변경 함수
function changeBackground() {
    const currentLayer = currentIndex % 2 === 0 ? layer1 : layer2; // 현재 레이어
    const nextLayer = currentIndex % 2 === 0 ? layer2 : layer1;   // 다음 레이어

    currentIndex = (currentIndex + 1) % images.length; // 다음 슬라이드 인덱스
    nextLayer.style.backgroundImage = `url('${images[currentIndex]}')`; // 다음 이미지 설정
    nextLayer.style.opacity = '1'; // 다음 레이어 표시
    currentLayer.style.opacity = '0'; // 현재 레이어 숨김
}

// 6초마다 슬라이드 변경
setInterval(changeBackground, 5000);

function playInIframe(url) {
    const iframe = document.getElementById('musicPlayer');
    iframe.src = url; // Set the iframe's source to the music/playlist URL
    iframe.style.display = 'block'; // Show the iframe
}
