
        document.addEventListener('DOMContentLoaded', () => {
            const textElements = document.querySelectorAll('.text-group > *');
            textElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            });

            document.querySelectorAll('.text-group > *').forEach(el => observer.observe(el));
        });
    