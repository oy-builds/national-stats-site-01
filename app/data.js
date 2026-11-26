// data.js — every figure shown on Indonesia in Numbers lives here, in one place.
// Figures are the broadly published BPS (Statistics Indonesia) headline series
// for 2024–2025, rounded the way BPS headlines round them. Each entry carries
// its own period label so the page never shows a number without its date.
'use strict';

const STAT_SOURCE = 'BPS — Statistics Indonesia';

const HEADLINE_STATS = [
  { id: 'population', label: 'Population', value: '284.4 million', period: 'Mid-2025 estimate', note: 'World\u2019s 4th largest population', delta: '+0.8% in a year' },
  { id: 'gdp-growth', label: 'GDP growth', value: '5.03%', period: 'Full year 2024', note: 'GDP at current prices \u2248 Rp 22,139 trillion', delta: '5.05% in Q2 2025' },
  { id: 'inflation', label: 'Inflation (year on year)', value: '1.57%', period: 'December 2024', note: 'Inside Bank Indonesia\u2019s 2.5% \u00b1 1% target band', delta: '2.65% in June 2025' },
  { id: 'unemployment', label: 'Open unemployment', value: '4.76%', period: 'August 2024', note: 'Labour force \u2248 152.1 million people', delta: '4.82% in February 2025' },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', period: 'September 2024', note: '\u2248 24.1 million people below the poverty line', delta: '8.47% in March 2025' },
  { id: 'life-expectancy', label: 'Life expectancy', value: '73.9 years', period: '2024', note: 'Up from 71.5 years a decade earlier', delta: 'Women 75.9 \u00b7 men 72.0' },
];

const GDP_GROWTH_SERIES = [
  { year: '2015', value: 4.88 }, { year: '2016', value: 5.03 },
  { year: '2017', value: 5.07 }, { year: '2018', value: 5.17 },
  { year: '2019', value: 5.02 }, { year: '2020', value: -2.07 },
  { year: '2021', value: 3.70 }, { year: '2022', value: 5.31 },
  { year: '2023', value: 5.05 }, { year: '2024', value: 5.03 },
];

const INFLATION_SERIES = [
  { month: 'Jan 2024', value: 2.57 }, { month: 'Apr 2024', value: 3.00 },
  { month: 'Jul 2024', value: 2.13 }, { month: 'Oct 2024', value: 1.71 },
  { month: 'Dec 2024', value: 1.57 }, { month: 'Mar 2025', value: 1.03 },
  { month: 'Jun 2025', value: 2.65 }, { month: 'Sep 2025', value: 2.65 },
];

const POPULATION_SERIES = [
  { year: '1971', value: 119.2 }, { year: '1980', value: 147.5 },
  { year: '1990', value: 179.4 }, { year: '2000', value: 206.3 },
  { year: '2010', value: 237.6 }, { year: '2020', value: 270.2 },
  { year: '2025', value: 284.4 },
];

const AGE_GROUPS = [
  { group: '0–14 years', share: 24.8 },
  { group: '15–24 years', share: 16.1 },
  { group: '25–54 years', share: 42.3 },
  { group: '55–64 years', share: 8.6 },
  { group: '65+ years', share: 8.2 },
];

const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', population: 50.3, area: '35,378 km\u00b2' },
  { name: 'East Java', capital: 'Surabaya', population: 42.1, area: '47,800 km\u00b2' },
  { name: 'Central Java', capital: 'Semarang', population: 38.2, area: '32,801 km\u00b2' },
  { name: 'North Sumatra', capital: 'Medan', population: 15.6, area: '72,981 km\u00b2' },
  { name: 'Banten', capital: 'Serang', population: 12.4, area: '9,663 km\u00b2' },
  { name: 'South Sulawesi', capital: 'Makassar', population: 9.5, area: '46,717 km\u00b2' },
  { name: 'Lampung', capital: 'Bandar Lampung', population: 9.4, area: '34,624 km\u00b2' },
  { name: 'South Sumatra', capital: 'Palembang', population: 8.9, area: '91,592 km\u00b2' },
  { name: 'Jakarta (DKI)', capital: 'Jakarta', population: 10.6, area: '664 km\u00b2' },
  { name: 'Riau', capital: 'Pekanbaru', population: 6.9, area: '87,024 km\u00b2' },
  { name: 'West Sumatra', capital: 'Padang', population: 5.9, area: '42,013 km\u00b2' },
  { name: 'East Kalimantan', capital: 'Samarinda', population: 4.0, area: '127,347 km\u00b2' },
  { name: 'Bali', capital: 'Denpasar', population: 4.4, area: '5,780 km\u00b2' },
  { name: 'Papua', capital: 'Jayapura', population: 4.3, area: '312,224 km\u00b2' },
];

const TRADE_SERIES = [
  { year: '2020', exports: 163.2, imports: 141.6 },
  { year: '2021', exports: 231.5, imports: 196.2 },
  { year: '2022', exports: 291.9, imports: 237.4 },
  { year: '2023', exports: 258.8, imports: 221.9 },
  { year: '2024', exports: 264.7, imports: 233.7 },
];

const SOCIAL_STATS = [
  { label: 'Literacy rate (age 15+)', value: '97.0%', period: '2024' },
  { label: 'Internet users', value: '\u2248 212 million', period: 'Early 2025 survey estimates' },
  { label: 'Mean years of schooling', value: '9.2 years', period: '2024' },
  { label: 'Human Development Index', value: '74.2', period: '2024, \u201chigh\u201d category' },
  { label: 'Gini ratio (expenditure)', value: '0.379', period: 'September 2024' },
  { label: 'Access to safe drinking water', value: '\u2248 92%', period: '2024' },
];
