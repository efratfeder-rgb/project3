const server = {
   actionType: function (contact, method, url) {
      // console.log(`Method: ${method}, URL: ${url}`);
      switch(method) {
         case "GET":
            if (url ==="contact/getcontact"){
               return JSON.stringify(database.getall());
            }
            break;
         case "POST":
            if(url === "contact/addcontact"){
               return database.addNewContact(contact);
            }
            break;
         case "DELETE":
            if(url==="contact/deledtecontact"){
               return database.deletecontact(contact);
            }
            break;
         case "PUT":
            if (url === "contact/editname/"){
               return database.editcontactName(contact)
            }
            if (url === "contact/editnumber/"){
               return database.editcontactNumber(contact)
            }
            break;
         default:
            return false;
      }
   }
}
