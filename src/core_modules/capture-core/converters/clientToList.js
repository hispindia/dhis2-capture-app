// @flow
import React from 'react';
import elementTypes from '../metaData/DataElement/elementTypes';
import DataElement from '../metaData/DataElement/DataElement';

import { displayTypes, displayDate, displayDateTime } from '../utils/date/date.utils';
import stringifyNumber from './common/stringifyNumber';

function convertDataForListDisplay(rawValue: string): string {
    return displayDate(rawValue, displayTypes.SHORT);
}

function convertDateTimeForListDisplay(rawValue: string): string {
    return displayDateTime(rawValue, displayTypes.SHORT);
}

type CoordinateClientValue = {
    latitude: number,
    longitude: number,
};

function convertCoordinateForDisplay(clientValue: CoordinateClientValue) {
    return `[ ${clientValue.longitude}, ${clientValue.latitude} ]`;
}

type FileClientValue = {
    name: string,
    url: string,
    value: string,
};

function convertResourceForDisplay(clientValue: FileClientValue) {
    return (
        <a
            href={clientValue.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => { event.stopPropagation(); }}
        >
            {clientValue.name}
        </a>
    );
}

function convertRangeForDisplay(parser: any, clientValue: any) {
    return (
        <span>
            {parser(clientValue.from)} {'->'} {parser(clientValue.to)}
        </span>
    );
}

const valueConvertersForType = {
    [elementTypes.NUMBER]: stringifyNumber,
    [elementTypes.INTEGER]: stringifyNumber,
    [elementTypes.INTEGER_POSITIVE]: stringifyNumber,
    [elementTypes.INTEGER_ZERO_OR_POSITIVE]: stringifyNumber,
    [elementTypes.INTEGER_NEGATIVE]: stringifyNumber,
    [elementTypes.DATE]: convertDataForListDisplay,
    [elementTypes.DATE_RANGE]: value => convertRangeForDisplay(convertDataForListDisplay, value),
    [elementTypes.DATETIME]: convertDateTimeForListDisplay,
    [elementTypes.TRUE_ONLY]: () => 'Yes',
    [elementTypes.BOOLEAN]: (rawValue: boolean) => (rawValue ? 'Yes' : 'No'),
    [elementTypes.COORDINATE]: convertCoordinateForDisplay,
    [elementTypes.AGE]: convertDataForListDisplay,
    [elementTypes.FILE_RESOURCE]: convertResourceForDisplay,
    [elementTypes.IMAGE]: convertResourceForDisplay,
    [elementTypes.ORGANISATION_UNIT]: (rawValue: Object) => rawValue.name,
};

export function convertValue(value: any, type: $Values<typeof elementTypes>, dataElement?: ?DataElement) {
    if (!value && value !== 0 && value !== false) {
        return value;
    }

    if (dataElement && dataElement.optionSet) {
        return dataElement.optionSet.getOptionText(value);
    }

    // $FlowSuppress
    return valueConvertersForType[type] ? valueConvertersForType[type](value) : value;
}