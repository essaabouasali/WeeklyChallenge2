const uuid=require("uuid");
const Random= require("../Common/Random");
const Person = require("./Person");
module.exports = class Patient extends Person
{
    constructor(firstName,lastName,age,diseases,doctorId,id = uuid.v4())
    {
        super(firstName,lastName,age,id);
        this.diseases= diseases;
        this.doctorId=doctorId;
    }
    getinfo()
    {
        return `${this.firstName} ${this.lastName} is ${this.age} years old.`;
    }
    getDoctor(doctor)
    {
        return doctor.find(d => d.id == this.doctorId);
    }
    static generaterandomDiseases()
    {
        let randomD= new Array();
        let numberofdisese = Random.getRandomNumber(6) + 1;
        for(let i=0 ; i< numberofdisese ;i++)
        {   
            let disease = Random.getRandomDiseases()
            if(randomD.includes(disease))
            {
                i--;
            }
            else{
                randomD.push(disease);
            }
        }
        return randomD;
    }
    static generateRandomPeople(num,validIds)
    {
        return super.generateRandomPeople(num).map(patient => new Patient(
            patient.firstName,
            patient.lastName,
            patient.age,
            this.generaterandomDiseases(),
            validIds[Random.getRandomNumber(validIds.length)],
            patient.id
        ));
    }
}