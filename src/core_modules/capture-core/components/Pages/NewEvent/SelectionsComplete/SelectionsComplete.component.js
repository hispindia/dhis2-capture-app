// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DataEntryWrapper from '../DataEntryWrapper/NewEventDataEntryWrapper.container';
import NewRelationshipWrapper from '../NewRelationshipWrapper/NewEventNewRelationshipWrapper.container';
import SelectionsNoAccess from '../SelectionsNoAccess/dataEntrySelectionsNoAccess.container';


const getStyles = () => ({
    container: {
        padding: '10px 24px 24px 24px',
    },
});

type Props = {
    showAddRelationship: boolean,
    classes: {
        container: string,
    },
    eventAccess: {
        read: boolean,
        write: boolean,
    },
};

class SelectionsComplete extends Component<Props> {
    render() {
        const { classes, showAddRelationship, eventAccess } = this.props;
        if (!eventAccess.write) {
            return (
                <SelectionsNoAccess />
            );
        }

        return (
            <div
                className={classes.container}
            >
                {showAddRelationship ?
                    <NewRelationshipWrapper /> :
                    <DataEntryWrapper />
                }
            </div>
        );
    }
}

export default withStyles(getStyles)(SelectionsComplete);
