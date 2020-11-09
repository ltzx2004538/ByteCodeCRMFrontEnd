import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../components/Dropdown';
import Select from '../components/Select';
import withSearch from '../components/withSearch';
import { FormatList } from '../../../lib/Search';
import { SearchUser } from '../../Api/User';
import './UserSelector.scss';

class UserSelector extends React.Component {
  constructor(props) {
    super(props);
    const { userList, variant, user } = this.props;
    this.state = {
      showDropdown: false,
      userList,
      user,
      variant,
      textInput: '',
      enableCleanBtn: false,

    };
    this.wrapperRef = React.createRef();
    this.btnRef = React.createRef();
    this.handleClickSelectorButton = this.handleClickSelectorButton.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleCleanInput = this.handleCleanInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickSelectorButton() {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
    this.handleCleanInput();
  }

  handleCleanInput() {
    this.setState({
      textInput: '',
    });
    this.props.search('');
  }

  handleInputChange(inputText) {
    let activeBtn = false;
    if (inputText.length > 0) {
      activeBtn = true;
    }
    this.setState({
      textInput: inputText,
      enableCleanBtn: activeBtn,
    });
    this.props.search(inputText, this.state.userList, SearchUser);
  }

  handleRemoveUser(id) {
    const newList = this.state.userList;
    if (newList.length <= 1) {
      console.log('card must have at least one user');
    } else {
      for (const i in newList) {
        if (newList[i]._id === id) {
          newList.splice(i, 1);
        }
        this.setState({
          userList: newList,
        });
      }
      this.props.handleRemoveUser(id);
    }
  }

  handleAddUser(user) {
    const newUserList = [];
    newUserList.push(user);
    this.setState({
      user: user,
      userList: newUserList,
      showDropdown:false,
    });
    this.props.handleAddUser(user.id);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && !this.btnRef.current.contains(event.target) && this.state.showDropdown) {
      this.handleClickSelectorButton();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {
      showDropdown, textInput, enableCleanBtn, variant, user,
    } = this.state;
    const {
      textInputHint, searchList, loading, checkInput, selectHint
    } = this.props;

    let assignedTo = '';
    let userList = FormatList(this.state.userList);

    if (!userList) {
      assignedTo = '0 user';
    }

    if (userList.length === 1) {
      assignedTo = `${userList[0].selects.fullName} (${userList[0].selects.email})`;
    } else {
      assignedTo = `${userList.length} users`;
    }

    const select = (
      <Select
        label="Users"
        checkOneContact
        selectList={userList}
        searchList={searchList}
        selectHint={selectHint}
        handleRemoveSelects={this.handleRemoveUser}
        handleAddSelects={this.handleAddUser}
      />
    );

    return (
      <div className="userSelector">
        {variant === 'SideBar' ?
          <div className="userSelector__sidebar">
            <div className="userSelector__sidebar__label" ref={this.btnRef}>
            <button
                className="userSelector__sidebar__label__btn"
                onClick={(event) => {
                  event.stopPropagation();
                  this.handleClickSelectorButton();
                }}
              >
                  {user.fullName}
              </button>
            </div>
            <div className="userSelector__sidebar__dropdown" ref={this.wrapperRef}>
              <Dropdown
                textInputHint={textInputHint}
                checkInput={checkInput}
                loading={loading}
                select={select}
                corner={'disable'}
                showDropdown={showDropdown}
                textInput={textInput}
                enableCleanBtn={enableCleanBtn}
                handleCleanInput={this.handleCleanInput}
                handleInputChange={this.handleInputChange}
              />
            </div>
          </div>
          :
          <div className="userSelector__activity">
            <div className="userSelector__activity__label" ref={this.btnRef}>
              <button
                className="userSelector__activity__label__btn"
                onClick={(event) => {
                  event.stopPropagation();
                  this.handleClickSelectorButton();
                }}
              >
                {assignedTo}
                <FontAwesomeIcon className="userSelector__activity__label__btn__icon" icon={faCaretDown} />
              </button>
            </div>
            <div className="userSelector__activity__dropdown" ref={this.wrapperRef}>
              <Dropdown
                textInputHint={textInputHint}
                checkInput={checkInput}
                searchList={searchList}
                loading={loading}
                select={select}
                corner={'topLeft'}
                showDropdown={showDropdown}
                textInput={textInput}
                enableCleanBtn={enableCleanBtn}
                handleCleanInput={this.handleCleanInput}
                handleInputChange={this.handleInputChange}
                handleRemoveUser={this.handleRemoveUser}
                handleAddUser={this.handleAddUser}
              />
            </div>
          </div>
        }

      </div>
    );
  }
}

export default withSearch(UserSelector);
