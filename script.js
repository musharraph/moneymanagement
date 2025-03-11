var inv__entry = document.querySelector(".inv__entry")
var steps__entry = document.querySelector(".steps__entry")
var percentage__entry = document.querySelector(".percentage__entry")
var total__inv__entry = document.querySelector(".total__inv__entry")
var mode_toggle = document.querySelector("#mode-toggle")

function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

function calculateSteps(totalInvestment, firstStep, percentage) {
    let steps = 1;
    let currentTotal = firstStep;
    percentage = percentage / 100;
    
    while (currentTotal < totalInvestment) {
        let nextStep = firstStep * (1 + (1 / percentage)) ** steps;
        currentTotal += nextStep;
        steps++;
        
        if (steps > 100) break;
    }
    
    return steps - 1;
}

function animateNumber(element, start, end, duration = 1000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = formatCurrency(current);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

var MAIN__FUNCTION = _ => {
    var inv = Number(inv__entry.value)
    var percentage = Number(percentage__entry.value)
    var result = document.querySelector(".result__vals")
    result.innerHTML = ""

    var steps;
    if (mode_toggle.checked) {
        var totalInv = Number(total__inv__entry.value)
        steps = calculateSteps(totalInv, inv, percentage)
        steps__entry.value = steps
        steps__entry.disabled = true
    } else {
        steps = Number(steps__entry.value)
        steps__entry.disabled = false
    }

    var vals = []
    for (let i = 0; i < steps; i++) {
        var formula = inv * (1 + (1 / (percentage/100))) ** i;
        vals.push(Math.round(formula))
    }

    var totalInvestment = vals.reduce((a, b) => a + b, 0);
    var profitPerSession = Math.round(inv * (percentage/100));

    // Animate the numbers
    const totalElement = document.querySelector(".total .stat__value");
    const profitElement = document.querySelector(".profit .stat__value");
    
    animateNumber(totalElement, 0, totalInvestment);
    animateNumber(profitElement, 0, profitPerSession);

    // Add steps with animation
    vals.forEach((j, index) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.textContent = j;
            
            // Add size classes based on number length
            if (j.toString().length > 6) {
                span.classList.add('very-large-number');
            } else if (j.toString().length > 4) {
                span.classList.add('large-number');
            }
            
            span.style.opacity = '0';
            span.style.transform = 'translateY(10px)';
            result.appendChild(span);
            
            // Trigger animation
            requestAnimationFrame(() => {
                span.style.transition = 'all 0.3s ease';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, index * 100);
    });
}

// Initial calculation
MAIN__FUNCTION()

// Event listeners with debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedMain = debounce(() => MAIN__FUNCTION(), 300);

mode_toggle.onchange = function() {
    document.querySelector(".total__inv__container").style.display = 
        this.checked ? "block" : "none";
    MAIN__FUNCTION();
}

inv__entry.oninput = debouncedMain;
steps__entry.oninput = debouncedMain;
percentage__entry.oninput = debouncedMain;
total__inv__entry.oninput = debouncedMain;

// Add this helper function at the top with other functions
function getNumberSize(number) {
    const length = number.toString().length;
    if (length > 6) return 'very-large-number';
    if (length > 4) return 'large-number';
    return '';
}

// Optional: Add this function to format large numbers with commas
function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

// Update the span creation to use formatted numbers
vals.forEach((j, index) => {
    setTimeout(() => {
        const span = document.createElement('span');
        span.textContent = formatNumber(j);
        
        const sizeClass = getNumberSize(j);
        if (sizeClass) {
            span.classList.add(sizeClass);
        }
        
        span.style.opacity = '0';
        span.style.transform = 'translateY(10px)';
        result.appendChild(span);
        
        // Trigger animation
        requestAnimationFrame(() => {
            span.style.transition = 'all 0.3s ease';
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }, index * 100);
}); 