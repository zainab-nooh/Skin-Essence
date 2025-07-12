document.addEventListener('DOMContentLoaded', () => {
  // Global: Sign-In Popup Logic
  const signInButton = document.getElementById('sign-in-btn');
  const popupOverlay = document.getElementById('popup-overlay');
  const closeButton = document.getElementById('close-btn');
  const form = document.getElementById('sign-in-form');
  const welcomeMessage = document.getElementById('welcome-message');
  const errorMessage = document.getElementById('error-message');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const mobileInput = document.getElementById('mobile');
  const signOutButton = document.getElementById('sign-out-btn');

  // Check if user is already signed in
  if (localStorage.getItem('isSignedIn')) {
    const firstName = localStorage.getItem('userFirstName');
    welcomeMessage.textContent = `Hello, ${firstName}! Your journey to glowing, healthy skin starts here.`;
    if (popupOverlay) popupOverlay.style.display = 'none'; // Hide the popup
    if (signOutButton) signOutButton.style.display = 'inline-block'; // Show the sign-out button
  } else {
    if (popupOverlay) popupOverlay.style.display = 'flex'; // Show the popup initially
  }

  // Sign In Button
  if (signInButton) {
    signInButton.addEventListener('click', () => {
      if (popupOverlay) popupOverlay.style.display = 'flex';
    });
  }

  // Close Button
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (popupOverlay) popupOverlay.style.display = 'none';
      if (errorMessage) errorMessage.classList.add('hidden');
    });
  }

  // Form Submission
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const firstName = firstNameInput?.value.trim();
      const lastName = lastNameInput?.value.trim();
      const mobile = mobileInput?.value.trim();
      const email = emailInput?.value.trim();
      

      // Validate Inputs
      if (!firstName.match(/^[A-Za-z]{3,}$/)) {
        errorMessage.textContent = 'First Name should have at least 3 characters.';
        errorMessage.classList.remove('hidden');
        return;
      }

      if (!lastName.match(/^[A-Za-z]{3,}$/)) {
        errorMessage.textContent = 'Last Name should have at least 3 characters.';
        errorMessage.classList.remove('hidden');
        return;
      }

      if (!mobile.match(/^\d{8}$/)) {
        errorMessage.textContent = 'Mobile number must contain exact 8 digits.';
        errorMessage.classList.remove('hidden');
        return;
      }

      if (!email.match(/^\S+@\S+\.\S+$/)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.classList.remove('hidden');
        return;
      }

      // Save data to localStorage
      localStorage.setItem('isSignedIn', true);
      localStorage.setItem('userFirstName', firstName);
      localStorage.setItem('userLastName', lastName);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userMobile', mobile);

      // Display welcome message and hide popup
      welcomeMessage.textContent = `Hello, ${firstName}! Your journey to glowing, healthy skin starts here.`;
      if (popupOverlay) popupOverlay.style.display = 'none';
      form.reset();
      if (errorMessage) errorMessage.classList.add('hidden');

    });
  }

  // Sign Out Button
  if (signOutButton) {
    signOutButton.addEventListener('click', () => {
      // Clear sign-in state and user data from localStorage
      localStorage.removeItem('isSignedIn');
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userMobile');
      localStorage.removeItem('userEmail');
      

      // Reload the page to reset the session
      location.reload();
    });
  }

  // Page-Specific: Search Bar Functionality
  const productSearchBar = document.getElementById('productSearchBar');
  const products = document.querySelectorAll('.product');

  if (productSearchBar) {
    productSearchBar.addEventListener('input', () => {
      const query = productSearchBar.value.toLowerCase();
      products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        const productDescription = product.querySelector('p').textContent.toLowerCase();

        if (productName.includes(query) || productDescription.includes(query)) {
          product.style.display = 'block'; // Show matching products
        } else {
          product.style.display = 'none'; // Hide non-matching products
        }
      });
    });
  }
});
