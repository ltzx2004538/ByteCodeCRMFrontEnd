import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { addDate } from '../../../services/DateManager';
import './TaskFollow.scss';

class TaskFollowSelect extends React.Component {
  constructor(props) {
    super(props);
    const selectItems = [
      { key: 'Tomorrow ', value: 1, date: '' },
      { key: 'in 2 business days ', value: 2, date: '' },
      { key: 'in 3 business days ', value: 3, date: '' },
      { key: 'in 1 week ', value: 7, date: '' },
      { key: 'in 2 weeks ', value: 14, date: '' },
      { key: 'in 1 month ', value: 30 },
    ];

    this.state = {
      timeValue: 3,
      selectItems,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.updateValue(e.target.value);
  }

  updateValue(selectedValue) {
    this.setState({
      timeValue: selectedValue,
    });
  }

  render() {
    const { timeValue, selectItems } = this.state;
    return (
      <div>
        <ThemeProvider theme={this.props.theme}>
          <Select
            // disableUnderline
            value={timeValue}
            variant="standard"
            onChange={this.handleSelectChange}
            defaultValue={3}
            className="taskFollow__select__input"
          >
            {selectItems.map((item) => (
              <MenuItem
                key={item.key}
                value={item.value}
              >
                {`${item.key}(${addDate(item.value)})`}
              </MenuItem>
            ))}
          </Select>
        </ThemeProvider>
      </div>
    );
  }
}

export default TaskFollowSelect;
