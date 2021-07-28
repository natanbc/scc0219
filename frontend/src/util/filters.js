export default class Filters {
    constructor(filters = {}) {
        this._filters = Object.freeze(filters);
    }

    with(key, value, enabled) {
        let set;
        if(this._filters[key]) {
            set = new Set(this._filters[key]);
        } else {
            set = new Set();
        }

        if(enabled) {
            set.add(value);
        } else {
            set.delete(value);
        }

        return new Filters({...this._filters, [key]: set.size > 0 ? set : undefined});
    }

    isEnabled(key, value) {
        return this._filters[key] && this._filters[key].has(value);
    }

    matches(obj) {
        for(const k of Object.getOwnPropertyNames(this._filters)) {
            const allowedValues = this._filters[k];
            if(!allowedValues || allowedValues.length === 0) continue;
            if(!allowedValues.has(obj[k])) return false;
        }
        return true;
    }

    filterValues(objs) {
        return objs.filter(v => this.matches(v));
    }
}
