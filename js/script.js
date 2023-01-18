"use strict"
//ждем загрузку контента
window.onload = function() {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector ('.parallax__container');
        const clouds  = document.querySelector ('.images-parallax__clouds');
        const forest  = document.querySelector ('.images-parallax__forest');
        const man     = document.querySelector ('.images-parallax__man ');

        //коэффициенты
        const forClouds = 40;
        const forForest = 20;
        const forMan = 10;

        //Скорость анимации
        const speed = 0.05;

        //Объявление переменных
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;


            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            //Передаём стили внутрь объекта
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
            forest.style.cssText = `transform: translate(${positionX / forForest}%,${positionY / forForest}%);`;
            man.style.cssText    = `transform: translate(${positionX / forMan}%,${positionY / forMan}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();
        parallax.addEventListener("mousemove",function(e) {

            //получение ширины и высоты блока
            const parallaxWidth  = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;


            //Когда курсор в середине экрана, делаем ноль в центр
            const coordX = e.pageX - parallaxWidth /2;
            const coordY = e.pageY - parallaxHeight /2;

            //Получаем проценты
            coordXprocent = coordX / parallaxWidth * 100;
            coordXprocent = coordY / parallaxHeight * 100;
        });
        
//Parallax при скроле

let thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) { 
    thresholdSets.push(i);
    }
    const callback = function (entries, observer) {
        const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100; 
        setParallaxItemsStyle(scrollTopProcent);
    };
    const observer = new IntersectionObserver(callback, { 
        threshold: thresholdSets
    });

observer.observe(document.querySelector('.content'));

function setParallaxItemsStyle(scrollTopProcent) {
    content.style.cssText              = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
    forest.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
    man.parentElement.style.cssText    = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
        }
    }
}

