import {ExpiringStorageItem} from "./models/expiring-storage-item";
import {Observable, Subject} from "rxjs";
import {GenericEvent} from "./events/generic.event";
import {SettedItemEvent} from "./events/setted-item.event";
import {RetrievedItemEvent} from "./events/retrieved-item.event";
import {ExpiredItemEvent} from "./events/expired-item.event";

export class ExpiringStorage {

    private static eventBus: Subject<GenericEvent> = new Subject<GenericEvent>();
    public static events$: Observable<GenericEvent> = ExpiringStorage.eventBus.asObservable();

    /**
     * Transforms the time to leave in the expiration timestamp
     * @param ttl
     * @private
     */
    private static expiresAt(ttl: number): number {
        return new Date().getTime() + 1000 * ttl;
    }

    /**
     * Checks if the item is expired
     * @param item
     * @private
     */
    private static isExpired(item: ExpiringStorageItem): boolean {
        return item.expires_at > 0 && !(item.expires_at >= new Date().getTime());
    }

    /**
     * Set the item in the storage
     * @param key The key that identifies the item
     * @param value The value of the item
     * @param ttl The time to leave in seconds, if < 0 the item will never expire
     */
    public static setItem(key: string, value: any, ttl: number = -1): void {
        let item = <ExpiringStorageItem>{value: value, expires_at: ttl > 0 ? ExpiringStorage.expiresAt(ttl) : -1};
        localStorage.setItem(key, JSON.stringify(item));
        this.eventBus.next(new SettedItemEvent(key, value, item.expires_at));
    }

    /**
     * Get the item identified by the key from the storage
     * @param key The key that identifies the item
     */
    public static getItem(key: string): any {
        let item = localStorage.getItem(key);
        if (item != null) {
            let expiringItem = <ExpiringStorageItem>JSON.parse(item);
            if (!this.isExpired(expiringItem)) {
                this.eventBus.next(new RetrievedItemEvent(key, expiringItem.value, expiringItem.expires_at));
                return expiringItem.value;
            } else {
                localStorage.removeItem(key);
                this.eventBus.next(new ExpiredItemEvent(key, expiringItem.value, expiringItem.expires_at));
            }
        }
        return null;
    }
}
