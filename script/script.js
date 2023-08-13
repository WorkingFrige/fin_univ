const burger = document.getElementById('burger'),
    nav = document.getElementById('nav'),
    header = document.getElementById('header'),
    closePopupBtns = document.querySelectorAll('.closePopup'),
    openConsultPopup = document.querySelectorAll('.open-consult-popup'),
    popups = document.querySelectorAll('.popup'),
    accordionOpen = document.querySelectorAll('.accordion-open'),
    addActiveElements = document.querySelectorAll('.open_able'),
    navFilterList = document.querySelectorAll('.nav__filter-item_list'),
    navFilterActive = document.querySelectorAll('.nav__filter-item_active'),
    smoothLinks = document.querySelectorAll('.smooth-link');


if (smoothLinks.length > 0) {
    smoothLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

            // if (burgerMenu.classList.contains('active')) {
            //   document.body.classList.remove('lock');
            //   burgerMenu.classList.remove('active');
            //   burgerNav.classList.remove('active');
            // }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}


burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    header.classList.toggle('active');
});

document.querySelectorAll('.ourworksblock .slick-slide .title').forEach((element) => {
    element.addEventListener('click', () => element.classList.toggle('active'));
});

addActiveElements.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filterEl')) {
            if (e.target.parentNode.classList.contains('nav__filter-item') || e.target.tagName === 'IMG') {
                let et = e.target.parentNode;
                if (e.target.tagName === 'IMG') et = e.target.parentNode.parentNode;
                document.querySelector('.nav__filter').querySelectorAll('.nav__filter-item').forEach(el => {
                    if (el !== et) {
                        el.classList.remove('active');
                    } else et.classList.toggle('active');
                });
            } else {
                element.classList.toggle('active');
            }
        } else {
            navFilterActive.forEach((navFilter) => {
                // console.log(e.target.id);
                const idToRemove = e.target.dataset.filter
                navFilter.querySelector(`li[data-filter='${idToRemove}']`).remove();
                navFilterList.forEach((navFilterItem) => {
                    console.log(idToRemove)
                    navFilterItem.querySelectorAll(`ul li label input`).forEach((filterInput) => {
                        if (filterInput.value === idToRemove) filterInput.checked = false;
                    });
                });
                // activeElementsList.push(navFilterInput.value)
            });
        }
    });
});


openConsultPopup.forEach((element) => {
    element.addEventListener('click', () => {
        document.body.classList.add('lock');
        document.getElementById('consultPopup').classList.add('active');
    });
});


closePopupBtns.forEach((element) => {
    element.addEventListener('click', () => {
        popups.forEach((popup) => {
            popup.classList.remove('active');
            document.body.classList.remove('lock');
        });
    });
});


const activeElementsList = []


navFilterList.forEach((navFilterListItem) => {
    navFilterListItem.querySelectorAll('ul li label input').forEach((navFilterInput) => {
        navFilterInput.addEventListener('change', () => {
            if (navFilterInput.checked) {
                navFilterActive.forEach((navFilter) => {
                    let li = document.createElement('li');
                    li.textContent = navFilterInput.value;
                    li.classList.add('filterEl');
                    li.dataset.filter = navFilterInput.value;
                    navFilter.appendChild(li);
                    // activeElementsList.push(navFilterInput.value)
                });
                // activeElementsList.push(navFilterInput.value)
            } else if (!navFilterInput.checked) {
                navFilterActive.forEach((navFilter) => {
                    if (navFilter.querySelector(`li[data-filter='${navFilterInput.value}']`)) {
                        navFilter.querySelector(`li[data-filter='${navFilterInput.value}']`).remove();
                    }
                });
            }
            // console.log(activeElementsList)
        });
    });
});


accordionOpen.forEach((element) => {
    element.addEventListener('click', () => {
        element.classList.toggle('active');
    });
});


if (window.innerWidth <= 1299) {
    const swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 100,
        centeredSlides: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
}

if (document.querySelector('.enroll-page')) {
    const enrollForm = document.querySelector('.enroll__form');
    const type_radios = enrollForm.querySelectorAll('[name="person_type"]');

    enrollForm.addEventListener('change', () => {
        if (type_radios[0].checked) {
            enrollForm.querySelector('.enroll__form-inputs_top .enroll__form-inputs_item:last-child').style.display = 'none';
            enrollForm.querySelector('.enroll__form-inputs_top .enroll__form-inputs_item:last-child').removeAttribute('required');
            enrollForm.querySelector('.enroll__form-inputs_top .enroll__form-inputs_item:first-child').placeholder = 'ФИО';
        } else {
            enrollForm.querySelector('.enroll__form-inputs_top .enroll__form-inputs_item:last-child').style.display = 'block';
            enrollForm.querySelector('.enroll__form-inputs_top .enroll__form-inputs_item:last-child').setAttribute('required', true);
            enrollForm.querySelector('.enroll__form-inputs_top .enroll__form-inputs_item:first-child').placeholder = 'Название организации';
        }
    });

    if (window.innerWidth <= 449) {
        const promoCard = document.querySelector('.promo');

        promoCard.querySelector('.promo__card-subtitle').style.display = 'none';
        promoCard.querySelector('.promo__card-title').textContent = 'Стоимость программы: ';
        promoCard.querySelector('.promo__card-description').textContent = 'Программа доступна для физических и юридических лиц';
    }
}
// for (radio of type_radios) {
//     if (radio.value = 'Физ. лицо'.checked) {
//         console.log(1)
//     } else {
//         console.log(2)
//     }
// }