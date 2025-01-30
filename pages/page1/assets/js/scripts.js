document.getElementById('gradeForm').addEventListener('submit' , function(event) {
    event.preventDefault();
    

    const name = document.getElementById('name').value;
    const grades = [
       parseFloat (document.getElementById('grade1').value),
       parseFloat (document.getElementById('grade2').value),
       parseFloat (document.getElementById('grade3').value),
       parseFloat (document.getElementById('grade4').value),
       parseFloat (document.getElementById('grade5').value),
    ];
    
    const gwa = grades.reduce((a, b) => a + b) / grades.length;
    const resultElement = document.getElementById('result');
    resultElement.classList.remove('hidden');
    resultElement.innerHTML = `
        <p>Name: ${name}</p>
        <p>GWA: ${gwa}</p>
    `;


});


