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


function renderStudents(filteredStudents) {
    
    if (filteredStudents.length === 0) {
        studentGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color:#888;">No matching records found.</p>`;
        return;
    }

   
    const cardsHTML = filteredStudents.map(student => {
        return `
            <div class="student-card">
                <p><strong>Student Name: </strong> ${student.Name}</p>
                <p><strong>Marks: </strong> ${student.Marks}</p>
                <p><strong>Class: </strong> ${student.Class}</p>
                <p><strong>Address: </strong> ${student.Address}</p>
            </div>
        `;
    }).join(''); 

    
    studentGrid.innerHTML = cardsHTML;
}

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = students.filter(student => 
        student.Name.toLowerCase().includes(query)
    );
    
    renderStudents(filtered);
}


searchInput.addEventListener('input', performSearch);
searchButton.addEventListener('click', performSearch);


renderStudents(students);
