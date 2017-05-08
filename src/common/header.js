import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

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

class Brand extends React.Component {
  render() {
    return (
      <Navbar.Header {...this.props}>
        <Navbar.Brand tabIndex='-1'>
          <a href='#'>
            <img src='/imgs/common/logo.png' alt='rubix' width='111' height='28' />
          </a>
        </Navbar.Brand>
      </Navbar.Header>
    );
  }
}


class NotificationsMenu extends React.Component {
  render() {
    const bullhornIcon = (
      <span>
        <Icon bundle='fontello' glyph='bullhorn' />
        <Badge className='fg-darkbrown bg-orange notification-badge'>3</Badge>
      </span>
    );

    return (
      <NavDropdownHover noCaret eventKey={6} title={bullhornIcon} id='notifications-menu' className='header-menu collapse-left'>
        <MenuItem header>
          <Entity entity='notificationsMenuHeading' />
        </MenuItem>
        <MenuItem href='#'>
          <Grid>
            <Row>
              <Col xs={2} className='avatar-container' collapseRight>
                <div><img src='/imgs/app/avatars/avatar22.png' width='40' height='40' alt='sarah_patchett' /></div>
                <div className='text-center'>
                  <Label bsStyle='info'>NEW</Label>
                </div>
              </Col>
              <Col xs={10} className='notification-container' collapseLeft collapseRight>
                <div className='time'>
                  <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='chat-5'/><em><Entity entity='notificationsTimeFirst' /></em></strong>
                </div>
                <div className='message-header'>
                  <strong className='fg-darkgreen45'>Sarah Patchett sent you a private message</strong>
                </div>
                <div className='message-details fg-text'>
                  <span>{"Hey Anna! Sorry for delayed response. I've just finished reading the mail you sent couple of days ago..."}</span>
                </div>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
        <MenuItem href='#'>
          <Grid>
            <Row>
              <Col xs={2} className='avatar-container' collapseRight>
                <img src='/imgs/app/avatars/avatar21.png' width='40' height='40' alt='john_young' />
              </Col>
              <Col xs={10} className='notification-container' collapseLeft collapseRight>
                <div className='time'>
                  <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='user-add'/><em>2 hours ago</em></strong>
                </div>
                <div className='message-header'>
                  <strong className='fg-darkgreen45'>John Young added you as a collaborator</strong>
                </div>
                <div className='message-details fg-text'>
                  <span>to the repository </span><em className='fg-darkblue'>sketchpixy/rubix</em>
                </div>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
        <MenuItem href='#'>
          <Grid>
            <Row>
              <Col xs={2} className='avatar-container' collapseRight>
                <div><img src='/imgs/app/github.png' width='40' height='40' alt='github' /></div>
                <div className='text-center'>
                  <Label bsStyle='danger'>ALERT</Label>
                </div>
              </Col>
              <Col xs={10} className='notification-container' collapseLeft collapseRight>
                <div className='time'>
                  <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='attention-alt-1'/><em>5 days ago</em></strong>
                </div>
                <div className='message-header'>
                  <strong className='fg-darkgreen45'>Github sent you a notification</strong>
                </div>
                <div className='message-details fg-text'>
                  <span>Your </span><span className='fg-darkblue'>Large Plan</span><span> will expire in one week. Please update your billing details at our Billing center. Thank you!</span>
                </div>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
        <MenuItem noHover>
          <Grid style={{marginBottom: -10}}>
            <Row>
              <Col xs={6} collapseLeft collapseRight>
                <Button block className='notification-footer-btn left-btn'>MARK ALL READ</Button>
              </Col>
              <Col xs={6} collapseLeft collapseRight>
                <Button block className='notification-footer-btn right-btn'>VIEW ALL</Button>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
      </NavDropdownHover>
    );
  }
}


@withRouter
class HeaderNavigation extends React.Component {
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
          <NavItem divider />
          <NotificationsMenu />
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
