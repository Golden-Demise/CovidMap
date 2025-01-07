// Parse date in YYYY-MM-DD format as local date
function parseISOLocal(s) {
  let [y, m, d] = s.split('-');
  return new Date(y, m - 1, d);
}

// Format date as YYYY-MM-DD
function dateToISOLocal(date) {
  let z = n => ('0' + n).slice(-2);
  return date.getFullYear() + '-' + z(date.getMonth() + 1) + '-' + z(date.getDate());
}

// Convert range slider value to date string
function range2date(evt) {
  let dateInput = document.querySelector('#d0');
  let minDate = parseISOLocal(dateInput.defaultValue);
  minDate.setDate(minDate.getDate() + Number(this.value));
  dateInput.value = dateToISOLocal(minDate);
}

// Convert entered date to range
function date2range(evt) {
  let date = parseISOLocal(this.value);
  let numDays = (date - new Date(this.min)) / 8.64e7;
  document.querySelector('#r0').value = numDays;
}

const current_date = sessionStorage.getItem("selectedDate");

// 假設國家代碼列表（按需求替換為實際的代碼列表）
const country_codes = {
  AF: 'Afghanistan',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BR: 'Brazil',
  VG: 'British Virgin Islands',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  XK: 'Kosovo',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Laos',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  KP: 'North Korea',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russia',
  RW: 'Rwanda',
  SH: 'Saint Helena',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  KR: 'South Korea',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SZ: 'Eswatini',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syria',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  VI: 'United States Virgin Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Vietnam',
  WF: 'Wallis and Futuna',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe'
};
const country_data = {}
const county = []
const data_dir = "data"; // CSV 文件存放路徑

// 定義一個異步函數來處理每個國家的數據
async function fetchCountryData(code) {
  const csvPath = `${data_dir}/${country_codes[code]}.csv`;

  try {
    // 獲取 CSV 文件內容
    const response = await fetch(csvPath);
    if (!response.ok) {
      throw new Error(`無法讀取文件: ${csvPath}`);
    }

    const csvText = await response.text();
    const rows = csvText.split("\n").map(row => row.split(",")); // 分割 CSV 行和列

    // 獲取表頭索引（第一行是表頭）
    const headers = rows[0];
    const dateIndex = headers.indexOf("date");
    const populationIndex = headers.indexOf("population");
    const totalCasesIndex = headers.indexOf("total_cases");
    const newCasesIndex = headers.indexOf("new_cases");

    // 查找指定日期的數據
    const targetRow = rows.find(row => row[dateIndex] === current_date);

    if (targetRow) {
      country_data[code] = {
        population: Number(targetRow[populationIndex]).toFixed(0),
        total_cases: Number(targetRow[totalCasesIndex]).toFixed(0),
        new_cases: Number(targetRow[newCasesIndex]).toFixed(0),
      };
      console.log(`成功提取 ${code} 的數據:`, country_data[code]);
    } else {
      console.warn(`找不到 ${code} 中日期為 ${formatted_date} 的數據`);
      country_data[code] = {
        population: 0,
        total_cases: 0,
        new_cases: 0,
      };
    }
  } catch (error) {
    console.warn(`處理 ${code} 時出現錯誤:`, error);
    country_data[code] = {
      population: 0,
      total_cases: 0,
      new_cases: 0,
    };
  }
}

window.onload = function () {
  let rangeInput = document.querySelector('#r0');
  let dateInput = document.querySelector('#d0');
  console.log(current_date)

  dateInput.value = current_date
  // Get the number of days from the date min and max
  // Dates in YYYY-MM-DD format are treated as UTC
  // so will be exact whole days
  let rangeMax = (new Date(dateInput.max) - new Date(dateInput.min)) / 8.64e7;
  // Set the range min and max values
  rangeInput.min = 0;
  rangeInput.max = rangeMax;

  let date = parseISOLocal(dateInput.value);
  let numDays = (date - new Date(dateInput.min)) / 8.64e7;
  rangeInput.value = numDays;
  // Add listener to set the date input value based on the slider
  rangeInput.addEventListener('input', range2date, false);
  // Add listener to set the range input value based on the date
  dateInput.addEventListener('change', date2range, false);

  (async () => {
    for (const code of Object.keys(country_codes)) {
      await fetchCountryData(code);
    }
    // 打印最終結果
    console.log("所有國家數據提取完成:", country_data);

    var svgMapDataNewCases = {
      data: {
        date: {
          name: 'date',
          format: '{0}'
        },
        population: {
          name: 'population',
          format: '{0} people',
          thousandSeparator: ','
        },
        new_cases: {
          name: 'new cases',
          format: '{0} people',
          thousandSeparator: ','
        },
        total_cases: {
          name: 'total cases',
          format: '{0} people',
          thousandSeparator: ',',
          thresholdMax: 1000000,
          thresholdMin: 1000
        },
      },
      applyData: 'total_cases',
      values: {
        AF: {
          link: 'https://pt.wikipedia.org/wiki/AF',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AF"].population,
          linkTarget: '_blank',
          new_cases: country_data["AF"].new_cases,
          total_cases: country_data["AF"].total_cases
        },
        AL: {
          link: 'https://pt.wikipedia.org/wiki/AL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AL"].population,
          linkTarget: '_blank',
          new_cases: country_data["AL"].new_cases,
          total_cases: country_data["AL"].total_cases
        },
        DZ: {
          link: 'https://pt.wikipedia.org/wiki/DZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["DZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["DZ"].new_cases,
          total_cases: country_data["DZ"].total_cases
        },
        AS: {
          link: 'https://pt.wikipedia.org/wiki/AS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AS"].population,
          linkTarget: '_blank',
          new_cases: country_data["AS"].new_cases,
          total_cases: country_data["AS"].total_cases
        },
        AD: {
          link: 'https://pt.wikipedia.org/wiki/AD',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AD"].population,
          linkTarget: '_blank',
          new_cases: country_data["AD"].new_cases,
          total_cases: country_data["AD"].total_cases
        },
        AO: {
          link: 'https://pt.wikipedia.org/wiki/AO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AO"].population,
          linkTarget: '_blank',
          new_cases: country_data["AO"].new_cases,
          total_cases: country_data["AO"].total_cases
        },
        AI: {
          link: 'https://pt.wikipedia.org/wiki/AI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AI"].population,
          linkTarget: '_blank',
          new_cases: country_data["AI"].new_cases,
          total_cases: country_data["AI"].total_cases
        },
        AG: {
          link: 'https://pt.wikipedia.org/wiki/AG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AG"].population,
          linkTarget: '_blank',
          new_cases: country_data["AG"].new_cases,
          total_cases: country_data["AG"].total_cases
        },
        AR: {
          link: 'https://pt.wikipedia.org/wiki/AR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AR"].population,
          linkTarget: '_blank',
          new_cases: country_data["AR"].new_cases,
          total_cases: country_data["AR"].total_cases
        },
        AM: {
          link: 'https://pt.wikipedia.org/wiki/AM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AM"].population,
          linkTarget: '_blank',
          new_cases: country_data["AM"].new_cases,
          total_cases: country_data["AM"].total_cases
        },
        AW: {
          link: 'https://pt.wikipedia.org/wiki/AW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AW"].population,
          linkTarget: '_blank',
          new_cases: country_data["AW"].new_cases,
          total_cases: country_data["AW"].total_cases
        },
        AU: {
          link: 'https://pt.wikipedia.org/wiki/AU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AU"].population,
          linkTarget: '_blank',
          new_cases: country_data["AU"].new_cases,
          total_cases: country_data["AU"].total_cases
        },
        AT: {
          link: 'https://pt.wikipedia.org/wiki/AT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AT"].population,
          linkTarget: '_blank',
          new_cases: country_data["AT"].new_cases,
          total_cases: country_data["AT"].total_cases
        },
        AZ: {
          link: 'https://pt.wikipedia.org/wiki/AZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["AZ"].new_cases,
          total_cases: country_data["AZ"].total_cases
        },
        BS: {
          link: 'https://pt.wikipedia.org/wiki/BS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BS"].population,
          linkTarget: '_blank',
          new_cases: country_data["BS"].new_cases,
          total_cases: country_data["BS"].total_cases
        },
        BH: {
          link: 'https://pt.wikipedia.org/wiki/BH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BH"].population,
          linkTarget: '_blank',
          new_cases: country_data["BH"].new_cases,
          total_cases: country_data["BH"].total_cases
        },
        BD: {
          link: 'https://pt.wikipedia.org/wiki/BD',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BD"].population,
          linkTarget: '_blank',
          new_cases: country_data["BD"].new_cases,
          total_cases: country_data["BD"].total_cases
        },
        BB: {
          link: 'https://pt.wikipedia.org/wiki/BB',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BB"].population,
          linkTarget: '_blank',
          new_cases: country_data["BB"].new_cases,
          total_cases: country_data["BB"].total_cases
        },
        BY: {
          link: 'https://pt.wikipedia.org/wiki/BY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BY"].population,
          linkTarget: '_blank',
          new_cases: country_data["BY"].new_cases,
          total_cases: country_data["BY"].total_cases
        },
        BE: {
          link: 'https://pt.wikipedia.org/wiki/BE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BE"].population,
          linkTarget: '_blank',
          new_cases: country_data["BE"].new_cases,
          total_cases: country_data["BE"].total_cases
        },
        BZ: {
          link: 'https://pt.wikipedia.org/wiki/BZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["BZ"].new_cases,
          total_cases: country_data["BZ"].total_cases
        },
        BJ: {
          link: 'https://pt.wikipedia.org/wiki/BJ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BJ"].population,
          linkTarget: '_blank',
          new_cases: country_data["BJ"].new_cases,
          total_cases: country_data["BJ"].total_cases
        },
        BM: {
          link: 'https://pt.wikipedia.org/wiki/BM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BM"].population,
          linkTarget: '_blank',
          new_cases: country_data["BM"].new_cases,
          total_cases: country_data["BM"].total_cases
        },
        BT: {
          link: 'https://pt.wikipedia.org/wiki/BT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BT"].population,
          linkTarget: '_blank',
          new_cases: country_data["BT"].new_cases,
          total_cases: country_data["BT"].total_cases
        },
        BO: {
          link: 'https://pt.wikipedia.org/wiki/BO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BO"].population,
          linkTarget: '_blank',
          new_cases: country_data["BO"].new_cases,
          total_cases: country_data["BO"].total_cases
        },
        BA: {
          link: 'https://pt.wikipedia.org/wiki/BA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BA"].population,
          linkTarget: '_blank',
          new_cases: country_data["BA"].new_cases,
          total_cases: country_data["BA"].total_cases
        },
        BW: {
          link: 'https://pt.wikipedia.org/wiki/BW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BW"].population,
          linkTarget: '_blank',
          new_cases: country_data["BW"].new_cases,
          total_cases: country_data["BW"].total_cases
        },
        BR: {
          link: 'https://pt.wikipedia.org/wiki/BR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BR"].population,
          linkTarget: '_blank',
          new_cases: country_data["BR"].new_cases,
          total_cases: country_data["BR"].total_cases
        },
        VG: {
          link: 'https://pt.wikipedia.org/wiki/VG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["VG"].population,
          linkTarget: '_blank',
          new_cases: country_data["VG"].new_cases,
          total_cases: country_data["VG"].total_cases
        },
        BG: {
          link: 'https://pt.wikipedia.org/wiki/BG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BG"].population,
          linkTarget: '_blank',
          new_cases: country_data["BG"].new_cases,
          total_cases: country_data["BG"].total_cases
        },
        BF: {
          link: 'https://pt.wikipedia.org/wiki/BF',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BF"].population,
          linkTarget: '_blank',
          new_cases: country_data["BF"].new_cases,
          total_cases: country_data["BF"].total_cases
        },
        BI: {
          link: 'https://pt.wikipedia.org/wiki/BI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["BI"].population,
          linkTarget: '_blank',
          new_cases: country_data["BI"].new_cases,
          total_cases: country_data["BI"].total_cases
        },
        KH: {
          link: 'https://pt.wikipedia.org/wiki/KH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KH"].population,
          linkTarget: '_blank',
          new_cases: country_data["KH"].new_cases,
          total_cases: country_data["KH"].total_cases
        },
        CM: {
          link: 'https://pt.wikipedia.org/wiki/CM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CM"].population,
          linkTarget: '_blank',
          new_cases: country_data["CM"].new_cases,
          total_cases: country_data["CM"].total_cases
        },
        CA: {
          link: 'https://pt.wikipedia.org/wiki/CA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CA"].population,
          linkTarget: '_blank',
          new_cases: country_data["CA"].new_cases,
          total_cases: country_data["CA"].total_cases
        },
        CV: {
          link: 'https://pt.wikipedia.org/wiki/CV',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CV"].population,
          linkTarget: '_blank',
          new_cases: country_data["CV"].new_cases,
          total_cases: country_data["CV"].total_cases
        },
        KY: {
          link: 'https://pt.wikipedia.org/wiki/KY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KY"].population,
          linkTarget: '_blank',
          new_cases: country_data["KY"].new_cases,
          total_cases: country_data["KY"].total_cases
        },
        CF: {
          link: 'https://pt.wikipedia.org/wiki/CF',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CF"].population,
          linkTarget: '_blank',
          new_cases: country_data["CF"].new_cases,
          total_cases: country_data["CF"].total_cases
        },
        TD: {
          link: 'https://pt.wikipedia.org/wiki/TD',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TD"].population,
          linkTarget: '_blank',
          new_cases: country_data["TD"].new_cases,
          total_cases: country_data["TD"].total_cases
        },
        CL: {
          link: 'https://pt.wikipedia.org/wiki/CL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CL"].population,
          linkTarget: '_blank',
          new_cases: country_data["CL"].new_cases,
          total_cases: country_data["CL"].total_cases
        },
        CN: {
          link: 'https://pt.wikipedia.org/wiki/CN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CN"].population,
          linkTarget: '_blank',
          new_cases: country_data["CN"].new_cases,
          total_cases: country_data["CN"].total_cases
        },
        CO: {
          link: 'https://pt.wikipedia.org/wiki/CO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CO"].population,
          linkTarget: '_blank',
          new_cases: country_data["CO"].new_cases,
          total_cases: country_data["CO"].total_cases
        },
        KM: {
          link: 'https://pt.wikipedia.org/wiki/KM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KM"].population,
          linkTarget: '_blank',
          new_cases: country_data["KM"].new_cases,
          total_cases: country_data["KM"].total_cases
        },
        CG: {
          link: 'https://pt.wikipedia.org/wiki/CG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CG"].population,
          linkTarget: '_blank',
          new_cases: country_data["CG"].new_cases,
          total_cases: country_data["CG"].total_cases
        },
        CK: {
          link: 'https://pt.wikipedia.org/wiki/CK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CK"].population,
          linkTarget: '_blank',
          new_cases: country_data["CK"].new_cases,
          total_cases: country_data["CK"].total_cases
        },
        CR: {
          link: 'https://pt.wikipedia.org/wiki/CR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CR"].population,
          linkTarget: '_blank',
          new_cases: country_data["CR"].new_cases,
          total_cases: country_data["CR"].total_cases
        },
        HR: {
          link: 'https://pt.wikipedia.org/wiki/HR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["HR"].population,
          linkTarget: '_blank',
          new_cases: country_data["HR"].new_cases,
          total_cases: country_data["HR"].total_cases
        },
        CU: {
          link: 'https://pt.wikipedia.org/wiki/CU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CU"].population,
          linkTarget: '_blank',
          new_cases: country_data["CU"].new_cases,
          total_cases: country_data["CU"].total_cases
        },
        CY: {
          link: 'https://pt.wikipedia.org/wiki/CY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CY"].population,
          linkTarget: '_blank',
          new_cases: country_data["CY"].new_cases,
          total_cases: country_data["CY"].total_cases
        },
        DK: {
          link: 'https://pt.wikipedia.org/wiki/DK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["DK"].population,
          linkTarget: '_blank',
          new_cases: country_data["DK"].new_cases,
          total_cases: country_data["DK"].total_cases
        },
        DJ: {
          link: 'https://pt.wikipedia.org/wiki/DJ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["DJ"].population,
          linkTarget: '_blank',
          new_cases: country_data["DJ"].new_cases,
          total_cases: country_data["DJ"].total_cases
        },
        DM: {
          link: 'https://pt.wikipedia.org/wiki/DM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["DM"].population,
          linkTarget: '_blank',
          new_cases: country_data["DM"].new_cases,
          total_cases: country_data["DM"].total_cases
        },
        DO: {
          link: 'https://pt.wikipedia.org/wiki/DO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["DO"].population,
          linkTarget: '_blank',
          new_cases: country_data["DO"].new_cases,
          total_cases: country_data["DO"].total_cases
        },
        EC: {
          link: 'https://pt.wikipedia.org/wiki/EC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["EC"].population,
          linkTarget: '_blank',
          new_cases: country_data["EC"].new_cases,
          total_cases: country_data["EC"].total_cases
        },
        EG: {
          link: 'https://pt.wikipedia.org/wiki/EG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["EG"].population,
          linkTarget: '_blank',
          new_cases: country_data["EG"].new_cases,
          total_cases: country_data["EG"].total_cases
        },
        SV: {
          link: 'https://pt.wikipedia.org/wiki/SV',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SV"].population,
          linkTarget: '_blank',
          new_cases: country_data["SV"].new_cases,
          total_cases: country_data["SV"].total_cases
        },
        GQ: {
          link: 'https://pt.wikipedia.org/wiki/GQ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GQ"].population,
          linkTarget: '_blank',
          new_cases: country_data["GQ"].new_cases,
          total_cases: country_data["GQ"].total_cases
        },
        ER: {
          link: 'https://pt.wikipedia.org/wiki/ER',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ER"].population,
          linkTarget: '_blank',
          new_cases: country_data["ER"].new_cases,
          total_cases: country_data["ER"].total_cases
        },
        EE: {
          link: 'https://pt.wikipedia.org/wiki/EE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["EE"].population,
          linkTarget: '_blank',
          new_cases: country_data["EE"].new_cases,
          total_cases: country_data["EE"].total_cases
        },
        ET: {
          link: 'https://pt.wikipedia.org/wiki/ET',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ET"].population,
          linkTarget: '_blank',
          new_cases: country_data["ET"].new_cases,
          total_cases: country_data["ET"].total_cases
        },
        FK: {
          link: 'https://pt.wikipedia.org/wiki/FK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["FK"].population,
          linkTarget: '_blank',
          new_cases: country_data["FK"].new_cases,
          total_cases: country_data["FK"].total_cases
        },
        FO: {
          link: 'https://pt.wikipedia.org/wiki/FO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["FO"].population,
          linkTarget: '_blank',
          new_cases: country_data["FO"].new_cases,
          total_cases: country_data["FO"].total_cases
        },
        FJ: {
          link: 'https://pt.wikipedia.org/wiki/FJ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["FJ"].population,
          linkTarget: '_blank',
          new_cases: country_data["FJ"].new_cases,
          total_cases: country_data["FJ"].total_cases
        },
        FI: {
          link: 'https://pt.wikipedia.org/wiki/FI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["FI"].population,
          linkTarget: '_blank',
          new_cases: country_data["FI"].new_cases,
          total_cases: country_data["FI"].total_cases
        },
        FR: {
          link: 'https://pt.wikipedia.org/wiki/FR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["FR"].population,
          linkTarget: '_blank',
          new_cases: country_data["FR"].new_cases,
          total_cases: country_data["FR"].total_cases
        },
        GF: {
          link: 'https://pt.wikipedia.org/wiki/GF',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GF"].population,
          linkTarget: '_blank',
          new_cases: country_data["GF"].new_cases,
          total_cases: country_data["GF"].total_cases
        },
        PF: {
          link: 'https://pt.wikipedia.org/wiki/PF',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PF"].population,
          linkTarget: '_blank',
          new_cases: country_data["PF"].new_cases,
          total_cases: country_data["PF"].total_cases
        },
        GA: {
          link: 'https://pt.wikipedia.org/wiki/GA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GA"].population,
          linkTarget: '_blank',
          new_cases: country_data["GA"].new_cases,
          total_cases: country_data["GA"].total_cases
        },
        GM: {
          link: 'https://pt.wikipedia.org/wiki/GM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GM"].population,
          linkTarget: '_blank',
          new_cases: country_data["GM"].new_cases,
          total_cases: country_data["GM"].total_cases
        },
        GE: {
          link: 'https://pt.wikipedia.org/wiki/GE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GE"].population,
          linkTarget: '_blank',
          new_cases: country_data["GE"].new_cases,
          total_cases: country_data["GE"].total_cases
        },
        DE: {
          link: 'https://pt.wikipedia.org/wiki/DE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["DE"].population,
          linkTarget: '_blank',
          new_cases: country_data["DE"].new_cases,
          total_cases: country_data["DE"].total_cases
        },
        GH: {
          link: 'https://pt.wikipedia.org/wiki/GH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GH"].population,
          linkTarget: '_blank',
          new_cases: country_data["GH"].new_cases,
          total_cases: country_data["GH"].total_cases
        },
        GI: {
          link: 'https://pt.wikipedia.org/wiki/GI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GI"].population,
          linkTarget: '_blank',
          new_cases: country_data["GI"].new_cases,
          total_cases: country_data["GI"].total_cases
        },
        GR: {
          link: 'https://pt.wikipedia.org/wiki/GR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GR"].population,
          linkTarget: '_blank',
          new_cases: country_data["GR"].new_cases,
          total_cases: country_data["GR"].total_cases
        },
        GL: {
          link: 'https://pt.wikipedia.org/wiki/GL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GL"].population,
          linkTarget: '_blank',
          new_cases: country_data["GL"].new_cases,
          total_cases: country_data["GL"].total_cases
        },
        GD: {
          link: 'https://pt.wikipedia.org/wiki/GD',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GD"].population,
          linkTarget: '_blank',
          new_cases: country_data["GD"].new_cases,
          total_cases: country_data["GD"].total_cases
        },
        GP: {
          link: 'https://pt.wikipedia.org/wiki/GP',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GP"].population,
          linkTarget: '_blank',
          new_cases: country_data["GP"].new_cases,
          total_cases: country_data["GP"].total_cases
        },
        GU: {
          link: 'https://pt.wikipedia.org/wiki/GU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GU"].population,
          linkTarget: '_blank',
          new_cases: country_data["GU"].new_cases,
          total_cases: country_data["GU"].total_cases
        },
        GT: {
          link: 'https://pt.wikipedia.org/wiki/GT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GT"].population,
          linkTarget: '_blank',
          new_cases: country_data["GT"].new_cases,
          total_cases: country_data["GT"].total_cases
        },
        GN: {
          link: 'https://pt.wikipedia.org/wiki/GN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GN"].population,
          linkTarget: '_blank',
          new_cases: country_data["GN"].new_cases,
          total_cases: country_data["GN"].total_cases
        },
        GW: {
          link: 'https://pt.wikipedia.org/wiki/GW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GW"].population,
          linkTarget: '_blank',
          new_cases: country_data["GW"].new_cases,
          total_cases: country_data["GW"].total_cases
        },
        GY: {
          link: 'https://pt.wikipedia.org/wiki/GY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GY"].population,
          linkTarget: '_blank',
          new_cases: country_data["GY"].new_cases,
          total_cases: country_data["GY"].total_cases
        },
        HT: {
          link: 'https://pt.wikipedia.org/wiki/HT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["HT"].population,
          linkTarget: '_blank',
          new_cases: country_data["HT"].new_cases,
          total_cases: country_data["HT"].total_cases
        },
        HN: {
          link: 'https://pt.wikipedia.org/wiki/HN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["HN"].population,
          linkTarget: '_blank',
          new_cases: country_data["HN"].new_cases,
          total_cases: country_data["HN"].total_cases
        },
        HK: {
          link: 'https://pt.wikipedia.org/wiki/HK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["HK"].population,
          linkTarget: '_blank',
          new_cases: country_data["HK"].new_cases,
          total_cases: country_data["HK"].total_cases
        },
        HU: {
          link: 'https://pt.wikipedia.org/wiki/HU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["HU"].population,
          linkTarget: '_blank',
          new_cases: country_data["HU"].new_cases,
          total_cases: country_data["HU"].total_cases
        },
        IS: {
          link: 'https://pt.wikipedia.org/wiki/IS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IS"].population,
          linkTarget: '_blank',
          new_cases: country_data["IS"].new_cases,
          total_cases: country_data["IS"].total_cases
        },
        IN: {
          link: 'https://pt.wikipedia.org/wiki/IN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IN"].population,
          linkTarget: '_blank',
          new_cases: country_data["IN"].new_cases,
          total_cases: country_data["IN"].total_cases
        },
        ID: {
          link: 'https://pt.wikipedia.org/wiki/ID',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ID"].population,
          linkTarget: '_blank',
          new_cases: country_data["ID"].new_cases,
          total_cases: country_data["ID"].total_cases
        },
        IR: {
          link: 'https://pt.wikipedia.org/wiki/IR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IR"].population,
          linkTarget: '_blank',
          new_cases: country_data["IR"].new_cases,
          total_cases: country_data["IR"].total_cases
        },
        IQ: {
          link: 'https://pt.wikipedia.org/wiki/IQ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IQ"].population,
          linkTarget: '_blank',
          new_cases: country_data["IQ"].new_cases,
          total_cases: country_data["IQ"].total_cases
        },
        IE: {
          link: 'https://pt.wikipedia.org/wiki/IE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IE"].population,
          linkTarget: '_blank',
          new_cases: country_data["IE"].new_cases,
          total_cases: country_data["IE"].total_cases
        },
        IM: {
          link: 'https://pt.wikipedia.org/wiki/IM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IM"].population,
          linkTarget: '_blank',
          new_cases: country_data["IM"].new_cases,
          total_cases: country_data["IM"].total_cases
        },
        IL: {
          link: 'https://pt.wikipedia.org/wiki/IL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IL"].population,
          linkTarget: '_blank',
          new_cases: country_data["IL"].new_cases,
          total_cases: country_data["IL"].total_cases
        },
        IT: {
          link: 'https://pt.wikipedia.org/wiki/IT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["IT"].population,
          linkTarget: '_blank',
          new_cases: country_data["IT"].new_cases,
          total_cases: country_data["IT"].total_cases
        },
        JM: {
          link: 'https://pt.wikipedia.org/wiki/JM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["JM"].population,
          linkTarget: '_blank',
          new_cases: country_data["JM"].new_cases,
          total_cases: country_data["JM"].total_cases
        },
        JP: {
          link: 'https://pt.wikipedia.org/wiki/JP',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["JP"].population,
          linkTarget: '_blank',
          new_cases: country_data["JP"].new_cases,
          total_cases: country_data["JP"].total_cases
        },
        JE: {
          link: 'https://pt.wikipedia.org/wiki/JE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["JE"].population,
          linkTarget: '_blank',
          new_cases: country_data["JE"].new_cases,
          total_cases: country_data["JE"].total_cases
        },
        JO: {
          link: 'https://pt.wikipedia.org/wiki/JO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["JO"].population,
          linkTarget: '_blank',
          new_cases: country_data["JO"].new_cases,
          total_cases: country_data["JO"].total_cases
        },
        KZ: {
          link: 'https://pt.wikipedia.org/wiki/KZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["KZ"].new_cases,
          total_cases: country_data["KZ"].total_cases
        },
        KE: {
          link: 'https://pt.wikipedia.org/wiki/KE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KE"].population,
          linkTarget: '_blank',
          new_cases: country_data["KE"].new_cases,
          total_cases: country_data["KE"].total_cases
        },
        KI: {
          link: 'https://pt.wikipedia.org/wiki/KI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KI"].population,
          linkTarget: '_blank',
          new_cases: country_data["KI"].new_cases,
          total_cases: country_data["KI"].total_cases
        },
        XK: {
          link: 'https://pt.wikipedia.org/wiki/XK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["XK"].population,
          linkTarget: '_blank',
          new_cases: country_data["XK"].new_cases,
          total_cases: country_data["XK"].total_cases
        },
        KW: {
          link: 'https://pt.wikipedia.org/wiki/KW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KW"].population,
          linkTarget: '_blank',
          new_cases: country_data["KW"].new_cases,
          total_cases: country_data["KW"].total_cases
        },
        KG: {
          link: 'https://pt.wikipedia.org/wiki/KG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KG"].population,
          linkTarget: '_blank',
          new_cases: country_data["KG"].new_cases,
          total_cases: country_data["KG"].total_cases
        },
        LA: {
          link: 'https://pt.wikipedia.org/wiki/LA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LA"].population,
          linkTarget: '_blank',
          new_cases: country_data["LA"].new_cases,
          total_cases: country_data["LA"].total_cases
        },
        LV: {
          link: 'https://pt.wikipedia.org/wiki/LV',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LV"].population,
          linkTarget: '_blank',
          new_cases: country_data["LV"].new_cases,
          total_cases: country_data["LV"].total_cases
        },
        LB: {
          link: 'https://pt.wikipedia.org/wiki/LB',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LB"].population,
          linkTarget: '_blank',
          new_cases: country_data["LB"].new_cases,
          total_cases: country_data["LB"].total_cases
        },
        LS: {
          link: 'https://pt.wikipedia.org/wiki/LS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LS"].population,
          linkTarget: '_blank',
          new_cases: country_data["LS"].new_cases,
          total_cases: country_data["LS"].total_cases
        },
        LR: {
          link: 'https://pt.wikipedia.org/wiki/LR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LR"].population,
          linkTarget: '_blank',
          new_cases: country_data["LR"].new_cases,
          total_cases: country_data["LR"].total_cases
        },
        LY: {
          link: 'https://pt.wikipedia.org/wiki/LY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LY"].population,
          linkTarget: '_blank',
          new_cases: country_data["LY"].new_cases,
          total_cases: country_data["LY"].total_cases
        },
        LI: {
          link: 'https://pt.wikipedia.org/wiki/LI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LI"].population,
          linkTarget: '_blank',
          new_cases: country_data["LI"].new_cases,
          total_cases: country_data["LI"].total_cases
        },
        LT: {
          link: 'https://pt.wikipedia.org/wiki/LT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LT"].population,
          linkTarget: '_blank',
          new_cases: country_data["LT"].new_cases,
          total_cases: country_data["LT"].total_cases
        },
        LU: {
          link: 'https://pt.wikipedia.org/wiki/LU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LU"].population,
          linkTarget: '_blank',
          new_cases: country_data["LU"].new_cases,
          total_cases: country_data["LU"].total_cases
        },
        MG: {
          link: 'https://pt.wikipedia.org/wiki/MG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MG"].population,
          linkTarget: '_blank',
          new_cases: country_data["MG"].new_cases,
          total_cases: country_data["MG"].total_cases
        },
        MW: {
          link: 'https://pt.wikipedia.org/wiki/MW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MW"].population,
          linkTarget: '_blank',
          new_cases: country_data["MW"].new_cases,
          total_cases: country_data["MW"].total_cases
        },
        MY: {
          link: 'https://pt.wikipedia.org/wiki/MY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MY"].population,
          linkTarget: '_blank',
          new_cases: country_data["MY"].new_cases,
          total_cases: country_data["MY"].total_cases
        },
        MV: {
          link: 'https://pt.wikipedia.org/wiki/MV',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MV"].population,
          linkTarget: '_blank',
          new_cases: country_data["MV"].new_cases,
          total_cases: country_data["MV"].total_cases
        },
        ML: {
          link: 'https://pt.wikipedia.org/wiki/ML',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ML"].population,
          linkTarget: '_blank',
          new_cases: country_data["ML"].new_cases,
          total_cases: country_data["ML"].total_cases
        },
        MT: {
          link: 'https://pt.wikipedia.org/wiki/MT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MT"].population,
          linkTarget: '_blank',
          new_cases: country_data["MT"].new_cases,
          total_cases: country_data["MT"].total_cases
        },
        MH: {
          link: 'https://pt.wikipedia.org/wiki/MH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MH"].population,
          linkTarget: '_blank',
          new_cases: country_data["MH"].new_cases,
          total_cases: country_data["MH"].total_cases
        },
        MQ: {
          link: 'https://pt.wikipedia.org/wiki/MQ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MQ"].population,
          linkTarget: '_blank',
          new_cases: country_data["MQ"].new_cases,
          total_cases: country_data["MQ"].total_cases
        },
        MR: {
          link: 'https://pt.wikipedia.org/wiki/MR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MR"].population,
          linkTarget: '_blank',
          new_cases: country_data["MR"].new_cases,
          total_cases: country_data["MR"].total_cases
        },
        MU: {
          link: 'https://pt.wikipedia.org/wiki/MU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MU"].population,
          linkTarget: '_blank',
          new_cases: country_data["MU"].new_cases,
          total_cases: country_data["MU"].total_cases
        },
        YT: {
          link: 'https://pt.wikipedia.org/wiki/YT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["YT"].population,
          linkTarget: '_blank',
          new_cases: country_data["YT"].new_cases,
          total_cases: country_data["YT"].total_cases
        },
        MX: {
          link: 'https://pt.wikipedia.org/wiki/MX',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MX"].population,
          linkTarget: '_blank',
          new_cases: country_data["MX"].new_cases,
          total_cases: country_data["MX"].total_cases
        },
        MD: {
          link: 'https://pt.wikipedia.org/wiki/MD',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MD"].population,
          linkTarget: '_blank',
          new_cases: country_data["MD"].new_cases,
          total_cases: country_data["MD"].total_cases
        },
        MC: {
          link: 'https://pt.wikipedia.org/wiki/MC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MC"].population,
          linkTarget: '_blank',
          new_cases: country_data["MC"].new_cases,
          total_cases: country_data["MC"].total_cases
        },
        MN: {
          link: 'https://pt.wikipedia.org/wiki/MN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MN"].population,
          linkTarget: '_blank',
          new_cases: country_data["MN"].new_cases,
          total_cases: country_data["MN"].total_cases
        },
        ME: {
          link: 'https://pt.wikipedia.org/wiki/ME',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ME"].population,
          linkTarget: '_blank',
          new_cases: country_data["ME"].new_cases,
          total_cases: country_data["ME"].total_cases
        },
        MS: {
          link: 'https://pt.wikipedia.org/wiki/MS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MS"].population,
          linkTarget: '_blank',
          new_cases: country_data["MS"].new_cases,
          total_cases: country_data["MS"].total_cases
        },
        MA: {
          link: 'https://pt.wikipedia.org/wiki/MA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MA"].population,
          linkTarget: '_blank',
          new_cases: country_data["MA"].new_cases,
          total_cases: country_data["MA"].total_cases
        },
        MZ: {
          link: 'https://pt.wikipedia.org/wiki/MZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["MZ"].new_cases,
          total_cases: country_data["MZ"].total_cases
        },
        MM: {
          link: 'https://pt.wikipedia.org/wiki/MM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MM"].population,
          linkTarget: '_blank',
          new_cases: country_data["MM"].new_cases,
          total_cases: country_data["MM"].total_cases
        },
        NA: {
          link: 'https://pt.wikipedia.org/wiki/NA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NA"].population,
          linkTarget: '_blank',
          new_cases: country_data["NA"].new_cases,
          total_cases: country_data["NA"].total_cases
        },
        NR: {
          link: 'https://pt.wikipedia.org/wiki/NR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NR"].population,
          linkTarget: '_blank',
          new_cases: country_data["NR"].new_cases,
          total_cases: country_data["NR"].total_cases
        },
        NP: {
          link: 'https://pt.wikipedia.org/wiki/NP',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NP"].population,
          linkTarget: '_blank',
          new_cases: country_data["NP"].new_cases,
          total_cases: country_data["NP"].total_cases
        },
        NL: {
          link: 'https://pt.wikipedia.org/wiki/NL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NL"].population,
          linkTarget: '_blank',
          new_cases: country_data["NL"].new_cases,
          total_cases: country_data["NL"].total_cases
        },
        NC: {
          link: 'https://pt.wikipedia.org/wiki/NC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NC"].population,
          linkTarget: '_blank',
          new_cases: country_data["NC"].new_cases,
          total_cases: country_data["NC"].total_cases
        },
        NZ: {
          link: 'https://pt.wikipedia.org/wiki/NZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["NZ"].new_cases,
          total_cases: country_data["NZ"].total_cases
        },
        NI: {
          link: 'https://pt.wikipedia.org/wiki/NI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NI"].population,
          linkTarget: '_blank',
          new_cases: country_data["NI"].new_cases,
          total_cases: country_data["NI"].total_cases
        },
        NE: {
          link: 'https://pt.wikipedia.org/wiki/NE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NE"].population,
          linkTarget: '_blank',
          new_cases: country_data["NE"].new_cases,
          total_cases: country_data["NE"].total_cases
        },
        NG: {
          link: 'https://pt.wikipedia.org/wiki/NG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NG"].population,
          linkTarget: '_blank',
          new_cases: country_data["NG"].new_cases,
          total_cases: country_data["NG"].total_cases
        },
        NU: {
          link: 'https://pt.wikipedia.org/wiki/NU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NU"].population,
          linkTarget: '_blank',
          new_cases: country_data["NU"].new_cases,
          total_cases: country_data["NU"].total_cases
        },
        KP: {
          link: 'https://pt.wikipedia.org/wiki/KP',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KP"].population,
          linkTarget: '_blank',
          new_cases: country_data["KP"].new_cases,
          total_cases: country_data["KP"].total_cases
        },
        MP: {
          link: 'https://pt.wikipedia.org/wiki/MP',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["MP"].population,
          linkTarget: '_blank',
          new_cases: country_data["MP"].new_cases,
          total_cases: country_data["MP"].total_cases
        },
        NO: {
          link: 'https://pt.wikipedia.org/wiki/NO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["NO"].population,
          linkTarget: '_blank',
          new_cases: country_data["NO"].new_cases,
          total_cases: country_data["NO"].total_cases
        },
        OM: {
          link: 'https://pt.wikipedia.org/wiki/OM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["OM"].population,
          linkTarget: '_blank',
          new_cases: country_data["OM"].new_cases,
          total_cases: country_data["OM"].total_cases
        },
        PK: {
          link: 'https://pt.wikipedia.org/wiki/PK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PK"].population,
          linkTarget: '_blank',
          new_cases: country_data["PK"].new_cases,
          total_cases: country_data["PK"].total_cases
        },
        PW: {
          link: 'https://pt.wikipedia.org/wiki/PW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PW"].population,
          linkTarget: '_blank',
          new_cases: country_data["PW"].new_cases,
          total_cases: country_data["PW"].total_cases
        },
        PS: {
          link: 'https://pt.wikipedia.org/wiki/PS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PS"].population,
          linkTarget: '_blank',
          new_cases: country_data["PS"].new_cases,
          total_cases: country_data["PS"].total_cases
        },
        PA: {
          link: 'https://pt.wikipedia.org/wiki/PA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PA"].population,
          linkTarget: '_blank',
          new_cases: country_data["PA"].new_cases,
          total_cases: country_data["PA"].total_cases
        },
        PG: {
          link: 'https://pt.wikipedia.org/wiki/PG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PG"].population,
          linkTarget: '_blank',
          new_cases: country_data["PG"].new_cases,
          total_cases: country_data["PG"].total_cases
        },
        PY: {
          link: 'https://pt.wikipedia.org/wiki/PY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PY"].population,
          linkTarget: '_blank',
          new_cases: country_data["PY"].new_cases,
          total_cases: country_data["PY"].total_cases
        },
        PE: {
          link: 'https://pt.wikipedia.org/wiki/PE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PE"].population,
          linkTarget: '_blank',
          new_cases: country_data["PE"].new_cases,
          total_cases: country_data["PE"].total_cases
        },
        PH: {
          link: 'https://pt.wikipedia.org/wiki/PH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PH"].population,
          linkTarget: '_blank',
          new_cases: country_data["PH"].new_cases,
          total_cases: country_data["PH"].total_cases
        },
        PL: {
          link: 'https://pt.wikipedia.org/wiki/PL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PL"].population,
          linkTarget: '_blank',
          new_cases: country_data["PL"].new_cases,
          total_cases: country_data["PL"].total_cases
        },
        PT: {
          link: 'https://pt.wikipedia.org/wiki/PT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PT"].population,
          linkTarget: '_blank',
          new_cases: country_data["PT"].new_cases,
          total_cases: country_data["PT"].total_cases
        },
        PR: {
          link: 'https://pt.wikipedia.org/wiki/PR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PR"].population,
          linkTarget: '_blank',
          new_cases: country_data["PR"].new_cases,
          total_cases: country_data["PR"].total_cases
        },
        QA: {
          link: 'https://pt.wikipedia.org/wiki/QA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["QA"].population,
          linkTarget: '_blank',
          new_cases: country_data["QA"].new_cases,
          total_cases: country_data["QA"].total_cases
        },
        RE: {
          link: 'https://pt.wikipedia.org/wiki/RE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["RE"].population,
          linkTarget: '_blank',
          new_cases: country_data["RE"].new_cases,
          total_cases: country_data["RE"].total_cases
        },
        RO: {
          link: 'https://pt.wikipedia.org/wiki/RO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["RO"].population,
          linkTarget: '_blank',
          new_cases: country_data["RO"].new_cases,
          total_cases: country_data["RO"].total_cases
        },
        RU: {
          link: 'https://pt.wikipedia.org/wiki/RU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["RU"].population,
          linkTarget: '_blank',
          new_cases: country_data["RU"].new_cases,
          total_cases: country_data["RU"].total_cases
        },
        RW: {
          link: 'https://pt.wikipedia.org/wiki/RW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["RW"].population,
          linkTarget: '_blank',
          new_cases: country_data["RW"].new_cases,
          total_cases: country_data["RW"].total_cases
        },
        SH: {
          link: 'https://pt.wikipedia.org/wiki/SH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SH"].population,
          linkTarget: '_blank',
          new_cases: country_data["SH"].new_cases,
          total_cases: country_data["SH"].total_cases
        },
        KN: {
          link: 'https://pt.wikipedia.org/wiki/KN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KN"].population,
          linkTarget: '_blank',
          new_cases: country_data["KN"].new_cases,
          total_cases: country_data["KN"].total_cases
        },
        LC: {
          link: 'https://pt.wikipedia.org/wiki/LC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LC"].population,
          linkTarget: '_blank',
          new_cases: country_data["LC"].new_cases,
          total_cases: country_data["LC"].total_cases
        },
        PM: {
          link: 'https://pt.wikipedia.org/wiki/PM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["PM"].population,
          linkTarget: '_blank',
          new_cases: country_data["PM"].new_cases,
          total_cases: country_data["PM"].total_cases
        },
        VC: {
          link: 'https://pt.wikipedia.org/wiki/VC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["VC"].population,
          linkTarget: '_blank',
          new_cases: country_data["VC"].new_cases,
          total_cases: country_data["VC"].total_cases
        },
        WS: {
          link: 'https://pt.wikipedia.org/wiki/WS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["WS"].population,
          linkTarget: '_blank',
          new_cases: country_data["WS"].new_cases,
          total_cases: country_data["WS"].total_cases
        },
        SM: {
          link: 'https://pt.wikipedia.org/wiki/SM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SM"].population,
          linkTarget: '_blank',
          new_cases: country_data["SM"].new_cases,
          total_cases: country_data["SM"].total_cases
        },
        SA: {
          link: 'https://pt.wikipedia.org/wiki/SA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SA"].population,
          linkTarget: '_blank',
          new_cases: country_data["SA"].new_cases,
          total_cases: country_data["SA"].total_cases
        },
        SN: {
          link: 'https://pt.wikipedia.org/wiki/SN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SN"].population,
          linkTarget: '_blank',
          new_cases: country_data["SN"].new_cases,
          total_cases: country_data["SN"].total_cases
        },
        RS: {
          link: 'https://pt.wikipedia.org/wiki/RS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["RS"].population,
          linkTarget: '_blank',
          new_cases: country_data["RS"].new_cases,
          total_cases: country_data["RS"].total_cases
        },
        SC: {
          link: 'https://pt.wikipedia.org/wiki/SC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SC"].population,
          linkTarget: '_blank',
          new_cases: country_data["SC"].new_cases,
          total_cases: country_data["SC"].total_cases
        },
        SL: {
          link: 'https://pt.wikipedia.org/wiki/SL',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SL"].population,
          linkTarget: '_blank',
          new_cases: country_data["SL"].new_cases,
          total_cases: country_data["SL"].total_cases
        },
        SG: {
          link: 'https://pt.wikipedia.org/wiki/SG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SG"].population,
          linkTarget: '_blank',
          new_cases: country_data["SG"].new_cases,
          total_cases: country_data["SG"].total_cases
        },
        SK: {
          link: 'https://pt.wikipedia.org/wiki/SK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SK"].population,
          linkTarget: '_blank',
          new_cases: country_data["SK"].new_cases,
          total_cases: country_data["SK"].total_cases
        },
        SI: {
          link: 'https://pt.wikipedia.org/wiki/SI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SI"].population,
          linkTarget: '_blank',
          new_cases: country_data["SI"].new_cases,
          total_cases: country_data["SI"].total_cases
        },
        SB: {
          link: 'https://pt.wikipedia.org/wiki/SB',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SB"].population,
          linkTarget: '_blank',
          new_cases: country_data["SB"].new_cases,
          total_cases: country_data["SB"].total_cases
        },
        SO: {
          link: 'https://pt.wikipedia.org/wiki/SO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SO"].population,
          linkTarget: '_blank',
          new_cases: country_data["SO"].new_cases,
          total_cases: country_data["SO"].total_cases
        },
        ZA: {
          link: 'https://pt.wikipedia.org/wiki/ZA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ZA"].population,
          linkTarget: '_blank',
          new_cases: country_data["ZA"].new_cases,
          total_cases: country_data["ZA"].total_cases
        },
        KR: {
          link: 'https://pt.wikipedia.org/wiki/KR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["KR"].population,
          linkTarget: '_blank',
          new_cases: country_data["KR"].new_cases,
          total_cases: country_data["KR"].total_cases
        },
        SS: {
          link: 'https://pt.wikipedia.org/wiki/SS',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SS"].population,
          linkTarget: '_blank',
          new_cases: country_data["SS"].new_cases,
          total_cases: country_data["SS"].total_cases
        },
        ES: {
          link: 'https://pt.wikipedia.org/wiki/ES',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ES"].population,
          linkTarget: '_blank',
          new_cases: country_data["ES"].new_cases,
          total_cases: country_data["ES"].total_cases
        },
        LK: {
          link: 'https://pt.wikipedia.org/wiki/LK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["LK"].population,
          linkTarget: '_blank',
          new_cases: country_data["LK"].new_cases,
          total_cases: country_data["LK"].total_cases
        },
        SD: {
          link: 'https://pt.wikipedia.org/wiki/SD',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SD"].population,
          linkTarget: '_blank',
          new_cases: country_data["SD"].new_cases,
          total_cases: country_data["SD"].total_cases
        },
        SR: {
          link: 'https://pt.wikipedia.org/wiki/SR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SR"].population,
          linkTarget: '_blank',
          new_cases: country_data["SR"].new_cases,
          total_cases: country_data["SR"].total_cases
        },
        SZ: {
          link: 'https://pt.wikipedia.org/wiki/SZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["SZ"].new_cases,
          total_cases: country_data["SZ"].total_cases
        },
        SE: {
          link: 'https://pt.wikipedia.org/wiki/SE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SE"].population,
          linkTarget: '_blank',
          new_cases: country_data["SE"].new_cases,
          total_cases: country_data["SE"].total_cases
        },
        CH: {
          link: 'https://pt.wikipedia.org/wiki/CH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["CH"].population,
          linkTarget: '_blank',
          new_cases: country_data["CH"].new_cases,
          total_cases: country_data["CH"].total_cases
        },
        SY: {
          link: 'https://pt.wikipedia.org/wiki/SY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["SY"].population,
          linkTarget: '_blank',
          new_cases: country_data["SY"].new_cases,
          total_cases: country_data["SY"].total_cases
        },
        TW: {
          link: 'https://pt.wikipedia.org/wiki/TW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TW"].population,
          linkTarget: '_blank',
          new_cases: country_data["TW"].new_cases,
          total_cases: country_data["TW"].total_cases
        },
        TJ: {
          link: 'https://pt.wikipedia.org/wiki/TJ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TJ"].population,
          linkTarget: '_blank',
          new_cases: country_data["TJ"].new_cases,
          total_cases: country_data["TJ"].total_cases
        },
        TZ: {
          link: 'https://pt.wikipedia.org/wiki/TZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["TZ"].new_cases,
          total_cases: country_data["TZ"].total_cases
        },
        TH: {
          link: 'https://pt.wikipedia.org/wiki/TH',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TH"].population,
          linkTarget: '_blank',
          new_cases: country_data["TH"].new_cases,
          total_cases: country_data["TH"].total_cases
        },
        TG: {
          link: 'https://pt.wikipedia.org/wiki/TG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TG"].population,
          linkTarget: '_blank',
          new_cases: country_data["TG"].new_cases,
          total_cases: country_data["TG"].total_cases
        },
        TK: {
          link: 'https://pt.wikipedia.org/wiki/TK',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TK"].population,
          linkTarget: '_blank',
          new_cases: country_data["TK"].new_cases,
          total_cases: country_data["TK"].total_cases
        },
        TO: {
          link: 'https://pt.wikipedia.org/wiki/TO',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TO"].population,
          linkTarget: '_blank',
          new_cases: country_data["TO"].new_cases,
          total_cases: country_data["TO"].total_cases
        },
        TT: {
          link: 'https://pt.wikipedia.org/wiki/TT',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TT"].population,
          linkTarget: '_blank',
          new_cases: country_data["TT"].new_cases,
          total_cases: country_data["TT"].total_cases
        },
        TN: {
          link: 'https://pt.wikipedia.org/wiki/TN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TN"].population,
          linkTarget: '_blank',
          new_cases: country_data["TN"].new_cases,
          total_cases: country_data["TN"].total_cases
        },
        TR: {
          link: 'https://pt.wikipedia.org/wiki/TR',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TR"].population,
          linkTarget: '_blank',
          new_cases: country_data["TR"].new_cases,
          total_cases: country_data["TR"].total_cases
        },
        TM: {
          link: 'https://pt.wikipedia.org/wiki/TM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TM"].population,
          linkTarget: '_blank',
          new_cases: country_data["TM"].new_cases,
          total_cases: country_data["TM"].total_cases
        },
        TC: {
          link: 'https://pt.wikipedia.org/wiki/TC',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TC"].population,
          linkTarget: '_blank',
          new_cases: country_data["TC"].new_cases,
          total_cases: country_data["TC"].total_cases
        },
        TV: {
          link: 'https://pt.wikipedia.org/wiki/TV',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["TV"].population,
          linkTarget: '_blank',
          new_cases: country_data["TV"].new_cases,
          total_cases: country_data["TV"].total_cases
        },
        UG: {
          link: 'https://pt.wikipedia.org/wiki/UG',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["UG"].population,
          linkTarget: '_blank',
          new_cases: country_data["UG"].new_cases,
          total_cases: country_data["UG"].total_cases
        },
        UA: {
          link: 'https://pt.wikipedia.org/wiki/UA',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["UA"].population,
          linkTarget: '_blank',
          new_cases: country_data["UA"].new_cases,
          total_cases: country_data["UA"].total_cases
        },
        AE: {
          link: 'https://pt.wikipedia.org/wiki/AE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["AE"].population,
          linkTarget: '_blank',
          new_cases: country_data["AE"].new_cases,
          total_cases: country_data["AE"].total_cases
        },
        GB: {
          link: 'https://pt.wikipedia.org/wiki/GB',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["GB"].population,
          linkTarget: '_blank',
          new_cases: country_data["GB"].new_cases,
          total_cases: country_data["GB"].total_cases
        },
        US: {
          link: 'https://pt.wikipedia.org/wiki/US',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["US"].population,
          linkTarget: '_blank',
          new_cases: country_data["US"].new_cases,
          total_cases: country_data["US"].total_cases
        },
        VI: {
          link: 'https://pt.wikipedia.org/wiki/VI',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["VI"].population,
          linkTarget: '_blank',
          new_cases: country_data["VI"].new_cases,
          total_cases: country_data["VI"].total_cases
        },
        UY: {
          link: 'https://pt.wikipedia.org/wiki/UY',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["UY"].population,
          linkTarget: '_blank',
          new_cases: country_data["UY"].new_cases,
          total_cases: country_data["UY"].total_cases
        },
        UZ: {
          link: 'https://pt.wikipedia.org/wiki/UZ',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["UZ"].population,
          linkTarget: '_blank',
          new_cases: country_data["UZ"].new_cases,
          total_cases: country_data["UZ"].total_cases
        },
        VU: {
          link: 'https://pt.wikipedia.org/wiki/VU',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["VU"].population,
          linkTarget: '_blank',
          new_cases: country_data["VU"].new_cases,
          total_cases: country_data["VU"].total_cases
        },
        VE: {
          link: 'https://pt.wikipedia.org/wiki/VE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["VE"].population,
          linkTarget: '_blank',
          new_cases: country_data["VE"].new_cases,
          total_cases: country_data["VE"].total_cases
        },
        VN: {
          link: 'https://pt.wikipedia.org/wiki/VN',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["VN"].population,
          linkTarget: '_blank',
          new_cases: country_data["VN"].new_cases,
          total_cases: country_data["VN"].total_cases
        },
        WF: {
          link: 'https://pt.wikipedia.org/wiki/WF',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["WF"].population,
          linkTarget: '_blank',
          new_cases: country_data["WF"].new_cases,
          total_cases: country_data["WF"].total_cases
        },
        YE: {
          link: 'https://pt.wikipedia.org/wiki/YE',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["YE"].population,
          linkTarget: '_blank',
          new_cases: country_data["YE"].new_cases,
          total_cases: country_data["YE"].total_cases
        },
        ZM: {
          link: 'https://pt.wikipedia.org/wiki/ZM',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ZM"].population,
          linkTarget: '_blank',
          new_cases: country_data["ZM"].new_cases,
          total_cases: country_data["ZM"].total_cases
        },
        ZW: {
          link: 'https://pt.wikipedia.org/wiki/ZW',
          linkTarget: '_blank',
          date: current_date,
          population: country_data["ZW"].population,
          linkTarget: '_blank',
          new_cases: country_data["ZW"].new_cases,
          total_cases: country_data["ZW"].total_cases
        }
      }
    };

    new svgMap({
      targetElementID: 'svgMapDataNewCases',
      data: svgMapDataNewCases,
      mouseWheelZoomEnabled: true,
      mouseWheelZoomWithKey: true
    });
  })();
}

const dateInput = document.getElementById("r0");
const dateInput_slide = document.getElementById("d0");
// 監聽日期輸入框的變動事件
dateInput.addEventListener("change", function () {
  const selectedDate = dateInput_slide.value; // 取得選擇的日期值
  sessionStorage.setItem("selectedDate", selectedDate);
  console.log(selectedDate);
  // 刷新頁面
  location.reload();
});

dateInput_slide.addEventListener("change", function () {
  const selectedDate = dateInput_slide.value; // 取得選擇的日期值
  sessionStorage.setItem("selectedDate", selectedDate);
  console.log(selectedDate);
  // 刷新頁面
  location.reload();
});


