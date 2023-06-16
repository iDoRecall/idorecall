export function isEqual(value: any, other: any): boolean {
    if (value === other) {
        return true;
    }

    const type = typeof value;
    if (type !== 'object' || value === null || other === null) {
        return false;
    }

    const otherType = typeof other;
    if (type !== otherType) {
        return false;
    }

    if (type === 'object') {
        if (value instanceof Date && other instanceof Date) {
            return value.getTime() === other.getTime();
        }
    }

    if (Array.isArray(value) && Array.isArray(other)) {
        if (value.length !== other.length) {
            return false;
        }

        for (let i = 0; i < value.length; i++) {
            if (!isEqual(value[i], other[i])) {
                return false;
            }
        }

        return true;
    }

    const valueKeys = Object.keys(value);
    const otherKeys = Object.keys(other);

    if (valueKeys.length !== otherKeys.length) {
        return false;
    }

    for (const key of valueKeys) {
        if (!isEqual(value[key], other[key])) {
            return false;
        }
    }

    return true;
}
