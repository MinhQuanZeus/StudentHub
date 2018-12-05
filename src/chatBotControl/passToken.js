
//document.write("<script type='text/javascript' src='https://student-platform-codebuilddeploy-tme-webappbucket-7luwxhqo583s.s3.amazonaws.com/lex-web-ui-loader.min.js'></script>");
var param = {
	passToken: function(x_access_token) {
	 let script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'chatBotLoading';
        script.text = `
        var loaderOpts = {
          baseUrl: 'https://cody-codebuilddeploy-1bhcz3251qy36-webappbucket-125z3kmshgrwk.s3.amazonaws.com/'
          };
        var chatbotUiconfig = {
          "cognito": {
            "poolId": "us-east-1:025e574e-dff0-4f97-9960-16d916aa76ad",
            "appUserPoolClientId": "svnvqtg5c1fa49jpcv4h5c5sc",
            "appUserPoolName": "us-east-1_XXzMoIFsT",
            "appDomainName": "codykidentitypoolconfigkbjcubcenifvbm699492237215.auth.us-east-1.amazoncognito.com",
            "appUserPoolIdentityProvider": ""
          },
          "lex": {
            "sessionAttributes":{
                "accessToken":"${x_access_token}"
                },
            "botName": "Cody",
            "botAlias": "$LATEST",
            "initialText": "You can ask me for help getting gpa. Just type "gpa" or click on the mic and say it.",
            "initialSpeechInstruction": "Say 'my gpa' to get started.",
            "reInitSessionAttributesOnRestart": false
          },
          "ui": {
            "parentOrigin": "http://54.219.128.159:3000",
            "toolbarTitle": "Cody",
            "toolbarLogo": "",
            "enableLogin": false,
            "AllowSuperDangerousHTMLInMessage": true,
            "shouldDisplayResponseCardTitle": true,
            "pushInitialTextOnRestart": false
          },
          "polly": {
            "voiceId": "Salli"
          },
          "recorder": {
            "preset": "speech_recognition"
          },
          "iframe": {
            "iframeOrigin": "https://cody-codebuilddeploy-1bhcz3251qy36-webappbucket-125z3kmshgrwk.s3.amazonaws.com",
            "shouldLoadIframeMinimized": true,
            "iframeSrcPath": "/index.html#/?lexWebUiEmbed=true"
          }
        };  
          var loader = new ChatBotUiLoader.IframeLoader(loaderOpts);
          loader.load(chatbotUiconfig)
            .catch(function (error) { console.error(error); });`;
    return script;
},
};
export default param;