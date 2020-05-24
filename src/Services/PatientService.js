
module.exports = class PatientService
{
    constructor(patientDataReader,doctorDataReader )
    {
        this.patientDataReader = patientDataReader;
        this.doctorDataReader= doctorDataReader;
    }

    getPatient(id)
    {
        return this.patientDataReader.getPatient(id);
    }
    addPatient(patient)
    {
        let patientdata = this.getPatient(patient.id)
        if(patientdata)
        {
            console.log("\nError: Patient Already Found with id: " + patientdata.id);
        }
        else if(this.validPatient(patient))
        {
        return this.patientDataReader.addPatient(patient);
        }
        else{
            console.log("\nError: Patient is not Valid.. \n");
        }
    }
    deletePatient(id)
    {
        let patient = this.getPatient(id);
        if(!patient)
        {
            console.log("\nError: No Matching Patient Found.\n");
        }
        else{
        this.patientDataReader.deletePatient(id);
        }
    }
    doesDoctorExist(id)
    {
        let doctordata=this.doctorDataReader.getDoctor(id);
        if(doctordata)
        {
            return true;
        }else{
            return false;
        }
    }
    validPatient(patient)
    {
        if(!this.doesDoctorExist(patient.doctorId))
        {
            console.log("Error: could't find matching Doctor for given ID...");
            return false;
        }
        if(isNaN(patient.age))
        {
            return false;
        }
        return true;
    }
    updatePatient(patient)
    {
        let patientdata = this.getPatient(patient.id);
        if(!patientdata)
        {
            console.log("\nError: No Matching Patient Found\n");
        }
        else if(this.validPatient(patient))
        {
            this.patientDataReader.updatePatient(patient);
        }
        else{
            console.log("\nError: patient is not valid.\n");
        }

    }
    searchbyname(fullname)
    {
        return this.patientDataReader.getArrayfromfile().filter(patient => `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(fullname));
    }
    assigndoctorforpatient()
    {
        return this.doctorDataReader.assigndoctorforpatient();
    }

    patienteffectedcovid19()
    {
        let patientsCovid= this.patientDataReader.patienteffectedcovid19();
        if(patientsCovid == undefined)
        {
            console.log("No Patients efficted by Covid19..");
        }
        return patientsCovid;
    }
    getPatientsRealtedToDoctor(doctorid)
    {
        return this.patientDataReader.getPatientsRealtedToDoctor(doctorid);
    }
}