// @flow
import { batchActions } from 'redux-batched-actions';
import {
    getRulesActionsForTEI,
} from '../../../../rulesEngineActionsCreator';
import { RenderFoundation, TrackerProgram } from '../../../../metaData';
import getDataEntryKey from '../../../DataEntry/common/getDataEntryKey';
import { loadNewDataEntry } from '../../../DataEntry/actions/dataEntryLoadNew.actions';
import { getEnrollmentDateValidatorContainer, getIncidentDateValidatorContainer } from '../fieldValidators';
import { convertGeometryOut } from '../../converters';

const itemId = 'newEnrollment';

type DataEntryPropsToInclude = Array<Object>;

const dataEntryPropsToInclude: DataEntryPropsToInclude = [
    {
        id: 'enrollmentDate',
        type: 'DATE',
        validatorContainers: getEnrollmentDateValidatorContainer(),
    },
    {
        id: 'incidentDate',
        type: 'DATE',
        validatorContainers: getIncidentDateValidatorContainer(),
    },
    {
        clientId: 'geometry',
        dataEntryId: 'geometry',
        onConvertOut: convertGeometryOut,
    },
];

export const openDataEntryForNewEnrollmentBatch =
    (
        program: ?TrackerProgram,
        foundation: ?RenderFoundation,
        orgUnit: Object,
        dataEntryId: string,
        extraActions: Array<ReduxAction<any, any>> = [],
    ) => {
        const formId = getDataEntryKey(dataEntryId, itemId);
        const dataEntryActions = loadNewDataEntry(dataEntryId, itemId, dataEntryPropsToInclude);

        let rulesActions;
        if (program && foundation) {
            rulesActions = getRulesActionsForTEI(
                program,
                foundation,
                formId,
                orgUnit,
            );
        } else {
            rulesActions = [];
        }

        return batchActions([
            ...dataEntryActions,
            ...rulesActions,
            ...extraActions,
        ]);
    };