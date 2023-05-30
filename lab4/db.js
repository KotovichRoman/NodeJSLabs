const Person = require("./person");

let persons = [
    new Person(1, "name1", "2023-04-15")
];

let maxId = persons.length;

function select() {
    return persons;
}

function insert(newPerson) {
    maxId++;
    const person = new Person(maxId, newPerson.name, newPerson.bday);
    persons.push(person);
    return person;
}

function update(newPerson) {
    const index = persons.findIndex((oldPerson) => oldPerson.id === parseInt(newPerson.id));
    if (index === -1) {
        return {error: "This person is not exist"};
    }
    persons.splice(index, 1, newPerson);
    return persons[index];
}

function deletePerson(idDeletingPerson) {
    const index = persons.findIndex((oldPerson) => parseInt(oldPerson.id) === idDeletingPerson);
    if (index === -1) {
        return {error: "This person is not exist"};
    }
    const deletedPerson = persons[index];
    persons.splice(index, 1);
    return deletedPerson;
}

module.exports = {
    select,
    insert,
    update,
    deletePerson
}
