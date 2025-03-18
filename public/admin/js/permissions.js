// Permissions
const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");

  buttonSubmit.addEventListener("click", () => {
    let permissions = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");

    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({ id: id, actions: [] });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].actions.push(name);
          }
        });
      }
    });

    if(permissions.length > 0){
        const formChangePermissions = document.querySelector("#form-change-permissions");
        const inputPermissions = document.querySelector("input[name='permissions']");
        inputPermissions.value = JSON.stringify(permissions); // JSON.stringify converts a JavaScript object or value to a JSON string.
        formChangePermissions.submit();
    }
  });
}

// End of permissions

// Permissions data table
const dataRecords = document.querySelector("[data-permissions]");
if (dataRecords) {
  const dataPermissions = JSON.parse(dataRecords.getAttribute("data-permissions"));
  const tablePermissions = document.querySelector("[table-permissions]");

  dataPermissions.forEach((record, index) => { // The forEach() method calls a function once for each element in an array, in order.
    const permissions = record.permissions;

    permissions.forEach((permission) => {
        const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
        const input = row.querySelectorAll("input")[index]; // selects all <input> elements inside the row and returns the element at the specified index.
        input.checked = true;
    });
  });
}

// End of permissions data table
