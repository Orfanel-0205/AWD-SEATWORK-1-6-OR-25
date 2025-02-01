document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const grades = [];
    const credits = [];
    let totalWeightedGrade = 0;
    let totalCredits = 0;

    for (let i = 1; i <= 5; i++) {
        let grade = parseFloat(document.getElementById(`grade${i}`).value);
        let credit = parseFloat(document.getElementById(`credit${i}`).value);

        if (!isNaN(grade) && !isNaN(credit) && grade >= 0.0 && grade <= 4.0 && credit > 0) {
            grades.push(grade);
            credits.push(credit);
            totalWeightedGrade += grade * credit;
            totalCredits += credit;
        }
    }

    if (grades.length === 0 || totalCredits === 0) {
        alert("Please enter valid grades and credit units.");
        return;
    }

    const gwa = totalWeightedGrade / totalCredits;
    const lowestGrade = Math.min(...grades);
    
    localStorage.setItem('grades', JSON.stringify(grades));
    localStorage.setItem('credits', JSON.stringify(credits));
    localStorage.setItem('name', name);

    const resultElement = document.getElementById('result');
    resultElement.classList.remove('alert-error', 'hidden');
    resultElement.classList.add('page-header', 'alert', gwa >= 1.0 && gwa <= 4.0 ? 'alert-success' : 'alert-error');

    let qualification = 0;
    switch (true) {
        case (gwa >= 3.5): qualification = 100; break;
        case (gwa >= 3.0): qualification = 75; break;
        case (gwa >= 2.5): qualification = 50; break;
        case (gwa >= 2.0): qualification = 25; break;
        case (gwa >= 1.5): qualification = 10; break;
        default: qualification = 0; break;
    }

    resultElement.innerHTML = `
        <h1><small>Your GWA is</small> ${gwa.toFixed(2)}</h1>
        <h4><small>Your lowest grade is <strong>${lowestGrade.toFixed(2)}</strong>. 
        ${qualification ? `Congrats! isa kang  <strong>${qualification}%</strong> Alamat.` : 'Better luck next time!'}</small></h4>
    `;

    resultElement.style.display = 'block';
    window.scrollTo({ top: document.getElementById('main-head').offsetTop, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function() {
    const savedGrades = JSON.parse(localStorage.getItem('grades')) || [];
    const savedCredits = JSON.parse(localStorage.getItem('credits')) || [];
    const savedName = localStorage.getItem('name') || '';

    document.getElementById('name').value = savedName;
    
    savedGrades.forEach((grade, index) => {
        if (document.getElementById(`grade${index + 1}`) && document.getElementById(`credit${index + 1}`)) {
            document.getElementById(`grade${index + 1}`).value = grade;
            document.getElementById(`credit${index + 1}`).value = savedCredits[index] || '';
        }
    });

    if (savedGrades.length > 0) {
        document.getElementById('gradeForm').dispatchEvent(new Event('submit'));
    }
});
