import React, { Component } from 'react'
import { Picker, Text } from 'react-native'
import { connect } from 'react-redux'
import { employeeUpdate, employeeCreate } from '../actions'
import { Card, CardSection, Input, Button } from './common'

class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' })
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Name:'
            placeholder='Gio'
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Phone:'
            placeholder='00-00000-0000'
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <Picker
            style={styles.pickerStyleType}
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label='Monday' value='Monday' />
            <Picker.Item label='Tuesday' value='Tuesday' />
            <Picker.Item label='Wednesday' value='Wednesday' />
            <Picker.Item label='Thursday' value='Thursday' />
            <Picker.Item label='Friday' value='Friday' />
            <Picker.Item label='Saturday' value='Saturday' />
            <Picker.Item label='Sunday' value='Sunday' />
          </Picker>
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>

    )
  }
}

const styles = {
  pickerStyleType: {
    flex: 1
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm

  return { name, phone, shift }
}

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeCreate
})(EmployeeCreate)
