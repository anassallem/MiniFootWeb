import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Gallery from './routes/Gallery';
import Profile from './routes/Profile';
import Reservation from './routes/Reservation';
import Datatablesjs from './routes/Datatablesjs';
import Calendar from './routes/Calendar';
import Login from './routes/Login';
import Signup from './routes/Signup';

class App extends React.Component {

  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default (
    <Route path='/'>
        <Route path='/ltr'>
            <Route path='login' component={Login} />
            <Route path='signup' component={Signup} />
        </Route>
        <Route component={App} path='/ltr'>
            <Route path='gallery' component={Gallery} />
            <Route path='profile' component={Profile} />
            <Route path='reservation' component={Reservation} />
            <Route path='datatables' component={Datatablesjs} />
            <Route path='calendar' component={Calendar} />
        </Route>
    </Route>
);
