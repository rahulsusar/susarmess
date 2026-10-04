// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Expense Form Handler
document.querySelector('.expense-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = this.querySelector('input[type="text"]').value;
    const amount = this.querySelector('input[type="number"]').value;
    const category = this.querySelector('select').value;
    const date = this.querySelector('input[type="date"]').value;

    if (description && amount && category && date) {
        alert(`✅ Expense Added!\n\nDescription: ${description}\nAmount: ₹${amount}\nCategory: ${category}\nDate: ${date}`);
        this.reset();
    }
});

// Employee Form Handler
document.querySelector('.employee-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input, select');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const position = inputs[3].value;
    const salary = inputs[4].value;

    if (name && email && phone && position && salary) {
        alert(`✅ Employee Added!\n\nName: ${name}\nPosition: ${position}\nSalary: ₹${salary}/month\nEmail: ${email}\nPhone: ${phone}`);
        this.reset();
    }
});

// Auto-update statistics every minute
setInterval(() => {
    const currentTime = new Date();
    if (currentTime.getHours() >= 7 && currentTime.getHours() < 9) {
        console.log('🌅 Breakfast time! Check attendance');
    } else if (currentTime.getHours() >= 12 && currentTime.getHours() < 14) {
        console.log('☀️ Lunch time! Prepare meals');
    } else if (currentTime.getHours() >= 16 && currentTime.getHours() < 17) {
        console.log('🍵 Tea time! Serve beverages');
    } else if (currentTime.getHours() >= 20 && currentTime.getHours() < 22) {
        console.log('🌙 Dinner time! Serve meals');
    }
}, 60000);

console.log('🍽️ SusarMess - Mess Management System loaded successfully!');
