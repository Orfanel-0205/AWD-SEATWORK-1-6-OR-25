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
    
    const gwa = grades.reduce((a, b) => a + b) / grades.length;
    const resultElement = document.getElementById('result');
    
    resultElement.classList.remove('alert-error', 'hidden');
    resultElement.classList.add('page-header', 'alert', gwa >= 1.0 && gwa <= 4.0 ? 'alert-success' : 'alert-error');
    
    let qualification = 0;
    const lowestGrade = Math.min(...grades);
    
    switch (true) {
        case (gwa <= 4.0 && gwa >= 3.5): qualification = 100; break;
        case (gwa < 3.5 && gwa >= 3.0): qualification = 75; break;
        case (gwa < 3.0 && gwa >= 2.5): qualification = 50; break;
        case (gwa < 2.5 && gwa >= 2.0): qualification = 25; break;
        case (gwa < 2.0 && gwa >= 1.5): qualification = 10; break;
        case (gwa < 1.5 && gwa >= 1.0): qualification = 0; break;
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
    const savedGrades = JSON.parse(localStorage.getItem('grades')) || [];
    const savedName = localStorage.getItem('name') || '';
    
    document.getElementById('name').value = savedName;
    savedGrades.forEach((grade, index) => {
        if (document.getElementById(`grade${index + 1}`)) {
            document.getElementById(`grade${index + 1}`).value = grade;
        }
    });
    
    if (savedGrades.length > 0) {
        document.getElementById('gradeForm').dispatchEvent(new Event('submit'));
    }
});