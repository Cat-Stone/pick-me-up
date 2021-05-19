import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, createMessage } from '../store/messages';
import moment from 'moment';

class Chat extends Component{
  constructor(){
    super();
    this.state = {
      gameId: 0,
      chatId: 0,
      content: '',
      sender: ''
    };

    this.sendMessage = this.sendMessage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  };

  async componentDidMount(){
    const token = localStorage.getItem("pickmeup-token");
    if(this.props.location.state) { 
      let passedGameId = this.props.location.state.gameId;
      localStorage.setItem('gameId', passedGameId)
    }
    const gameId = localStorage.getItem('gameId') * 1;
    const chatId = window.location.hash.slice(7);

    this.setState({
      gameId: gameId,
      chatId: chatId,
      sender: this.props.user.name,
    });

    this.props.getMessages(gameId, token);
    
  };



  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  async sendMessage(ev){
    ev.preventDefault();
    
    const { content, gameId, chatId, sender } = this.state;
    const userId = this.props.user.id;
    // CHANGE DATE TO MOMENT ************************************************
    let date = moment();;
    
    // this is storing the message in the db
    this.props._createMessage({ content, gameId, date, userId });

    // this is clearing the text from the form box after sending message
    document.getElementById('content').value = ''; 

    let messageBox = document.getElementById('messageBox');
    // making the chat window scroll down to display newest message
    await setTimeout(()=>{messageBox.scrollTo(0, messageBox.scrollHeight - messageBox.clientHeight)}, 100);
  };


  render() {
    const { gameId } = this.state;
    const { user, messages } = this.props;
    const { sendMessage, handleChange } = this;

    return (
      <div className='chat-container'>
        <div>
          <div className='chatmessages' id='messageBox'>
            <ul id={ gameId + '' }>
              { 
                messages.map(message => {
                  return (
                    <li key={message.id}>
                      {
                        message.userId === user.id ? (
                          <div className='chat-message-right'>
                            <div className='chat-single-message-send'>
                              <div className='chat-message-send'>
                                { message.content }
                              </div>
                              <div className='chat-name-date-send'>
                                <div className='chat-name-send'>
                                  { message.user.name }
                                </div> 
                                <div className='chat-date-send'>
                                  <div>{ moment(message.date).format("h:mm a") }</div>
                                  <div>{ moment(message.date).format("MMM Do, YYYY") }</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className='chat-message-left'>
                            <div className='chat-single-message-receive'>
                              <div className='chat-name-date-receive'>
                                <div className='chat-name-receive'>
                                  { message.user.name }
                                </div> 
                                <div className='chat-date-receive'>
                                <div>{ moment(message.date).format("h:mm a") }</div>
                                  <div>{ moment(message.date).format("MMM Do, YYYY") }</div>
                                </div>
                              </div>
                              <div className='chat-message-receive'>
                                { message.content }
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <form id='chat-input' onSubmit={ sendMessage } >
            <input type='text' onChange={ handleChange } id='content' name='content'/>
            <button type='submit'>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  };
};

const mapState = ({ users, messages }) => {
  return {
    user: users.single,
    messages
  }
};

const mapDispatch = dispatch => {
  return {
    _createMessage: (message) => dispatch(createMessage(message)),
    getMessages: (gameId, token) => dispatch(getMessages(gameId, token))
  }
}

export default connect(mapState, mapDispatch)(Chat)
