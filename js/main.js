document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const buildPriceText = () => {
    const meta = window.priceDownloadMeta || {};
    const categories = Array.isArray(window.priceCategories) ? window.priceCategories : [];
    const lines = [
      meta.title || 'Прайс на строительные и кровельные работы',
      meta.subtitle || '',
      '',
      'Точный расчет делаем после обсуждения задачи, размеров объекта и выбора материалов.',
      ''
    ];

    categories.forEach((category) => {
      lines.push(category.title);
      lines.push(`Источник ориентира: ${category.sourceLabel}`);
      category.items.forEach((item) => {
        lines.push(`- ${item.service}: ${item.price}`);
        lines.push(`  ${item.note}`);
      });
      lines.push('');
    });

    return lines.join('\n');
  };

  const downloadButtons = Array.from(document.querySelectorAll('[data-download-price]'));
  if (downloadButtons.length && Array.isArray(window.priceCategories)) {
    downloadButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const meta = window.priceDownloadMeta || {};
        const blob = new Blob([buildPriceText()], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = meta.fileName || 'price-list.txt';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      });
    });
  }

  const priceGrid = document.querySelector('[data-price-grid]');
  if (priceGrid && Array.isArray(window.priceCategories)) {
    priceGrid.innerHTML = window.priceCategories
      .map((category) => `
        <article class="price-card">
          <span class="price-source">${category.sourceLabel}</span>
          <h3>${category.title}</h3>
          <div class="price-list">
            ${category.items.map((item) => `
              <div class="price-row">
                <div>
                  <p class="price-service">${item.service}</p>
                  <p class="price-note">${item.note}</p>
                </div>
                <div class="price-value">${item.price}</div>
              </div>
            `).join('')}
          </div>
        </article>
      `)
      .join('');
  }

  const priceTeaserGrid = document.querySelector('[data-price-teaser-grid]');
  if (priceTeaserGrid && Array.isArray(window.priceCategories)) {
    const teaserCards = window.priceCategories
      .filter((category) => ['Кровельные работы', 'Строительство домов', 'Бани', 'Заборы'].includes(category.title))
      .map((category) => ({
        title: category.title,
        items: category.items.slice(0, 3)
      }));

    priceTeaserGrid.innerHTML = teaserCards
      .map((category) => `
        <article class="price-mini-card">
          <h3>${category.title}</h3>
          <div class="price-mini-list">
            ${category.items.map((item) => `
              <div class="price-mini-row">
                <strong>${item.service}</strong>
                <span>${item.price}</span>
              </div>
            `).join('')}
          </div>
        </article>
      `)
      .join('');
  }

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
