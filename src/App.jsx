/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/ }
  const traveller = props.traveller;
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toDateString()}</td>
    </tr>
  );
}

function Display(props) {
  
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellerRows = props.travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellerRows}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    this.props.bookTraveller({
      name: form.travellername.value, phone: form.phone.value,
      bookingTime: new Date(),
    });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="number" name="phone" placeholder="phone" />
        <button type="submit">Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    this.props.deleteTraveller({
      name: form.travellername.value,
    });
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button type="submit">Delete</button>
      </form>
    );
  }
}

function Seat(props) {
  const seatid = props.seatid;
  const seatStyle={
    backgroundColor: props.occupiednum<seatid? 'green' : 'grey',
  };
  return (
    <button style={seatStyle}>{seatid}</button>
  );
}

class Homepage extends React.Component {
	constructor() {
	super();
  }
  renderSeat() {
    const seatnum = 10;
    const occupiednum = this.props.ordernum;
    const seatlist = [];
    for (let i = 1; i <= seatnum; i++) {
      seatlist.push(<Seat key={i} seatid={i} occupiednum={occupiednum} />);
    }
    return seatlist;
  }
	render(){
	return (
	<div>
      {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
      <h2>Free Seats</h2>
      <div>
        {this.renderSeat()}
      </div>
  </div>
  );
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({selector: value});
    
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    const newTravellers = this.state.travellers.slice();
    const lastTraveller = newTravellers[newTravellers.length - 1];
    const newId = lastTraveller ? lastTraveller.id + 1 : 1;
    newTravellers.push({
      id: newId,
      name: passenger.name,
      phone: passenger.phone,
      bookingTime: passenger.bookingTime,
    });
    this.setState({ travellers: newTravellers });
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const newTravellers = this.state.travellers.slice();
    const index = newTravellers.findIndex(traveller => traveller.name === passenger.name);
    if (index >= 0) {
      newTravellers.splice(index, 1);
      this.setState({ travellers: newTravellers });
    }
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
            <nav>
              <button onClick={() => this.setSelector(1)}>Homepage</button>
              <button onClick={() => this.setSelector(2)}>displayTraveller</button>
              <button onClick={() => this.setSelector(3)}>addTraveller</button>
              <button onClick={() => this.setSelector(4)}>deleteTraveller</button>
            </nav>
          
	      </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 1 && <Homepage ordernum={this.state.travellers.length} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
