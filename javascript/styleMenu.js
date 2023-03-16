const attValueMapping = {
  'color': ['Red', 'Green', 'Blue', 'Yellow'],
  'background-color': ['Grey', 'White', 'Black', 'Blue'],
  'font-family': ['Helvetica', 'Luminari', 'Pristina', 'Comic Sans MS'],
  'font-size': [14, 16, 18, 20],
};

// Makes options menu invisble again after user selects different
// element or attribute
const resetStyleMenu = () => {
  const menuArrow = document.getElementById('style-menu__arrow');
  const valueList = document.getElementById('options-wrapper');
  if (menuArrow.classList.contains('style-menu__arrow--active')) {
    menuArrow.classList.toggle('style-menu__arrow--active');
  }
  if (valueList.classList.contains('style-menu__value-list--active')) {
    valueList.classList.toggle('style-menu__value-list--active');
  }
  resetSelectedValue();
};

const resetSelectedValue = () => {
  const selectedValue = document.querySelector('.style-menu__value--selected');

  if (selectedValue) {
    selectedValue.classList.toggle('style-menu__value--selected');
  }
};

const selectorControl = () => {
  const elementSelector = document.getElementById('element-selector');
  const attSelector = document.getElementById('attribute-selector');

  elementSelector.addEventListener('change', resetStyleMenu);
  attSelector.addEventListener('change', resetStyleMenu);
};

// Function that expands the menu with options for styling
// only if an element and attribute have been selected
const expandMenu = () => {

  const optionButton = document.getElementById('option-button');
  const menuArrow = document.getElementById('style-menu__arrow');
  optionButton.addEventListener('click', () => {

    const elementSelector = document.getElementById('element-selector');
    const attSelector = document.getElementById('attribute-selector');
    const warningMessage = document.getElementById('style-menu-warning');

    // Checks if selectors have valid value and shows warning message
    // if that is not the case
    if (elementSelector.value == 'default') {
      warningMessage.textContent = 'Select an element first!';
      warningMessage.style.opacity = 1;
      setTimeout(function() { warningMessage.style.opacity = 0; }, 2000);
      return;
    }
    if (attSelector.value == 'default') {
      warningMessage.textContent = 'Select an attribute first!';
      warningMessage.style.opacity = 1;
      setTimeout(function() { warningMessage.style.opacity = 0; }, 2000);
      return;
    }

    const attribute = attSelector.value;
    const valueList = document.getElementById('options-list');
    const valueListWrapper = document.getElementById('options-wrapper');
    const valueChildren = valueList.children;
    for (let i = 0; i < valueChildren.length; i++) {
      valueChildren[i].textContent = attValueMapping[attribute][i];
    }
    menuArrow.classList.toggle('style-menu__arrow--active');
    valueListWrapper.classList.toggle('style-menu__value-list--active');
  });
};

// Highlights selected attribute
const selectAttributeValue = () => {
  const attValueOptions = document.querySelectorAll('.style-menu__value');

  for (let i = 0; i < attValueOptions.length; i++) {
    attValueOptions[i].addEventListener('click', () => {
      resetSelectedValue();
      attValueOptions[i].classList.toggle('style-menu__value--selected');
    });
  }
};


// Applies selected style to element when user presses "Apply"
const applyStyles = () => {
  const button = document.getElementById('apply-button');
  button.addEventListener('click', () => {
    const element = document.getElementById('element-selector').value;
    const property = document.getElementById('attribute-selector').value;
    const value = document.querySelector('.style-menu__value--selected');
    const allElements = document.querySelectorAll(element);
    let allElementsArr = Array.from(allElements);
    for (let i = 0; i < allElements.length; i++) {
      const childNodes = Array.from(allElements[i].getElementsByTagName('*'));
      allElementsArr = allElementsArr.concat(childNodes);
    }

    for (let i = 0; i < allElementsArr.length; i++) {
      switch (property) {
        case 'color':
          allElementsArr[i].style.color = value.textContent;
          break;

        case 'font-family':
          allElementsArr[i].style.fontFamily = value.textContent;
          break;

        case 'background-color':
          allElementsArr[i].style.backgroundColor = value.textContent;
          break;

        case 'font-size':
          allElementsArr[i].style.fontSize = value.textContent + 'px';
          break;
      }
    }

  });
};

// Resets all styles to default when user presses "Reset"
const resetStyles = () => {
  const resetButton = document.getElementById('reset-button');

  resetButton.addEventListener('click', () => {

    const allElements = Array.from(document.getElementsByTagName('*'));
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].removeAttribute('style');
    }
  });
  resetStyleMenu();
};

expandMenu();
selectorControl();
selectAttributeValue();
applyStyles();
resetStyles();