import axios from 'axios'
import store from './index';

//constants

const SET_MESSAGES = 'SET_MESSAGES';
const CREATE_MESSAGE = 'CREATE_MESSAGE';
let _gameId;

// sets up socket on client side
const socket = new WebSocket(window.document.location.origin.replace('http', 'ws'));

// this handles received messsages
socket.addEventListener('message', async (ev)=> {
  try{
    const action = JSON.parse(ev.data);
    if(action.type){
      store.dispatch(action);
      
      let messageBox = document.getElementById('messageBox');
      // making the chat window scroll down to display newest message
      await setTimeout(()=>{messageBox.scrollTo(0, messageBox.scrollHeight - messageBox.clientHeight)}, 100);
    }
  }
  catch(ex){
    console.log(ex);
  }
})

//action creators

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages
  }
};

export const postMessage = (message) => {
  return {
    type: CREATE_MESSAGE,
    message
  }
};



//thunks

export const getMessages = (gameId, token) => {
  _gameId = gameId;
  return async (dispatch)=>{
    const messages = (await axios.get(`/api/messages/${ gameId }?pickmeup-token=${token}`)).data;
    dispatch(setMessages(messages))
  }
};

// this handles creating message in the db, adding to state, and broadcasting message to other users
export const createMessage = (message) => {
  return async (dispatch)=>{
    const createdMessage = (await axios.post('/api/messages', message)).data;
    const action = postMessage(createdMessage);
    dispatch(action);
    socket.send(JSON.stringify(action));
  }
};


//reducer

const messagesReducer = (state=[], action) => {
  if(action.type === SET_MESSAGES){
    state = action.messages 
  };
  if(action.type === CREATE_MESSAGE){
    // this is filtering out duplicate messages for the user that sends a new message
    if(action.message.gameId === _gameId){
      if(!state.find(message => message.id === action.message.id)){
        state = [...state, action.message];
      };
    }
  };

  return state;
}

// export default store;
export { messagesReducer };