import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';


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
                  <SidebarNavItem glyph='icon-feather-share' name='Social' href={::this.getPath('social')} />
                  <SidebarNavItem href={::this.getPath('maps')} glyph='icon-ikons-pin-2' name='Maps' />
                  <SidebarNavItem href={::this.getPath('tables/datatables')} glyph='icon-fontello-th-2' name='Datatables' />
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

class DummySidebar extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-header'>DUMMY SIDEBAR</div>
            <LoremIpsum query='1p' />
          </Col>
        </Row>
      </Grid>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {

  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='/imgs/app/avatars/avatar0.png' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>Anna Sanchez</div>
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
