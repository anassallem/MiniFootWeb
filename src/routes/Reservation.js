import React from 'react';
import { withRouter } from 'react-router';
import { getEventReservation, annulerReservation, acceptReservation } from '../api/StadeApi';
import moment from 'moment';
import {
  Row,
  Col,
  Icon,
  Grid,
  Label,
  Badge,
  Panel,
  Button,
  PanelLeft,
  PanelBody,
  ListGroup,
  LoremIpsum,
  ButtonGroup,
  ButtonToolbar,
  ListGroupItem,
  PanelContainer,
  PanelHeader
} from '@sketchpixy/rubix';
import { URL } from '../api/config';

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      time: '--:--'
    };
  }
  componentDidMount() {
    var stade = JSON.parse(localStorage.getItem('stade'));
    getEventReservation(stade._id).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ notifications: res });
      }
    });
  }
  onChangeDate(match,tag) {
    let clone = this.state.notifications ;
    clone.forEach((item) => {
      if(match._id === item._id) {
        item.date = moment(tag.target.value).format('YYYY-MM-DD');
      }
    });
    this.setState({ notifications: clone });
  }
  onChangeTime(match, time) {
    let clone = this.state.notifications ;
    clone.forEach((item) => {
      if(match._id === item._id) {
        const t = moment(item.date).format("YYYY-MM-DD");
        const start = moment(`${t} ${time.target.value}`);
        var end =  moment(start).add(1.5, 'hours')
        item.event = { start: start._d, end: end._d };
        console.log(start);
      }
    });
    this.setState({ notifications: clone, time : time.target.value });
    console.log(this.state.notifications);
  }
  onClickAnnuler(match, e) {
    annulerReservation(match._id).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ notifications: this.state.notifications.filter((item) => {return (match._id !== item._id);}) });
      }
    });
  }
  onClickConfirm(match, e) {
    if(this.state.time !== '--:--'){
     acceptReservation(match._id, match).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ notifications: this.state.notifications.filter((item) => {return (match._id !== item._id);}) });
        }
    });
    }else{
      vex.dialog.alert("Vous devez choisir l'heure du match avant la confirmation");
    }
  }
  renderImage(team) {
    if(team.logo !== undefined) {
      const uriImg = `${URL}/equipe/teamUploads/${team.logo}`;
      return <img src={ uriImg} width='50' height='50' />;
    }
    return <img src={ '/imgs/app/avatars/logoEquipe.jpg' } width='50' height='50' />;
  }
  renderItem() {
    if(this.state.notifications.length > 0) {
      return this.state.notifications.map((item) =>{
        return(
          <div key={item._id}>
            <Grid>
              <Row>
                <Col xs={4}>
                  <Grid>
                    <Row style={{ marginTop: 10 }}>
                      <Col xs={3}>
                        <div>
                          {this.renderImage(item.teamOne)}<br/>
                        <span style={{ marginLeft: 10 }} className='fg-darkgrayishblue75'>{item.teamOne.name}</span>
                      </div>
                    </Col>
                    <Col xs={2} style={{ marginTop: 10 }}>
                      <div><span className='fg-darkgrayishblue75'>VS</span></div>
                    </Col>
                    <Col xs={5}>
                      <div>
                        {this.renderImage(item.teamTow)}<br/>
                      <span style={{ marginLeft: 10 }} className='fg-darkgrayishblue75'>{item.teamTow.name}</span>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </Col>
            <Col xs={8}>
              <Grid style={{ marginBottom: 10 }}>
                <Row>
                  <Col xs={12}>
                    <span className='fg-darkgrayishblue75'>{item.message}</span>
                  </Col>
                </Row>
              </Grid>
              <Grid>
                <Row>
                  <Col xs={6}>
                    <div>
                      <input name='date' type ='date' onChange={this.onChangeDate.bind(this, item)} value={moment(item.date).format('YYYY-MM-DD').toString()}></input>
                      <input style={{ marginLeft: 10 }} name='time' type ='time' onChange={this.onChangeTime.bind(this, item)} value={this.state.time}></input>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div>
                      <Button  outlined bsStyle='darkblue' onClick={this.onClickConfirm.bind(this,item)}>Confirmer</Button>
                      <Button  outlined bsStyle='red' style={{ marginLeft: 10 }} onClick={this.onClickAnnuler.bind(this,item)}>Annuler</Button>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
            <hr/>
          </div>
        ) ;

      });
    }
  }
  render() {
    return (
      <Row>
        <Col xs={12}>
          <PanelContainer>
            <Panel>
              <PanelHeader className='bg-darkblue fg-white' style={{marginBottom: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <h3>Liste des réservations</h3>
                    </Col>
                  </Row>
                </Grid>
              </PanelHeader>
              <PanelBody style={{padding: 25}}>
                {this.renderItem()}
              </PanelBody>
            </Panel>
          </PanelContainer>
        </Col>
      </Row>
    );
  }
}
