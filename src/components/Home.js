import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUsers, GamesHosted } from '.';
import { loadUser } from '../store/';
import { Link, useLocation } from "react-router-dom";


class Home extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    //this.props.bootstrap();   
  }

  render(){    
    const { users } = this.props;
    // console.log(Object.values(users))
    // console.log(users.single)
    let user = users.single;
    console.log(user);
    // console.log(Object.values(users));
    return (
      <div >
        <center>
        { user.name ?
          (<p>Hello, { user.name }!</p>) : (<p>Welcome stranger</p>)
        }
        </center>
        <center>
        <div id= 'pick-up'className='border text-center mb-3 home-hover' style={{ width: 275 + 'px' }, {fontSize: 3 + 'rem'}} > 
        <Link className='nav nav-link text-dark card-body '  to='/request'>Pick Up</Link>
      </div>
      </center>
      <div className='border text-center mb-3 home home-hover' > 
      <Link className=' border nav-link text-dark card-body ' to='/games'>Find a Game</Link>
			<Link  className=' border nav-link text-dark card-body ' to='/mygames'>My Games</Link>
      
      </div>
      </div>
    );
  }
}


const mapStateToProps = ({users}) => {
  return {users};
}


const mapDispatchToProps = (dispatch) => {
  
  return {
    
    bootstrap: ()=> {
      dispatch(loadUser(4));

    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

