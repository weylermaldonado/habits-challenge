const { main } = require('./index.js');

describe('Riddle test', () => {
    it('Should return 24.5', () => {
        const operation = '4-7+8+9/2*3';

        const result = main(operation);

        expect(result).toBe(24.5);
    });
    it('Should thrown an error when the string size is grater than 20 characters', () => {
        const operation = 'ooooooooooooooooooooo'; // 21 length

        const result = () => main(operation);

        expect(result).toThrow(Error);
    });
    it('Should return 2018', () => {
        const operation = '23-14+123/3*49';

        const result = main(operation);

        expect(result).toBe(2018);
    });
    it('Should return 49', () => {
        const operation = '5+9+6^2-1';

        const result = main(operation);

        expect(result).toBe(49);
    });
})