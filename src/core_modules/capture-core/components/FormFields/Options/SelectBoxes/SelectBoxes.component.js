// @flow
import React from 'react';

import MultiSelectBoxes from '../MultiSelectBoxes/MultiSelectBoxes.component';
import { orientations as multiSelectOrientations } from '../MultiSelectBoxes/multiSelectBoxes.const';

import SingleSelectBoxes from '../SingleSelectBoxes/SingleSelectBoxes.component';
import { orientations as singleSelectOrientatins } from '../SingleSelectBoxes/singleSelectBoxes.const';

type Props = {
    multiSelect?: ?boolean,
};

const SelectBoxes = (props: Props) => {
    const { multiSelect, ...passOnProps } = props;

    if (multiSelect) {
        return (
            // $FlowFixMe[cannot-spread-inexact] automated comment
            <MultiSelectBoxes
                orientation={multiSelectOrientations.HORIZONTAL}
                {...passOnProps}
            />
        );
    }

    return (
        // $FlowFixMe[cannot-spread-inexact] automated comment
        <SingleSelectBoxes
            orientation={singleSelectOrientatins.HORIZONTAL}
            {...passOnProps}
        />
    );
};

SelectBoxes.defaultProps = {
    multiSelect: false,
};

export default SelectBoxes;
