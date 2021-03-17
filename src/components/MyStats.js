import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from './GameCard';
import { loadGamesForUser, loadGames, loadUser } from '../store/';


//so at this point we should have a user ID from being logged in
// with the user id we can querry requests for all games played 
// that will give us a list of games played that needs to be joined with 
export class MyStats extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
   
  }

  render(){
    // const { user, game, request } = this.props;
    console.log(this.props)
    let user = this.props.users.single;
    // let games = this.props.games 

    // let wins = games.filter(game => game.team === game.game.winner)
    // let loses = games.filter(game => game.team !== game.game.winner)
    // let win = wins[0];
    // console.log(wins);
    // console.log(loses);
    // console.log(games);
    // this is just the  one we started with not how it's really done
    const request =  {};
    // console.log(request);
    return (
        <div className='container'>
          <div className='header'>
            {
              //replace email with user's name
            }
            <h1>{user.email}: Stats</h1>
          </div>
          <div className='sub-header'>
            <div>
              {
                // need to calculate total wins and losses
              }
              <h3>Wins:</h3>
              {  
                // wins.map( game => { 
                //   return (
                //     <div key={game.gameId}>
                //    {game.gameId}
                //          {/* <GameCard game={game}/> */}
                //     </div>
                //   );
                // })
              }
            </div>

            <div>
              <h3>Losses:</h3>
              {  
                  // loses.map( game => { 
                  //     return (
                  //       <div key={game.gameId}>
                  //         {game.gameId}
                  //         {/* <GameCard game={game} /> */}
                  //       </div>
                  //     );
                  // })
              }
            </div>
          </div>
        </div>
    );
  
  }
}

const mapStateToProps = (state) => {
  // console.log(state.requests);
  return state;
}


const mapDispatchToProps = (dispatch) => {
  
  return {
    
    bootstrap: ()=> {
      dispatch(loadUser(4));
      dispatch(loadGamesForUser(4));
      // dispatch(loadGames());
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(MyStats);

