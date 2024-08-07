import './style.css';

class DropdownMenu {
  /* menuTitle - text on menu button
  color - background of the menu
  items - array with */
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
    const template = document.querySelector('template');

    //copying the template
    const clone = document.importNode(template.content, true);

    const menu = clone.querySelector('.dropdown-menu-list');
    const menuButton = clone.querySelector('.dropdown-menu-button');

    //customizing the menu
    clone.querySelector('.menu-title').textContent = this.menuTitle;

    //to remove the empty space before the icon that appears when there is no menu title
    if (this.menuTitle === '') {
      menuButton.removeChild(clone.querySelector('.dropdown-menu-button p'));
    }

    const svg = clone.querySelector('svg');
    const path = clone.querySelector('path');

    switch (this.iconType) {
      case 'arrow':
        svg.setAttribute('viewBox', '0 0 512 512');
        path.setAttribute(
          'd',
          'M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
        );

        this.#setUpArrowMenuVisibility(menu, menuButton);
        break;
      case 'ellipsis-vertical':
        svg.setAttribute('viewBox', '0 0 128 512');
        path.setAttribute(
          'd',
          'M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z'
        );
        svg.style.height = '20';

        this.#setUpEllipsisMenuVisibility(menu, menuButton);
        break;
      case 'ellipsis-horizontal':
        svg.setAttribute('viewBox', '0 0 448 512');
        path.setAttribute(
          'd',
          'M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z'
        );

        this.#setUpEllipsisMenuVisibility(menu, menuButton);
        break;
    }

    const menuList = clone.querySelector('.dropdown-menu-list ul');

    this.items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item;

      listItem.addEventListener('click', () => {});

      menuList.append(listItem);
    });

    this.layout = clone.querySelector('.dropdown-menu');
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

const dropdownMenu1 = new DropdownMenu(
  'Categories',
  ['Jackets', 'Hoodies', 'T-Shirts', 'Shoes'],
  'arrow',
  '#7cc3f2',
  '#6dbdf2',
  'red'
);

const dropdownMenu2 = new DropdownMenu(
  '',
  ['Replace', 'Edit', 'Delete'],
  'ellipsis-horizontal',
  'blue',
  'green',
  'red'
);

const dropdownMenu3 = new DropdownMenu(
  '',
  ['Change color', 'Bold', 'Italic', 'Underline'],
  'ellipsis-vertical',
  'red',
  'pink',
  'red'
);
