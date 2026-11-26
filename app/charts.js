// charts.js — hand-rolled inline SVG charts. No library: each function takes
// plain data and returns an SVG string sized to its container.
'use strict';

function svgOpen(width, height, label) {
  return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' +
    label + '" preserveAspectRatio="xMidYMid meet" class="chart-svg">';
}

function barChartVertical(series, options) {
  const width = 520, height = 260, padL = 34, padB = 26, padT = 18;
  const plotW = width - padL - 8, plotH = height - padB - padT;
  const max = options.max, min = options.min;
  const span = max - min;
  const zeroY = padT + plotH * (max / span);
  const step = plotW / series.length;
  const barW = Math.min(38, step * 0.62);
  let out = svgOpen(width, height, options.label);
  // gridlines at each integer step of the value axis
  for (let v = Math.ceil(min); v <= max; v += options.gridStep) {
    const y = padT + plotH * ((max - v) / span);
    out += '<line x1="' + padL + '" y1="' + y + '" x2="' + (width - 8) + '" y2="' + y + '" class="grid"/>';
    out += '<text x="' + (padL - 6) + '" y="' + (y + 4) + '" class="axis-num" text-anchor="end">' + v + '</text>';
  }
  out += '<line x1="' + padL + '" y1="' + zeroY + '" x2="' + (width - 8) + '" y2="' + zeroY + '" class="zero"/>';
  series.forEach(function (d, i) {
    const cx = padL + step * i + step / 2;
    const y = padT + plotH * ((max - d.value) / span);
    const top = Math.min(y, zeroY), h = Math.abs(zeroY - y);
    const cls = d.value < 0 ? 'bar neg' : 'bar';
    out += '<rect x="' + (cx - barW / 2) + '" y="' + top + '" width="' + barW + '" height="' + h + '" rx="3" class="' + cls + '"><title>' +
      d.year + ': ' + d.value + '%</title></rect>';
    out += '<text x="' + cx + '" y="' + (y - 6 < padT ? y + 14 : y - 6) + '" class="bar-val" text-anchor="middle">' +
      d.value.toFixed(2).replace('-', '\u2212') + '</text>';
    out += '<text x="' + cx + '" y="' + (height - 8) + '" class="axis-lab" text-anchor="middle">' + d.year + '</text>';
  });
  return out + '</svg>';
}

function lineChart(series, options) {
  const width = 520, height = 260, padL = 34, padB = 30, padT = 18;
  const plotW = width - padL - 10, plotH = height - padB - padT;
  const min = options.min, max = options.max, span = max - min;
  function px(i) { return padL + plotW * (series.length === 1 ? 0.5 : i / (series.length - 1)); }
  function py(v) { return padT + plotH * ((max - v) / span); }
  let out = svgOpen(width, height, options.label);
  for (let v = Math.ceil(min); v <= max; v += options.gridStep) {
    out += '<line x1="' + padL + '" y1="' + py(v) + '" x2="' + (width - 10) + '" y2="' + py(v) + '" class="grid"/>';
    out += '<text x="' + (padL - 6) + '" y="' + (py(v) + 4) + '" class="axis-num" text-anchor="end">' + v + '</text>';
  }
  if (options.target !== undefined) {
    out += '<line x1="' + padL + '" y1="' + py(options.target) + '" x2="' + (width - 10) + '" y2="' + py(options.target) + '" class="target"/>';
  }
  let path = '';
  series.forEach(function (d, i) { path += (i === 0 ? 'M' : 'L') + px(i).toFixed(1) + ' ' + py(d.value).toFixed(1) + ' '; });
  out += '<path d="' + path + '" class="line"/>';
  series.forEach(function (d, i) {
    out += '<circle cx="' + px(i) + '" cy="' + py(d.value) + '" r="4" class="dot"><title>' + d.month + ': ' + d.value + '%</title></circle>';
    out += '<text x="' + px(i) + '" y="' + (py(d.value) - 10) + '" class="bar-val" text-anchor="middle">' + d.value.toFixed(2) + '</text>';
    const anchor = i === 0 ? 'start' : (i === series.length - 1 ? 'end' : 'middle');
    out += '<text x="' + px(i) + '" y="' + (height - 16) + '" class="axis-lab" text-anchor="' + anchor + '">' + d.month.split(' ')[0] + '</text>';
    out += '<text x="' + px(i) + '" y="' + (height - 4) + '" class="axis-lab" text-anchor="' + anchor + '">' + d.month.split(' ')[1] + '</text>';
  });
  return out + '</svg>';
}

function groupedBars(series, options) {
  const width = 640, height = 250, padL = 34, padB = 26, padT = 18;
  const plotW = width - padL - 8, plotH = height - padB - padT;
  const max = options.max;
  const groupW = plotW / series.length;
  const barW = Math.min(26, groupW * 0.3);
  let out = svgOpen(width, height, options.label);
  for (let v = 0; v <= max; v += 100) {
    const y = padT + plotH * (1 - v / max);
    out += '<line x1="' + padL + '" y1="' + y + '" x2="' + (width - 8) + '" y2="' + y + '" class="grid"/>';
    out += '<text x="' + (padL - 6) + '" y="' + (y + 4) + '" class="axis-num" text-anchor="end">' + v + '</text>';
  }
  series.forEach(function (d, i) {
    const gx = padL + groupW * i + groupW / 2;
    const eh = plotH * (d.exports / max), ih = plotH * (d.imports / max);
    out += '<rect x="' + (gx - barW - 2) + '" y="' + (padT + plotH - eh) + '" width="' + barW + '" height="' + eh + '" rx="3" class="bar"><title>Exports ' + d.year + ': US$ ' + d.exports + ' bn</title></rect>';
    out += '<rect x="' + (gx + 2) + '" y="' + (padT + plotH - ih) + '" width="' + barW + '" height="' + ih + '" rx="3" class="bar light"><title>Imports ' + d.year + ': US$ ' + d.imports + ' bn</title></rect>';
    out += '<text x="' + gx + '" y="' + (height - 8) + '" class="axis-lab" text-anchor="middle">' + d.year + '</text>';
  });
  return out + '</svg>';
}

function horizontalBars(series, options) {
  const rowH = 34, width = 520, height = series.length * rowH + 12;
  const labelW = 108, valueW = 58, plotW = width - labelW - valueW;
  const max = options.max;
  let out = svgOpen(width, height, options.label);
  series.forEach(function (d, i) {
    const y = 8 + i * rowH;
    const w = Math.max(4, plotW * (d.value / max));
    out += '<text x="' + (labelW - 8) + '" y="' + (y + 17) + '" class="axis-lab" text-anchor="end">' + d.label + '</text>';
    out += '<rect x="' + labelW + '" y="' + y + '" width="' + w + '" height="20" rx="4" class="bar"><title>' + d.label + ': ' + d.value + '</title></rect>';
    out += '<text x="' + (labelW + w + 8) + '" y="' + (y + 15) + '" class="bar-val">' + d.display + '</text>';
  });
  return out + '</svg>';
}
