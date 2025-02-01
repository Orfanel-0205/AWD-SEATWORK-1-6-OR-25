document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const grades = [
        parseFloat(document.getElementById('grade1').value),
        parseFloat(document.getElementById('grade2').value),
        parseFloat(document.getElementById('grade3').value),
        parseFloat(document.getElementById('grade4').value),
        parseFloat(document.getElementById('grade5').value),
    ];
    
    localStorage.setItem('grades', JSON.stringify(grades));
    localStorage.setItem('name', name);
    
    const validGrades = [4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5];
    const filteredGrades = grades.filter(grade => validGrades.includes(grade));
    
    const gwa = filteredGrades.reduce((a, b) => a + b, 0) / filteredGrades.length;
    const resultElement = document.getElementById('result');
    
    resultElement.classList.remove('alert-error', 'hidden');
    resultElement.classList.add('page-header', 'alert', gwa >= 1.0 ? 'alert-success' : 'alert-error');
    
    let qualification = 0;
    const lowestGrade = Math.min(...filteredGrades);
    
    switch (true) {
        case (gwa >= 1.0): qualification = (lowestGrade >= 1.5 ? 100 : (lowestGrade >= 2.0 ? 75 : (lowestGrade >= 2.5 ? 50 : 0))); break;
        default: qualification = 0; break;
    }
    
    resultElement.innerHTML = `
        <h1><small>Your GWA is</small> ${gwa.toFixed(4)}</h1>
        <h4><small>Your lowest grade is <strong>${lowestGrade.toFixed(2)}</strong>. 
        ${qualification ? `Congrats! You qualify for <strong>${qualification}%</strong> scholarship.` : 'Sorry, you do not qualify for a scholarship.'}</small></h4>
    `;
    
    resultElement.style.display = 'block';
    window.scrollTo({ top: document.getElementById('main-head').offsetTop, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function() {
    const storedGrades = JSON.parse(localStorage.getItem('grades')) || [];
    const storedName = localStorage.getItem('name') || '';
    
    document.getElementById('name').value = storedName;
    
    storedGrades.forEach((grade, index) => {
        if (document.getElementById(`grade${index + 1}`)) {
            document.getElementById(`grade${index + 1}`).value = grade;
        }
    });
    
    if (storedGrades.length) {
        document.getElementById('gradeForm').dispatchEvent(new Event('submit'));
    }
});
