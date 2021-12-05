import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// This is an example of managing a list of items in React, including delete,
// edit and add operations for the list!

class App extends React.Component {
    
  // items will keep track of our items
  // nextID is the next unique ID (we just increment by 1 each time)
  // editIndex will be the index in the items array of an item beig edited 
  // mode is the current mode... Add or Edit
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      currPage: "Tasks",
      currHeaders: ["Task Name", "Priority", "Type", "Project", "Notes", "", ""],
      tasksHeaders: ["Task Name", "Priority", "Type", "Project", "Notes", "", ""],
      tasksBody: [],
      customersHeaders: ["Customer Name", "Need to Call", "Visited the Office", "Do Not Contact", "Notes", "", ""],
      customersBody: [],
      meetingsHeaders: ["Meeting Name", "Time", "Food", "Drinks", "Games", "Notes", "", ""],
      meetingsBody: [],
      employeeViolationsHeaders: ["Employee Name", "Violatin Type", "Priority", "Notes", "", ""],
      employeeViolationsBody: [],
      ideasHeaders: ["Startup Name", "Technology"],
      nextID: 0, 
      nextCatId: 0, 
      editIndex: 0, 
      input: "", 
      catInput: "", 
      mode:"Add Item", 
      category: "", 
      categories: [], 
      categoryMode: "Add Category"
  }
}

  // We change the text/behavior of our button depending on the mode
  submit() {

    // If we're adding an item to the list...
    if (this.state.mode == "Add Item")
    {
      // increment the next unique ID, set the input textbox to blank, and put 
      // the item into the list, see the handy "..." syntax explained here:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
        this.setState({ 
          nextID: this.state.nextID + 1,
          input: "",
          items: [...this.state.items, 
                  {id: this.state.nextID + 1, item: this.state.input, category: this.state.category}]
        })
      }
    // If we're editing an item in the list
    else 
    {
        var newItems = this.state.items;
        newItems[this.state.editIndex].item = this.state.input;

      // Flip back to Add mode, set input textbox to blank, 
      this.setState({ 
        mode: "Add Item",
        input: "",
        items: newItems,
      })    
      }
    }

  addCategory() {
    if (this.state.categoryMode == "Add Category"){
      if(!this.state.categories.includes(this.state.category)){
        this.setState({ 
          nextCatId: this.state.nextCatId + 1,
          catInput: "",
          categories: [...this.state.categories, 
                  {item: this.state.catInput, id: this.state.nextID + 1}]
        })
      }
    }
  }
 
  // Deletes an item from the list
  delete(delID) {
    
    // Only allow deleting an item if we aren't currently editing an item, 
    // otherwise our method of editing based on items array index will break, 
    // and it's probably not a good idea regardless.
    if (this.state.mode != "Edit Item")
    {
      // Delete the item with ID delID by filtering out the item using filter:
      // https://www.w3schools.com/jsref/jsref_filter.asp
      this.setState({ 
        items: this.state.items.filter( ({id}) => id != delID )
      })
    }    
  }

  // Sets the list to edit mode
  edit(editID) {

    // Get the item to edit itself from the items array based on the id, using 
    // find: https://www.w3schools.com/jsref/jsref_find.asp
    var editItem = this.state.items.find( ({id}) => id == editID );

    // Set input to the edit item text, set mode to Edit, set editIndex to be 
    // the index in the items array of the item we are editing (so we can 
    // easily modify the value later)
    this.setState({ 
      input: editItem.item,
      mode: "Edit Item",
      editIndex: this.state.items.indexOf(editItem),
      category: editItem.category
    })    
  } 

  getBodyContent(){
    var newItems = this.state.items;
    var bodyContent = "";
    while(newItems > 0){
      bodyContent += "<tr>"
      for (let index = 0; index < this.state.categories.length; index++) {
        if(newItems.find(({category}) => category == this.state.categories[index]) != null){
          var item = newItems.find(({category}) => category == this.state.categories[index]);
          bodyContent += "<td key={id}><p>{item}</p><button class='btn btn-danger' onClick={this.delete.bind(this,id)}>Delete</button><button class='btn btn-info' onClick={this.edit.bind(this,id)}>Edit</button></td>" 
          newItems.splice(item.id, 1)
        }
        else{
          bodyContent += "<td></td>"
        }
      }
      bodyContent += "</tr>"
    }
    return bodyContent;
  }

  // We use arrow functions => to generate our list of items right inside our 
  // JSX expression, as well as to handle the onChange event of the input 
  // textbox: https://www.w3schools.com/js/js_arrow_function.asp
  //
  // We setup delete and edit handlers with each item, and we have our button 
  // click handled by the submit handler, all of which are defined above.
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="collapse navbar-collapse" id="navbar">
              <ul class="navbar-nav">
                <li class="nav-item active">
                 <a class="nav-link" href="index.html" value="Tasks" onClick={(event) => this.setState({currPage: event.target.value}), this.switchTopic.bind(this)}>Tasks</a>
                </li>
                <li class="nav-item">
                 <a class="nav-link" href="index.html" value="Customers" onClick={(event) => this.setState({currPage: event.target.value}), this.switchTopic.bind(this)}>Customers</a>
                </li>
                <li class="nav-item">
                 <a class="nav-link" href="index.html" value="Meetings" onClick={(event) => this.setState({currPage: event.target.value}), this.switchTopic.bind(this)}>Meetings</a>
                </li>
                <li class="nav-item">
                 <a class="nav-link" href="index.html" value="Employee Violations" onClick={(event) => this.setState({currPage: event.target.value}), this.switchTopic.bind(this)}>Employee Violations <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                 <a class="nav-link" href="index.html" value="Ideas" onClick={(event) => this.setState({currPage: event.target.value}), this.switchTopic.bind(this)}>Ideas</a>
                </li>
              </ul>
              </div>
          </nav>
        <div class="col-lg-12">
        <input type="text" 
               onChange={(event) => this.setState({catInput: event.target.value})}
               value={this.state.catInput} />
        <button onClick={this.addCategory.bind(this)}>{this.state.categoryMode}</button>  
        <input type="text" 
               onChange={(event) => this.setState({input: event.target.value})}
               value={this.state.input} />
        <select>
          {this.state.categories.map(
            ({item,id}) =>
            <option value={item} key={id}>{item}</option>
          )}
              </select> 
        <button onClick={this.submit.bind(this)}>{this.state.mode}</button> 
         <div class="row">
           <table>
             <thead>
               <tr>
             {this.state.currHeaders.map( 
            (item, index) => 
              <th key={index} style={{wordWrap: 'break-word', height: '150px', overflowY: 'auto', borderBottom: '1px solid #dee2e6'}}>
                <p>{item}</p>
                <button class="btn btn-danger" onClick={this.delete.bind(this,index)}> Delete </button> 
                <button class="btn btn-info" onClick={this.edit.bind(this,index)}>Edit </button> 
              </th> )}
              </tr>
             </thead>
             <tbody>
                {this.state.items}
             </tbody>
           </table>
              </div>
        </div>
      </div>
    )
  }

};

export default App;
