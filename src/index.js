import './index.html';
import './catalog.html';
import './product.html';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'nouislider/dist/nouislider.min.css';
import noUiSlider from 'nouislider';
import './index.scss';

if (document.body.getAttribute('page') == 1) {
  Review();
}

if (document.body.getAttribute('page') == 2) {
  Category();
  Tags();
  RemoveAllTags();
  Pagination();
  CatalogTags();
}

if (document.body.getAttribute('page') == 3) {
  ColorProduct();
  MemoryProduct();
  ColorBtns();
}

function Header() {
  const headerMain = document.querySelector('.header__main');
  document.addEventListener('scroll', () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > headerMain.getBoundingClientRect().bottom) {
      headerMain.classList.add('header__main--active');
    } else {
      headerMain.classList.remove('header__main--active');
    }
  })
}
Header();

function FilterSearch() {
  const filterSelect = document.querySelectorAll('.filter-select');
  const filterInput = document.querySelectorAll('.filter-select-input');
  filterInput.forEach((item, index) => {
    const checkbox = filterSelect[index].querySelectorAll('.filter__item-checkbox');
    const noResult = filterSelect[index].querySelector('.no-result');

    item.addEventListener('input', () => {
      const searchText = item.value.toLowerCase();
      let foundResult = false;
      checkbox.forEach(node => {
        const checkboxText = node.innerText.toLowerCase();
        if (checkboxText.includes(searchText)) {
          node.parentNode.style.display = 'block';
          foundResult = true;
        } else {
          node.parentNode.style.display = 'none';
        }
      })
      if (!foundResult) {
        noResult.style.display = 'block';
        item.nextElementSibling.style.display = 'none';
      } else {
        noResult.style.display = 'none';
        item.nextElementSibling.style.display = 'block';
      }
    })
  })
}
FilterSearch();

function ChoiceAll() {
  const choiceBtn = document.querySelectorAll('.filter-select-btn');
  choiceBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      item.classList.toggle('filter-btn--active');
      const checkbox = item.parentElement.nextElementSibling.querySelectorAll('.filter-checkbox');
      checkbox.forEach(node => {
        node.classList.toggle('checkbox--checked');
        node.checked = 0;
      })
      const checked = item.parentElement.nextElementSibling.querySelectorAll('.checkbox--checked');
      checked.forEach(element => {
        element.checked = 1;
      })
      if (item.classList.contains('filter-btn--active')) {
        item.innerText = 'Снять все';
      } else {
        item.innerText = 'Выбрать все';
      }
    })
  })

}
ChoiceAll();

function ShowAll() {
  const showBtn = document.querySelectorAll('.filter__item-btn');
  showBtn.forEach(item => {
    item.addEventListener('click', () => {
      if (item.innerHTML == 'Посмотреть все') {
        item.innerHTML = 'Свернуть';
      } else {
        item.innerHTML = 'Посмотреть все';
      }
      item.parentNode.classList.toggle('filter__list-item--active');
    })
  })
}
ShowAll();

function Category() {
  const categoryInput = document.querySelector('.category__input');
  const categoryBox = document.querySelector('.category__box');
  const categoryItem = document.querySelectorAll('.category__box-item');
  const categoryChecked = document.querySelector('.category__box-item--checked');
  categoryInput.value = categoryChecked.innerHTML;
  categoryItem.forEach(item => {
    item.addEventListener('click', () => {
      categoryInput.value = item.innerHTML;
      categoryItem.forEach(node => {
        node.classList.remove('category__box-item--checked');
      })
      item.classList.add('category__box-item--checked');
    })
  })
  categoryInput.addEventListener('click', () => {
    categoryBox.style.display = 'block';
    categoryInput.parentNode.classList.add('category__text--active');
  })
  document.addEventListener('click', (event) => {
    if (!categoryInput.contains(event.target)) {
      categoryBox.style.display = 'none';
      categoryInput.parentNode.classList.remove('category__text--active');
    }
  })
}

function Tags() {
  const tagBox = document.querySelector('.tags');
  const filterList = document.querySelector('.filter__list');
  filterList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      if (event.target.checked == true) {
        const tag = document.createElement('div');
        tag.className = 'tag tag-item';
        tag.id = `${event.target.id}-tag`;
        if (event.target.className == 'switch-input') {
          tag.innerHTML = `
                    <p class="tag-text">${event.target.closest('.filter__list-item').querySelector('.filter-title').innerText}</p>
                    <button class="tag-btn">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>`;
          console.log(event.target.id);
        } else {
          tag.innerHTML = `
                    <p class="tag-text">${event.target.closest('.filter__list-item').querySelector('.filter-title').innerText}: ${event.target.parentNode.parentElement.innerText}</p>
                    <button class="tag-btn">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>`;
        }
        tagBox.appendChild(tag);
      }
      if (event.target.checked == false) {
        const itemRemove = document.getElementById(`${event.target.id}-tag`);
        itemRemove.remove();
      }
    }
    if (event.target.type === 'radio') {
      if (event.target.checked == true) {
        const itemRemove = document.getElementById(`${event.target.name}-tag`);
        if (itemRemove) {
          itemRemove.remove();
        }
        const tag = document.createElement('div');
        tag.className = 'tag tag-item';
        tag.id = `${event.target.name}-tag`;
        tag.innerHTML = `
                <p class="tag-text">${event.target.closest('.filter__list-item').querySelector('.filter-title').innerText}: ${event.target.parentNode.innerText}</p>
                <button class="tag-btn">
                    <ion-icon name="close-outline"></ion-icon>
                </button>`;
        tagBox.appendChild(tag);
      }
    }
    RemoveCheck(tagBox);
    RemoveTag();
  });
}


function RemoveCheck(tagBox) {
  const removeCheck = document.querySelector('.tag-remove');
  if (tagBox.childElementCount > 2) {
    removeCheck.classList.add('tag-remove--active');
  } else {
    removeCheck.classList.remove('tag-remove--active');
  }
}

function RemoveTag() {
  const tagBtn = document.querySelectorAll('.tag-btn');
  const tagBox = document.querySelector('.tags');
  tagBtn.forEach(item => {
    item.addEventListener('click', () => {
      item.closest('.tag').remove();
      const inputItem = document.getElementById(item.closest('.tag').id.replace('-tag', ''));
      const radioItem = document.getElementsByName(item.closest('.tag').id.replace('-tag', ''));
      if (inputItem) {
        inputItem.checked = 0;
      }
      if (radioItem.length > 0) {
        radioItem[0].checked = 1;
      }
      RemoveCheck(tagBox);
    })
  })
}

function RemoveAllTags() {
  const removeBtn = document.querySelector('.tag-remove');
  removeBtn.addEventListener('click', () => {
    const removeItem = document.querySelectorAll('.tag-item');
    removeItem.forEach(item => {
      const inputItem = document.getElementById(item.id.replace('-tag', ''));
      const radioItem = document.getElementsByName(item.id.replace('-tag', ''));
      if (inputItem) {
        inputItem.checked = 0;
      }
      if (radioItem.length > 0) {
        radioItem[0].checked = 1;
      }
      item.remove();
      removeBtn.classList.remove('tag-remove--active');
    })
  })
}

function CatalogHover() {
  const hoverBox = document.querySelectorAll('.catalog__hovers');
  const imgBox = document.querySelectorAll('.catalog__img-box');
  const pagination = document.querySelectorAll('.catalog__pagination');
  hoverBox.forEach((item, index) => {
    let count = imgBox[index].childElementCount;
    for (let i = 0; i < count; i++) {
      const hoverBlock = document.createElement('div');
      hoverBlock.className = 'catalog__hover';
      item.appendChild(hoverBlock);

      const point = document.createElement('div');
      point.className = 'catalog-point';
      pagination[index].appendChild(point);

      imgBox[index].querySelectorAll('.catalog__img')[0].style.display = 'block';
      pagination[index].querySelectorAll('.catalog-point')[0].classList.add('catalog-point--active');
    }
  })
  hoverBox.forEach((item, hoverIndex) => {
    const hoverBlock = item.querySelectorAll('.catalog__hover');
    const imgBlock = imgBox[hoverIndex].querySelectorAll('.catalog__img');
    const point = pagination[hoverIndex].querySelectorAll('.catalog-point');
    hoverBlock.forEach((node, index) => {
      node.addEventListener('mouseover', () => {
        showImg(index, imgBlock, point);
      })
      node.addEventListener('mouseout', () => {
        hideImg(imgBlock, point);
        imgBlock[0].style.display = 'block';
        point[0].classList.add('catalog-point--active');
      })
    })
  })
  function hideImg(imgBlock, point) {
    imgBlock.forEach((item, index) => {
      item.style.display = 'none';
      point[index].classList.remove('catalog-point--active');
    })
  }
  function showImg(index, imgBlock, point) {
    hideImg(imgBlock, point);
    imgBlock[index].style.display = 'block';
    point[index].classList.add('catalog-point--active');
  }
}
CatalogHover();

function Favorite() {
  const favoriteBtn = document.querySelectorAll('.catalog-favorite');
  favoriteBtn.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('catalog-favorite--active');
    })
  })
}
Favorite();

function Search() {
  const searchSelect = document.querySelector('.header__search-select');
  const overlay = document.querySelector('.overlay');
  const search = new Choices(searchSelect, {
    itemSelectText: '',
    position: 'bottom',
    maxItemCount: -1,
    // editItems: true,
    removeItems: true,
    delimiter: ',',
    searchResultLimit: 7,
    renderChoiceLimit: -1,
    shouldSort: true,
    shouldSortItems: true,
    removeItemButton: true,
    placeholderValue: 'Искать на Ozon',
    noResultsText: 'Ничего не найдено',
    noChoicesText: 'Ничего не найдено',
    renderSelectedChoices: 'always',

    maxItemText: (maxItemCount) => {
      return `Найти`;
    },
  })
  searchSelect.addEventListener("showDropdown", function () {
    overlay.style.display = 'block';
  })
  searchSelect.addEventListener("hideDropdown", function () {
    overlay.style.display = 'none';
  })
  const input = document.querySelector('.choices__input--cloned');

  searchSelect.addEventListener('addItem', () => {
    input.value = search.getValue(true);
    search.removeActiveItems();
  })

  searchSelect.addEventListener('choice', () => {
    search.hideDropdown();
    const choice = document.querySelector('.choices__list--dropdown .choices__item--selectable.is-highlighted, .choices__list[aria-expanded] .choices__item--selectable.is-highlighted').innerHTML;

  })

  const dropdown = document.querySelector('.choices__list--dropdown');
  const list = document.querySelector('.choices__list--dropdown .choices__list, .choices__list[aria-expanded] .choices__list');
  const box = document.createElement('div');
  box.className = 'item-box';
  dropdown.appendChild(box);
  const item = new Array(3);
  for (let i = 0; i < item.length; i++) {
    item[i] = document.createElement('button');
    item[i].className = 'item-value';
    box.appendChild(item[i]);
  }
  item[0].innerHTML = '';
  item[1].innerHTML = '';
  item[2].innerHTML = '';
  input.addEventListener('input', () => {
    Check(input, item);
  })
  Products(item, search, input, searchSelect);
}
Search();

function Check(input, item) {
  if (input.value == '') {
    item.forEach(element => {
      element.style.display = 'none';
    })
  } else {
    const items = document.querySelectorAll('.choices__item--selectable ');
    if (items.length > 0) {

      var itemsArray = Array.from(items);
      var newItems = itemsArray.filter((item) => {
        return item.innerHTML.split(' ')[0].toLowerCase() == input.value.split(' ')[0].toLowerCase();
      })
      function Two(str) {
        var itemCount = newItems.filter((item) => {
          return item.innerHTML.split(' ').length >= 2 && item.innerHTML.includes(str);
        })
        return itemCount;
      }
      function Three(str) {
        var itemThree = newItems.filter((item) => {
          return item.innerHTML.split(' ').length >= 3 && item.innerHTML.includes(str);
        })
        return itemThree;
      }
      function Four(str) {
        var itemFour = newItems.filter((item) => {
          return item.innerHTML.split(' ').length >= 4 && item.innerHTML.includes(str);
        })
        return itemFour;
      }
      if (input.value.split(' ').length == 1 && items[0].innerHTML.split(' ').length >= 1) {
        item.forEach(element => {
          element.style.display = 'none';
        })
        item[0].style.display = 'block';
        item[0].innerHTML = items[0].innerHTML.split(' ')[0];
      }
      else if (input.value.split(' ').length == 2 && items[0].innerHTML.split(' ').length >= 2 && input.value.split(' ')[0].toLowerCase() == items[0].innerHTML.split(' ')[0].toLowerCase()) {
        item.forEach(element => {
          element.style.display = 'none';
        })
        let secondWords = [];
        let i = 0;
        var oneWord = input.value.split(' ').splice(0, 1).join(" ");
        Two(oneWord).forEach((element, index) => {
          let secondWord = element.innerHTML.split(' ')[1];
          if (!secondWords.includes(secondWord) && i < 3) {
            secondWords.push(secondWord);
            item[i].style.display = 'block';
            item[i].innerHTML = secondWord;
            i++;
          }
        })
      }
      else if (input.value.split(' ').length == 3 && items[0].innerHTML.split(' ').length >= 3 && input.value.split(' ')[1].toLowerCase() == items[0].innerHTML.split(' ')[1].toLowerCase()) {
        item.forEach(element => {
          element.style.display = 'none';
        })
        let thirdWords = [];
        let i = 0;
        var twoWord = input.value.split(' ').slice(0, 2).join(" ");
        console.log(Three(twoWord));
        Three(twoWord).forEach((element, index) => {
          let thirdWord = element.innerHTML.split(' ')[2];
          if (!thirdWords.includes(thirdWord) && i < 3) {
            thirdWords.push(thirdWord);
            item[i].style.display = 'block';
            item[i].innerHTML = thirdWord;
            i++;
          }
        })
      }
      else if (input.value.split(' ').length == 4 && items[0].innerHTML.split(' ').length >= 4 && input.value.split(' ')[2].toLowerCase() == items[0].innerHTML.split(' ')[2].toLowerCase()) {
        item.forEach(element => {
          element.style.display = 'none';
        })
        let fourthWords = [];
        let i = 0;
        var threeWord = input.value.split(' ').slice(0, 3).join(" ");
        Four(threeWord).forEach((element, index) => {
          let fourthWord = element.innerHTML.split(' ')[3];
          if (!fourthWords.includes(fourthWord) && i < 3) {
            fourthWords.push(fourthWord);
            item[i].style.display = 'block';
            item[i].innerHTML = fourthWord;
            i++;
          }
        })
      }
      else if (input.value.split(' ').length == 5 && items[0].innerHTML.split(' ').length >= 5 && input.value.split(' ')[3].toLowerCase() == items[0].innerHTML.split(' ')[3].toLowerCase()) {
        item.forEach(element => {
          element.style.display = 'none';
        })
      }
      else {
        item.forEach(element => {
          element.style.display = 'none';
        })
      }

    } else {
      item.forEach(element => {
        element.style.display = 'none';
      })
    }
  }
}

function Products(item, search, input, select) {
  const options = document.querySelectorAll('.choices__item--selectable');
  item.forEach(element => {
    element.addEventListener('click', () => {
      let words = input.value.split(' ');
      words[words.length - 1] = element.innerHTML;
      input.value = words.join(' ');
      element.style.display = 'none';
      let value = input.value;

      search.clearChoices();
      options.forEach(node => {
        if (node.innerHTML == value) {
          search.setChoices(
            [
              { value: node.innerHTML, label: node.innerHTML, selected: true }
            ],
            'value',
            'label',
            true
          )
        }
      })
      options.forEach(node => {
        if (node.innerHTML != value && node.innerHTML.includes(value)) {
          search.setChoices(
            [
              { value: node.innerHTML, label: node.innerHTML, selected: false }
            ],
            'value',
            'label',
            false
          )
        }
      })
      options.forEach(node => {
        if (node.innerHTML != value && !node.innerHTML.includes(value)) {
          search.setChoices(
            [
              { value: node.innerHTML, label: node.innerHTML, selected: false }
            ],
            'value',
            'label',
            false
          );
        }
      })


    })
  });
}

const swiper_1 = new Swiper('.swiper-container-1', {
  loop: true,
  autoplay: true,
  pagination: {
    el: '.swiper-pagination'
  },
  navigation: {
    nextEl: '.top-button-next',
    prevEl: '.top-button-prev',
  }
})

function Line(line, number, count) {
  line.forEach((item, index) => {
    const int = number[index].innerHTML.replace(/\D/g, '');
    const sum = (100 / (isNaN(count) ? count[index].innerHTML : count)) * int;
    item.style.setProperty('--graph', `${sum}%`);
  })
}

function Graphiks() {
  const count_1 = document.querySelectorAll('.count-all');
  const number_1 = document.querySelectorAll('.benefit__count-number');
  const line_1 = document.querySelectorAll('.benefit__count-graphik');
  const count_2 = document.querySelectorAll('.number-2');
  const number_2 = document.querySelectorAll('.number-1');
  const line_2 = document.querySelectorAll('.action__bottom-line');
  const count_3 = document.querySelectorAll('.catalog__count-all');
  const number_3 = document.querySelectorAll('.catalog-number');
  const line_3 = document.querySelectorAll('.catalog__count-line');
  const number_4 = document.querySelectorAll('.reviews-rating-count');
  const line_4 = document.querySelectorAll('.reviews-rating-line');
  let count_4 = 0;
  number_4.forEach(item => {
    count_4 += parseInt(item.innerText);
  })

  Line(line_1, number_1, count_1);
  Line(line_2, number_2, count_2);
  Line(line_3, number_3, count_3);
  Line(line_4, number_4, count_4);
}
Graphiks();

function Number(price) {
  price.forEach((item, index) => {
    const int = item.innerHTML.replace(/\D/g, '');
    item.innerHTML = parseInt(int).toLocaleString('ru') + `<span class='money'>₽</span>`;
  })
}

function Price() {
  const priceOld_1 = document.querySelectorAll('.benefit__old-price');
  const priceNew_1 = document.querySelectorAll('.benefit__new-price');
  const priceOld_2 = document.querySelectorAll('.product__price-old');
  const priceNew_2 = document.querySelectorAll('.product__price-new');
  const priceOld_3 = document.querySelectorAll('.product-window__price-old');
  const priceNew_3 = document.querySelectorAll('.product-window__price-new');
  const priceCard = document.querySelectorAll('.tovar__card-price');
  const priceOld_4 = document.querySelectorAll('.tovar__withoutcard-price-old');
  const priceNew_4 = document.querySelectorAll('.tovar__withoutcard-price-new');
  const pricePayment = document.querySelectorAll('.tovar__payment-price');
  Number(priceOld_1);
  Number(priceNew_1);
  Number(priceOld_2);
  Number(priceNew_2);
  Number(priceOld_3);
  Number(priceNew_3);
  Number(priceCard);
  Number(priceOld_4);
  Number(priceNew_4);
  Number(pricePayment);
}
Price();

function ProductInfo() {
  const productCard = document.querySelectorAll('.product');
  const productBox = document.querySelectorAll('.product__info-box');
  const CatalogCard = document.querySelectorAll('.catalog__item');
  const CatalogBox = document.querySelectorAll('.catalog__info-box');
  ProductCheck(productCard, productBox);
  ProductCheck(CatalogCard, CatalogBox);
}
ProductInfo();

function ProductCheck(card, box) {
  card.forEach((item, index) => {

    if (item.classList.contains('product--week')) {
      const info = document.createElement('div');
      info.className = 'product__info product-item--week';
      info.innerHTML = 'хиты недели';
      box[index].appendChild(info);
    }
    if (item.classList.contains('product--price')) {
      const info = document.createElement('div');
      info.className = 'product__info product-item--price';
      info.innerHTML = 'Цена что надо';
      box[index].appendChild(info);
    }
    if (item.classList.contains('product--points')) {
      const info = document.createElement('div');
      info.className = 'product__info product-item--points';
      info.innerHTML = '1000 баллов за отзыв';
      box[index].appendChild(info);
    }
    if (item.classList.contains('product--sale')) {
      const info = document.createElement('div');
      info.className = 'product__info product-item--sale';
      info.innerHTML = 'распродажа';
      box[index].appendChild(info);
    }
    if (item.classList.contains('product--hit')) {
      const info = document.createElement('div');
      info.className = 'product__info product-item--hit';
      info.innerHTML = 'Хит';
      box[index].appendChild(info);
    }
  })
}

function ColorProduct() {
  const colorBtn = document.querySelectorAll('.tovar__color-btn');
  const colorWindow = document.querySelector('.product-window');
  const colorPriceNew = document.querySelectorAll('.product-window__price-new');
  const colorPriceOld = document.querySelectorAll('.product-window__price-old');
  colorBtn.forEach(item => {
    item.addEventListener('mouseover', (e) => {
      colorWindow.classList.add('ad--fade');
      DirectionCheck(colorWindow, item);
      // color
      colorWindow.querySelectorAll('.product-window-img').forEach(node => { node.style.display = 'none' });
      document.getElementById(`${item.id}-img`).style.display = 'block';
      // price
      colorPriceNew[0].innerText = document.getElementById(`${item.id}-new`).innerText;
      colorPriceOld[0].innerText = document.getElementById(`${item.id}-old`).innerText;
      Number(colorPriceNew);
      Number(colorPriceOld);
    })
    item.addEventListener('mouseout', (e) => {
      if (!item.contains(e.relatedTarget)) {
        colorWindow.classList.remove('ad--fade');
      }
    })
  })
}

function MemoryProduct() {
  const memoryBtn = document.querySelectorAll('.tovar__memory-btn');
  const colorWindow = document.querySelector('.product-window');
  const colorPriceNew = document.querySelectorAll('.product-window__price-new');
  const colorPriceOld = document.querySelectorAll('.product-window__price-old');
  memoryBtn.forEach(item => {
    item.addEventListener('mouseover', () => {
      colorWindow.classList.add('ad--fade');
      DirectionCheck(colorWindow, item);

      const colorActive = document.querySelector('.tovar__color--active');
      colorWindow.querySelectorAll('.product-window-img').forEach(node => { node.style.display = 'none' });
      document.getElementById(`${colorActive.id}-img`).style.display = 'block';

      colorPriceNew[0].innerText = document.getElementById(`${colorActive.id}-new`).innerText;
      colorPriceOld[0].innerText = document.getElementById(`${colorActive.id}-old`).innerText;
      Number(colorPriceNew);
      Number(colorPriceOld);
    })
    item.addEventListener('mouseout', (e) => {
      if (!item.contains(e.relatedTarget)) {
        colorWindow.classList.remove('ad--fade');
      }
    })
  })
}


function Ad() {
  const adWindow = document.querySelector('.ad-window');
  const adText = document.querySelectorAll('.ad__text');
  adText.forEach((item, index) => {
    item.addEventListener('mouseover', (e) => {
      adWindow.classList.add('ad--fade');
      DirectionCheck(adWindow, item);
    })
    item.addEventListener('mouseout', function (event) {
      var from = event.relatedTarget;
      if (!from || !adWindow.contains(from)) {
        adWindow.classList.remove('ad--fade');
      }
    });
    adWindow.addEventListener('mouseout', function (event) {
      var to = event.relatedTarget;
      if (!to || (!adWindow.contains(to) && to !== item)) {
        adWindow.classList.remove('ad--fade');
      }
    });
  })
}
Ad();

function FavoriteInfo() {
  const favoriteWindow = document.querySelectorAll('.catalog-window');
  const favoriteBtn = document.querySelectorAll('.catalog-favorite');
  favoriteBtn.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('catalog-favorite--active')) {
        favoriteWindow[index].classList.add('ad--fade');
        FavoriteDirection(favoriteWindow[index], item);
        setTimeout(() => {
          favoriteWindow[index].classList.remove('ad--fade');
        }, 3000);
      }
    })
  })
  document.addEventListener('scroll', () => {
    favoriteBtn.forEach((item, index) => {
      FavoriteDirection(favoriteWindow[index], item)
    })
  })
  document.addEventListener('click', (event) => {
    favoriteWindow.forEach((item, index) => {
      if (!item.contains(event.target) && !favoriteBtn[index].contains(event.target)) {
        favoriteWindow[index].classList.remove('ad--fade');
      }
    })
  })
}
FavoriteInfo();

function FavoriteDirection(windowBox, item) {
  if (window.innerWidth - item.getBoundingClientRect().right + (item.clientWidth / 2) < (windowBox.clientWidth / 2) + 20) {
    const left = -windowBox.clientWidth + item.clientWidth + 20;
    windowBox.style.setProperty('--left', `${left}` + 'px');
    windowBox.classList.add('ad--right');
    windowBox.classList.remove('ad--center');
    windowBox.classList.remove('ad--left');
  }
  else if (item.getBoundingClientRect().left + (item.clientWidth / 2) < (windowBox.clientWidth / 2) + 20) {
    const left = -20;
    windowBox.style.setProperty('--left', `${left}` + 'px');
    windowBox.classList.add('ad--left');
    windowBox.classList.remove('ad--center');
    windowBox.classList.remove('ad--right');
  }
  else {
    const left = -windowBox.clientWidth / 2 + item.clientWidth / 2;
    windowBox.style.setProperty('--left', `${left}` + 'px');
    windowBox.classList.add('ad--center');
    windowBox.classList.remove('ad--right');
    windowBox.classList.remove('ad--left');
  }
  if ((window.innerHeight - item.getBoundingClientRect().bottom) < windowBox.clientHeight + 20) {
    const bottom = -windowBox.clientHeight - item.clientHeight;
    windowBox.style.setProperty('--top', `${bottom}` + 'px');
    windowBox.classList.add('ad--bottom');
    windowBox.classList.remove('ad--top');
  }
  else {
    const bottom = item.clientHeight + 10;
    windowBox.style.setProperty('--top', `${bottom}` + 'px');
    windowBox.classList.remove('ad--bottom');
    windowBox.classList.add('ad--top');
  }
}

function DirectionCheck(windowBox, item) {
  if (window.innerWidth - item.getBoundingClientRect().right + (item.clientWidth / 2) < (windowBox.clientWidth / 2) + 20) {
    const left = item.getBoundingClientRect().left - windowBox.clientWidth + item.clientWidth;
    windowBox.style.setProperty('--left', `${left}` + 'px');
    windowBox.classList.add('ad--right');
    windowBox.classList.remove('ad--center');
    windowBox.classList.remove('ad--left');
  }
  else if (item.getBoundingClientRect().left + (item.clientWidth / 2) < (windowBox.clientWidth / 2) + 20) {
    const left = item.getBoundingClientRect().left;
    windowBox.style.setProperty('--left', `${left}` + 'px');
    windowBox.classList.add('ad--left');
    windowBox.classList.remove('ad--center');
    windowBox.classList.remove('ad--right');
  }
  else {
    const left = item.getBoundingClientRect().left - (windowBox.clientWidth / 2) + (item.clientWidth / 2);
    windowBox.style.setProperty('--left', `${left}` + 'px');
    windowBox.classList.add('ad--center');
    windowBox.classList.remove('ad--right');
    windowBox.classList.remove('ad--left');
  }
  if ((window.innerHeight - item.getBoundingClientRect().bottom) < windowBox.clientHeight + 20) {
    const bottom = item.getBoundingClientRect().top + document.documentElement.scrollTop - windowBox.clientHeight - 20;
    windowBox.style.setProperty('--top', `${bottom}` + 'px');
    windowBox.classList.add('ad--bottom');
    windowBox.classList.remove('ad--top');
  }
  else {
    const bottom = item.getBoundingClientRect().bottom + document.documentElement.scrollTop;
    windowBox.style.setProperty('--top', `${bottom}` + 'px');
    windowBox.classList.remove('ad--bottom');
    windowBox.classList.add('ad--top');
  }
}

function Review() {
  const Text = document.querySelector('.review__title');
  const Items = document.querySelector('.review__list');
  const Window = document.querySelector('.review');
  const number = Items.childElementCount;
  if (number < 1) {
    Window.style.display = 'none';
  } else {
    Text.firstChild.innerHTML = number;
    Text.children[1].innerHTML = getPurchaseWord(number);
  }
}


function getPurchaseWord(number) {
  const cases = [2, 0, 1, 1, 1, 2];
  const words = ['покупка', 'покупки', 'покупок'];
  const wordIndex = number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)];
  return words[wordIndex];
}

function Remove() {
  const removeBtn = document.querySelectorAll('.review__list-btn');
  const Item = document.querySelectorAll('.review__list-item');
  const closeBtn = document.querySelectorAll('.review__list-close');
  removeBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      Item[index].remove();
      Review();
    })
  })
  closeBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
      Item[index].remove();
      Review();
    })
  })
}
Remove();

function ColorIs() {
  const color_1 = document.querySelectorAll('.color-item');
  const color_2 = document.querySelectorAll('.tovar__color-btn');
  Color(color_1);
  Color(color_2);
}
ColorIs();

function Color(color) {
  const colors = {
    'Черный': 'black',
    'Синий': 'blue',
    'Серый': 'grey',
    'Бежевый': 'beige',
    'Хаки': 'khaki',
    'Золотой': '#ffd700',
    'Серебристый': '#c0c0c0',
    'ТемноФиолетовый': '#6600cc',
    'Черныйкосмос': '#000000',
  }
  color.forEach((item, index) => {
    item.style.setProperty("--color", colors[item.getAttribute('name').match(/[а-яА-ЯЁё]/g).join('')] || 'black');
  })
}

function Range() {
  const range = document.getElementById('range');
  const inputMin = document.getElementById('min');
  const inputMax = document.getElementById('max');

  if (!range || !inputMin || !inputMax) return
  const inputs = [inputMin, inputMax];

  noUiSlider.create(range, {
    start: [144, 238139],
    connect: true,
    range: {
      'min': 144,
      'max': 238139
    },
    step: 1,
  })

  range.noUiSlider.on('update', (values, handle) => {
    inputs[handle].value = parseInt(values[handle]);
  })

  inputMin.addEventListener('change', () => {
    range.noUiSlider.set([inputMin.value, null]);
  })

  inputMax.addEventListener('change', () => {
    range.noUiSlider.set([null, inputMax.value]);
  })
}
Range();

function Pagination() {
  const paginationItem = document.querySelectorAll('.pagination-link');
  const paginationMore = document.querySelector('.pagination-more-link');
  const paginationStart = document.querySelector('.pagination-start');
  const pointsStart = document.querySelector('.points-start');

  paginationItem.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      RemoveActive(paginationItem);

      const value = parseInt(item.innerHTML);

      paginationItem[1].style.display = value >= 5 ? 'none' : 'block';
      paginationItem[0].style.display = value >= 5 ? 'none' : 'block';
      pointsStart.style.display = value >= 5 ? 'block' : 'none';
      paginationStart.style.display = value >= 5 ? 'block' : 'none';

      if (value >= 5) {
        paginationItem[4].innerHTML = value;
        paginationItem[3].innerHTML = value - 1;
        paginationItem[2].innerHTML = value - 2;

        for (let i = 5; i < 11; i++) {
          paginationItem[i].innerText = value + (i - 4);
        }

        RemoveActive(paginationItem);
        paginationItem[4].classList.add('pagination--active');
      } else {
        item.classList.add('pagination--active');
      }
    })
  })

  paginationStart.addEventListener('click', (e) => {
    e.preventDefault();
    RemoveActive(paginationItem);

    for (let i = 0; i < 11; i++) {
      paginationItem[i].innerText = i + 1;
    }

    paginationItem[1].style.display = 'block';
    paginationItem[0].style.display = 'block';
    paginationStart.style.display = 'none';
    pointsStart.style.display = 'none';
    paginationItem[0].classList.add('pagination--active');

  })

  paginationMore.addEventListener('click', (e) => {
    e.preventDefault();
    const paginationActive = document.querySelector('.pagination--active');

    if (paginationActive.nextElementSibling.classList.contains('pagination-link')) {
      RemoveActive(paginationItem);

      const value = parseInt(paginationActive.nextElementSibling.innerHTML);

      paginationItem[1].style.display = value >= 5 ? 'none' : 'block';
      paginationItem[0].style.display = value >= 5 ? 'none' : 'block';
      pointsStart.style.display = value >= 5 ? 'block' : 'none';
      paginationStart.style.display = value >= 5 ? 'block' : 'none';

      if (value >= 5) {
        paginationItem[4].innerHTML = value;
        paginationItem[3].innerHTML = value - 1;
        paginationItem[2].innerHTML = value - 2;

        for (let i = 5; i < 11; i++) {
          paginationItem[i].innerText = value + (i - 4);
        }

        RemoveActive(paginationItem);
        paginationItem[4].classList.add('pagination--active');
      } else {
        paginationActive.nextElementSibling.classList.add('pagination--active');
      }
    }
  })
  function RemoveActive(paginationItem) {
    paginationItem.forEach(node => {
      node.classList.remove('pagination--active');
    })
  }
}


function CatalogTags() {
  const tags_1 = document.querySelector('.catalog-names').querySelectorAll('.catalog__tag');
  const btn_1 = document.querySelectorAll('.catalog__tags-btn')[0];
  const tags_2 = document.querySelector('.catalog__brands').querySelectorAll('.catalog__tag');
  const btn_2 = document.querySelectorAll('.catalog__tags-btn')[1];
  TagShow(btn_1, tags_1);
  TagShow(btn_2, tags_2);
}

function TagShow(btn, tags) {
  btn.addEventListener('click', () => {
    btn.classList.toggle('catalog__tags-btn--active');
    if (btn.classList.contains('catalog__tags-btn--active')) {
      for (let i = btn.classList.contains('catalog__brands-btn') ? 9 : 10; i < tags.length; i++) {
        tags[i].style.display = 'block';
      }
      btn.innerHTML = 'Скрыть';
    } else {
      for (let i = btn.classList.contains('catalog__brands-btn') ? 9 : 10; i < tags.length; i++) {
        tags[i].style.display = 'none';
      }
      btn.innerHTML = 'Показать все';
    }

  })
}

function Rating() {
  const star = document.querySelectorAll('.tovar__info-rating');
  const rating = document.querySelectorAll('.tovar-rating');
  star.forEach((item, index) => {
    const ratingText = rating[index].innerText;
    const stars = item.children;
    if (parseInt(ratingText) < 6) {
      for (let i = 0; i < parseInt(ratingText); i++) {
        stars[i].style.setProperty('--width', '100%');
      }
    }
    if (parseInt(ratingText) < 5) {
      stars[parseInt(ratingText)].style.setProperty('--width', `${(parseFloat(ratingText) % 1) * 100}%`);
    }
  })
}
Rating();

function TovarSlider() {
  var swiperThums = new Swiper('.tovar__thumbs', {
    spaceBetween: 10,
    slidesPerView: 6,
    freeMode: true,
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    direction: 'vertical',
  });
  var swiperTovar = new Swiper('.tovar__slider', {
    thumbs: {
      swiper: swiperThums,
    },
  })
}
TovarSlider();

function ColorBtns() {
  const colorBtn = document.querySelectorAll('.tovar__color-btn');
  const colorName = document.querySelector('.color-name');
  const colorActive = document.querySelector('.tovar__color--active');
  colorName.innerText = colorActive.getAttribute('name');
  colorBtn.forEach(item => {
    item.addEventListener('click', () => {
      colorName.innerText = item.getAttribute('name');
      colorBtn.forEach(node => { node.classList.remove('tovar__color--active') });
      item.classList.add('tovar__color--active');
    })
  })
}

function MemoryBtns() {
  const memoryBtn = document.querySelectorAll('.tovar__memory-btn');
  memoryBtn.forEach(item => {
    item.addEventListener('click', () => {
      memoryBtn.forEach(node => { node.classList.remove('tovar__memory--active') });
      item.classList.add('tovar__memory--active');
    })
  })
}
MemoryBtns();

function SelectionSlider() {
  const swiper = new Swiper('.selection__slider', {
    slidesPerView: 6,
    spaceBetween: 30,
    slidesPerGroup: 6,
    navigation: {
      nextEl: '.selection-button-next',
      prevEl: '.selection-button-prev',
      container: 'swiper-object',
    }
  })

  const swiper_2 = new Swiper('.selection__slider-2', {
    slidesPerView: 6,
    spaceBetween: 30,
    slidesPerGroup: 6,
    navigation: {
      nextEl: '.selection-button-next-2',
      prevEl: '.selection-button-prev-2',
      container: 'swiper-object',
    }
  })
}
SelectionSlider();

function Avatar() {
  const name = document.querySelectorAll('.reviews__person-name');
  const avatar = document.querySelectorAll('.person');
  avatar.forEach((item, index) => {
    item.innerText = name[index].innerText[0];
  })
}
Avatar();