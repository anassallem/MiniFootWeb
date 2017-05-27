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
@withRouter
export default class Notification extends React.Component {

  onClickItem(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.router.push('/ltr/reservation');

  }
  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  renderNotification() {
    if(this.props.notifications.length > 0){
      return this.props.notifications.map((item, i) => {
        return(
          <div key={i}>
            <MenuItem href='#' onClick={this.onClickItem.bind(this)}>
              <Grid>
                <Row>
                  <Col xs={12} className='notification-container' >
                    <div className='message-header'>
                      <strong className='fg-darkgrayishblue75'>{item.teamOne.name} vs {item.teamTow.name} veulent jouer un match dans votre stade</strong>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </MenuItem>
          </div>
        );
      });
    }
  }
  renderBadge() {
    if(this.props.notifications.length > 0) {
      return <Badge className='fg-darkbrown bg-orange notification-badge'>{this.props.notifications.length}</Badge>
    }
  }
  render() {
    const bullhornIcon = (
      <span>
        <Icon bundle='fontello' glyph='bell-5' />
        {this.renderBadge()}
      </span>
    );
    return (
      <NavDropdownHover noCaret eventKey={6} title={bullhornIcon} id='notifications-menu' className='header-menu collapse-left'>
        <MenuItem header>Notifications</MenuItem>
        {this.renderNotification()}
        <MenuItem noHover>
          <Grid style={{marginBottom: -10}}>
            <Row>
              <Col xs={12} className='text-center' >
                <Link to={::this.getPath('reservation')}><span >Voir Tout</span></Link>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
      </NavDropdownHover>
    );
  }
}
