<script>
// Floating Circles Background Animation
document.addEventListener('DOMContentLoaded', function() {
    const circlesContainer = document.getElementById('floatingCircles');
    if (!circlesContainer) return;
    
    // Number of circles (adjust based on screen size)
    const circleCount = window.innerWidth < 768 ? 15 : 30;
    
    // Create circles
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.className = 'floating-circle';
        
        // Random size (small or large)
        const sizeType = Math.random() > 0.5 ? 'small' : 'large';
        circle.classList.add(sizeType);
        
        // Add secondary size class for more variety
        const sizeVariants = ['small', 'medium', 'large', 'xlarge'];
        const sizeVariant = sizeVariants[Math.floor(Math.random() * sizeVariants.length)];
        if (sizeVariant !== sizeType) {
            circle.classList.add(sizeVariant);
        }
        
        // Random color
        circle.classList.add(Math.random() > 0.5 ? 'light-blue' : 'light-pink');
        
        // Random position
        circle.style.left = `${Math.random() * 100}%`;
        
        // Random animation properties
        const animationTypes = ['floatCircle', 'floatCircle2', 'floatCircle3'];
        const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
        
        // Random animation duration (20-40 seconds)
        const duration = 20 + Math.random() * 20;
        circle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        circle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Custom properties for varied movement
        circle.style.setProperty('--move-x', (Math.random() * 200 - 100).toFixed(0));
        circle.style.setProperty('--rotate', (Math.random() * 360).toFixed(0));
        
        // Apply animation
        circle.style.animationName = animationType;
        
        circlesContainer.appendChild(circle);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Update number of circles on resize
            const currentCircles = circlesContainer.children.length;
            const desiredCount = window.innerWidth < 768 ? 15 : 30;
            
            if (currentCircles !== desiredCount) {
                // Clear and recreate circles
                circlesContainer.innerHTML = '';
                
                // Recreate with new count
                for (let i = 0; i < desiredCount; i++) {
                    const circle = document.createElement('div');
                    circle.className = 'floating-circle';
                    const sizeType = Math.random() > 0.5 ? 'small' : 'large';
                    circle.classList.add(sizeType);
                    circle.classList.add(Math.random() > 0.5 ? 'light-blue' : 'light-pink');
                    circle.style.left = `${Math.random() * 100}%`;
                    
                    const duration = 20 + Math.random() * 20;
                    circle.style.animationDuration = `${duration}s`;
                    circle.style.animationDelay = `${Math.random() * 5}s`;
                    
                    circlesContainer.appendChild(circle);
                }
            }
        }, 250);
    });
});
</script>
