import { modifyQuantityPastries } from "../../src/utils/helpers";
import { Pastry } from "../../src/pastry";
import { PASTRIES } from "../../src/mocks";

/**
 * Each test is isolated, principle of test isolation
 */

describe('Modify quantity', () => {
    // there is some quantity
    test('quantity test > 0', () => {
        const pastries: Pastry[] = PASTRIES;
        const p = pastries?.filter(p => p.quantity > 0) || [];
        const quantity = p.reduce((acc, curr) => { return (acc + curr.quantity) }, 0);

        expect(quantity).toBeGreaterThan(0);
    });

    // in total there are 29 pastries in the mocks
    test('Initial quantities are a total of 29', () => {
        const pastries: Pastry[] = PASTRIES;
        const p = pastries?.filter(p => p.quantity > 0) || [];
        const quantity = p.reduce((acc, curr) => { return (acc + curr.quantity) }, 0);

        expect(quantity).toBe(29);
    });

    // modification of quantities
    test('Order quantity less than the total 29', () => {
        const pastries: Pastry[] = PASTRIES;
        const quantity = 29;
        const pastriesWin: Pastry[] = modifyQuantityPastries(pastries, quantity);

        const q = pastriesWin.reduce((acc, curr) => { return (acc + (curr?.quantityWon || 0)) }, 0);

        expect(q).toBe(quantity);
    });

    // if we exceed the requested quantity TODO = Exception
    test('If we exceed the quantity, no pastries', () => {
        const pastries: Pastry[] = PASTRIES;
        const quantity = 30;
        const pastriesWin: Pastry[] = modifyQuantityPastries(pastries, quantity);

        expect(pastriesWin.length).toBe(0);
    });
});
