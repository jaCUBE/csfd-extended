export default class CacheItem {

    constructor(
        name,
        value,
        expireAt
    ) {
        this.name = name;
        this.expireAt = expireAt;
        this.value = value;
    }

}
