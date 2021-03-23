import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {createRequest} from '../store/requests'
import {loadUser} from '../store/users'
import CourtMap from './CourtMap'



const API_TOKEN = '49zH6hsPdt4lqmDwRRaoAvIfH'


export class RequestForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      zipcode: '',
      showCourts: false,
      courts: [],
      chosenCourt: '',
      date: '',
      time: '',
      finished: false
    }
    this.handleInputs = this.handleInputs.bind(this)
    this.courtSubmit = this.courtSubmit.bind(this)
    this.submitRequest = this.submitRequest.bind(this)
  }
  componentDidMount(){
    // this.props.loadUser()
  }

  handleInputs(ev){
    const {name, value} = ev.target
    this.setState({[name] : value})
  }
  async courtSubmit(ev){
    ev.preventDefault()
    const courts =  (await axios.get(`https://data.cityofnewyork.us/resource/9wwi-sb8x.json?$$app_token=${API_TOKEN}&basketball=Yes&zipcode=${this.state.zipcode}`)).data
    console.log(courts)
    this.setState({courts: courts, showCourts: true})
  }
  async submitRequest(ev){
    ev.preventDefault()
    // const user = this.props.user
    const user = (await axios.get('/api/users/13')).data
    const game = {
      location: this.state.chosenCourt,
      // time: new Date(this.state.time).getTime(),
      dateAndTime: this.state.date,
      open: true,
      winner: 'tbd',
      finalScore: 'tbd',
      done: false,
      host: user.id
    }
    const alerts = []
    for(const [key,val] of Object.entries(game)){
        if(val === ''){
            alerts.push(key)
        }
    }
    if(alerts.length > 0){
        const string = alerts.reduce((acc,item)=>{
            acc += `${item}\n`
            return acc
        },'Please fill out the following:\n')
        alert(string)
    }
    if(alerts.length === 0){
      const newGame = (await axios.post('/api/games', game)).data
      await axios.post('/api/user_games', { gameId: newGame.id, userId: user.id });
      this.setState({finished: true})

  }
  }
  render(){
    if(!this.state.finished){
      return(
        <div id='requestBox'>
          <h1>Pick Up a Game</h1>
          <h2>Pull name and display here</h2>
          <form>
            {!this.state.showCourts ? (
              <div>
                <label htmlFor='zipcode'>Zipcode:</label>
                <input type="text" id="zipcode" name="zipcode" onChange={this.handleInputs}/>
                <button onClick={this.courtSubmit}>Find Courts</button>
              </div>
            ) : (
              <div className='courtFinder'>
                <div className= 'courtForm'>
                  <label htmlFor='court'>Court:</label>
                  <select onChange={this.handleInputs} name='chosenCourt'>
                    <option>Select One</option>
                    {this.state.courts.map((court, idx)=>{
                      return(<option key={idx} value={`Court ${idx}`} >Court: {idx +1}</option>)
                    })}
                  </select>
                  {/* Jason- changed Game model to take date and time as game.dateAndTime and use that to calculate milliseconds for game.time so we can expire old games */}
                  <label htmlFor='date'>Date and Time:</label>
                  <input type="dateTime-local" id="date" name="date" onChange={this.handleInputs}/>
                  {/* <label htmlFor='time'>Time:</label>
                  <input type="datetime-local" id="time" name="time" min="06:00" max="20:00" onChange={this.handleInputs}/> */}
                  <button onClick={this.submitRequest}>Pick Up!</button>
                </div>
                <div className='courtMap'>
                  <CourtMap courts={this.state.courts}/>
                </div>
              </div>
            )}
          </form>
        </div>
      )
    }else{
      return(
        <div>
          <h1>Game Created!</h1>
        </div>
      )
    }
  }
}

const mapState = ({ user }) => {
  return {
    user
  }
}

const mapDispatch = dispatch => {
  return {
    createRequest: (request)=> dispatch(createRequest(request)),
    loadUser: ()=>dispatch(loadUser())
  }
}

export default connect(mapState, mapDispatch)(RequestForm)