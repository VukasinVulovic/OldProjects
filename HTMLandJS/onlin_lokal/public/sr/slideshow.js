function slideShow() {
    const slideshow_text = [
        'Optički pristup serverima%$%Naši serveri su opremljeni sa optičkim kablovima i opremom.',
        'Pouzdani serveri%$%Naše usluge će vam uvek biti dostupne, <br>naši serveri su povezani putem UPS napajanaja i <br>imaju bezbednostni softver koji ih štiti od pokušaja hakovanja.',
        'Bezbedno mesto za vaše podatke%$%Mi brinemo o vašim podacima, <br>serveri su fizički na bezbedoj lokaciji i svaki harddisk je enkriptovan.'
    ];
    const image = document.querySelector('.product-slideshow');
    const dots = document.querySelectorAll('.product-slideshow .dot');
    let prev = dots[0];
    let i = 0;
    let t = 0;

    function changeImage() {
        const title = document.querySelector('.product-slideshow .product-title');
        const text = document.querySelector('.product-slideshow .product-text');
        if(i >= dots.length)
            i = 0;
        [title.innerHTML, text.innerHTML] = slideshow_text[i].split('%$%');
        image.setAttribute('style', 'background: url(assets/images/products/' + dots[i].title + '); background-size: cover;');
        prev.setAttribute('class', 'far fa-circle dot');
        dots[i].setAttribute('class', 'fas fa-circle dot');
        prev = dots[i];
    }

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            t = 0;
            for(let j = 0; j < dots.length; j++) {
                if(dots[j] === e.target)
                    i = j;
            }
            changeImage(); 
        });
    });

    setInterval(() => {
        if(window.scrollY > 300)
            return;
        if(++t >= 400) {
            i++;
            changeImage();
            t = 0;
        }
    }, 10);
}

$(window).scroll(function() {
    const scroll_top = $(this).scrollTop();
        $('.product-slideshow').css({
        opacity: function() {
            const height = $(this).height();
            return ((height - scroll_top) / height);
        }
    });
});

slideShow();