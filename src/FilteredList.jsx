import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all"  // Added state to track type
    };
  }
  
  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({search: event.target.value.trim().toLowerCase()});
  }
  
  // Handler for dropdown selection
  onSelect = (eventKey) => {
    this.setState({type: eventKey});
  }
  
  filterItem = (item) => {
    // Check both search term and item type
    const nameMatch = item.name.toLowerCase().search(this.state.search) !== -1;
    const typeMatch = this.state.type === "all" || item.type.toLowerCase() === this.state.type.toLowerCase();
    return nameMatch && typeMatch;
  }
  
  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <DropdownButton id="typeDropdown" title={"Type"}>
          <MenuItem eventKey="all" onSelect={this.onSelect}>All</MenuItem>
          <MenuItem eventKey="fruit" onSelect={this.onSelect}>Fruit</MenuItem>
          <MenuItem eventKey="vegetable" onSelect={this.onSelect}>Vegetable</MenuItem>
        </DropdownButton>
        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;