import plain from './plain.js';
import stylish from './stylish.js';

const getFormatter = (name) => ((name.toString() === 'stylish') ? stylish : plain);

export default getFormatter;
