module.exports = class PatientService
{
    constructor(doctorDataReader ,patientDataReader)
    {
        this.doctorDataReader= doctorDataReader;
        this.patientDataReader = patientDataReader;
    }

    getDoctor(id)
    {
        return this.doctorDataReader.getDoctor(id);
    }
    addDoctor(doctor)
    {
        let doctordata = this.getDoctor(doctor.id);
        if(doctordata)
        {
            console.log("\nError: Doctor Already Found with id: " + doctordata.id);
        }
        else if(this.validDoctor(doctor))
        {
        return this.doctorDataReader.addDoctor(doctor);
        }
        else{
            console.log("\nError: Doctor is not Valid.. \n");
        }
    }
    deleteDoctor(id)
    {
        let doctor = this.getDoctor(id);
        if(!doctor)
        {
            console.log("\nError: No Matching Doctor Found.\n");
        }
        else{
        this.doctorDataReader.deleteDoctor(id);
        }
    }
    validDoctor(doctor)
    {
        if(isNaN(doctor.age))
        {
            return false;
        }
        if(doctor.specialization == undefined || doctor.specialization== " ")
        {
            return false;
        }
        return true;
    }
    updateDoctor(doctor)
    {
        let doctordata = this.getDoctor(doctor.id);
        if(!doctordata)
        {
            console.log("\nError: No Matching Doctor Found\n");
        }
        else if(this.validDoctor(doctor))
        {
            this.doctorDataReader.updateDoctor(doctor);
        }
        else{
            console.log("\nError: Doctor is not valid.\n");
        }

    }
    searchbyname(fullname)
    {
        //console.log(this.doctorDataReader.getArrayfromfile());
        return this.doctorDataReader.getArrayfromfile().filter(doctor => `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(fullname));
    }
    getDoctorsPatient(patient)
    {

        let result =this.doctorDataReader.getDoctorsPatient(patient);
        if(result)
        {
            return result;
        }else
        {
            console.log("No matching....");
            return undefined;
        }
    }

}