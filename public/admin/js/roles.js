// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0){
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure to delete this item?");
      if(isConfirm){
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;

        formDeleteItem.action = action;
        formDeleteItem.submit();
      }

      
    });
  });
}
// End of delete item