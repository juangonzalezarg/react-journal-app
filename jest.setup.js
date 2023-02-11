// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setImmediate';

require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));