// app.js — renders the page from data.js using the chart builders in charts.js,
// and wires the sortable province table. Runs after data.js and charts.js.
'use strict';

function renderStatCards() {
  const host = document.getElementById('stat-cards');
  host.innerHTML = HEADLINE_STATS.map(function (s) {
    return '<article class="stat-card">' +
      '<p class="stat-label">' + s.label + '</p>' +
      '<p class="stat-value">' + s.value + '</p>' +
      '<p class="stat-period">' + s.period + '</p>' +
      '<p class="stat-note">' + s.note + '</p>' +
      '<p class="stat-delta">' + s.delta + '</p>' +
      '</article>';
  }).join('');
}

function renderCharts() {
  document.getElementById('chart-gdp').innerHTML = barChartVertical(GDP_GROWTH_SERIES, {
    min: -3, max: 6, gridStep: 3, label: 'Bar chart of Indonesian GDP growth 2015 to 2024',
  });
  document.getElementById('chart-inflation').innerHTML = lineChart(INFLATION_SERIES, {
    min: 0, max: 4, gridStep: 1, target: 2.5, label: 'Line chart of Indonesian inflation January 2024 to September 2025',
  });
  document.getElementById('chart-trade').innerHTML = groupedBars(TRADE_SERIES, {
    max: 300, label: 'Grouped bar chart of Indonesian exports and imports 2020 to 2024',
  });
  document.getElementById('chart-population').innerHTML = horizontalBars(
    POPULATION_SERIES.map(function (d) { return { label: d.year, value: d.value, display: d.value.toFixed(1) + ' m' }; }),
    { max: 300, label: 'Horizontal bar chart of Indonesian population by census year' }
  );
  document.getElementById('chart-age').innerHTML = horizontalBars(
    AGE_GROUPS.map(function (d) { return { label: d.group, value: d.share, display: d.share.toFixed(1) + '%' }; }),
    { max: 50, label: 'Horizontal bar chart of Indonesian population share by age group' }
  );
}

function renderSocial() {
  const host = document.getElementById('social-list');
  host.innerHTML = SOCIAL_STATS.map(function (s) {
    return '<div class="social-row"><span class="social-label">' + s.label + '</span>' +
      '<span class="social-value">' + s.value + '</span>' +
      '<span class="social-period">' + s.period + '</span></div>';
  }).join('');
}

let provinceSort = { key: 'population', dir: -1 };

function renderProvinces() {
  const rows = PROVINCES.slice().sort(function (a, b) {
    const av = a[provinceSort.key], bv = b[provinceSort.key];
    if (typeof av === 'number') return (av - bv) * provinceSort.dir;
    return String(av).localeCompare(String(bv)) * provinceSort.dir;
  });
  document.getElementById('province-rows').innerHTML = rows.map(function (p) {
    return '<tr><td>' + p.name + '</td><td>' + p.capital + '</td>' +
      '<td class="num">' + p.population.toFixed(1) + '</td><td class="num">' + p.area + '</td></tr>';
  }).join('');
}

function markSortHeader() {
  document.querySelectorAll('#province-table th').forEach(function (th) {
    const active = th.getAttribute('data-sort') === provinceSort.key;
    th.setAttribute('aria-sort', active ? (provinceSort.dir === 1 ? 'ascending' : 'descending') : 'none');
    const base = th.getAttribute('data-label');
    th.textContent = base + (active ? (provinceSort.dir === 1 ? ' \u25b2' : ' \u25bc') : '');
  });
}

function wireProvinceSorting() {
  document.querySelectorAll('#province-table th').forEach(function (th) {
    th.setAttribute('data-label', th.textContent);
    th.addEventListener('click', function () {
      const key = th.getAttribute('data-sort');
      if (provinceSort.key === key) provinceSort.dir *= -1;
      else provinceSort = { key: key, dir: key === 'population' ? -1 : 1 };
      renderProvinces();
      markSortHeader();
    });
  });
  markSortHeader();
}

renderStatCards();
renderCharts();
renderSocial();
renderProvinces();
wireProvinceSorting();
