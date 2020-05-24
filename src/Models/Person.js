const uuid=require("uuid");
const Random= require("../Common/Random");

class Person
{
    constructor(firstName,lastName,age,id = uuid.v4())
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.id = id;
    }

    getinfo()
    {
        return `${this.firstName} ${this.lastName} is ${this.age} is years old` ;
    }

    static generateRandomPeople(numnberofpeople)
    {
        let RandomPeople = new Array();
        for(let i=0 ; i<numnberofpeople ; i++)
        {
            let randomPerson = new Person(
                Random.getRandomGivenName(),
                Random.getRandomFamilyName(),
                Random.getRandomNumber(42) + 18);
            RandomPeople.push(randomPerson);
        }
        return RandomPeople ; 
    }
}

module.exports = Person;
