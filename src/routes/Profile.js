import React from 'react';

import { Row, Image } from '@sketchpixy/rubix';
import ProfileUser from './ProfileUser';
import ProfileStade from './ProfileStade';

class SocialBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/app/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
        <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        </div>
        <div className='social-desc'>
          <div>
            <h1 className='fg-white'>Empire State, NY, USA</h1>
            <h5 className='fg-white' style={{opacity: 0.8}}>- Aug 20th, 2014</h5>
          </div>
        </div>
        <div className='social-avatar'>
          <Image src='/imgs/app/avatars/avatar.jpg' height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
          <h4 className='fg-white text-center'>Anna Sanchez</h4>
          <h5 className='fg-white text-center' style={{opacity: 0.8}}>DevOps Engineer, NY</h5>
          <hr className='border-black75' style={{borderWidth: 2}}/>
        </div>
      </div>
    );
  }
}

export default class Profile extends React.Component {

  render() {
    return (
      <Row className='social'>
        <SocialBanner />
        <ProfileUser />
        <ProfileStade />
      </Row>
    );
  }
}
