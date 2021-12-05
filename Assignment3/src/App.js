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
      currPage: "Tasks",
      prevPage: "",
      currHeaders: ["Task Name"],
      currBody: [],
      tasksHeaders: ["Task Name"],
      tasksBody: [],
      customersHeaders: ["Customer Name"],
      customersBody: [],
      meetingsHeaders: ["Meeting Name"],
      meetingsBody: [],
      employeeViolationsHeaders: ["Violation Name"],
      employeeViolationsBody: [],
      ideasHeaders: ["Startup Name", "Technology"],
      ideasBody: [], 
      input: "", 
      catInput: "", 
      mode:"Add Task", 
      categoryMode: "Add Column",
      editIndex: 0,
      editColumn: 0
  }
}

  // We change the text/behavior of our button depending on the mode
  submit() {
    if(this.state.mode != "Save Item"){
      console.log(this)

      var newItem = [this.state.input]
          for (let index = 0; index < this.state.currHeaders.length - 1; index++) {
            newItem.push("")
          }
  
      switch(this.state.currPage){
        case "Tasks":
          this.setState({ 
            input: "",
            tasksBody: [...this.state.tasksBody, 
                    newItem],
            currBody: [...this.state.currBody, 
              newItem]
          })
          break
        case "Customers":
          this.setState({ 
            input: "",
            customersBody: [...this.state.customersBody, 
                    newItem],
            currBody: [...this.state.currBody, 
              newItem]
          })
          break
        case "Meetings":
          this.setState({ 
            input: "",
            meetingsBody: [...this.state.meetingsBody, 
                    newItem],
            currBody: [...this.state.currBody, 
              newItem]
          })
          break
        case "Employee Violations":
          this.setState({ 
            input: "",
            employeeViolationsBody: [...this.state.employeeViolationsBody, 
                    newItem],
            currBody: [...this.state.currBody, 
              newItem]
          })
          break
        case "Ideas":
          this.setState({ 
            input: "",
            ideasBody: [...this.state.ideasBody, 
                    newItem],
            currBody: [...this.state.currBody, 
              newItem]
          })
          break
    }
    }
    else{
      document.getElementById("inputButton").className = "btn btn-primary"

      this.state.currBody[this.state.editIndex][this.state.editColumn] = this.state.input;
      
      var newBody = []

      for (let i = 0; i < this.state.currBody.length; i++) {
        newBody.push([]);
        for (let j = 0; j < this.state.currBody[i].length; j++) {
          newBody[i].push(this.state.currBody[i][j]);   
        } 
      }
      
      switch(this.state.currPage){
        case "Tasks":
          this.setState({ 
            mode: "Add Task",
            input: "",
            tasksBody: newBody
          })    
          break
        case "Customers":
          this.setState({ 
            mode: "Add Customer",
            input: "",
            customersBody: newBody
          })   
          break
        case "Meetings":
          this.setState({ 
            mode: "Add Meeting",
            input: "",
            meetingsBody: newBody
          })   
          break
        case "Employee Violations":
          this.setState({ 
            mode: "Add Violation",
            input: "",
            employeeViolationsBody: newBody
          })   
          break
        case "Ideas":
          this.setState({ 
            mode: "Add Idea",
            input: "",
            ideasBody: newBody
          })   
          break
    }
  }
}

  manipulateCategory(){

    if(this.state.categoryMode != "Save Column"){
    
    var newBody = []
    for (let index = 0; index < this.state.currBody.length; index++) {
      newBody.push([...this.state.currBody[index], ""])
    }
    
    console.log(newBody)
    switch(this.state.currPage){
      case "Tasks":
        console.log("Tasks")
        this.state.currHeaders.push(this.state.catInput)
        this.state.tasksHeaders.push(this.state.catInput)
        this.setState({ 
          catInput: "",
          tasksBody: newBody,
          currBody: newBody,
        })
        break
      case "Customers":
        debugger
        console.log("Customers")
        console.log(this.state.currHeaders)
        this.state.customersHeaders.push(this.state.catInput)
        console.log(this.state.currHeaders)
        this.state.currHeaders.push(this.state.catInput)
        console.log(this.state.currHeaders)
        this.setState({ 
          catInput: "",
          customersBody: newBody,
          currBody: newBody
        })
        break
      case "Meetings":
        console.log("Meetings")
        this.state.currHeaders.push(this.state.catInput)
        this.state.meetingsHeaders.push(this.state.catInput)
        this.setState({ 
          catInput: "",
          meetingsBody: newBody,
          currBody: newBody
        })
        break
      case "Employee Violations":
        console.log("Violations")
        this.state.currHeaders.push(this.state.catInput)
        this.state.employeeViolationsHeaders.push(this.state.catInput)
        this.setState({ 
          catInput: "",
          employeeViolationsBody: newBody,
          currBody: newBody
        })
        break
      case "Ideas":
        console.log("Ideas")
        this.state.currHeaders.push(this.state.catInput)
        this.state.ideasHeaders.push(this.state.catInput)
        this.setState({ 
          catInput: "",
          ideasBody: newBody,
          currBody: newBody
        })
        break
  }
}
else{
  // Create a new items list, modify the item at the edit index
  document.getElementById("categoryButton").className = "btn btn-primary"

  this.state.currHeaders[this.state.editIndex] = this.state.catInput;

  var newHeaders = [];
  for (let index = 0; index < this.state.currHeaders.length; index++) {
    newHeaders.push(this.state.currHeaders[index])
  }

  switch(this.state.currPage){
    case "Tasks":
      this.setState({ 
        categoryMode: "Add Column",
        catInput: "",
        tasksHeaders: newHeaders
      })    
      break
    case "Customers":
      this.setState({ 
        categoryMode: "Add Column",
        catInput: "",
        customersHeaders: newHeaders
      })  
      break
    case "Meetings":
      this.setState({ 
        categoryMode: "Add Column",
        catInput: "",
        meetingsHeaders: newHeaders
      }) 
      break
    case "Employee Violations":
      this.setState({ 
        categoryMode: "Add Column",
        catInput: "",
        employeeViolationsHeaders: newHeaders
      }) 
      break
    case "Ideas":
      this.setState({ 
        categoryMode: "Add Column",
        catInput: "",
        Ideas: newHeaders
      }) 
      break
  
  // Flip back to Add mode, set input textbox to blank,   
}
  console.log(this.state.currHeaders)
  }
}

  switchTopic(nextTopic){
    console.log(this)
    var tempPage = this.state.currPage
    this.state.prevPage = tempPage
    document.getElementById(this.state.prevPage).className = "nav-item"
    document.getElementById(nextTopic).className = "nav-item active"

    var newHeaders = []
    switch (nextTopic){
      case "Tasks":
        document.getElementById("title").innerHTML = "Dunder Mifflin Tasks"
        for (let index = 0; index < this.state.tasksHeaders.length; index++) {
          newHeaders.push(this.state.tasksHeaders[index])
        }
        this.setState({ 
          input: "",
          currBody: this.state.tasksBody,
          currHeaders: newHeaders,
          mode: "Add Task",
          currPage: nextTopic
        })
        break
      case "Customers":
        document.getElementById("title").innerHTML = "Dunder Mifflin Customers"
        for (let index = 0; index < this.state.customersHeaders.length; index++) {
          newHeaders.push(this.state.customersHeaders[index])
        }
        this.setState({ 
          input: "",
          currBody: this.state.customersBody,
          currHeaders: newHeaders,
          mode: "Add Customer",
          currPage: nextTopic
        })
        break
      case "Meetings":
        document.getElementById("title").innerHTML = "Dunder Mifflin Meetings"
        for (let index = 0; index < this.state.meetingsHeaders.length; index++) {
          newHeaders.push(this.state.meetingsHeaders[index])
        }
        this.setState({ 
          input: "",
          currBody: this.state.meetingsBody,
          currHeaders: newHeaders,
          mode: "Add Meeting",
          currPage: nextTopic
        })
        break
      case "Employee Violations":
        document.getElementById("title").innerHTML = "Dunder Mifflin Employee Violations"
        for (let index = 0; index < this.state.employeeViolationsHeaders.length; index++) {
          newHeaders.push(this.state.employeeViolationsHeaders[index])
        }
        this.setState({ 
          input: "",
          currBody: this.state.employeeViolationsBody,
          currHeaders: newHeaders,
          mode: "Add Violation",
          currPage: nextTopic
        })
        break
      case "Ideas":
        document.getElementById("title").innerHTML = "Dunder Mifflin Startups"
        for (let index = 0; index < this.state.ideasHeaders.length; index++) {
          newHeaders.push(this.state.ideasHeaders[index])
        }
        this.setState({ 
          input: "",
          currBody: this.state.ideasBody,
          currHeaders: newHeaders,
          mode: "Add Idea",
          currPage: nextTopic
        })
        break
    }
  }

  deleteCategory(delId){
    this.state.currHeaders.splice(delId, 1);
    for (let index = 0; index < this.state.currBody.length; index++) {
      this.state.currBody[index].splice(delId, 1)
    }

    var newHeaders = []

    switch(this.state.currPage){
      case "Tasks":
        for (let index = 0; index < this.state.currHeaders.length; index++) {
          newHeaders.push(this.state.currHeaders[index])
        }
        this.setState({ 
          tasksHeaders: newHeaders,
          tasksBody: this.state.currBody
        })
        break
      case "Customers":
        for (let index = 0; index < this.state.currHeaders.length; index++) {
          newHeaders.push(this.state.currHeaders[index])
        }
        this.setState({ 
          customersHeaders: newHeaders,
          customersBody: this.state.currBody
        })
        break
      case "Meetings":
        for (let index = 0; index < this.state.currHeaders.length; index++) {
          newHeaders.push(this.state.currHeaders[index])
        }
        this.setState({ 
          meetingsHeaders: newHeaders,
          meetingsBody: this.state.currBody
        })
        break
      case "Employee Violations":
        for (let index = 0; index < this.state.currHeaders.length; index++) {
          newHeaders.push(this.state.currHeaders[index])
        }
        this.setState({ 
          employeeViolationsHeaders: newHeaders,
          employeeViolationsBody: this.state.currBody
        })
        break
      case "Ideas":
        for (let index = 0; index < this.state.currHeaders.length; index++) {
          newHeaders.push(this.state.currHeaders[index])
        }
        this.setState({ 
          ideasHeaders: newHeaders,
          ideasBody: this.state.currBody
        })
        break
    }
  }

  delete(delId){
    this.state.currBody.splice(delId, 1);

    switch(this.state.currPage){
      case "Tasks":
        this.setState({ 
          tasksBody: this.state.currBody
        })
        break
      case "Customers":
        this.setState({ 
          customersBody: this.state.currBody
        })
        break
      case "Meetings":
        this.setState({ 
          meetingsBody: this.state.currBody
        })
        break
      case "Employee Violations":
        this.setState({ 
          employeeViolationsBody: this.state.currBody
        })
        break
      case "Ideas":
        this.setState({ 
          ideasBody: this.state.currBody
        })
        break
  }
}

  // Sets the list to edit mode
  editCategory(editID) {

    document.getElementById("categoryButton").className = "btn btn-success"
    // Get the item to edit itself from the items array based on the id, using 
    // find: https://www.w3schools.com/jsref/jsref_find.asp
    var editItem = this.state.currHeaders[editID]

    // Set input to the edit item text, set mode to Edit, set editIndex to be 
    // the index in the items array of the item we are editing (so we can 
    // easily modify the value later)
    this.setState({ 
      catInput: editItem,
      categoryMode: "Save Column",
      editIndex: editID
    })    
  } 

  edit(editRow, editColumn) {

    // Get the item to edit itself from the items array based on the id, using 
    // find: https://www.w3schools.com/jsref/jsref_find.asp
    document.getElementById("inputButton").className = "btn btn-success"

    var editItem = this.state.currBody[editRow][editColumn]

    // Set input to the edit item text, set mode to Edit, set editIndex to be 
    // the index in the items array of the item we are editing (so we can 
    // easily modify the value later)
    this.setState({ 
      input: editItem,
      mode: "Save Item",
      editIndex: editRow,
      editColumn: editColumn
    })    
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
                <li class="nav-item active" id="Tasks">
                 <a class="nav-link" onClick={this.switchTopic.bind(this, "Tasks")}>Tasks</a>
                </li>
                <li class="nav-item" id="Customers">
                 <a class="nav-link" onClick={this.switchTopic.bind(this, "Customers")}>Customers</a>
                </li>
                <li class="nav-item" id="Meetings">
                 <a class="nav-link" onClick={this.switchTopic.bind(this, "Meetings")}>Meetings</a>
                </li>
                <li class="nav-item" id="Employee Violations">
                 <a class="nav-link" onClick={this.switchTopic.bind(this, "Employee Violations")}>Employee Violations</a>
                </li>
                <li class="nav-item" id="Ideas">
                 <a class="nav-link" onClick={this.switchTopic.bind(this, "Ideas")}>Ideas</a>
                </li>
              </ul>
              </div>
          </nav>
        <div class="col-lg-12" style={{marginTop: '25px'}}>
          <h3 id="title" style={{marginBottom: '25px'}}>Dunder Mifflin Task List</h3>
        <input type="text" 
               onChange={(event) => this.setState({input: event.target.value})}
               value={this.state.input}
               style={{height: '38px', width: '250px'}}
               placeholder="Enter the name of the item to add" />
        <button onClick={this.submit.bind(this)} class="btn btn-primary" id="inputButton" style={{marginBottom: '6px'}}>{this.state.mode}</button> 
        <input type="text" 
               onChange={(event) => this.setState({catInput: event.target.value})}
               value={this.state.catInput} 
               style={{marginLeft: '30px', height: '38px', width: '270px'}}
               placeholder="Enter the name of the column to add"/>
        <button onClick={this.manipulateCategory.bind(this)} class="btn btn-primary" id="categoryButton" style={{marginBottom: '6px'}}>{this.state.categoryMode}</button> 
           <table class="table table-hover" style={{marginTop: '40px'}}>
             <thead>
               <tr>
             {this.state.currHeaders.map( 
            (item, index) => 
              <th key={index} style={{wordWrap: 'break-word', minWidth: '164px', maxWidth: '292px'}}>
                <p>{item}</p>
                {index == 0 ? <div class="row" style={{marginLeft: '0px'}}></div>
                :
                <div class="row" style={{marginLeft: '0px'}}>
                  <button class="btn btn-primary" onClick={this.editCategory.bind(this,index)}>Edit</button> 
                  <button class="btn btn-danger" onClick={this.deleteCategory.bind(this,index)} style={{marginLeft: '5px'}}>Delete</button> 
                </div>}
              </th> )}
              <th></th>
              </tr>
             </thead>
             <tbody>
                {this.state.currBody.map(
                  (item, index) =>
                    <tr>
                    {
                      item.map(
                        (item, id) =>
                        <td style={{wordWrap: 'break-word', minWidth: '164px', maxWidth: '292px'}}>
                          <p>{item}</p>
                          <div class="row" style={{marginLeft: '-15px'}}>
                            <button class="btn btn-primary" onClick={this.edit.bind(this,index, id)} style={{marginLeft: '15px'}}>Edit </button> 
                          </div>
                        </td>
                      )
                    }
                    <td key={index}>
                      <button class="btn btn-danger" onClick={this.delete.bind(this,index)}> Delete </button> 
                    </td>
                    </tr>
                )
                }
             </tbody>
           </table>
              </div>
        </div>
    )
  }

};

export default App;
