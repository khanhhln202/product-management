// Change status of product
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
// End change status of product
