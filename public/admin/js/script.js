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

// Form Search
const formSearch = document.querySelector("#form-search"); // Single form
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission for testing
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

// End form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      if (page) {
        url.searchParams.set("page", page);
      }

      window.location.href = url.href;
    });
  });
}
// End of Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      // const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      // if(countChecked === inputsId.length){
      //   inputCheckAll.checked = true;
      // }
      // else{
      //   inputCheckAll.checked = false;
      // }

      let checkAll = true;
      inputsId.forEach((input) => {
        if (!input.checked) {
          checkAll = false;
        }
      });

      if (checkAll) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End of Checkbox Multi

// Form Change Status Multi
const formChangeStatusMulti = document.querySelector("[form-change-multi]");
if (formChangeStatusMulti) {
  formChangeStatusMulti.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission for testing

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("Are you sure to delete these items?");
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeStatusMulti.querySelector("input[name='ids']");
      inputsChecked.forEach((input) => {
        if (typeChange == "change-position") {
          const position = input
            .closest("tr") // Find the closest parent element with the "tr" tag
            .querySelector("input[name='position']").value;
          ids.push(`${input.value}-${position}`); // Combine id and position (id-position)
        } else {
          ids.push(input.value); // Get id only
        }
      });

      inputIds.value = ids.join(","); // Convert array to string

      formChangeStatusMulti.submit();
    } else {
      alert("Please select at least one item");
    }
  });
}

// End of Form Change Status Multi

// Show alert message
const showAlert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  console.log(time);
  setTimeout(() => {
    // showAlert.style.display = "none";
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.style.display = "none";
  });
}
// End of show alert message

// Upload Image Preview
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  const uploadImageHide = uploadImage.querySelector("[upload-image-hide]");
  const imageContainer = uploadImagePreview.closest(".image-container");

  uploadImageInput.addEventListener("change", (e) => { // Listen for the change event on the input element
    const file = e.target.files[0]; // Get the first file from the list of selected files
    if(file){
      // Create a URL for the file. This URL can be used to set the src attribute of an image element to display the image.
      uploadImagePreview.src = URL.createObjectURL(file); // URL.createObjectURL() creates a DOMString containing a URL representing the object given in the parameter.
      imageContainer.classList.add("show-close-btn"); 
    }
  });

  uploadImageHide.addEventListener("click", () => {
    uploadImagePreview.src = "";
    imageContainer.classList.remove("show-close-btn");
  });
}

// End of Upload Image Preview

