class contact {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
}
class user {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
const newContact = new contact("Alice", "0509876543");
const newContact1 = new contact("shlomo", "0523456789");
const newContact2 = new contact("shlomit", "0525256908");
const newContact3 = new contact("dani", "0585456273");
const newContact4 = new contact("will", "052753206");

function addNewContact(name, number) {
  const newcontact = new contact(name, number);
  const fajax1 = new fajax();
  fajax1.open("POST", "contact/addcontact");
  fajax1.onload((res) => {
    if (res) console.log("woohooo");
    else console.log("oh no");
  });
  fajax1.send(newcontact);
}

function getAllContacts() {
  return new Promise((resolve, reject) => {
    const fajax2 = new fajax();
    fajax2.open("GET", "contact/getcontact");
    fajax2.onload((res) => {
      try {
        const contacts = JSON.parse(res);
        resolve(contacts);
      } catch (e) {
        console.error("Error parsing response:", e);
        reject(e);
      }
    });
    fajax2.send();
  });
}
async function getContactByName(name) {
  const contacts = await getAllContacts();
  return contacts.find((contact) => contact.name === name);
}

function deleteContactByName(contact) {
  const fajax3 = new fajax();
  fajax3.open("DELETE", "contact/deletecontact");
  fajax3.onload((res) => {
    console.log(res);
  });
  fajax3.send(contact);
}

async function updatecontactname(oldname, newname) {
  const editedcontact = await getContactByName(oldname);
  console.log(editedcontact);
  editedcontact.name = newname;
  const fajax4 = new fajax();
  fajax4.open("PUT", "contact/editname/");
  fajax4.onload((res) => {
    console.log(res);
  });
  fajax4.send(editedcontact);
}
async function updatecontactnumber(name, newnum) {
  const editedcontact = await getContactByName(name);
  editedcontact.number = newnum;
  console.log(editedcontact);
  const fajax5 = new fajax();
  fajax5.open("PUT", "contact/editnumber/");
  fajax5.onload();
  fajax5.send(editedcontact);
}

function getallusers() {
  return new Promise((resolve, reject) => {
    const fajax6 = new fajax();
    fajax6.open("GET", "users/getusers");

    fajax6.onload((res) => {
      try {
        const users = JSON.parse(res);
        resolve(users);
        console.log(users);
      } catch (e) {
        console.error("Error parsing response:", e);
        reject(e);
      }
    });
    fajax6.send();
  });
}
async function getusers() {
  const users = await getallusers();
  console.log(users);
  return users;
}

async function checkusers(username, password) {
  const users = await getusers();
  console.log("Users returned:", users);

  const exist = users.find((user) => user.username === username);
  if (exist === undefined) {
    addNewUser(username, password);
    alert("register successful");
    return true;
  } else {
    alert("user already taken");
    return false;
  }
}

function addNewUser(username, password) {
  const newuser = new user(username, password);
  const fajax7 = new fajax();
  fajax7.open("POST", "users/adduser");
  fajax7.onload((res) => {
    if (res) console.log("yay");
    else console.log("oops");
  });
  fajax7.send(newuser);
}
async function getUserByName(name) {
  const users = await getusers();
  return users.find((user) => user.username === name);
}
function checklogin(currentuser, password) {
  if (!currentuser) {
    alert("this user does not exist");
    return false;
  } else if (currentuser.password !== password) {
    alert("wrong password");
    return false;
  } else {
    return true;
  }
}
// addNewContact(newContact); //addeventlistener
// addNewContact(newContact1);
// addNewContact(newContact2);
// addNewContact(newContact3);
// addNewContact(newContact4);

async function getContacts() {
  const contacts = await getAllContacts();
  console.log("ל:",contacts);
}
getContacts();
// console.log(getAllContacts());
async function findContact(name) {
  const contacts = await getContactByName(name);
  console.log(contacts);
}
// findContact("shlomo");
// console.log(getContactByName("shlomo"))
// async function deleteContact(name) {
//     const contacts = await deleteContactByName(name);
//     // console.log(contacts);
// }
// deleteContact(newContact2.name);
// updatecontactname(newContact3.name ,"roy")
// // updatecontactnumber(newContact4.name ,"0500000000")

// console.log(getAllContacts());
