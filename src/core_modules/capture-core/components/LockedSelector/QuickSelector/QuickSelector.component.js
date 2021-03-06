// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import programs from 'capture-core/metaDataMemoryStores/programCollection/programCollection';

import ProgramSelector from './Program/ProgramSelector.component';
import OrgUnitSelector from './OrgUnitSelector.component';
import { ActionButtons } from './ActionButtons.component';

const styles = () => ({
    paper: {
        flexGrow: 1,
        padding: 10,
    },
});

type Props = {
    selectedOrgUnitId: string,
    selectedProgramId: string,
    selectedCategories: Object,
    selectedOrgUnit: Object,
    classes: Object,
    onSetOrgUnit: (orgUnitId: string, orgUnitObject: Object) => void,
    onSetProgramId: (programId: string) => void,
    onSetCategoryOption: (categoryId: string, categoryOptionId: string) => void,
    onResetOrgUnitId: () => void,
    onResetProgramId: (baseAction: ReduxAction<any, any>) => void,
    onResetCategoryOption: (categoryId: string) => void,
    onResetAllCategoryOptions: () => void,
    onStartAgain: () => void,
    onNewClick: () => void,
    onFindClick: () => void,
    onFindClickWithoutProgramId: () => void,
};

class QuickSelector extends Component<Props> {
    static getSelectedProgram(selectedProgramId: string) {
        return programs.get(selectedProgramId) || {};
    }

    handleClickProgram: (programId: string) => void;
    handleSetCatergoryCombo: (selectedCategoryOption: string, categoryId: string) => void;
    handleClickOrgUnit: (orgUnit: Object) => void;
    constructor(props) {
        super(props);

        this.handleClickProgram = this.handleClickProgram.bind(this);
        this.handleSetCatergoryCombo = this.handleSetCatergoryCombo.bind(this);
        this.handleClickOrgUnit = this.handleClickOrgUnit.bind(this);
    }

    handleClickProgram(programId: string) {
        this.props.onSetProgramId(programId);
    }

    handleSetCatergoryCombo(selectedCategoryOption, categoryId) {
        this.props.onSetCategoryOption(categoryId, selectedCategoryOption);
    }

    handleClickOrgUnit(orgUnitId, orgUnitObject) {
        this.props.onSetOrgUnit(orgUnitId, orgUnitObject);
    }

    calculateColumnWidths() {
        // The grid has a total width of 12 columns, we need to calculate how much width each selector should have.
        const selectedProgramId = this.props.selectedProgramId;
        const selectedProgram = QuickSelector.getSelectedProgram(selectedProgramId);

        let orgUnitSelectorWidth = 3;
        let programSelectorWidth = 3;
        let actionButtonsWidth = 6;

        if (selectedProgram && selectedProgram.categoryCombination) {
            orgUnitSelectorWidth = 3;
            programSelectorWidth = 6;
            actionButtonsWidth = 3;
        }

        return {
            orgUnitSelectorWidth,
            programSelectorWidth,
            actionButtonsWidth,
        };
    }

    render() {
        const { orgUnitSelectorWidth, programSelectorWidth, actionButtonsWidth } = this.calculateColumnWidths();

        return (
            <Paper className={this.props.classes.paper}>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={orgUnitSelectorWidth}>
                        <OrgUnitSelector
                            selectedOrgUnitId={this.props.selectedOrgUnitId}
                            handleClickOrgUnit={this.handleClickOrgUnit}
                            selectedOrgUnit={this.props.selectedOrgUnit}
                            onReset={this.props.onResetOrgUnitId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={programSelectorWidth}>
                        <ProgramSelector
                            selectedProgram={this.props.selectedProgramId}
                            selectedOrgUnitId={this.props.selectedOrgUnitId}
                            selectedCategories={this.props.selectedCategories}
                            handleClickProgram={this.handleClickProgram}
                            handleSetCatergoryCombo={this.handleSetCatergoryCombo}
                            handleResetCategorySelections={this.props.onResetAllCategoryOptions}
                            buttonModeMaxLength={5}
                            onResetProgramId={this.props.onResetProgramId}
                            onResetCategoryOption={this.props.onResetCategoryOption}
                            onResetOrgUnit={this.props.onResetOrgUnitId}
                        />
                    </Grid>
                    <Grid item xs={12} sm={actionButtonsWidth}>
                        <ActionButtons
                            selectedProgramId={this.props.selectedProgramId}
                            onStartAgainClick={this.props.onStartAgain}
                            onFindClick={this.props.onFindClick}
                            onFindClickWithoutProgramId={this.props.onFindClickWithoutProgramId}
                            onNewClick={this.props.onNewClick}
                            showResetButton={!!(this.props.selectedProgramId || this.props.selectedOrgUnitId)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(QuickSelector);
