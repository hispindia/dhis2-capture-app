// @flow
import * as React from 'react';
import CheckedIcon from '../../../Icons/SingleSelectionCheckedIcon.component';
import UncheckedIcon from '../../../Icons/SingleSelectionUncheckedIcon.component';
import SingleSelectBox from './SingleSelectBox/SingleSelectBox.component';
import withFocusHandler from './SingleSelectBox/withFocusHandler';
import orientations from '../../../constants/orientations.const';
import defaultClasses from './singleSelectionBoxes.mod.css';
import type { OptionRendererInputData, OptionsArray, OptionRenderer } from '../selectBoxes.types';

const SingleSelectBoxWrapped = withFocusHandler()(SingleSelectBox);

type Props = {
    id: string,
    options: OptionsArray,
    onGetOptionData: (option: Object) => OptionRendererInputData,
    children?: ?OptionRenderer,
    value: any,
    orientation: $Values<typeof orientations>,
    classes?: ?{
        iconSelected?: string,
        iconDeselected?: string,
        focusSelected?: string,
        focusUnselected?: string,
        unFocus?: string,
    },
    onSelect: (value: any) => void,
    onSetFocus: () => void,
    onRemoveFocus: () => void,
};

class SingleSelectionBoxes extends React.Component<Props> {
    static getFocusClass(classes: Object, isSelected: boolean) {
        return isSelected ? classes.focusSelected : classes.focusUnselected;
    }

    getCheckedIcon() {
        return (
            <CheckedIcon
                className={this.props.classes && this.props.classes.iconSelected}
            />
        );
    }

    getUncheckedIcon() {
        return (
            <UncheckedIcon
                className={this.props.classes && this.props.classes.iconDeselected}
            />
        );
    }

    getPostProcessedCustomIcon(customElement: React.Element<any>, isSelected: boolean) {
        return React.cloneElement(customElement, isSelected ?
            { className: this.props.classes && this.props.classes.iconSelected } :
            { className: this.props.classes && this.props.classes.iconDeselected }, null);
    }

    getIconElement(optionData: OptionRendererInputData, isSelected: boolean) {
        const { children } = this.props;
        const customIconElement = children ? children(optionData, isSelected) : null;
        if (customIconElement) {
            return this.getPostProcessedCustomIcon(customIconElement, isSelected);
        }

        return isSelected ? this.getCheckedIcon() : this.getUncheckedIcon();
    }

    getOption(optionData: OptionRendererInputData, isSelected: boolean, index: number) {
        const { orientation, id: groupId, value, onSelect, classes, onSetFocus, onRemoveFocus } = this.props;
        const containerClass = orientation === orientations.HORIZONTAL ?
            defaultClasses.optionContainerHorizontal : defaultClasses.optionContainerVertical;
        const tabIndex = isSelected || (index === 0 && !value && value !== false && value !== 0) ? 0 : -1;
        const IconElement = this.getIconElement(optionData, isSelected);

        return (
            <div
                className={containerClass}
                key={optionData.id || optionData.name}
            >
                { /* $FlowSuppress */ }
                <SingleSelectBoxWrapped
                    optionData={optionData}
                    isSelected={isSelected}
                    tabIndex={tabIndex}
                    groupId={groupId}
                    onSelect={onSelect}
                    focusClass={classes && SingleSelectionBoxes.getFocusClass(classes, isSelected)}
                    unFocusClass={classes && classes.unFocus}
                    onSetFocus={onSetFocus}
                    onRemoveFocus={onRemoveFocus}
                >
                    {IconElement}
                </SingleSelectBoxWrapped>
            </div>
        );
    }

    getSelectionOptions() {
        const { options, onGetOptionData, value } = this.props;
        return options
            .map((option, index) => {
                const optionData = onGetOptionData ? onGetOptionData(option) : option;
                const isSelected = optionData.value === value;
                const OptionElement = this.getOption(optionData, isSelected, index);
                return OptionElement;
            });
    }
    render() {
        const { orientation } = this.props;
        const containerClass = orientation === orientations.HORIZONTAL ?
            defaultClasses.containerHorizontal : defaultClasses.containerVertical;

        return (
            <div
                className={containerClass}
            >
                {this.getSelectionOptions()}
            </div>
        );
    }
}

export default SingleSelectionBoxes;