// Скачать прайс в удобном формате HTML

const buildPriceHtml = () => {
  const meta = window.priceDownloadMeta || {};
  const categories = Array.isArray(window.priceCategories) ? window.priceCategories : [];

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${meta.title || 'Прайс на строительные работы'}</title>

<style>

body{
font-family:Arial, sans-serif;
line-height:1.5;
padding:24px;
max-width:900px;
margin:auto;
background:#ffffff;
color:#111;
}

h1{
font-size:28px;
margin-bottom:10px;
}

h2{
margin-top:30px;
border-bottom:2px solid #ddd;
padding-bottom:6px;
}

.note{
background:#f5f5f5;
border:1px solid #ddd;
padding:16px;
border-radius:12px;
margin:16px 0 24px;
}

.item{
border-bottom:1px solid #eee;
padding:12px 0;
}

.service{
font-weight:700;
}

.price{
color:#0a8f48;
font-weight:700;
}

.source{
font-size:14px;
color:#777;
margin-bottom:8px;
}

</style>
</head>

<body>

<h1>${meta.title || 'Прайс на строительные и кровельные работы'}</h1>

<p>${meta.subtitle || ''}</p>

<div class="note">
Точная стоимость зависит от размеров объекта, материалов и сложности работ.
Свяжитесь с нами для точного расчета.
</div>

${categories.map(category => `
<section>

<h2>${category.title}</h2>

<div class="source">
Источник ориентира: ${category.sourceLabel}
</div>

${category.items.map(item => `
<div class="item">

<div class="service">${item.service}</div>

<div class="price">${item.price}</div>

<div>${item.note}</div>

</div>
`).join('')}

</section>
`).join('')}

</body>
</html>`;
};

const downloadButtons = document.querySelectorAll('[data-download-price]');

downloadButtons.forEach(button => {

button.addEventListener('click', () => {

const blob = new Blob(
[buildPriceHtml()],
{ type: 'text/html;charset=utf-8' }
);

const url = URL.createObjectURL(blob);

const link = document.createElement('a');

link.href = url;
link.download = 'price-hmao.html';

document.body.appendChild(link);

link.click();

link.remove();

URL.revokeObjectURL(url);

});

});