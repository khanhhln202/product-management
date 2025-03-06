// Change status 
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = currentStatus == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;
      //   formChangeStatus.setAttribute("action", action);
      formChangeStatus.submit();
    });
  });
}
// End of change status 

// Delete item
  const buttonsDelete = document.querySelectorAll("[button-delete]");
  if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    
    buttonsDelete.forEach((button) => {
      button.addEventListener("click", () => {
        const isConfirm = confirm("Are you sure to delete this item?");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          const action = `${path}/${id}?_method=DELETE`;
          formDeleteItem.action = action;
          formDeleteItem.submit();
        }
      });
    });
  }
// End of delete item



// Edit item
const buttonsEdit = document.querySelectorAll("[button-edit]");
if(buttonsEdit.length > 0){
  const formEditItem = document.querySelector("#form-edit-item");
  const path = formEditItem.getAttribute("data-path");

  buttonsEdit.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure to edit this item?");
      if(isConfirm){
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=PUT`;

        formDeleteItem.action = action;
        formDeleteItem.submit();
      }

      
    });
  });
}
// End of edit item


