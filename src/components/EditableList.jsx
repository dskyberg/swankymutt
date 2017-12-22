/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from "mobx-react"


import { withStyles } from 'material-ui/styles'

import {
    Grid,
    VirtualTableView,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'


const styles = theme => ({
    label: {
        width: 24,
    },
    button: {
      width: 24,
      height: 24
    },
    headingCell: {
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    cell: {
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
});


@withStyles(styles)
@observer
export default class EditableList extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        header: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
    }

    @observable editingRows = []
    @observable addedRows = []
    @observable changedRows = {}
    columns = []

    @action changeAddedRows = (addedRows) => {
        const initialized = addedRows.map(row => (Object.keys(row).length ? row : { value: '' }));
        this.addedRows = initialized
    }

    @action changeEditingRows = (editingRows) => {
        this.editingRows = editingRows
    }

    @action changeChangedRows = (changedRows) => {
        this.changedRows = changedRows
    }

    @action commitChanges = ({ added, changed, deleted }) => {
        let { rows } = this.state;
        if (added) {
          const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
          rows = [
            ...rows,
            ...added.map((row, index) => ({
              id: startingAddedId + index,
              ...row,
            })),
          ];
        }
        if (changed) {
          rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
          const deletedSet = new Set(deleted);
          rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }


    componentWillMount() {
        const {header} = this.props
        this.columns = [{name: 'value', title: header}]
    }

    render() {
        const { data, classes } = this.props
        const rows = data.map( (value) => { return { value: value }})
        console.log('EditableList:', rows)

        return (
            <div className={classes.root}>
                <Grid
                    rows={rows}
                    columns={this.columns}
                >
                    <VirtualTableView />
                    <TableHeaderRow />
                </Grid>
            </div>
        )
    }
}
