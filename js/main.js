document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item[data-category]'));

  if (filterButtons.length && portfolioItems.length) {
    const applyFilter = (filter) => {
      filterButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === filter);
      });

      portfolioItems.forEach((item) => {
        const categories = item.dataset.category.split(/\s+/);
        const matches = filter === 'all' || categories.includes(filter);
        item.hidden = !matches;
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.filter));
    });

    applyFilter('all');
  }

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  const lightboxClosers = Array.from(document.querySelectorAll('[data-lightbox-close]'));

  if (lightbox && lightboxImage && lightboxTriggers.length) {
    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImage.src = '';
      lightboxImage.alt = '';
      document.body.style.overflow = '';
    };

    const openLightbox = (src, alt) => {
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };

    lightboxTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        openLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt || '');
      });
    });

    lightboxClosers.forEach((closer) => {
      closer.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }
});
