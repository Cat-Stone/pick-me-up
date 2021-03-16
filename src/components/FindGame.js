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
      games: []
    };

    this.joinGame = this.joinGame.bind(this);
  };

  componentDidMount(){
    this.props.loadOpenGames();
    this.props.loadRequests();
  };
  
  async joinGame(gameId){
    const joiningPlayer = (await axios.get('/api/users/13')).data;
    await axios.post('')
  };
  
  render(){
    const { games, users, allRequests } = this.props;
    const { getPlayers } = this;
    
    return (
      <div>
        <div>
          <h1>{games.length} Games are currently open</h1>
        </div>
        <div>
          {
            games.map(game => {
              const players = game.users;
                return (
                  <div key={game.id} >
                    <GameCard game={game} players={players} openGame={true}/>
                    <div>
                      <button onClick={()=>this.joinGame(game.id)}>Join this game</button>
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

const mapState = ({games, requests, users}) => {
  return {
    games,
    users: users.all,
    allRequests: requests.all
  }
};

const mapDispatch = dispatch => {
  return {
    loadOpenGames: ()=> dispatch(loadOpenGames()),
    loadRequests: ()=> dispatch(loadRequests()),
    createRandomUser: ()=> dispatch(createRandomUser()),
    createUserGame: (gameId)=> dispatch(create(gameId))
  }
};


export default connect(mapState, mapDispatch)(FindGame);

