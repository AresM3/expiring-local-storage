import {ExpiringStorage} from "./expiring-storage";

describe('ExpiringStorage', () => {
    beforeEach(() => localStorage.clear());

    it('should set item with no expiration', () => {
        ExpiringStorage.setItem('item', {item: 'item'});
        expect(localStorage.getItem('item')).toBeTruthy();
        expect(JSON.parse(localStorage.getItem('item')).expires_at).toBe(-1);
    });

    it('should set item with expiration', (done: DoneFn) => {
        ExpiringStorage.setItem('item', {item: 'item'}, 2);
        expect(ExpiringStorage.getItem('item')).toBeTruthy();
        setTimeout(() => {
            expect(ExpiringStorage.getItem('item')).toBeFalsy();
            done();
        }, 2100);
    });
});
