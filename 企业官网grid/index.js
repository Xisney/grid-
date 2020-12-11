// 监听header下拉
const header = document.querySelector('header');
const scrollToTop = document.querySelector('.scrollToTop')

window.addEventListener('scroll', function () {
  if (window.scrollY > 800) {
    if (!header.classList.contains('sticky')) {
      header.classList.add('sticky')
    }
  } else {
    header.classList.remove('sticky')
  }
  if (window.scrollY > 1500) {
    scrollToTop.style.display = 'block';
  } else {
    scrollToTop.style.display = 'none';
  }
})



const glide = new Glide('.glide');
const captionEls = document.querySelectorAll('.slide-caption');

// 监听回调
glide.on(['mount.after', 'run.after'], () => {
  // 获取当前元素并进行动画
  const caption = captionEls[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0]
  })
})

glide.on('run.before', () => {
  document.querySelectorAll('.slide-caption>*').forEach(el => {
    el.style.opacity = 0
  })
})

// 渲染轮播图
glide.mount();

const isotope = new Isotope('.cases', {
  itemSelector: '.case-item',
  layoutMode: 'fitRows'
})

const showcaseBtns = document.querySelector('.showcase-btns');
showcaseBtns.addEventListener('click', (e) => {
  const { target } = e;
  const filterOptions = target.dataset.filter;
  if (filterOptions) {
    showcaseBtns.querySelectorAll('.showcase-btn.active').forEach(e => {
      e.classList.remove('active');
    })
    target.classList.add('active');
    isotope.arrange({
      filter: filterOptions
    })
  }
})

const scrollOptions = {
  delay: 300,
  duration: 500,
  distance: '50px',
  easing: 'ease-in-out',
  origin: 'bottom'
}

ScrollReveal().reveal('.feature', { ...scrollOptions, interval: 350 });
ScrollReveal().reveal('.service-item', { ...scrollOptions, interval: 350 });


const bgc = document.querySelector('.data-section')
ScrollReveal().reveal('.data-section', {
  beforeReveal() {
    anime({
      targets: '.data-price .num',
      innerHTML: el => {
        return [0, el.innerHTML]
      },
      round: 1,
      duration: 2000,
      easing: 'easeInExpo'
    })
    bgc.style.backgroundPosition = `center calc(50% - ${bgc.getBoundingClientRect().bottom/5}px)`
    
  }
})

// 视差滚动
window.addEventListener('scroll', function () {
  const bgcRect = bgc.getBoundingClientRect();
  // 元素在视口之内时，调整背景图位置
  if (bgcRect.bottom >= 0 && bgcRect.top <= window.innerHeight) {
    bgc.style.backgroundPosition = `center calc(50% - ${bgcRect.bottom/5}px)`
  }
})

// 锚点定位，平滑滚动
const scroll=new SmoothScroll('nav a[href^="#"], .scrollToTop a[href^="#"]',{
  header:"header",
  offset:80
})

const exploreBtns = document.querySelectorAll('.explore-btn');
exploreBtns.forEach(el=>el.onclick=function(){
  scroll.animateScroll(document.querySelector("#about-us"))
})

// 响应式导航
const burger = document.querySelector('.burger');
burger.addEventListener('click',function(){
  header.classList.toggle('open')
})