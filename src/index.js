import './style.css';
import arrowIcon from './chevron-down-solid.svg';
import ellipsisHorizontalIcon from './ellipsis-solid.svg';
import ellipsisVerticalIcon from './ellipsis-vertical-solid.svg';

export default class DropdownMenu {
  /* menuTitle - text on menu button
  items - array with menu items
  iconType - type of icon in the button: arrow/ellipsis-vertical/ellipsis-horizontal*/
  constructor(menuTitle, items, iconType) {
    this.menuTitle = menuTitle;
    this.items = items;
    this.iconType = iconType;

    this.#setUpMenu();
  }

  //setting up clisk listeners for showing and hidding the menu
  #setUpArrowMenuVisibility(menu, menuButton) {
    menu.classList.add('hidden');

    menuButton.addEventListener('mouseenter', () => {
      menu.classList.remove('hidden');
      menu.classList.add('visible');
    });

    menuButton.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!menu.matches(':hover')) {
          menu.classList.remove('visible');
          menu.classList.add('hidden');
        }
      }, 100);
    });

    menu.addEventListener('mouseenter', () => {
      menu.classList.remove('hidden');
      menu.classList.add('visible');
    });

    menu.addEventListener('mouseleave', () => {
      menu.classList.remove('visible');
      menu.classList.add('hidden');
    });
  }

  #setUpEllipsisMenuVisibility(menu, menuButton) {
    menu.classList.add('hidden');

    menuButton.addEventListener('click', () => {
      if (!menu.classList.contains('visible')) {
        menu.classList.remove('hidden');
        menu.classList.add('visible');
      } else {
        menu.classList.remove('visible');
        menu.classList.add('hidden');
      }
    });

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove('visible');
        menu.classList.add('hidden');
      }
    });
  }

  #setUpMenu() {
    console.log('07/08 23:33 version');

    //creating HTML elements
    const menuContainer = document.createElement('div');

    const menu = document.createElement('div');
    menu.classList.add('dropdown-menu-list');

    const menuButton = document.createElement('div');
    menuButton.classList.add('dropdown-menu-button');

    const menuTitle = document.createElement('div');
    menuTitle.classList.add('menu-title');
    menuButton.append(menuTitle);

    const menuList = document.createElement('ul');
    menu.append(menuList);

    //customizing the menu
    menuTitle.textContent = this.menuTitle;

    //to remove the empty space before the icon that appears when there is no menu title
    if (this.menuTitle === '') {
      menuButton.removeChild(menuTitle);
    }

    const icon = document.createElement('img');

    switch (this.iconType) {
      case 'arrow':
        icon.src = arrowIcon;

        this.#setUpArrowMenuVisibility(menu, menuButton);
        icon.style.height = '18px';
        break;
      case 'ellipsis-vertical':
        icon.src = ellipsisVerticalIcon;
        icon.style.height = '22px';

        this.#setUpEllipsisMenuVisibility(menu, menuButton);
        break;
      case 'ellipsis-horizontal':
        icon.src = ellipsisHorizontalIcon;
        icon.style.height = '22px';

        this.#setUpEllipsisMenuVisibility(menu, menuButton);
        break;
    }

    menuButton.append(icon);

    this.items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;

      listItem.addEventListener('click', () => {});

      menuList.append(listItem);
    });

    menuContainer.append(menuButton, menu);

    this.layout = menuContainer;
  }

  getLayout() {
    return this.layout;
  }

  getButton() {
    return this.layout.querySelector('.dropdown-menu-button');
  }

  getMenuList() {
    return this.layout.querySelector('.dropdown-menu-list');
  }

  getMenuItems() {
    return this.layout.querySelectorAll('li');
  }
}
