

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroyGame, updateGame, loadHostedGames, loadSingleGame } from '../store/';
import moment from 'moment';
import axios from 'axios';

//this will list the games a user is hosting, they will be able to update the time, location, delete the game
//they will also be able to add a winner and update the score, not sure if these two things should be seperated out 
//so for finished games you can update the score but for games not started you can change time and such, that would be better but first I will 
//just let you change everything 

export class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.games.single.id ? this.props.games.single.id : '',
      location: this.props.games.single.location ? this.props.games.single.location : '',
      dateAndTime: this.props.games.single.dateAndTime ? this.props.games.single.dateAndTime : '',
      time: this.props.games.single.time ? this.props.games.single.time : '',
      finalScore: this.props.games.single.finalScore ? this.props.games.single.finalScore : '',
      winner: this.props.games.single.winner ? this.props.games.single.winner : '',
      done: this.props.games.single.done ? this.props.games.single.done : '',
      maxPlayerCount: this.props.games.single.maxPlayerCount ? this.props.games.single.maxPlayerCount : '',
      error: ''
  };

  this.onChange = this.onChange.bind(this);
  this.onSave = this.onSave.bind(this);
}

componentDidMount(prevProps){

  const gameId = this.props.location.pathname.slice(7) * 1;
  
  console.log(this.props.location.pathname.slice(7));
  // console.log(prevProps);
  this.props.bootstrap(gameId);
  console.log(this.props);
  
 
}

componentDidUpdate(prevProps, prevState){
  // console.log(this.props);
  console.log(prevProps);
  console.log(this.props);

  console.log(prevState);
  console.log(this.state.id);
  console.log(this.props.games.single.id)
  const gameId = this.props.location.pathname.slice(7) * 1;
  this.props.bootstrap(gameId)
  //not catching it when  
  if (this.props.games.single.id * 1 !== prevState.id * 1 ){
   
      console.log(this.props.games.single);
      this.setState({ id: this.props.games.single.id, 
        location: this.props.games.single.location, 
        dateAndTime: this.props.games.single.dateAndTime, 
        time: this.props.games.single.time, 
        finalScore: this.props.games.single.finalScore, 
        winner: this.props.games.single.winner, 
        done: this.props.games.single.done,
        maxPlayerCount: this.props.games.single.maxPlayerCount });
    }
}

componentWillUnmount(){
  console.log('uuuuuuuuuuuuuuuuuuuuuuuuuu')
  // this.setState({ id: ''})
  // this.state.id = ''
}

onChange(ev){
  const change = {};
  change[ev.target.name] = ev.target.value;
  this.setState(change);
}
async onSave(ev){
  ev.preventDefault();
  
  try {
     
    await this.props.update(this.props.games.single.id, this.state);
      
  }
  catch(ex){
      // console.log(ex);
      this.setState({ error: ex.response});
  }
  this.setState({ id: '' }); 
}

  render(){
    const { destroy } = this.props;
    // console.log(this.props.games.single);
    const game = this.props.games.single;
    const { location, finalScore, error, winner, maxPlayerCount } = this.state;
    let { dateAndTime } = this.state;
    const { onChange, onSave} = this;
    // console.log(this.state)
    //for some reason there ar strange end characters being added to the date and time 
    // this is a temporary way of dealing with them :)
    dateAndTime = dateAndTime.slice(0, 16);

    let willPlay = true;
    if(Date.now() > game.time * 1){
      willPlay = false;
    } 
        
    return (
        <div>
          <form onSubmit = { onSave }>
            <pre>
                {
                    !!error && JSON.stringify(error, null, 2)
                }
            </pre>
            {willPlay ? (
              <div className='container'>
                <h4>This Game will be played on :</h4>
                {/* ideally this would bring up the map again not a clue how to do that might ask Taylor */}
                <p>Location</p>  
                <input name='location' value={ location } onChange = { onChange }/>
                <br/>
                <p>Max number of players</p>  
                <input name='maxPlayerCount' value={ maxPlayerCount } onChange = { onChange }/>
                <br/>
                <label htmlFor='date'>Date and Time:</label>
                <br/>
                {/* Time is a pain, there is a weird extra character on ours */}
                <input type="dateTime-local" value={ dateAndTime } name="dateAndTime" onChange={ onChange }/>   
                <br/>
                <h4>Please change the Time or Location</h4>
                <button disabled = { !location || !dateAndTime || !maxPlayerCount } >SAVE</button>
                <br/>
                {/* <button onClick={()=>destroy(game)}>delete this game</button> */}
              </div> 

            ) :  (
              
              <div className='container'>
                <h4>This game was played on: </h4> 
                <h4>Date: { moment(game.dateAndTime).format('MMM D, YYYY') }</h4>
                <h4>Time: { moment(game.dateAndTime).format('h:mm a') }</h4>
                <h4>number of players: {game.users ? game.users.length : 0}</h4>               
                <h4>Please update the final score and winner: </h4> 
                
                <p>Final Score</p> 
                {/* would be better if there was error checking */}
                <input name='finalScore' value={ finalScore } onChange = { onChange }/>
                <br/>
                {/* will make this a drop down menu of just TEAM A and TEAM B for the moment */}
                <p>Winner</p> 
                {/* <input name='winner' value={ winner } onChange = { onChange }/> */}
                <select name='winner' value={ winner } onChange = { onChange }>
                    {/* so this need to be linked with the the actual schools and I need to figure 
                    out how to do the update but one step at a time */}
                    <option value = ''>How won??</option>
                    <option value = 'TEAM A'>TEAM A</option>
                    <option value = 'TEAM B'>TEAM B</option>
                </select>
                <button disabled = { !finalScore || !winner }>SAVE</button>
                <br/>
                {/* <button onClick={()=>destroy(game)}>delete this game</button> */}
              </div>
            )  }
          </form>
          <div className='container'>
          <h4>This will permanately delete your game</h4>  
          <button onClick={()=>destroy(game)}>delete this game</button>
          </div>         
        </div>            
    );
 
  }
}

const mapStateToProps = ( state ) => {
  return state;
}

const mapDispatchToProps = (dispatch, { history, match }) => {
  // console.log(match.params.id)
  return {
    destroy: (game)=> {
      dispatch(destroyGame(game, history));
      // console.log(game)
    },
    update: (id, state)=> {
      // console.log('hi');
     
      dispatch(updateGame(id, state, history));
    },
    bootstrap: (gameId)=> {
      dispatch(loadSingleGame(gameId));
    }  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

