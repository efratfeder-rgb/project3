localStorage.setItem("contacts", JSON.stringify([]));
const database = {
    contacts: [],
    addNewContact: function(contact) {
        this.contacts = JSON.parse(localStorage.getItem("contacts"))
        this.contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
        return { success: true, message: 'Contact added successfully.' };
    },
};
