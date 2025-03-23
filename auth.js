$(document).ready(function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('yqtLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Simple authentication check
    if (currentPage === 'index.html' || currentPage === '') {
        // On login page
        // if (isLoggedIn === 'true') {
        //     // Redirect to dashboard if already logged in
        //     window.location.href = 'dashboard.html';
        // }
        
        // Login button click handler
        $('#login-btn').on('click', function() {
            const username = $('#username').val();
            const password = $('#password').val();
            
            // Show spinner, hide text
            $(this).find('.login-text').hide();
            $(this).find('.spinner-border').removeClass('d-none');
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Simple validation (in real app, this would be server-side)
                if (username === 'yqt' && password === 'yqt12345') {
                    localStorage.setItem('yqtLoggedIn', 'true');
                    localStorage.setItem('yqtUsername', username);
                    window.location.href = 'dashboard.html';
                } else {
                    // Show error
                    $('#login-error').removeClass('d-none');
                    // Reset button
                    $('#login-btn').find('.login-text').show();
                    $('#login-btn').find('.spinner-border').addClass('d-none');
                }
            }, 1500);
        });
        
        // Clear error on input change
        $('#username, #password').on('input', function() {
            $('#login-error').addClass('d-none');
        });
    } else if (currentPage === 'dashboard.html') {
        // On dashboard page - check if logged in
        if (isLoggedIn !== 'true') {
            window.location.href = 'index.html';
        }
        
        // Set user name in dashboard
        const username = localStorage.getItem('yqtUsername') || 'Trader';
        $('.user-name').text('Welcome, ' + username);
        
        // Logout button handler
        $('#logout-btn').on('click', function() {
            localStorage.removeItem('yqtLoggedIn');
            window.location.href = 'index.html';
        });
        
        // Handle sidebar navigation
        $('.sidebar-menu .nav-link').on('click', function(e) {
            e.preventDefault();
            
            // Update active state
            $('.sidebar-menu .nav-link').removeClass('active');
            $(this).addClass('active');
            
            // Get section name from href
            const section = $(this).attr('href').substring(1);
            
            // Update page title
            $('.top-bar h2').text($(this).text().trim());
            
            // Handle different sections
            switch(section) {
                case 'dashboard':
                    $('#dashboard-content').show();
                    break;
                case 'signals':
                    $('#dashboard-content').hide();
                    alert('Trading Signals section will be available in the next update.');
                    $(this).parent().siblings().first().find('.nav-link').addClass('active');
                    $('.top-bar h2').text('Dashboard');
                    $('#dashboard-content').show();
                    break;
                case 'history':
                    $('#dashboard-content').hide();
                    alert('Signal History section will be available in the next update.');
                    $(this).parent().siblings().first().find('.nav-link').addClass('active');
                    $('.top-bar h2').text('Dashboard');
                    $('#dashboard-content').show();
                    break;
                case 'news':
                    $('#dashboard-content').hide();
                    alert('Market News section will be available in the next update.');
                    $(this).parent().siblings().first().find('.nav-link').addClass('active');
                    $('.top-bar h2').text('Dashboard');
                    $('#dashboard-content').show();
                    break;
                case 'settings':
                    $('#dashboard-content').hide();
                    alert('Settings section will be available in the next update.');
                    $(this).parent().siblings().first().find('.nav-link').addClass('active');
                    $('.top-bar h2').text('Dashboard');
                    $('#dashboard-content').show();
                    break;
                default:
                    $('#dashboard-content').show();
            }
        });
    }
}); 