/////////////////////////
//  SHOW/HIDE SIDEBAR  //
/////////////////////////

const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('aside.sidebar');

// stores ongoing timeout ID to hide the sidebar, so we can clear it if "Show button" is clicked before it's done
let lastTimeout = null;

function removeSidebar() {
  sidebar.style.transition = 'transform 1.5s ease-in';
  sidebar.style.transform = 'translateX(120%)';

  // if there is a timeout we need to clear it
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }

  // set a timeout until our animation is done, then actually hide the sidebar
  lastTimeout = setTimeout(() => {
    sidebar.style.display = 'none';
    lastTimeout = null;
  }, 1500); // duration of transform transition
}

function addSidebar() {
  // immediately make visible and define the transition to its normal position
  sidebar.style.display = 'revert';
  sidebar.style.transition = 'transform 1.5s ease-out';

  // if there is a timeout we need to clear it because the sidebar isn't hidden yet
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }

  // we need a small delay or the browser might not apply our transition
  lastTimeout = setTimeout(() => {
    sidebar.style.transform = 'unset';
    lastTimeout = null;
  }, 20);
}

sidebarToggle.addEventListener('click', () => {
  const makeVisible = sidebarToggle.textContent.includes('Show');

  if (makeVisible) {
    sidebarToggle.textContent = 'Hide sidebar';
    addSidebar();
  } else {
    sidebarToggle.textContent = 'Show sidebar';
    removeSidebar();
  }
});
