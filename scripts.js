// Animate numbers in specifications
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toFixed(2);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Live market price functionality
const marketPriceBtn = document.querySelector('.market-price-btn');
if (marketPriceBtn) {
    marketPriceBtn.addEventListener('click', async () => {
        marketPriceBtn.textContent = 'Loading...';
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockPrice = (Math.random() * 100 + 50).toFixed(2);
            marketPriceBtn.textContent = `Current Price: $${mockPrice}`;
        } catch (error) {
            marketPriceBtn.textContent = 'Error loading price';
        }
        setTimeout(() => {
            marketPriceBtn.textContent = 'LIVE MARKET PRICE';
        }, 3000);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hero, .specs-container, .supply-info').forEach(el => {
    el.classList.add('fade-out');
    observer.observe(el);
});