const getRandomGivenName = function () {
    const RANDOM_FIRST_NAMES = ["Charlotte", "Olivia", "Ava", "Amelia", "Mia", "Isla", "Oliver", "William", "Jack", "Noah", "Thomas", "James"];
    return RANDOM_FIRST_NAMES[Math.floor(Math.random() * RANDOM_FIRST_NAMES.length)];
}

const getRandomFamilyName = function () {
    const RANDOM_LAST_NAMES = ["Smith", "Jones", "Williams", "Brown", "Wilson", "Johnson", "Taylor", "White", "Martin", "Anderson", "Thompson", "Nguyen"];
    return RANDOM_LAST_NAMES[Math.floor(Math.random() * RANDOM_LAST_NAMES.length)];
}
const getRandomSpecialaization = function()
{
    const Random_Specialaization = ["Family Physician","Internal Medicine Physician","Pediatrician","Gynecologist","Surgeon","Psychiatrist","Cardiologist","Dermatologist","Endocrinologist","Ophthalmologist"];
    return Random_Specialaization[Math.floor(Math.random() * Random_Specialaization.length)];
}
const getRandomDiseases = function() {
    const Random_Diseases = ["cancer","cardiovascular","Chronic","Diabetes","Covid19","blackouts","eye or vision problems","heart disease","sleep disorders","alcohol or drug dependency","Flu","Self-harm"];
    return Random_Diseases[Math.floor(Math.random() * Random_Diseases.length)];
}
const getRandomNumber = max => Math.floor(Math.random() * max);

module.exports = {
    getRandomGivenName,
    getRandomFamilyName,
    getRandomNumber,
    getRandomSpecialaization,
    getRandomDiseases
}
