import React, {Component} from 'react';
import {connect} from 'react-redux';

import {onFetchMentors} from "../../actions/SuccessTeamActions/SuccessTeamActions";
import {MentorCardComponent} from "../../components/MentorCardComponent/MentorCardComponent";
import sharedStyles from '../../styles/styles.css';

class SuccessTeamContainer extends Component {

    render() {
        let mentorItems = this.props.mentors.map((mentor) => {
            return <MentorCardComponent key={mentor.record_id} mentor={mentor}/>
        });
        return (
            <div className={sharedStyles["content-container"]}>
                <h2 className={sharedStyles["content-heading"]}>Success Team</h2>
                {mentorItems}
            </div>
        );
    }

    componentWillMount() {
        let {loginInformation} = this.props;
        this.props.onFetchMentors(loginInformation.x_access_token);
    }
    componentDidMount() {
        let {loginInformation} = this.props;
        this.props.onFetchMentors(loginInformation.x_access_token);
        console.log(loginInformation.x_access_token);           
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `
        var loaderOpts = {
            baseUrl: "https://student-platform-codebuilddeploy-tme-webappbucket-7luwxhqo583s.s3.amazonaws.com/"
          };
    var chatbotUiconfig = {
      "cognito": {
        "poolId": "us-east-1:6901dcca-0062-43f0-a9db-396204e16cdc"
      },
      "lex": {
        "sessionAttributes":{
        "accessToken":"${loginInformation.x_access_token}"

        },
        "botName": "Cody",
        "initialText": "You can ask me for help getting gpa, credit hours, adviser name etc. Just type 'get gpa' or click on the mic and say it.",
        "initialSpeechInstruction": "Say 'Get gpa' or 'credit hours' to get started."
      },
      "ui": {
        "parentOrigin": "http://54.193.100.235",
        "toolbarTitle": "Cody Bot",
        "toolbarLogo": "",
        "pushInitialTextOnRestart": false,
        "reInitSessionAttributesOnRestart": true,
      },
      "polly": {
        "voiceId": "Matthew"
      },
      "recorder": {
        "preset": "speech_recognition"
      },
      "iframe": {
        "iframeOrigin": "https://student-platform-codebuilddeploy-tme-webappbucket-7luwxhqo583s.s3.amazonaws.com",
        "iframeSrcPath": "/index.html#/?lexWebUiEmbed=true",
        "shouldLoadIframeMinimized": true
      }
    };
          var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
          loader.load(chatbotUiconfig)
            .catch(function (error) { console.error(error); });`;
        document.body.appendChild(script);
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.mentor.loading,
        mentors: state.mentor.mentors,
        loginInformation: state.login.loginInformation
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMentors: (access_token) => dispatch(onFetchMentors(access_token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessTeamContainer);