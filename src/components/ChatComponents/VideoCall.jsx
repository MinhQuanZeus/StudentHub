import React, { Component } from 'react';
import { Modal } from 'office-ui-fabric-react';
import css from './VideoCall.m.scss';
import CancelIcon from '../../images/combined-shape.svg';
import Video from 'twilio-video';

class VideoCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: null, /* Will hold the fake name assigned to the client. The name is generated by faker on the server */
      roomName: '', /* Will store the room name */
      roomNameErr: false, /* Track error for room name TextField. This will    enable us to show an error message when this variable is true */
      previewTracks: null,
      localMediaAvailable: false, /* Represents the availability of a LocalAudioTrack(microphone) and a LocalVideoTrack(camera) */
      hasJoinedRoom: false,
      activeRoom: null, // Track the current active room
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.attachTracks = this.attachTracks.bind(this);
    this.attachParticipantTracks = this.attachParticipantTracks.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
  }

  joinRoom(roomName) {
    if (!roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    const { token } = this.props;

    console.log('Joining room \'' + roomName + '\'...');
    const connectOptions = {
      name: roomName,
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(token, connectOptions).then(this.roomJoined, (error) => {
      window.alert('Could not connect to Server: ' + error.message);
    });
  }

  attachTracks(tracks, container) {
    tracks.forEach((track) => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    const tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    const tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log('Joined as \'' + this.state.identity + '\'');
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true,
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    const previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      console.log('Already in Room: \'' + participant.identity + '\'');
      const previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      console.log('Joining: \'' + participant.identity + '\'');
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(participant.identity + ' added track: ' + track.kind);
      const previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      console.log(participant.identity + ' removed track: ' + track.kind);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      console.log('Participant \'' + participant.identity + '\' left the room');
      this.detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach((track) => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  render() {
    const { isOpen, cancel } = this.props;
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        <div ref="localMedia"/>
      </div>
    ) : (
      ''
    );
    return (
      <Modal className={css.VideoCall} isDarkOverlay={true} isOpen={isOpen} isBlocking={true}>
        <div className={css.Header}>
          <span>Create New Chat</span>
          <img onClick={cancel} src={CancelIcon}/>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex-container">
              {showLocalTrack}
              <div className="flex-item" ref="remoteMedia" id="remote-media"/>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default VideoCall;
