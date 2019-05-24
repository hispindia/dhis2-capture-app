// @flow
import { createSelector } from 'reselect';
import programCollection from '../../../../metaDataMemoryStores/programCollection/programCollection';
import { ProgramStage } from '../../../../metaData';

const programIdSelector = state => state.currentSelections.programId;

export const makeProgramNameSelector = () => createSelector(
    programIdSelector,
    (programId: string) => {
        const program = programCollection.get(programId);
        const programName = (program && program.name) || '';
        return programName;
    },
);

const stageSelector = (props) => props.stage;

export const makeWritableRelationshipTypesSelector = () => createSelector(
    stageSelector,
    (stage: ?ProgramStage) => (stage ? stage.relationshipTypesWhereStageIsFrom.filter(r => r.access.data.write) : []),
);