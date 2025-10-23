if (localStorage.getItem("contacts") === null) {
  localStorage.setItem("contacts", JSON.stringify([]));
}
if (localStorage.getItem("users") === null) {
  localStorage.setItem("users", JSON.stringify([]));
}
const database = {
  contacts: [],
  addNewContact: function (contact) {
    this.contacts = this.getall();
    this.contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
    return true;
  },
  getall: function () {
    try {
      this.contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    } catch (e) {
      console.error("Error parsing contacts:", e);
      this.contacts = [];
    }
    return this.contacts;
  },
  deletecontact: function (name) {
    this.contacts =this.getall(); 
    console.log(this.contacts)
    const indexToRemove = this.contacts.findIndex(
      (contact) => contact.name === name
    );
    console.log(indexToRemove)
    if (indexToRemove !== -1) {
      this.contacts.splice(indexToRemove, 1);
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
      return this.contacts;
    } else {
      return "this contact doesn't exist";
    }
  },
  editcontactName: function (newcontact) {
    this.contacts = this.getall();
    let indexToedit = this.contacts.findIndex(
      (contact) => contact.number === newcontact.number
    );
    console.log(indexToedit);
    this.contacts[indexToedit] = newcontact;
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
    return this.contacts[indexToedit];
  },

  addNewUser: function (user) {
    this.users = this.getallusers();
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
    return true;
  },
  getallusers: function () {
    try {
      this.users = JSON.parse(localStorage.getItem("users")) || [];
    } catch (e) {
      console.error("Error parsing users:", e);
      this.users = [];
    }
    return this.users;
  },
};
