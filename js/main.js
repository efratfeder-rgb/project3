const login = document.getElementById("login");
const signup = document.getElementById("signup");
const page = document.getElementById("page");
const pagecontent = document.getElementById("content");

window.addEventListener("DOMContentLoaded", function () {
  showLoginPage();
});

function showLoginPage() {
  pagecontent.innerHTML = "";
  let clon = login.content.cloneNode(true);

  const submitButton = clon.querySelector("#submit1");
  const usernameInput = clon.querySelector("#username1");
  const passwordInput = clon.querySelector("#password1");
  const registerPage = clon.querySelector("#registerPage");
  const logout1 = clon.querySelector("#logout1");

  submitButton.addEventListener("click", async function () {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const currentuser = await getUserByName(username);

    if (checklogin(currentuser, password)) {
      sessionStorage.setItem("isConnected", JSON.stringify(currentuser));
      showContactsPage();
    }
  });

  registerPage.addEventListener("click", showRegisterPage);

  logout1.addEventListener("click", function () {
    sessionStorage.clear();
  });

  pagecontent.appendChild(clon);
}

function showRegisterPage() {
  pagecontent.innerHTML = "";
  let clon = signup.content.cloneNode(true);

  const submitButton = clon.querySelector("#submit2");
  const usernameInput = clon.querySelector("#username2");
  const passwordInput = clon.querySelector("#password2");
  const confirmInput = clon.querySelector("#confirmPassword");
  const loginPage = clon.querySelector("#loginPage");
  const logout2 = clon.querySelector("#logout2");

  submitButton.addEventListener("click", async function () {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const success = await checkusers(username, password);

    if (success) {
      const currentuser = await getUserByName(username);
      sessionStorage.setItem("isConnected", JSON.stringify(currentuser));

      showContactsPage();
    }
  });

  if (loginPage) loginPage.addEventListener("click", showLoginPage);

  logout2.addEventListener("click", function () {
    sessionStorage.clear();
  });

  logout2.addEventListener("click", function () {
    sessionStorage.clear();
  });

  pagecontent.appendChild(clon);
}

// Show Contacts Page
function showContactsPage() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const clon = page.content.cloneNode(true);

  const backButton = clon.querySelector("#logoutfromcontacts");
  backButton.addEventListener("click", function () {
    sessionStorage.clear();
    showLoginPage();
  });

  const AddButton = clon.querySelector("#AddContact");
  AddButton.addEventListener("click", () => {
    content.innerHTML = "";

    content.innerHTML = `
    <div>
      <label for="name" class="text">name</label>
      <input type="text" id="name" placeholder="enter name" />
    </div>
    <div>
      <label for="phone" class="text">phone number</label>
      <input type="tel" id="phone" placeholder="enter phone number" />
    </div>
    <button id="submit4">add</button>
    <button id="closeBtn">Close</button>

  `;

    const submitButton = document.getElementById('submit4');
    submitButton.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      console.log("שם:", name);
      console.log("מספר טלפון:", phone);
      addNewContact(name, phone);
      showContactsPage();
    });
    const closeadd= document.getElementById("closeBtn")
    closeadd.addEventListener("click", () => {
    showContactsPage();
  });

  });

  content.appendChild(clon);
  loadContacts();
}

  



// // Render the list of contact names
function loadContacts() {
  const fajaxGet = new fajax();
  fajaxGet.open("GET" ,"contact/getcontact");
  fajaxGet.onload((contacts) => {
    renderContactsList(JSON.parse(contacts));
  });
  fajaxGet.send();
}

function renderContactsList(contacts) {
  const container = document.getElementById("contacts-container");
  container.innerHTML = "";
    contacts.forEach((contact, index) => {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-item");
    contactDiv.textContent = contact.name;
    contactDiv.addEventListener("click", () => {
    showContactPopup(contact, index);
  });

  container.appendChild(contactDiv);
})
}

function showContactPopup(contact, index) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  

  popup.innerHTML = 
  `<button id="editNameBtn"><h3>${contact.name}</h3></button>
    <button id="editNumberBtn"><p>${contact.number}</p></button>
    <button id="deleteBtn">Delete</button>
    <br><br>
    <button id="closeBtn">Close</button>`;

  document.body.appendChild(popup);

  popup.querySelector("#closeBtn").addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  popup.querySelector("#editNameBtn").addEventListener("click", () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `input-1`; 
    const container = document.getElementById('#editNameBtn');
    container.appendChild(input);
    const inputName = clon.querySelector('input').value;
    input.addEventListener("keydown", function(event){
      if (event.key==="Enter"){
        updatecontactname(contact.name,inputName);
         document.body.removeChild(popup);

      }
    })
  });

    popup.querySelector("#editNumberBtn").addEventListener("click", () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `input-2`; 
    const container = document.getElementById("#editNumberBtn");
    container.appendChild(input);
    const inputName = clon.querySelector('input').value;
    input.addEventListener("keydown", function(event){
      if (event.key==="Enter"){
        updatecontactnumber(contact.name,inputName);
         document.body.removeChild(popup);
      }
    })
  });
  
  popup.querySelector("#deleteBtn").addEventListener("click", () => {
    deleteContactByName(contact.name);
    document.body.removeChild(popup);
    loadContacts()
  });
}






// Display names
// function renderContactsList(contacts) {
//   const container = document.getElementById("contacts-container");
//   container.innerHTML = ""; // clear old content

//   contacts.forEach((c, index) => {
//     const contactDiv = document.createElement("div");
//     contactDiv.classList.add("contact-item");
//     contactDiv.textContent = c.name;
//     contactDiv.style.cursor = "pointer";
//     contactDiv.style.padding = "5px";
//     contactDiv.style.borderBottom = "1px solid #ccc";

// Click handler: popup with info + buttons
//   contactDiv.addEventListener("click", () => {
//     showContactPopup(c, index);
// //   });

//   container.appendChild(contactDiv);
// }

// Popup with contact info and buttons
// function showContactPopup(contact, index) {
//   // Simple popup div
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.top = "50%";
//   popup.style.left = "50%";
//   popup.style.transform = "translate(-50%, -50%)";
//   popup.style.background = "white";
//   popup.style.padding = "20px";
//   popup.style.border = "2px solid #333";
//   popup.style.borderRadius = "8px";
//   popup.style.zIndex = "1000";
//   popup.style.textAlign = "center";

//   popup.innerHTML = `
//     <h3>${contact.name}</h3>
//     <p>${contact.number}</p>
//     <button id="editBtn">Edit</button>
//     <button id="deleteBtn">Delete</button>
//     <br><br>
//     <button id="closeBtn">Close</button>
//   `;

//   document.body.appendChild(popup);

//   // Close button
//   popup.querySelector("#closeBtn").addEventListener("click", () => {
//     document.body.removeChild(popup);
//   });

//   // Call your edit/delete functions with the contact index
//   popup.querySelector("#editBtn").addEventListener("click", () => {
//     editContact(index); // your function
//     document.body.removeChild(popup);
//   });

//   popup.querySelector("#deleteBtn").addEventListener("click", () => {
//     deleteContact(index); // your function
//     document.body.removeChild(popup);
//   });
// }

// Initialize
