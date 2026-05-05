// script.js
function smoothScrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    // Add mobile menu logic if needed
    console.log('Mobile menu toggled');
}

function showWaitlistModal() {
    document.getElementById('waitlist-modal').classList.remove('hidden');
    document.getElementById('waitlist-modal').classList.add('flex');
}

function hideWaitlistModal() {
    document.getElementById('waitlist-modal').classList.add('hidden');
    document.getElementById('waitlist-modal').classList.remove('flex');
}

function handleWaitlistSubmit(e) {
    e.preventDefault();
    hideWaitlistModal();
    alert("✅ Welcome to the ClearCurve inner circle! You will receive your first brief at launch.");
}

// Chart demo
window.onload = () => {
    const ctx = document.getElementById('trendChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                    { label: 'Historical', data: [420, 680, 920, 1100, 980, 1250, 1580, 2100, 2450, 3100], borderColor: '#64748b', tension: 0.4 },
                    { label: 'ClearCurve Prediction', data: [null, null, null, null, null, 1250, 1580, 2100, 2450, 4200], borderColor: '#00f5ff', borderDash: [8, 4], tension: 0.4 }
                ]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }
    console.log('%c✅ ClearCurve AI — Professional, content-rich, fully scrollable website ready', 'color:#00f5ff;font-weight:bold');
};