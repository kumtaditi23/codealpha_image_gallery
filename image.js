document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentImageIndex = 0;
    
    let filteredImages = Array.from(galleryItems);

    
    const updateFilteredImages = () => {
        filteredImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    };

    
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            
            const clickedImgSrc = item.querySelector('img').src;
            currentImageIndex = filteredImages.findIndex(imgItem => imgItem.querySelector('img').src === clickedImgSrc);

            lightboxImg.src = clickedImgSrc; 
            lightbox.classList.add('active'); 
        });
    });


    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active'); 
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            }
        }
    });

    function navigate(direction) {
        if (filteredImages.length === 0) return; 
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = filteredImages.length - 1; 
        } else if (currentImageIndex >= filteredImages.length) {
            currentImageIndex = 0; 
        }
        lightboxImg.src = filteredImages[currentImageIndex].querySelector('img').src;
    }

    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterType = button.dataset.filter; 

            galleryItems.forEach(item => {
                const itemType = item.dataset.type; 
                if (filterType === 'all' || itemType === filterType) {
                    item.style.display = 'block'; 
                    item.style.animation = 'fadeIn 0.5s ease-in-out'; 
                } else {
                    item.style.display = 'none'; 
                    item.style.animation = 'none'; 
                }
            });
            updateFilteredImages(); 
        });
    });

    updateFilteredImages();
});