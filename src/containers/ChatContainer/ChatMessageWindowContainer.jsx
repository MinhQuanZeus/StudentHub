import React, { Component } from 'react';
import './ChatMessageWindowContainer.css';
import ChatMessageReceived from '../../components/ChatComponents/ChatMessageReceived';
import ChatMessageSent from '../../components/ChatComponents/ChatMessageSent';
import MessageInput from '../../components/ChatComponents/ChatMessageInput';
import IconInvalidName from '../../images/chat/invalid-name.png';
import phone from '../../images/chat/shape-phone.png';
import video from '../../images/chat/video-call.PNG';
import Chat from 'twilio-chat';
import { getAccessToken, getUser } from '../../helpers';
import { apiConstants } from '../../constants/applicationConstants';
import VideoCall from '../../components/ChatComponents/VideoCall';

class ChatMessageWindowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      token: null,
      videoCallToken: null,
      groupDetails: {},
      currentUser: getUser(),
    };

    this.videoCallRef = React.createRef();
  }

  componentDidMount() {}

  onSelectedGroup = async (group) => {
    await this.setState({ groupDetails: group });
    this.initialize();
  };

  initChat = () => {
    this.chatClient = new Chat(this.state.token);
    this.chatClient.initialize().then(this.clientInitiated.bind(this));
  };

  clientInitiated = () => {
    const { groupDetails } = this.state;
    const { sid } = groupDetails;
    this.setState({ chatReady: true }, () => {
      this.chatClient
        .getChannelByUniqueName(sid)
        .then((channel) => {
          if (channel) {
            return (this.channel = channel);
          }
        })
        .catch((err) => {
          if (err.body.code === 50300) {
            return this.chatClient.createChannel({
              uniqueName: sid,
            });
          }
        })
        .then((channel) => {
          this.channel = channel;
          window.channel = channel;
          if (this.channel.state.status !== 'joined') {
            this.channel.join();
          }
        })
        .then(() => {
          this.channel.getMessages().then(this.messagesLoaded);
          this.channel.on('messageAdded', this.messageAdded);
        });
    });
  };

  componentWillUnmount() {
    // this.chatClient.shutdown();
  }

  messagesLoaded = (messagePage) => {
    // console.log(messagePage);
    // this.setState({ messages: messagePage.items });
  };

  messageAdded = (message) => {
    const mess = JSON.parse(message.state.body);
    const m = {
      message: mess && mess.message,
      sender: mess && mess.sender,
      sender_id: mess && mess.sender_id,
    };
    this.setState((prevState, props) => ({
      messages: [...prevState.messages, m],
    }));
  };

  onMessageChanged = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  async initialize() {
    const { groupDetails } = this.state;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    };
    const responses = await Promise.all([
      fetch(`${apiConstants.BACKEND_URL}chat/token`, options),
      fetch(`${apiConstants.BACKEND_URL}chat/chat_group/${groupDetails.chatroom_id}/messages`, options),
      fetch(`${apiConstants.BACKEND_URL}video/token`, options),
    ]);
    const bodies = await Promise.all(responses.map((o) => o.json()));
    this.setState({
      token: bodies[0].data && bodies[0].data.token,
      messages: bodies[1].data,
      videoCallToken: bodies[2].data && bodies[2].data.token,
    });
    this.initChat();

    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  onVideoCall = () => {
    this.setState({ openVideoCall: true });
    this.videoCallRef.current.joinRoom('room');
  };

  render() {
    const { messages, currentUser, groupDetails, openVideoCall, token, videoCallToken } = this.state;
    const userId = currentUser.student && currentUser.student.id;
    return (
      <div className="ChatMessageWindow-container">
        <div className="ChatMessageWindow-header">
          <img className="ChatMessageWindow-header-img" src={IconInvalidName} />
          <span className="ChatMessageWindow-header-title">{groupDetails.group_name}</span>
          <img className="ChatMessageWindow-header-phone" src={phone} />
          <img className="ChatMessageWindow-header-camera" src={video} onClick={this.onVideoCall}/>
        </div>

        <div style={{ marginBottom: '80px', marginTop: '65px' }}>
          {messages &&
            messages.length > 0 &&
            messages.map((item, index) =>
              userId !== item.sender_id ? (
                <div style={{ display: 'flex' }} key={index}>
                  <ChatMessageReceived name={item.sender} message={item.message} timestamp="12:00AM" />
                </div>
              ) : (
                <div style={{ display: 'flex' }} key={index}>
                  <ChatMessageSent name={item.sender} message={item.message} timestamp="12:00AM" />
                </div>
              )
            )}
        </div>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
        {/* <ChatMessageReceived*/}
        {/*  name="Name Placeholder"*/}
        {/*  message="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."*/}
        {/*  timestamp="12:00AM"*/}
        {/* />*/}
        {/* <ChatMessageSent*/}
        {/*  name="Name Placeholder"*/}
        {/*  message="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."*/}
        {/*  timestamp="12:00AM"*/}
        {/* />*/}
        <div className="ChatMessageWindow-input-container">
          <MessageInput />
        </div>
        <VideoCall ref={this.videoCallRef} token={videoCallToken} isOpen={openVideoCall} cancel={() => this.setState({ openVideoCall: false })}/>
      </div>
    );
  }
}

export default ChatMessageWindowContainer;
