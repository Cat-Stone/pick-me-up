import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGames } from '../store/games';
import { createRandomUser } from '../store/users';
import { loadRequests, createRequest } from '../store/requests';
import axios from 'axios';

class FindGame extends Component{
  constructor(){
    super();
    this.state = {
    };

    this.joinGame = this.joinGame.bind(this);
  };

  componentDidMount(){
    this.props.loadOpenGames();
  };
  

  // componentDidUpdate(prevProps){
  //   if (prevProps.games !== this.props.games){
  //     this.props.loadOpenGames();
  //   }
  // }
  
  async joinGame(gameId){
    // using a fixed user Id to simulate logged-in user. UPDATE W/LOGGED-IN USERID WHEN AUTH IS CONNECTED TO STORE
    await axios.post('/api/user_games', { gameId: gameId, userId: 13 });
    // loading open games here seems to work as apposed to calling on compDidUp .. not sure why compDidUp had issues
    this.props.loadOpenGames();
  };

  async checkIfGameExpired(game){
    if(game.time * 1 >= Date.now() * 1){
      await game.update({
        open: false
      })
    }
  }
  
  render(){
    const { games } = this.props;
    const { joinGame, checkIfGameExpired } = this;
    
    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
        </div>
        <div>
          {
            games.map(game => {
              checkIfGameExpired(game);
              const players = game.users;
                return (
                  <div key={game.id} >
                    <GameCard game={game} players={players} openGame={true}/>
                    <div>
                      <button onClick={()=>joinGame(game.id)}>Join this game</button>
                    </div>
                  </div>
                )
            })
          }
        </div>
      </div>
    );
  }
};

const mapState = ({ games, users }) => {
  return {
    games,
    users: users.all
  }
};

const mapDispatch = dispatch => {
  return {
    loadOpenGames: ()=> dispatch(loadOpenGames())
  }
};


export default connect(mapState, mapDispatch)(FindGame);

