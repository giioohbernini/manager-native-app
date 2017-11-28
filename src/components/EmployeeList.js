import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import ListItem from './ListItem'
import { employeesFetch } from '../actions'

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch()

    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(employees)
  }

  renderRow(employee) {
    return <ListItem style={styles.itemStyle} employee={employee} />
  }

  render() {
    console.log(this.props)
    return(
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = {
  itemStyle: {
    marginTop: 10,
    marginBottom: 10
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }
  })

  return { employees }
}

export default connect(mapStateToProps, { employeesFetch })(EmployeeList)
