// @flow
import DataElement from '../../../metaData/DataElement/DataElement';
import { convertValue } from '../../../converters/clientToForm';
import RenderFoundation from '../../../metaData/RenderFoundation/RenderFoundation';

type DataEntryPropToIncludeStandard = {|
    id: string,
    type: string,
|};

type DataEntryPropToIncludeSpecial = {|
    inId: string,
    outId: string,
    onConvertIn: (value: any) => any,
    onConvertOut: (dataEntryValue: any, prevValue: any) => any,
|};

export type DataEntryPropToInclude = DataEntryPropToIncludeStandard | DataEntryPropToIncludeSpecial;

export function getDataEntryMeta(dataEntryPropsToInclude: Array<DataEntryPropToInclude>) {
    return dataEntryPropsToInclude
        .reduce((accMeta, propToInclude) => {
            // $FlowSuppress
            accMeta[propToInclude.id || propToInclude.outId] =
                propToInclude.type ?
                    { type: propToInclude.type } :
                    // $FlowSuppress
                    { onConvertOut: propToInclude.onConvertOut.toString(), outId: propToInclude.inId };
            return accMeta;
        }, {});
}

export function getDataEntryValues(
    dataEntryPropsToInclude: Array<DataEntryPropToInclude>,
    clientValuesForDataEntry: Object,
) {
    const standardValuesArray = dataEntryPropsToInclude
        // $FlowSuppress :flow filter problem
        .filter(propToInclude => propToInclude.type)
        // $FlowSuppress :flow filter problem
        .map((propToInclude: DataEntryPropToIncludeStandard) => new DataElement((_this) => {
            _this.id = propToInclude.id;
            _this.type = propToInclude.type;
        }))
        .map(dataElement => ({
            id: dataElement.id,
            value: dataElement.convertValue(clientValuesForDataEntry[dataElement.id], convertValue),
        }));

    const specialValuesArray = dataEntryPropsToInclude
        // $FlowSuppress :flow filter problem
        .filter(propToInclude => propToInclude.onConvertIn)
        // $FlowSuppress :flow filter problem
        .map((propToInclude: DataEntryPropToIncludeSpecial) => ({
            id: propToInclude.outId,
            value: propToInclude.onConvertIn(clientValuesForDataEntry[propToInclude.inId]),
        }));

    return [...standardValuesArray, ...specialValuesArray]
        .reduce((accConvertedValues, valueItem: { id: string, value: any }) => {
            accConvertedValues[valueItem.id] = valueItem.value;
            return accConvertedValues;
        }, {});
}

export function getFormValues(
    clientValuesForForm: Object,
    formFoundation: RenderFoundation,
) {
    const convertedValues = formFoundation.convertValues(clientValuesForForm, convertValue);
    return convertedValues;
}