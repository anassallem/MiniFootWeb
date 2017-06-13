import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Notification from './notification';
import { Link, withRouter } from 'react-router';
import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';
import io from 'socket.io-client/dist/socket.io';
import {
  Label,
  SidebarBtn,
  Dispatcher,
  NavDropdown,
  NavDropdownHover,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  Badge,
  Button,
  Icon,
  Grid,
  Row,
  Radio,
  Col } from '@sketchpixy/rubix';
import { URL } from '../api/config';
class Brand extends React.Component {
  render() {
    return (
      <Navbar.Header {...this.props}>
        <Navbar.Brand tabIndex='-1'>
          <a href='#'>
            <img src='/imgs/common/logo.png' alt='rubix' width='120' height='100' />
          </a>
        </Navbar.Brand>
      </Navbar.Header>
    );
  }
}

@withRouter
class HeaderNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }
  componentWillMount() {
    if(typeof(Storage) !== "undefined"){
     var stade = JSON.parse(localStorage.getItem('stade'));
     this.socket = io(URL, { jsonp: false });
     this.socket.emit('connection');
     this.socket.on(stade._id, (notify) => {
       this.setState({ notifications: [... notify, ...this.state.notifications] });
    });
  }
}
  componentDidMount() {
    $('html').addClass('blue');
  }
  handleLogout(e) {
    this.props.router.push('/');
  }
  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  render() {
    return (
      <Nav pullRight>
        <Nav className='hidden-xs'>
          <Notification notifications={this.state.notifications} />
        </Nav>
        <Nav>
          <NavItem className='logout' href='#' onClick={::this.handleLogout}>
            <Icon bundle='fontello' glyph='off-1' />
          </NavItem>
        </Nav>
      </Nav>
    );
  }
}

export default class Header extends React.Component {

  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <Navbar fixedTop fluid id='rubix-nav-header'>
              <Row>
                <Col xs={3} visible='xs'>
                  <SidebarBtn />
                </Col>
                <Col xs={6} sm={4}>
                  <Brand />
                </Col>
                <Col xs={3} sm={8} collapseRight className='text-right'>
                  <HeaderNavigation />
                </Col>
              </Row>
            </Navbar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
