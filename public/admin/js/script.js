// Select all buttons that have the "button-status" attribute
const buttonsStatus = document.querySelectorAll("[button-status]");

// Check if there are any buttons with the "button-status" attribute on the page
if (buttonsStatus.length > 0) {
  // Create a URL object using the current page URL
  let url = new URL(window.location.href);

  // Loop through each button in the NodeList of buttons
  buttonsStatus.forEach((button) => {
    // Add a "click" event listener to each button
    button.addEventListener("click", () => {
      // Get the value of the "button-status" attribute for the clicked button
      const status = button.getAttribute("button-status");

      // If the "status" value exists and is not empty...
      if (status) {
        // Update the "status" query parameter in the URL to match the button's status value
        url.searchParams.set("status", status);
      } else {
        // If the "status" value is empty (e.g., for the "All" button), remove the "status" query parameter
        url.searchParams.delete("status");
      }

      // Redirect the browser to the updated URL, triggering a page reload
      window.location.href = url.href;
    });
  });
}

// End of "Button Status" functionality
