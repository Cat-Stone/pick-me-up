import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadOpenGamesForUser } from '../store/games';
import axios from 'axios';

class MyGames extends Component{
  constructor(){
    super();

    this.leaveGame = this.leaveGame.bind(this);
  };

  componentDidMount(){
    this.props.loadOpenGamesForUser(this.props.user.id);
    // console.log(this.props.user.id)
  };
  
  
  async leaveGame(game){
    await axios.delete('/api/user_games', { gameId: game.id, userId: this.props.user.id });
    this.props.loadOpenGamesForUser(this.props.user.id);
  };

  
  render(){
    const { games, user } = this.props;
    console.log('games', games)
    const { leaveGame } = this;
    
    return (
      <div>
        <div>
          {
            games.length > 0 ? (
              <h1>You have {games.length} upcoming games!</h1>
            ) : (
              <h1>You have no upcoming games.</h1>
            )
          }
        </div>
        <div>
          {
            games.map(game => {
              const players = game.users;

              return (
                <div key={game.id} >
                  <GameCard game={game} players={players} openGame={true}/>
                  <div>
                    <button onClick={()=>leaveGame(game)}>Leave this game</button>
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
    games: games.open,
    user: users.single
  }
};

const mapDispatch = dispatch => {
  return {
    loadOpenGamesForUser: (userId)=> dispatch(loadOpenGamesForUser(userId))
  }
};


export default connect(mapState, mapDispatch)(MyGames);
