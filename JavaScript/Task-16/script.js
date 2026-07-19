const students =[
    {Name: "Salman Ahmed", Marks: "70%", Class:"3rd", Address: "India"},
    {Name: "Riya Sharma", Marks: "90%", Class:"10th", Address: "123,ABC colony, Delhi"},
    {Name: "Rohan Patel", Marks: "75%", Class:"8th", Address: "456, xyz Street, Mumbai"},
    {Name: "Priya Singh", Marks: "30%", Class:"12th", Address: "789, PQR Nagar, Bangalore"},
    {Name: "Ankit Gupta", Marks: "50%", Class:"9th", Address: "DFG Street, Kolkata"},
    {Name: "Anik Das", Marks: "92%", Class:"4th", Address: "PLK Street, Jharkhand"},
    {Name: "Apurva Gupta", Marks: "95%", Class:"7th", Address: "ROY COLONY , Bihar"},
    {Name: "Pooja Mishra", Marks: "88%", Class:"10th", Address: "FGH Road, Chennai"},
    {Name: "Rajesh Ujha", Marks: "90%", Class:"3rd", Address: "Pune, India"}
    
]
const studentGrid = document.getElementById("studentGrid")
const searchInput = document.getElementById("studentSearch")
const searchButton = document.getElementById("searchButton")

function renderStudents(filteredStudents){
    studentGrid.innerHTML= '';

    if(filteredStudents.length ===0){
        studentGrid.innerHTML`<p style=""grid-column: 1/-1; text-align: center; color:#888; padding:20px;>No matching Reords Found.</p> `;
        return;
    }
    filteredStudents.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML= `
        <p><strong>Student Name: </strong> ${student.Name}</p>
        <p><strong>Marks: </strong> ${student.Marks}</p>
        <p><strong>Class: </strong> ${student.Class}</p>
        <p><strong>Address: </strong> ${student.Address}</p>
        `;  
        studentGrid.appendChild(card);
    });
}
function performSearch(){
    const query = searchInput.value.toLowerCase().trim();
    const filtered = students.filter(student=> 
        student.Name.toLowerCase().includes(query)
    );
    renderStudents(filtered);
}
searchButton.addEventListener('click',performSearch);
searchInput.addEventListener('keyup',(e)=> {
    if(e.key === 'Enter'){
        performSearch();
    }
});
renderStudents(students)