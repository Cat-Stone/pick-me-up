import axios from 'axios';

const LOAD_REQUESTS = 'LOAD_REQUESTS';
const LOAD_REQUESTS_IDV = 'LOAD_REQUESTS_IDV';
const CREATE_REQUEST = 'CREATE_REQUEST';
const DESTROY_REQUEST = 'DESTROY_REQUEST';
const UPDATE_REQUEST = 'UPDATE_REQUEST';


//*************************************************
// do I need two states??
const requestsReducer = (state = { all:[], individual: []}, action) => {
    if (action.type === LOAD_REQUESTS){
        state['all'] = action.requests
    }
    if (action.type === LOAD_REQUESTS_IDV){
        state['individual'] = action.request
    }

    return {...state};
}


//THUNKS****************************************

const _loadRequests = (requests) =>{
    return {
        type: LOAD_REQUESTS,
        requests
    };
};

export const loadRequests = () =>{
    return async(dispatch)=>{
        const requests = (await axios.get('/api/requests')).data;
        dispatch(_loadRequests(requests));
    }
};

const _loadRequestsIdv = (request) =>{
    return {
        type: LOAD_REQUESTS_IDV,
        request
    };
};

//so this will load all the request for the user which is vaguely useful   
export const loadRequestsForUser = (userId) =>{
    return async(dispatch)=>{
        const requests = (await axios.get(`/api/requests/user/${userId}`)).data;
        dispatch(_loadRequestsIdv(requests));
    }
};

//gets every rquest that is actually associated with a game but the player may have been waitlisted    
export const loadGamesOrWaitListForUser = (userId) =>{
    return async(dispatch)=>{
        const requests = (await axios.get(`/api/requests/user/game/${userId}`)).data;
        dispatch(_loadRequestsIdv(requests));
    }
};


//gets time a player played a game, since they have a game ID and were assigend a team
//this is what we will use the bulk of the time, should be able to get the final score for the game and individaul score 
export const loadGamesForUser = (userId) =>{
    return async(dispatch)=>{
        const requests = (await axios.get(`/api/requests/user/game/played/${userId}`)).data;
        dispatch(_loadRequestsIdv(requests));
    }
};

// probably don't need this but need a games won and games lost i mean i can just loop through it here but can probably get it from the 
// database
export const loadGamesDataForUser = (userId) =>{
    return async(dispatch)=>{
        // could not get api working so will need to strip data here 
        const requests = (await axios.get(`/api/requests/user/game/played/${userId}`)).data;
        // const requests2 = (await axios.get(`/api/requests/user/game/played/won/${userId}`)).data;
        // this will be enough to get winner and losers just loop through here
        console.log(requests[0].game.winner);
        console.log(requests[0].team);
        // console.log(requests2);
    }
};
 


// export default store;
// export { requestsReducer, loadRequests };
export { requestsReducer } 