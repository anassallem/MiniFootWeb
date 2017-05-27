import React from 'react';
import {
    Row,
    Image ,
    Col,
    Grid,
    Form,
    Panel,
    Button,
    FormGroup,
    PanelBody,
    InputGroup,
    FormControl,
    PanelHeader,
    PanelContainer
  } from '@sketchpixy/rubix';
import ProfileUser from './ProfileUser';
import ProfileStade from './ProfileStade';
import Maps from './Maps';
import { URL } from '../api/config';

class SocialBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const img = `${URL}/users/upload/${this.props.user.photo}`;
    return (
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/app/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
        <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        </div>
        <div className='social-desc'>
          <div>
            <h1 className='fg-white'>{this.props.stade.name}</h1>
            <h5 className='fg-white' style={{opacity: 0.8}}>{this.props.stade.adresse}</h5>
          </div>
        </div>
        <div className='social-avatar'>
          <Image src={ img } height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
          <h4 className='fg-white text-center'>{this.props.user.firstname} {this.props.user.lastname} </h4>
          <h5 className='fg-white text-center' style={{opacity: 0.8}}>{this.props.user.email}</h5>
          <hr className='border-black75' style={{borderWidth: 2}}/>
        </div>
      </div>
    );
  }
}
class MapContainer extends React.Component {
  render() {
    return (
      <div>
        <PanelContainer>
          <Panel>
            <PanelBody style={{padding: 25}}>
              <h4 className='text-center' style={{marginTop: 0}}>{this.props.name}</h4>
              {this.props.children}
              <div id={this.props.id} style={{height: 300}}></div>
            </PanelBody>
          </Panel>
        </PanelContainer>
      </div>
    );
  }
}
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        stade:  null
    };
  }

  componentWillMount() {
    if(typeof(Storage) !== "undefined"){
       var user = JSON.parse(localStorage.getItem('user'));
       var stade = JSON.parse(localStorage.getItem('stade'));
        this.setState({ user: user });
        this.setState({ stade: stade });
         if (user === null) {
             this.props.router.push('/ltr/login');
         }
     }
  }
  handleChangeUser(user){
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ user: user});
  }
  handleChangeStade(stade){
    localStorage.setItem('stade', JSON.stringify(stade));
    this.setState({ stade: stade});
  }
  renderProfile(){
    if( this.state.user !== null && this.state.stade !== null ) {
      return (
        <div>
          <SocialBanner  user={this.state.user} stade={this.state.stade}/>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <ProfileUser user={this.state.user} changeUser={this.handleChangeUser.bind(this)} />
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                <ProfileStade  stade={this.state.stade} changeStade={this.handleChangeStade.bind(this)}/>
            </Col>
          </Row>
        </Col>
        </div>
      );
    }
  }
  renderMaps(){
    if( this.state.user !== null && this.state.stade !== null ) {
        return (
          <div>
            <Row>
              <Col sm={12}>
                <MapContainer id='geocode' name='Carte Géographique'>
                  <Maps user={this.state.user} stade={this.state.stade}/>
                </MapContainer>
            </Col>
          </Row>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
      <Row className='social'>
      {this.renderProfile()}
      </Row>
      {this.renderMaps()}
      </div>
    );
  }
}
