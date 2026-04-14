/*==================
    ローディング
==================*/
const loading1 = document.querySelector('.loading1');
const loading2 = document.querySelector('.loading2');
const loadingText = document.querySelector('.loading-text');

loadingText.animate([
    { opacity: 0, transform: 'translate(-50%, -200%)'},
    { opacity: 1, transform: 'translate(-50%, -60%)'},
],{
    duration: 1000,
    easing: 'ease-out',
    fill: 'forwards'
})

setTimeout(function(){
    loading1.classList.add('fadeOut');
},2000);


loading2.animate([
        { opacity: 1, transform: 'translateY(100vh)' },
        { opacity: 0, transform: 'translateY(-100vh)' },
    ],
    {
        delay: 2000,
        duration: 1500,
        easing: 'ease-out',
        fill: 'forwards'
    }
);

/*======================
    ハンバーガーボタン
========================*/
const hamburagerBtn = document.querySelector('.hamburger-button');
const hamburagerMenu = document.querySelector('.hamburger-menu');
const hamburagerMenuItems = document.querySelectorAll('.hamburger-menu__lists li');

hamburagerBtn.addEventListener('click', () => {

    const isOpen = hamburagerBtn.getAttribute('aria-expanded');

    if(hamburagerBtn.classList.contains('active')) {
        hamburagerBtn.classList.remove('active');
        hamburagerMenu.classList.remove('fade');

        hamburagerBtn.setAttribute('aria-expanded', isOpen);
        hamburagerMenu.setAttribute('aria-hidden', !isOpen);
    } else {
        hamburagerBtn.classList.add('active');
        hamburagerMenu.classList.add('fade');

        hamburagerBtn.setAttribute('aria-expanded', !isOpen);
        hamburagerMenu.setAttribute('aria-hidden', isOpen);
    }

    if(hamburagerMenu.classList.contains('fade')) {
        hamburagerMenuItems.forEach((item,index) => {
            item.classList.remove('is-show');

            setTimeout(() => {
                item.classList.add('is-show');
            }, index * 300)
        })
    } else {
        hamburagerMenuItems.forEach((item,inedx) => {
            item.classList.remove('is-show');
        });
    }
});

document.addEventListener('click', (e) => {
    if(hamburagerMenu.contains(e.target) || hamburagerBtn.contains(e.target)) {
        return;
    } else {
        hamburagerBtn.classList.remove('active');
        hamburagerMenu.classList.remove('fade');
    }
})

/*======================
    メインビジュアル
========================*/
const mainVisualText = document.querySelector('.main-visual__textTrack p');

/*======================
    スライドショー
========================*/
const prev = document.querySelector('.main-visual__navigator--prev');
const next = document.querySelector('.main-visual__navigator--next');
const track = document.querySelector('.main-visual__track');
const slides = document.querySelectorAll('.main-visual__slide');
const indicators = document.querySelectorAll('.main-visual__indicator span')
let current = 0;

function updateSlider() {
    track.style.transform = `translateX(-${current * 100}%)`;

    indicators.forEach((indicator) => {
        indicator.classList.remove('colorChange');
    })

    indicators[current].classList.add('colorChange');
}

next.addEventListener('click', () => {
    if(current < slides.length -1) {
        current++;
    } else {
        current = 0;
    }
    updateSlider();
});

prev.addEventListener('click', () => {
    if(current > 0) {
        current--;
    } else {
        current = slides.length - 1;
    }

    updateSlider();
})

indicators.forEach((indicator,index) => {
    indicator.addEventListener('click', () => {
        current = index;
        updateSlider();
    })
})

setInterval(() => {
    if(current < slides.length - 1) {
        current++;
    } else {
        current = 0;
    }

    updateSlider();
},5000);

updateSlider();
/*======================
    スクロール
========================*/
const mainGuideLists = document.querySelectorAll('.main-guide__lists');

function showGuideLists(entries,observer) {
    entries.forEach((entry) => {

        if(entry.isIntersecting)  {
            entry.target.classList.add('is-show');
        } else {
            entry.target.classList.remove('is-show');
        }
    })
}

const guideObserver = new IntersectionObserver(showGuideLists);

mainGuideLists.forEach((mainGuideList) => {
    guideObserver.observe(mainGuideList);
})

const scrollBtn = document.querySelector('.scroll-btn');

window.addEventListener('scroll', () => {

    if(window.scrollY > 600) {
        scrollBtn.classList.add('is-show');
    } else {
        scrollBtn.classList.remove('is-show');
    }
})

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})
/*======================
    モーダルウィンドウ
========================*/
//①エントリーボタンでモーダルウィンドウの表示 .is-showクラス付与
//②上部クローズボタンでモーダルウィンドウを閉じる .is-closeクラス付与
//③送信ボタンを押してテキスト入力が間違っていたらエラーメッセージの表示 includes()メソッド
//④送信完了メッセージの表示 表示されたらモーダルウインドウは非表示3秒後消えるように作る

const recruitmentButtons = document.querySelectorAll('.main-recruitment__button');
const modal = document.querySelector('.main-course__modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseButton = document.querySelector('.main-course__modal-button--close');

recruitmentButtons.forEach((recruitmentButton) => {
    recruitmentButton.addEventListener('click', () => {

        if(!modal.classList.contains('is-show') && !modalOverlay.classList.contains('is-show')) {
            modal.classList.add('is-show');
            modalOverlay.classList.add('is-show');

            modal.setAttribute('aria-hidden', 'false');
        }
    })
})

modalCloseButton.addEventListener('click', () => {

    if(modal.classList.contains('is-show') && modalOverlay.classList.contains('is-show')) {
        modal.classList.remove('is-show');
        modalOverlay.classList.remove('is-show');

        modal.setAttribute('aria-hidden', 'true');
    }
})

const form = document.querySelector('.form');
const errorMessage = document.querySelector('.main-course__modal__message--error');
const inputName = document.querySelector('.main-course__modal-input__text--name');
const inputEmail = document.querySelector('.main-course__modal-input__email');
const inputMonth = document.querySelector('.main-course__modal-input__month');
const inputDay = document.querySelector('.main-course__modal-input__day');
const inputUser = document.querySelector('.main-course__modal-input__text--user');
const inputCourse = document.querySelector('.main-course__modal-input__course');
const message = document.querySelector('.main-course__modal__message');
const inputCheck = document.querySelector('.main-course__modal-input__check');
const submit = document.querySelector('.main-course__modal-input__submit');
const successMessage = document.querySelector('.main-course__modal__message--success');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const month = inputMonth.value;
    const day = inputDay.value;
    const user = inputUser.value.trim();
    const course = inputCourse.value;
    const checked = inputCheck.checked; 

    if(name === "") {
        errorMessage.textContent = "※お名前を入力してください";
    } else if(email === "") {
        errorMessage.textContent = "※メールアドレスを入力してください";
    } else if(month === "" || day === "") {
        errorMessage.textContent = "※参加日を選択してください";
    }else if(user === "") {
        errorMessage.textContent = "※参加人数を入力してください";
    } else if(course === "") {
        errorMessage.textContent = "※コースを選択してください";
    } else if(!checked) {
        errorMessage.textContent = "※利用規約に同意してください";
    } else {
        successMessage.classList.add('is-show');

        setTimeout(function(){
            successMessage.classList.remove('is-show');
            modal.classList.remove('is-show');
            modalOverlay.classList.remove('is-show');
            errorMessage.textContent = "";
            form.reset();
        }, 2000);
    }
})