/**
 * Config: units.ts
 * Central configuration for all unit definitions, labels, symbols and aliases.
 * Aliases support multi-language search queries.
 */
import { CategoryInfo, ConversionCategory } from '../models/ConversionRequest';

export const UNITS_CONFIG: Record<ConversionCategory, CategoryInfo> = {
  length: {
    category: 'length',
    label: 'Length',
    units: [
      { key: 'meter', label: 'Meter', symbol: 'm', aliases: ['meter', 'metre', 'meters', 'metres', 'metro', 'metros', 'mètre', 'метр', 'メートル', '米'] },
      { key: 'kilometer', label: 'Kilometer', symbol: 'km', aliases: ['kilometer', 'kilometre', 'kilometers', 'kilometres', 'kilómetro', 'kilómetros', 'kilomètre', 'километр', 'キロメートル', '千米'] },
      { key: 'centimeter', label: 'Centimeter', symbol: 'cm', aliases: ['centimeter', 'centimetre', 'centimeters', 'centimetres', 'centímetro', 'centímetros', 'centimètre', 'сантиметр', 'センチメートル', '厘米'] },
      { key: 'millimeter', label: 'Millimeter', symbol: 'mm', aliases: ['millimeter', 'millimetre', 'millimeters', 'millimetres', 'milímetro', 'milímetros', 'millimètre', 'миллиметр', 'ミリメートル', '毫米'] },
      { key: 'micrometer', label: 'Micrometer', symbol: 'μm', aliases: ['micrometer', 'micrometre', 'micrometers', 'micrómetro', 'микрометр', 'マイクロメートル', '微米'] },
      { key: 'nanometer', label: 'Nanometer', symbol: 'nm', aliases: ['nanometer', 'nanometre', 'nanometers', 'nanómetro', 'нанометр', 'ナノメートル', '纳米'] },
      { key: 'mile', label: 'Mile', symbol: 'mi', aliases: ['mile', 'miles', 'milla', 'millas', 'mille', 'миля', 'マイル', '英里'] },
      { key: 'yard', label: 'Yard', symbol: 'yd', aliases: ['yard', 'yards', 'yarda', 'yardas', 'ярд', 'ヤード', '码'] },
      { key: 'foot', label: 'Foot', symbol: 'ft', aliases: ['foot', 'feet', 'pie', 'pies', 'pied', 'фут', 'フィート', '英尺'] },
      { key: 'inch', label: 'Inch', symbol: 'in', aliases: ['inch', 'inches', 'pulgada', 'pulgadas', 'pouce', 'дюйм', 'インチ', '英寸'] },
      { key: 'lightyear', label: 'Light Year', symbol: 'ly', aliases: ['light year', 'lightyear', 'light-year', 'light years', 'año luz', 'année-lumière', 'световой год', '光年'] },
    ],
  },
  temperature: {
    category: 'temperature',
    label: 'Temperature',
    units: [
      { key: 'celsius', label: 'Celsius', symbol: '°C', aliases: ['celsius', 'centigrade', 'grado celsius', 'celcius', 'цельсий', 'セルシウス', '摄氏度'] },
      { key: 'kelvin', label: 'Kelvin', symbol: 'K', aliases: ['kelvin', 'kelvins', 'kelvín', 'кельвин', 'ケルビン', '开尔文'] },
      { key: 'fahrenheit', label: 'Fahrenheit', symbol: '°F', aliases: ['fahrenheit', 'fahrenheit', 'фаренгейт', 'ファーレンハイト', '华氏度'] },
    ],
  },
  area: {
    category: 'area',
    label: 'Area',
    units: [
      { key: 'squaremeter', label: 'Square Meter', symbol: 'm²', aliases: ['square meter', 'square metre', 'square meters', 'metro cuadrado', 'mètre carré', 'квадратный метр', '平方メートル', '平方米'] },
      { key: 'squarekilometer', label: 'Square Kilometer', symbol: 'km²', aliases: ['square kilometer', 'square kilometre', 'kilómetro cuadrado', 'kilomètre carré', 'квадратный километр', '平方キロメートル', '平方千米'] },
      { key: 'squarecentimeter', label: 'Square Centimeter', symbol: 'cm²', aliases: ['square centimeter', 'square centimetre', 'centímetro cuadrado', 'centimètre carré', 'квадратный сантиметр', '平方センチメートル', '平方厘米'] },
      { key: 'squaremillimeter', label: 'Square Millimeter', symbol: 'mm²', aliases: ['square millimeter', 'square millimetre', 'milímetro cuadrado', 'квадратный миллиметр', '平方ミリメートル', '平方毫米'] },
      { key: 'squaremicrometer', label: 'Square Micrometer', symbol: 'μm²', aliases: ['square micrometer', 'square micrometre', 'micrómetro cuadrado', 'квадратный микрометр', '平方マイクロメートル', '平方微米'] },
      { key: 'hectare', label: 'Hectare', symbol: 'ha', aliases: ['hectare', 'hectares', 'hectárea', 'hectáreas', 'гектар', 'ヘクタール', '公顷'] },
      { key: 'squaremile', label: 'Square Mile', symbol: 'mi²', aliases: ['square mile', 'square miles', 'milla cuadrada', 'квадратная миля', '平方マイル', '平方英里'] },
      { key: 'squareyard', label: 'Square Yard', symbol: 'yd²', aliases: ['square yard', 'square yards', 'yarda cuadrada', 'квадратный ярд', '平方ヤード', '平方码'] },
      { key: 'squarefoot', label: 'Square Foot', symbol: 'ft²', aliases: ['square foot', 'square feet', 'pie cuadrado', 'квадратный фут', '平方フィート', '平方英尺'] },
      { key: 'squareinch', label: 'Square Inch', symbol: 'in²', aliases: ['square inch', 'square inches', 'pulgada cuadrada', 'квадратный дюйм', '平方インチ', '平方英寸'] },
      { key: 'acre', label: 'Acre', symbol: 'ac', aliases: ['acre', 'acres', 'акр', 'エーカー', '英亩'] },
    ],
  },
  volume: {
    category: 'volume',
    label: 'Volume',
    units: [
      { key: 'cubicmeter', label: 'Cubic Meter', symbol: 'm³', aliases: ['cubic meter', 'cubic metre', 'metro cúbico', 'mètre cube', 'кубический метр', '立方メートル', '立方米'] },
      { key: 'cubickilometer', label: 'Cubic Kilometer', symbol: 'km³', aliases: ['cubic kilometer', 'cubic kilometre', 'kilómetro cúbico', 'кубический километр', '立方キロメートル', '立方千米'] },
      { key: 'cubiccentimeter', label: 'Cubic Centimeter', symbol: 'cm³', aliases: ['cubic centimeter', 'cubic centimetre', 'centímetro cúbico', 'кубический сантиметр', '立方センチメートル', '立方厘米'] },
      { key: 'cubicmillimeter', label: 'Cubic Millimeter', symbol: 'mm³', aliases: ['cubic millimeter', 'cubic millimetre', 'milímetro cúbico', 'кубический миллиметр', '立方ミリメートル', '立方毫米'] },
      { key: 'liter', label: 'Liter', symbol: 'L', aliases: ['liter', 'litre', 'liters', 'litres', 'litro', 'litros', 'litre', 'литр', 'リットル', '升'] },
      { key: 'milliliter', label: 'Milliliter', symbol: 'mL', aliases: ['milliliter', 'millilitre', 'milliliters', 'mililitro', 'mililitros', 'миллилитр', 'ミリリットル', '毫升'] },
      { key: 'usgallon', label: 'US Gallon', symbol: 'gal', aliases: ['us gallon', 'gallon', 'gallons', 'galón', 'galones', 'галлон', 'ガロン', '加仑'] },
      { key: 'usquart', label: 'US Quart', symbol: 'qt', aliases: ['us quart', 'quart', 'quarts', 'cuarto', 'кварта', 'クォート', '夸脱'] },
      { key: 'uspint', label: 'US Pint', symbol: 'pt', aliases: ['us pint', 'pint', 'pints', 'pinta', 'пинта', 'パイント', '品脱'] },
      { key: 'uscup', label: 'US Cup', symbol: 'cup', aliases: ['us cup', 'cup', 'cups', 'taza', 'tazas', 'чашка', 'カップ', '杯'] },
      { key: 'usfluidounce', label: 'US Fluid Ounce', symbol: 'fl oz', aliases: ['us fluid ounce', 'fluid ounce', 'fluid ounces', 'onza fluida', 'жидкая унция', '液量オンス', '液量盎司'] },
    ],
  },
  weight: {
    category: 'weight',
    label: 'Weight',
    units: [
      { key: 'kilogram', label: 'Kilogram', symbol: 'kg', aliases: ['kilogram', 'kilograms', 'kilogramo', 'kilogramos', 'kilogramme', 'килограмм', 'キログラム', '千克'] },
      { key: 'gram', label: 'Gram', symbol: 'g', aliases: ['gram', 'grams', 'gramo', 'gramos', 'gramme', 'грамм', 'グラム', '克'] },
      { key: 'milligram', label: 'Milligram', symbol: 'mg', aliases: ['milligram', 'milligrams', 'miligramo', 'miligramos', 'миллиграмм', 'ミリグラム', '毫克'] },
      { key: 'metricton', label: 'Metric Ton', symbol: 't', aliases: ['metric ton', 'metric tons', 'tonne', 'tonnes', 'tonelada métrica', 'метрическая тонна', 'メートルトン', '公吨'] },
      { key: 'longton', label: 'Long Ton', symbol: 'lt', aliases: ['long ton', 'long tons', 'imperial ton', 'tonelada larga', 'длинная тонна', 'ロングトン', '长吨'] },
      { key: 'shortton', label: 'Short Ton', symbol: 'st', aliases: ['short ton', 'short tons', 'us ton', 'tonelada corta', 'малая тонна', 'ショートトン', '短吨'] },
      { key: 'pound', label: 'Pound', symbol: 'lb', aliases: ['pound', 'pounds', 'libra', 'libras', 'livre', 'фунт', 'ポンド', '磅'] },
      { key: 'ounce', label: 'Ounce', symbol: 'oz', aliases: ['ounce', 'ounces', 'onza', 'onzas', 'once', 'унция', 'オンス', '盎司'] },
      { key: 'carat', label: 'Carat', symbol: 'ct', aliases: ['carat', 'carats', 'quilate', 'quilates', 'карат', 'カラット', '克拉'] },
      { key: 'atomicmassunit', label: 'Atomic Mass Unit', symbol: 'u', aliases: ['atomic mass unit', 'amu', 'dalton', 'атомная единица массы', '原子質量単位', '原子质量单位'] },
    ],
  },
  time: {
    category: 'time',
    label: 'Time',
    units: [
      { key: 'second', label: 'Second', symbol: 's', aliases: ['second', 'seconds', 'segundo', 'segundos', 'seconde', 'секунда', '秒'] },
      { key: 'millisecond', label: 'Millisecond', symbol: 'ms', aliases: ['millisecond', 'milliseconds', 'milisegundo', 'milisegundos', 'milliseconde', 'миллисекунда', 'ミリ秒', '毫秒'] },
      { key: 'microsecond', label: 'Microsecond', symbol: 'μs', aliases: ['microsecond', 'microseconds', 'microsegundo', 'микросекунда', 'マイクロ秒', '微秒'] },
      { key: 'nanosecond', label: 'Nanosecond', symbol: 'ns', aliases: ['nanosecond', 'nanoseconds', 'nanosegundo', 'наносекунда', 'ナノ秒', '纳秒'] },
      { key: 'picosecond', label: 'Picosecond', symbol: 'ps', aliases: ['picosecond', 'picoseconds', 'picosegundo', 'пикосекунда', 'ピコ秒', '皮秒'] },
      { key: 'minute', label: 'Minute', symbol: 'min', aliases: ['minute', 'minutes', 'minuto', 'minutos', 'минута', '分', '分钟'] },
      { key: 'hour', label: 'Hour', symbol: 'h', aliases: ['hour', 'hours', 'hora', 'horas', 'heure', 'час', '時間', '小时'] },
      { key: 'day', label: 'Day', symbol: 'd', aliases: ['day', 'days', 'día', 'días', 'jour', 'день', '日', '天'] },
      { key: 'week', label: 'Week', symbol: 'wk', aliases: ['week', 'weeks', 'semana', 'semanas', 'semaine', 'неделя', '週', '周'] },
      { key: 'month', label: 'Month', symbol: 'mo', aliases: ['month', 'months', 'mes', 'meses', 'mois', 'месяц', '月', '月份'] },
      { key: 'year', label: 'Year', symbol: 'yr', aliases: ['year', 'years', 'año', 'años', 'an', 'année', 'год', '年'] },
    ],
  },
};

export const ALL_CATEGORIES: ConversionCategory[] = ['length', 'temperature', 'area', 'volume', 'weight', 'time'];
