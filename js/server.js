const server = {
  actionType: function (person, method, url) {
    // console.log(`Method: ${method}, URL: ${url}`);
    switch (method) {
      case "GET":
        if (url === "contact/getcontact") {
          return JSON.stringify(database.getall());
        }
        if (url === "users/getusers") {
          return JSON.stringify(database.getallusers());
        }
        break;
      case "POST":
        if (url === "contact/addcontact") {
          return database.addNewContact(person);
        }
        if (url === "users/adduser") {
          return database.addNewUser(person);
        }
        break;
      case "DELETE":
        if (url === "contact/deledtecontact") {
          return database.deletecontact(person);
        }
        break;
      case "PUT":
        if (url === "contact/editname/") {
          return database.editcontactName(person);
        }
        if (url === "contact/editnumber/") {
          return database.editcontactNumber(person);
        }
        break;
      default:
        return false;
    }
  },
};
