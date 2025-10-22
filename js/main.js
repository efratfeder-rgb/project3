const login = document.getElementById("login");
const signup = document.getElementById("signup");
const page = document.getElementById("page");
const pagecontent = document.getElementById("content");

window.addEventListener("DOMContentLoaded", function () {
  showContactsPage();
});

function showLoginPage() {
  pagecontent.innerHTML = "";
  let clon = login.content.cloneNode(true);

  const submitButton = clon.querySelector("#submit1");
  const usernameInput = clon.querySelector("#username1");
  const passwordInput = clon.querySelector("#password1");
  const registerPage = clon.querySelector("#registerPage");
  const logout1 = clon.querySelector("#logout1");

  submitButton.addEventListener("click", function () {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (localStorage.getItem(username) === password) {
      sessionStorage.setItem("isConnected", "true");
      showGamePage();
    } else {
      alert("nope");
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

  submitButton.addEventListener("click", function () {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    if (localStorage.getItem(username) === null) {
      localStorage.setItem(username, password);
      sessionStorage.setItem("isConnected", "true");
      alert(`Registered: ${username}`);
      showGamePage();
    } else {
      alert("no!");
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
    console.log("HI");
  });

  content.appendChild(clon);

  loadContacts();
}

// Render the list of contact names
function loadContacts() {
  const fajaxGet = new fajax();
  fajaxGet.open("GET");
  fajaxGet.onload((contacts) => {
    renderContactsList(contacts);
  });
  fajaxGet.send();
}

// Display names
function renderContactsList(contacts) {
  const container = document.getElementById("contacts-container");
  container.innerHTML = ""; // clear old content

  contacts.forEach((c, index) => {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-item");
    contactDiv.textContent = c.name;
    contactDiv.style.cursor = "pointer";
    contactDiv.style.padding = "5px";
    contactDiv.style.borderBottom = "1px solid #ccc";

    // Click handler: popup with info + buttons
    contactDiv.addEventListener("click", () => {
      showContactPopup(c, index);
    });

    container.appendChild(contactDiv);
  });
}

// Popup with contact info and buttons
function showContactPopup(contact, index) {
  // Simple popup div
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "white";
  popup.style.padding = "20px";
  popup.style.border = "2px solid #333";
  popup.style.borderRadius = "8px";
  popup.style.zIndex = "1000";
  popup.style.textAlign = "center";

  popup.innerHTML = `
    <h3>${contact.name}</h3>
    <p>${contact.number}</p>
    <button id="editBtn">Edit</button>
    <button id="deleteBtn">Delete</button>
    <br><br>
    <button id="closeBtn">Close</button>
  `;

  document.body.appendChild(popup);

  // Close button
  popup.querySelector("#closeBtn").addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  // Call your edit/delete functions with the contact index
  popup.querySelector("#editBtn").addEventListener("click", () => {
    editContact(index); // your function
    document.body.removeChild(popup);
  });

  popup.querySelector("#deleteBtn").addEventListener("click", () => {
    deleteContact(index); // your function
    document.body.removeChild(popup);
  });
}

// Initialize
window.addEventListener("DOMContentLoaded", showContactsPage);
