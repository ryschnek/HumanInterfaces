import React from 'react';
import { HashRouter as Router, NavLink, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import {Container,Navbar,Nav,NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import picture from './1.jpg';
// Install the socket io client using:
//    npm install socket.io
//
// Then import socket io and create a socket:
//
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
//
// See: https://socket.io/get-started/chat
//      https://www.npmjs.com/package/socket.io-client

class LiveFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEventFilters: false,
      showPriorityFilters: false,
      filterFire: true,
      filterFlood: true,
      filterPower: true,
      filterMedical: true,
      filterLow: true,
      filterMedium: true,
      filterHigh: true,
      filterCritical: true};
  }

  showEventFilters(){ 
    
    if(this.state.showEventFilters == false){
      document.getElementById("eventFilter").style.display = "";
      document.getElementById("eventFilterButton").innerText = "Hide Event Filters";
      this.state.showEventFilters = true;
    } 
    
    else{
      document.getElementById("eventFilter").style.display = "none";
      document.getElementById("eventFilterButton").innerText = "Show Event Filters";
      this.state.showEventFilters = false;
    }
}

showPriorityFilters(){ 
    
  if(this.state.showPriorityFilters == false){
    document.getElementById("priorityFilter").style.display = "";
    document.getElementById("priorityFilterButton").innerText = "Hide Priority Filters";
    this.state.showPriorityFilters = true;
  } 
  
  else{
    document.getElementById("priorityFilter").style.display = "none";
    document.getElementById("priorityFilterButton").innerText = "Show Priority Filters";
    this.state.showPriorityFilters = false;
  }
}

flipFire() { this.setState({filterFire: !this.state.filterFire  }); }

flipFlood() { this.setState({filterFlood: !this.state.filterFlood  }); }

flipPower() { this.setState({filterPower: !this.state.filterPower  }); }

flipMedical() { this.setState({filterMedical: !this.state.filterMedical  }); }

flipLow() { this.setState({filterLow: !this.state.filterLow  }); }

flipMedium() { this.setState({filterMedium: !this.state.filterMedium  }); }

flipHigh() { this.setState({filterHigh: !this.state.filterHigh   }); }

flipCritical() { this.setState({filterCritical: !this.state.filterCritical   }); }

like(id){
  if(document.getElementById("like" + id).style.color == "white"){
    document.getElementById("like" + id).style.color = "blue"
  }
  else{
    document.getElementById("like" + id).style.color = "white"
  }
}

retweet(id){
  if(document.getElementById("retweet" + id).style.color == "white"){
    document.getElementById("retweet" + id).style.color = "green"
  }
  else{
    document.getElementById("retweet" + id).style.color = "white"
  }
}

favourite(id){
  if(document.getElementById("favourite" + id).style.color == "white"){
    document.getElementById("favourite" + id).style.color = "red"
  }
  else{
    document.getElementById("favourite" + id).style.color = "white"
  }
}
  render() {

    var toshow = this.props.posts;

        // if the checkbox is checked, filter for only even numbers... style={{size: '50%', marginLeft: 'auto', marginRight: 'auto'}}
    if (!this.state.filterFire) toshow = toshow.filter( x => x.problem != "Fire" );

    if (!this.state.filterFlood) toshow = toshow.filter( x => x.problem != "Flood" );

    if (!this.state.filterPower) toshow = toshow.filter( x => x.problem != "Power" );

    if (!this.state.filterMedical) toshow = toshow.filter( x => x.problem != "Medical" );

    if (!this.state.filterLow) toshow = toshow.filter( x => x.priority != "Low" );

    if (!this.state.filterMedium) toshow = toshow.filter( x => x.priority != "Medium" );

    if (!this.state.filterHigh) toshow = toshow.filter( x => x.priority != "High" );

    if (!this.state.filterCritical) toshow = toshow.filter( x => x.priority != "Critical" );

    return (
        <div>
          <div class="col-lg-12" style={{marginLeft: '10px'}}>
          <h2 style={{marginTop: '25px'}}>LiveFeed</h2>
          </div>

        <div class="row" style={{marginBottom: '25px'}}>
        <div class="col-lg-3"></div>
        <div class="col-lg-2">

        <button onClick={this.showEventFilters.bind(this)} class="btn btn-primary" style={{marginTop: '25px'}} id="eventFilterButton">Show Event Filters</button> 

       

        <div id="eventFilter" style={{display: 'none', marginLeft: '-60px'}}>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipFire" checked={this.state.filterFire} 
                   onChange={this.flipFire.bind(this)} />
          <label class="form-check-label" for="filterFire">Fire</label>
        </div>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipFlood" checked={this.state.filterFlood} 
                   onChange={this.flipFlood.bind(this)} />
          <label class="form-check-label" for="filterFlood">Flood</label>
        </div>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipPower" checked={this.state.filterPower} 
                   onChange={this.flipPower.bind(this)} />
          <label class="form-check-label" for="filterPower">Power</label>
        </div>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipMedical" checked={this.state.filterMedical} 
                   onChange={this.flipMedical.bind(this)} />
          <label class="form-check-label" for="filterMedical">Medical</label>
        </div>
        </div>
        </div>
        
        <div class="col-lg-2"></div>
        <div class="col-lg-4">
        <button onClick={this.showPriorityFilters.bind(this)} class="btn btn-primary" style={{marginTop: '25px', marginLeft: '10%'}} id="priorityFilterButton">Show Priority Filters</button> 
        <div id="priorityFilter" class="row" style={{display: 'none', marginLeft: '0px'}}>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipLow" checked={this.state.filterLow} 
                   onChange={this.flipLow.bind(this)} />
          <label class="form-check-label" for="filterLow">Low</label>
        </div>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipMedium" checked={this.state.filterMedium} 
                   onChange={this.flipMedium.bind(this)} />
          <label class="form-check-label" for="filterMedium">Medium</label>
        </div>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipHigh" checked={this.state.filterHigh} 
                   onChange={this.flipHigh.bind(this)} />
          <label class="form-check-label" for="filterHigh">High</label>
        </div>

        <div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="flipCritical" checked={this.state.filterCritical} 
                   onChange={this.flipCritical.bind(this)} />
          <label class="form-check-label" for="filterCritical">Critical</label>
        </div>
        </div>
        </div>
        </div>

          {toshow.map( 
          ({name,image,content,problem,priority,id}) => 
            <div key={id} class="card bg-dark text-white" style={{width: '40%'}}>
              <img class="card-img-top" src={image} alt="{name}" />
              <div class="card-body">
              <h4 class="card-title">{name}</h4>
              <p class="card-title">{problem}</p>
              <p class={"card-title " + priority} >{priority}</p>
              <p class="card-text">{content}</p>
              <a style={{color: "white"}} onClick={this.like.bind(this, id)} id={"like" + id}><i class="fa fa-thumbs-up fa-2x"></i></a>
              <a style={{marginLeft: '25px', color: "white"}} onClick={this.retweet.bind(this, id)} id={"retweet" + id}><i class="fa fa-retweet fa-2x"></i></a>
              <a style={{marginLeft: '25px', color: "white"}} onClick={this.favourite.bind(this, id)} id={"favourite" + id}><i class="fa fa-heart fa-2x"></i></a>
             </div>
            </div>
          )}
        </div>
    );
  }
}

class Analytics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lowFire: 0,
      mediumFire: 0,
      highFire: 0,
      criticalFire: 0,
      lowFlood: 0,
      mediumFlood: 0,
      highFlood: 0,
      criticalFlood: 0,
      lowPower: 0,
      mediumPower: 0,
      highPower: 0,
      criticalPower: 0,
      lowMedical: 0,
      mediumMedical: 0,
      highMedical: 0,
      criticalMedical: 0,
      lowTotal: 0,
      mediumTotal: 0,
      highTotal: 0,
      criticalTotal: 0,
      totalFire: 0,
      totalFlood: 0,
      totalPower: 0,
      totalMedical: 0,
      total: 0 };
  }

  render() {
    var posts = this.props.posts;

    for(var i = this.state.total; i < posts.length; ++i){
      this.state.total++;

      if(posts[i].priority == "Low"){
          this.state.lowTotal++;

          if(posts[i].problem == "Fire"){
             this.state.lowFire++;
             this.state.totalFire++;
          }
          else if(posts[i].problem == "Flood"){
            this.state.lowFlood++;
            this.state.totalFlood++;
          }
          else if(posts[i].problem == "Power"){
            this.state.lowPower++;
            this.state.totalPower++;
          }
          else{
            this.state.lowMedical++;
            this.state.totalMedical++;
          }
      }
      else if(posts[i].priority == "Medium"){
        this.state.mediumTotal++;

        if(posts[i].problem == "Fire"){
           this.state.mediumFire++;
           this.state.totalFire++;
        }
        else if(posts[i].problem == "Flood"){
          this.state.mediumFlood++;
          this.state.totalFlood++;
        }
        else if(posts[i].problem == "Power"){
          this.state.mediumPower++;
          this.state.totalPower++;
        }
        else{
          this.state.mediumMedical++;
          this.state.totalMedical++;
        }
    }
    else if(posts[i].priority == "High"){
      this.state.highTotal++;

      if(posts[i].problem == "Fire"){
         this.state.highFire++;
         this.state.totalFire++;
      }
      else if(posts[i].problem == "Flood"){
        this.state.highFlood++;
        this.state.totalFlood++;
      }
      else if(posts[i].problem == "Power"){
        this.state.highPower++;
        this.state.totalPower++;
      }
      else{
        this.state.highMedical++;
        this.state.totalMedical++;
      }
  }
  else{
    this.state.criticalTotal++;

    if(posts[i].problem == "Fire"){
      this.state.criticalFire++;
      this.state.totalFire++;
    }
    else if(posts[i].problem == "Flood"){
      this.state.criticalFlood++;
      this.state.totalFlood++;
    }
    else if(posts[i].problem == "Power"){
      this.state.criticalPower++;
      this.state.totalPower++;
    }
    else{
      this.state.criticalMedical++;
      this.state.totalMedical++;
    }
}
      
          
  }
    return (
        <div>
           <div class="col-lg-12" style={{marginLeft: '10px'}}>
          <h2 style={{marginTop: '25px'}}>Analytics</h2>
          </div>

          <table class="table table-hover" style={{marginTop: '25px'}}>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Fire</th>
      <th scope="col">Flood</th>
      <th scope="col">Power</th>
      <th scope="col">Medical</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
      <tr class="table-success">
      <td scope="row">Low</td>
      <td scope="col">{this.state.lowFire}</td>
      <td scope="col">{this.state.lowFlood}</td>
      <td scope="col">{this.state.lowPower}</td>
      <td scope="col">{this.state.lowMedical}</td>
      <td scope="col">{this.state.lowTotal}</td>
      </tr>
      <tr class="table-info">
      <td scope="row">Medium</td>
      <td scope="col">{this.state.mediumFire}</td>
      <td scope="col">{this.state.mediumFlood}</td>
      <td scope="col">{this.state.mediumPower}</td>
      <td scope="col">{this.state.mediumMedical}</td>
      <td scope="col">{this.state.mediumTotal}</td>
      </tr>
      <tr class="table-warning">
      <td scope="row">High</td>
      <td scope="col">{this.state.highFire}</td>
      <td scope="col">{this.state.highFlood}</td>
      <td scope="col">{this.state.highPower}</td>
      <td scope="col">{this.state.highMedical}</td>
      <td scope="col">{this.state.highTotal}</td>
      </tr>
      <tr class="table-danger">
      <td scope="row">Critical</td>
      <td scope="col">{this.state.criticalFire}</td>
      <td scope="col">{this.state.criticalFlood}</td>
      <td scope="col">{this.state.criticalPower}</td>
      <td scope="col">{this.state.criticalMedical}</td>
      <td scope="col">{this.state.criticalTotal}</td>
      </tr>
      <tr>
      <td scope="row">Total</td>
      <td scope="col">{this.state.totalFire}</td>
      <td scope="col">{this.state.totalFlood}</td>
      <td scope="col">{this.state.totalPower}</td>
      <td scope="col">{this.state.totalMedical}</td>
      <td scope="col">{this.state.total}</td>
      </tr>
  </tbody>
</table>
        </div>
    );
  }
}

class Home extends React.Component {

  like(id){
    if(document.getElementById("like" + id).style.color == "white"){
      document.getElementById("like" + id).style.color = "blue"
    }
    else{
      document.getElementById("like" + id).style.color = "white"
    }
  }
  
  retweet(id){
    if(document.getElementById("retweet" + id).style.color == "white"){
      document.getElementById("retweet" + id).style.color = "green"
    }
    else{
      document.getElementById("retweet" + id).style.color = "white"
    }
  }
  
  favourite(id){
    if(document.getElementById("favourite" + id).style.color == "white"){
      document.getElementById("favourite" + id).style.color = "red"
    }
    else{
      document.getElementById("favourite" + id).style.color = "white"
    }
  }

  render() {
    return (
        <div>
           <div class="col-lg-12" style={{marginLeft: '10px'}}>
          <h2 style={{marginTop: '25px'}}>Home</h2>
          </div>

          <div style={{marginLeft: '25px', marginTop: '25px'}}>
          <p>Hello welcome to my react application for assignment 4.</p>

          <p>You are currently on the home page for the application.</p>

          <p>If you switch to the livefeed page you will see social media messages that look like:</p>

          <div class="card bg-dark text-white" style={{width: '40%'}}>
              <img class="card-img-top" src={picture} />
              <div class="card-body">
              <h4 class="card-title">The name of the person</h4>
              <p class="card-title">The problem that the person is having</p>
              <p class={"card-title"} >The priority name and color of their problem (green for low, yellow for medium, orange for high, red for critical)</p>
              <p class="card-text">The content of their message</p>
              <p class="card-text">Reactions that you can add to their message (you may like the message, repost the message, or favourite the message)</p>
              <a style={{color: "white"}} onClick={this.like.bind(this, 1)} id={"like1"}><i class="fa fa-thumbs-up fa-2x"></i></a>
              <a style={{marginLeft: '25px', color: "white"}} onClick={this.retweet.bind(this, 1)} id={"retweet1"}><i class="fa fa-retweet fa-2x"></i></a>
              <a style={{marginLeft: '25px', color: "white"}} onClick={this.favourite.bind(this, 1)} id={"favourite1"}><i class="fa fa-heart fa-2x"></i></a>
             </div>
            </div>

          <p>If you choose to expand the filter menus you will be able to access the filters in order to filter the posts you see in the feed by priority or by problem.</p>

          <p>On the analytics page you will see a table with the columns being the different problem categories and the rows are the different priorities.</p>
          <p>You are also able to view the total number of messages for each of the priorities and each of the problems.</p>
          <p>The rows on the analytics page are also color coded to the priority with low being green, medium being blue, high being yellow, and critical being red.</p>
          </div>
        </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    // An array of social media posts messages, and we'll increment nextID
    // to maintain a unique ID for each post in our array
    this.state = {posts: [],nextID: 0};

    // We can setup the event handlers for the messages in the constructor...
    socket.on('connect', function(){

      console.log("Connect....");

      // When we receive a social media message, call setState and insert 
      // it into the array of posts
      socket.on('post', 

        function(data) {

          // Can uncomment this to see the raw data coming in...
          // console.log("post: " + JSON.stringify(data));

          // increment the next unique ID, and put post data into the list of 
          // posts... use the '...' syntax to make this insertion easier:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
          this.setState( 
            {posts: [...this.state.posts,
                     {name: data.name, 
                      image: data.image, 
                      content: data.content, 
                      problem: data.problem,
                      priority: data.priority,
                      id: this.state.nextID}]
            ,nextID: this.state.nextID + 1} );
        }.bind(this));
        // ^^ Like other event handlers, we bind the callback function to the 
        // component so we can use setState        

    }.bind(this));
    // ^^ ... And same with the callback function for when a connection is made

  }

  // Output all the posts into a table
  render() {
    return (
      <div>
        <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <NavItem eventkey={1} href="/home">
                  <Nav.Link as={NavLink} to="/home" >Home</Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/livefeed">
                  <Nav.Link as={NavLink} to="/livefeed" >LiveFeed</Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/analytics">
                  <Nav.Link as={NavLink} to="/analytics" >Analytics</Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
            
              <Route path='/home' component={Home} />
              <Route path='/livefeed' render={(props) => <LiveFeed {...props} posts={this.state.posts}/> }/>
              <Route path='/analytics' render={(props) => <Analytics {...props} posts={this.state.posts}/> } />
              <Redirect exact from="/" to="home" />
            </Router>
      </div>
    );
  }
}

export default App;
