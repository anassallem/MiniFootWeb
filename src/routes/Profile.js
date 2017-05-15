import React from 'react';
import { Row, Image } from '@sketchpixy/rubix';
import ProfileUser from './ProfileUser';
import ProfileStade from './ProfileStade';
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
          <ProfileUser user={this.state.user} changeUser={this.handleChangeUser.bind(this)} />
          <ProfileStade  stade={this.state.stade} changeStade={this.handleChangeStade.bind(this)}/>
        </div>

      );
    }
  }
  render() {
    return (
      <Row className='social'>
      {this.renderProfile()}
      </Row>
    );
  }
}
