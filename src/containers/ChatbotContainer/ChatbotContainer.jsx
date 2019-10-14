/* global AWS */
import React, { Component } from 'react';
import styles from './ChatbotContainer.m.scss';
import { getAccessToken } from '../../helpers';
import microphone from '../../images/microphone.svg';
import chatbotAvatar from '../../images/chatbot-avatar.png';

class ChatbotContainer extends Component {
  componentDidMount() {
    const conversationDivRef = document.getElementById('conversation');
    conversationDivRef.scrollTop = conversationDivRef.scrollHeight;
    document.getElementById('wisdom').addEventListener('keypress', function(e) {
      const key = e.which || e.keyCode;
      if (key === 13) {
        pushChat();
      }
    });

    document.getElementById('send').addEventListener('click', function(e) {
      pushChat();
    });

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:15636ad4-3556-4eae-8049-deebfdd075b4',
    });

    const lexruntime = new AWS.LexRuntime();
    const lexUserId = 'chatbot-demo' + Date.now();
    let sessionAttributes = {
      accessToken: getAccessToken(),
    };

    function pushChat() {
      const wisdomText = document.getElementById('wisdom');
      if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {
        const wisdom = wisdomText.value.trim();
        wisdomText.value = '';
        wisdomText.locked = true;

        const params = {
          botAlias: '$LATEST',
          botName: 'Cody',
          inputText: wisdom,
          userId: lexUserId,
          sessionAttributes: sessionAttributes,
        };
        showRequest(wisdom);
        lexruntime.postText(params, function(err, data) {
          if (err) {
            showError('Error:  ' + err.message + ' (see console for details)');
          }
          if (data) {
            sessionAttributes = data.sessionAttributes;
            showResponse(data);
          }
          wisdomText.value = '';
          wisdomText.locked = false;
        });
      }
      return false;
    }

    function showRequest(daText) {
      const conversationDiv = document.getElementById('conversation');
      const requestPara = document.createElement('div');
      const messageBox = document.createElement('div');
      messageBox.className = 'message-box';
      messageBox.appendChild(document.createTextNode(daText));
      requestPara.className = 'message-box-holder';
      requestPara.appendChild(messageBox);
      conversationDiv.appendChild(requestPara);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    function showError(daText) {
      const conversationDiv = document.getElementById('conversation');
      const errorPara = document.createElement('div');
      const messageBoxSender = document.createElement('div');
      messageBoxSender.className = 'message-sender';
      const messageBoxPartner = document.createElement('div');
      messageBoxPartner.classList.add('message-box');
      messageBoxPartner.classList.add('message-partner-error');
      messageBoxSender.appendChild(document.createTextNode('Cody'));
      messageBoxPartner.appendChild(document.createTextNode(daText));
      errorPara.className = 'message-box-holder';
      errorPara.appendChild(messageBoxSender);
      errorPara.appendChild(messageBoxPartner);
      conversationDiv.appendChild(errorPara);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    function showResponse(lexResponse) {
      const conversationDiv = document.getElementById('conversation');
      const responsePara = document.createElement('div');
      const messageBoxSender = document.createElement('div');
      messageBoxSender.className = 'message-sender';
      const messageBoxPartner = document.createElement('div');
      messageBoxPartner.classList.add('message-box');
      messageBoxPartner.classList.add('message-partner');
      messageBoxSender.appendChild(document.createTextNode('Cody'));
      messageBoxPartner.appendChild(document.createTextNode(lexResponse && lexResponse.message));
      responsePara.className = 'message-box-holder';
      responsePara.appendChild(messageBoxSender);
      responsePara.appendChild(messageBoxPartner);
      conversationDiv.appendChild(responsePara);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }

  onClickMinus = (event) => {
    document.querySelector('.chatbox').classList.toggle('chatbox-min');
  };

  render() {
    return (
      <div className={styles['chatbox-holder']}>
        <div className={`${styles['chatbox']} chatbox chatbox-min`}>
          <div className={styles['chatbox-top']} onClick={this.onClickMinus}>
            <div className={styles['chatbox-avatar']}>
              <a href="javascript:void(0);">
                <img src={chatbotAvatar} />
              </a>
            </div>
            <div className={styles['chat-partner-name']}>
              <span className="status online" />
              <a href="javascript:void(0);">Cody</a>
            </div>
            <div className="chatbox-icons">
              <a href="javascript:void(0);">
                <i className="fa fa-minus" />
              </a>
            </div>
          </div>

          <div id="conversation" className={styles['chat-messages']}>
            <div className="message-box-holder">
              <div className="message-sender">Cody</div>
              <div className="message-box message-partner">
                Hi! I am your personal assistance. You can ask me everything! For example, to get your current GPA, just type “GPA” or click
                on the microphone and say “GPA.”
              </div>
            </div>
            <div className={styles['message-options']}>
              <div className={styles['message-options-text']}>Please specify a checklist:</div>
              <div className={styles['message-options-btns']}>
                <a href="javascript:void(0);">Result 1</a>
                <a href="javascript:void(0);">Result 2</a>
                <a href="javascript:void(0);">Another Result</a>
              </div>
            </div>
          </div>

          <div className={styles['chat-input-holder']}>
            <a href="">
              <img src={microphone}></img>
            </a>
            <input id="wisdom" className={styles['chat-input']} autoComplete="off" placeholder="Type your message" />
            <input id="send" type="submit" value="Send" className={styles['message-send']} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatbotContainer;
