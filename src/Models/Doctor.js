
const uuid=require("uuid");
const Random= require("../Common/Random");
const Person = require("./Person");

module.exports =  class Doctor extends Person
{
    constructor(firstName,lastName,age,specialization,id = uuid.v4())
    {
        super(firstName,lastName,age,id);
        this.specialization = specialization;
    }

    getinfo()
    {
        return `${this.firstName} ${this.lastName} is ${this.age} years old..`;
    }
    static generateRandomPeople(num)
    {
        return super.generateRandomPeople(num).map(doctor => new Doctor(
            doctor.firstName,
            doctor.lastName,
            doctor.age,
            Random.getRandomSpecialaization(),
            doctor.id
        ));
    }

}