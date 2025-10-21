const server = {
   actionType: function (contact , method) {
      switch(method) {
         case "GET":
            return database.getall();
         case "POST":
            return database.addNewContact(contact);
         default:
            return false;
      }
   }
}
