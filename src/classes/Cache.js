import CacheItem from './CacheItem';

export default class Cache {

    constructor(
        expirationInSeconds
    ) {
        this.expirationInSeconds = 600;
        this.namespace = 'csfd-extended';
    }

    saveItem(
        key,
        value
    ) {
        let cacheItem = new CacheItem(
            this.addNamespaceToName(key),
            value,
            Math.floor(Date.now() / 1000) + this.expirationInSeconds
        )

        localStorage.setItem(
            this.addNamespaceToName(key),
            JSON.stringify(cacheItem)
        )
    }

    getItem(
        key
    ) {
        let cacheItem = localStorage.getItem(
            this.addNamespaceToName(key)
        );

        return cacheItem !== null
            ? JSON.parse(cacheItem)
            : null;
    }

    isItemExpired(
        caheItem
    ) {
        return caheItem.expireAt < Math.floor(Date.now() / 1000);
    }

    addNamespaceToName(name) {
        return this.namespace + '.' + name;
    }

}
