import axios from 'axios';

// can I just add a wins game here??
const LOAD_GAMES = 'LOAD_GAMES';
const LOAD_GAMES_FOR_USER = 'LOAD_GAMES_FOR_USER';
const CREATE_GAME = 'CREATE_GAME';
const DESTROY_GAME = 'DESTROY_GAME';
const UPDATE_GAME = 'UPDATE_GAME';


//*************************************************
const gamesReducer = (state = [], action) =>{
    if (action.type === LOAD_GAMES){
        state = action.games
    }
    if (action.type === LOAD_GAMES_FOR_USER){
        state = action.games
    }
    if (action.type === CREATE_GAME){
        state = [...state, action.game]
    }
    return state;
}

//ACTION CREATORS****************************************
const _loadGames = (games) =>{
    return {
        type: LOAD_GAMES,
        games
    };
};

const _loadGamesForUser = (games) =>{
    return {
        type: LOAD_GAMES,
        games
    };
};

const _createGame = (game) => {
    return {
        type: CREATE_GAME,
        game
    }
}

//THUNKS****************************************
export const loadGames = () =>{
    // console.log('in loadGames')
    return async(dispatch)=>{
        const games = (await axios.get('/api/games')).data;
        dispatch(_loadGames(games));
    }
};

export const loadGamesForUser = (userId) =>{
    // console.log('in loadGamesForUSer')
    return async(dispatch)=>{
        const games = (await axios.get(`/api/user_games/user/${userId}`)).data;
        // console.log(games)
        dispatch(_loadGamesForUser(games));
    }
};

export const loadOpenGames = () =>{
    return async(dispatch)=>{
        const games = (await axios.get('/api/games/open')).data;
        dispatch(_loadGames(games));
    }
};

export const createGame = () => {
    return async(dispatch) => {
        const game = (await axios.post('/api/games')).data;
        dispatch(_createGame(game));
    }
}


// export default store;
export { gamesReducer };