// @flow
import type { BooleanFilterData } from '../filters.types';

export function getBooleanFilterData(
    values: Array<string>,
): BooleanFilterData {
    return {
        values: values
            .map(value => (value === 'true')),
    };
}
