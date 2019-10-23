// @flow
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import type { TableClasses } from '../../../d2Ui/dataTable/getTableComponents';

type Props = {
    children: React.Node,
    className?: ?string,
};

const getCell = (defaultClasses: TableClasses) => {
    const Cell = (props: Props, context: { table?: ?{ head: boolean, footer: boolean }}) => {
        const { children, className, ...passOnProps } = props;

        const { table } = context;
        const classes = classNames(
            defaultClasses.tableCell,
            {
                [defaultClasses.tableCellBody]: !table,
                [defaultClasses.tableCellHeader]: table && table.head,
                [defaultClasses.tableCellFooter]: table && table.footer,
            },
            className,
        );
        return (
            <td
                className={classes}
                {...passOnProps}
            >
                {props.children}
            </td>
        );
    };

    Cell.contextTypes = {
        table: PropTypes.object,
    };

    return Cell;
};

export default getCell;