import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';
import { Link, withRouter } from 'react-router';
import { URL } from '../api/config';

@withRouter
class ApplicationSidebar extends React.Component {
  getPath(path) {
      var dir = this.props.location.pathname.search('ltr') !== -1 ? 'ltr' : '';
      path = `/${dir}/${path}`;
      return path;
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>
                  <div className='sidebar-header'>Menu</div>
                  <SidebarNavItem glyph='icon-pixelvicon-photo-gallery' name='Gallery' href={::this.getPath('gallery')} />
                  <SidebarNavItem glyph='icon-feather-share' name='Profile' href={::this.getPath('profile')}/>
                  <SidebarNavItem href={::this.getPath('maps')} glyph='icon-ikons-pin-2' name='Maps' />
                  <SidebarNavItem href={::this.getPath('datatables')} glyph='icon-fontello-th-2' name='Datatables' />
                  <SidebarNavItem href={::this.getPath('calendar')} glyph='icon-fontello-calendar-alt' name='Calendar' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
    };
  }
  componentWillMount() {
    if(typeof(Storage) !== "undefined"){
       var user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user: user });
        if (user === null) {
            this.props.router.push('/ltr/login');
        }
     }
  }
  renderProfile(){

    if( this.state.user !== null) {
      const img = `${URL}/users/upload/${this.state.user.photo}`;
      return (
        <div>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src={ img } width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>{this.state.user.firstname} {this.state.user.lastname}</div>
                <div>
                  <Progress id='demo-progress' value={30} color='#ffffff'/>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='docs' sidebar={0} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
        </div>
      </div>
      );
    }
  }
  render() {
    return (
      <div id='sidebar'>
        {this.renderProfile()}
      </div>
      );
    }
}
