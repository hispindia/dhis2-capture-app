// @flow
import {
    TextField,
    withGotoInterface,
    withHideCompatibility,
    withDefaultShouldUpdateInterface,
    withFocusSaver,
    withCalculateMessages,
    withDefaultFieldContainer,
    withLabel,
    withDisplayMessages,
    withInternalChangeHandler,
    withFilterProps,
} from '../../../../FormFields/New';
import withRequiredFieldCalculation from '../../withRequiredFieldCalculation';
import labelTypeClasses from '../../buildField.mod.css';

const getFilteredProps = (props: Object) => {
    const { formHorizontal, fieldLabelMediaBasedClass, ...passOnProps } = props;
    return passOnProps;
};

export default withGotoInterface()(
    withHideCompatibility()(
        withDefaultShouldUpdateInterface()(
            withRequiredFieldCalculation()(
                withFocusSaver()(
                    withCalculateMessages()(
                        withDefaultFieldContainer()(
                            withLabel({
                                onGetUseVerticalOrientation: (props: Object) => props.formHorizontal,
                                onGetCustomFieldLabeClass: (props: Object) =>
                                    `${props.fieldLabelMediaBasedClass} ${labelTypeClasses.textLabel}`,
                            })(
                                withFilterProps(getFilteredProps)(
                                    withDisplayMessages()(
                                        withInternalChangeHandler()(TextField),
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        ),
    ),
);