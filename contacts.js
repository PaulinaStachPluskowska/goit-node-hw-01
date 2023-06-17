const fs = require('node:fs').promises;
const path = require('node:path');

const { v4: uuidv4 } = require('uuid');


require('colors');

const contactsPath = path.resolve('./db/contacts.json');

async function fetchContacts() { 
    try {
        const contacts = await fs.readFile(contactsPath);
        const parsedContacts = JSON.parse(contacts);
        return parsedContacts;
    }
    catch (err) { 
        console.log(err.message);
    }
}

async function listContacts() {
    try {
        const contacts = await fetchContacts();
        console.table(contacts);
        return;
    }
    catch (err) { 
        console.log(err.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await fetchContacts();
        const searchedContact = contacts.find((contact) => contact.id === contactId);
        if (!searchedContact) {
            console.log(`We couldn't find this contact`.red);
            return;
        }
        console.log(`Success. Your contact:`.bgGreen);
        console.table(searchedContact);
        return;
    }
    catch (err) { 
        console.log(err.message);
    }
}

async function removeContact(contactId) {
    try { 
        const contacts = await fetchContacts();
        const delContact = contacts.find((contact) => contact.id === contactId);
        if (!delContact) {
            console.log(`We couldn't find contact with given id`.red);
            return;
        }
        const filteredContact = contacts.filter((contact) => contact.id !== contactId);
        console.table(filteredContact);
        fs.writeFile(contactsPath, JSON.stringify(filteredContact));
        console.log(`Contact ${delContact.name} successfully deleted`.bgYellow);
        return;
    }
    catch (err) {
        console.log(err.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await fetchContacts();
        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone
        };

        contacts.push(newContact);
        console.table(contacts);
        fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(`Contact ${name} added sucssessfully.`.brightGreen);
        return;
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
