import React from 'react';
import ReactDOM from 'react-dom';
import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';
import moment from 'moment';
import {
  Row,
  Col,
  Grid,
  Panel,
  Table,
  Checkbox,
  PanelBody,
  PanelHeader,
  FormGroup,
  FormControl,
  PanelContainer,
  Button,
  Modal,
  Input,
  Icon,
  Label,
  SidebarBtn,
  MenuItem,
} from '@sketchpixy/rubix';
import { getTeams, createEvent, getAllEvents, deleteEvent, updateEvent} from '../api/CalendarApi';
import { URL } from '../api/config';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        stade: null,
        showModal: false,
        showList:false,
        teams: [] ,
        textSearch:'',
        teamOne: null,
        teamTwo: null,
        etat: 0,
        start: '',
        end: '',
        events: {
          start: '',
          end: ''
        },
        listEvents: []
    };
  }
  componentWillMount() {
    if(typeof(Storage) !== "undefined"){
       var user = JSON.parse(localStorage.getItem('user'));
       var stade = JSON.parse(localStorage.getItem('stade'));
        this.setState({ user });
        this.setState({ stade });
         if (user === null) {
             this.props.router.push('/ltr/login');
         }
     }
  }
  componentDidMount() {
    var idStade = this.state.stade._id;
    var self = this;
    getAllEvents(idStade).then((res,err) => {
      if (err) {
          console.log(err);
      } else {
          res.forEach((item) => {
            if(item.event !== undefined) {
              item.event._id = item._id;
              item.event.title = `${item.teamOne.name} vs ${item.teamTow.name}`;
              this.setState({ listEvents: [ ...this.state.listEvents, ...item.event ]});
            }
          });
            $('#calendar').fullCalendar({
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
              editable: true,
              eventLimit: true, // allow "more" link when too many events
              dayClick: function (date, allDay, jsEvent, view) {
               var timeStart =  moment(date)
               var timeEnd =  moment(date).add(1.5, 'hours')
               var start = moment(date).format('HH:mm')
               var end =  moment(date).add(1.5, 'hours').format("HH:mm")
               self.setState({ events : { start: timeStart, end: timeEnd }})
               self.setState( { start, end })
              },
              eventClick: function (calEvent, jsEvent, view) {
                vex.dialog.open({
                  message: "Voulez vous supprimer l'heure de ce match ?",
                  buttons: [
                    $.extend({}, vex.dialog.buttons.YES,
                    { className: 'vex-dialog-button-primary', text: 'Ok', click: function($vexContent, event) {
                      deleteEvent(calEvent._id).then((res,err) => {
                        if (err) {
                            console.log(err);
                        } else {
                          $('#calendar').fullCalendar('removeEvents', function (event) {
                              return event == calEvent;
                            });
                        }
                      });
                      vex.close($vexContent.data().vex.id);
                    }}),
                      $.extend({}, vex.dialog.buttons.NO,
                      { className: 'vex-dialog-button-continue-shopping', text: 'Cancel', click: function($vexContent, event) {
                        vex.close($vexContent.data().vex.id);
                    }})
                  ]
                })
              },
              eventDrop: function (calEvent, dayDelta, minuteDelta, allDay, revertFunc) {
                vex.dialog.open({
                  message: "Voulez vous modifier cet événement ?",
                  buttons: [
                    $.extend({}, vex.dialog.buttons.YES,
                    { className: 'vex-dialog-button-primary', text: 'Ok', click: function($vexContent, event) {
                      var eventStart = calEvent.start._d;
                      var eventEnd = calEvent.end._d;
                      var event = { event : { start: eventStart, end: eventEnd }};
                      updateEvent(calEvent._id,event).then((res,err) => {
                         if (err) {
                             console.log(err);
                         } else {
                             this.setState({ listEvents: [ ...this.state.listEvents, ...res.event ] });
                               $('#calendar').fullCalendar('renderEvent', res.event, true);
                         }
                       });
                      vex.close($vexContent.data().vex.id);
                    }}),
                      $.extend({}, vex.dialog.buttons.NO,
                      { className: 'vex-dialog-button-continue-shopping', text: 'Cancel', click: function($vexContent, event) {
                        vex.close($vexContent.data().vex.id);
                        $('#calendar').fullCalendar('renderEvent', res.event, true);
                    }})
                  ]
                })
              },
              events: self.state.listEvents
            });
      }
    });
  }
  close() {
    this.setState({ showModal: false });
  }
  open(team) {
    this.setState({ showModal: true, etat: team });
  }

  chooseTeam(item,e) {
    if (this.state.etat === 1 ) {
      this.setState({teamOne: item}, function(){
        if(this.state.teamTwo !== null){
          if(this.state.teamOne._id === this.state.teamTwo._id){
             vex.dialog.alert("cette équipe a été déjà choisi !!<br/>vous devez choisir une autre équipe");
              this.setState({teamOne: null, showModal: true });
           }
        }
       }.bind(this));
    } else {
      this.setState({teamTwo: item}, function(){
        if(this.state.teamOne !== null) {
          if(this.state.teamOne._id === this.state.teamTwo._id){
             vex.dialog.alert("cette équipe a été déjà choisi !!<br/>vous devez choisir une autre équipe");
              this.setState({teamTwo: null, showModal: true });
           }
        }
         }.bind(this));
    }
    this.setState({ showModal: false });
  }
  onChangeInput(event) {
    var text= event.target.value;
    getTeams(text).then((res,err) => {
      if (err) {
          console.log(err);
      } else {
          this.setState({ textSearch:text, teams: res  });
      }
    });
  }
  onSaveEvent() {
      const requestURL = `${URL}/match`;
    const { teamOne, teamTwo, events, stade, start, end } = this.state;
    if(teamOne !== null && teamTwo !== null && start !== '' && end !== ''){
      var event = {teamOne: teamOne._id,teamTow: teamTwo._id, event: events, stade: stade._id, etat: 3 };
      createEvent(event).then((res,err) => {
         if (err) {
             console.log(err);
         } else {
             res.event.title = `${teamOne.name} vs ${teamTwo.name}`;
             this.setState({ listEvents: [ ...this.state.listEvents, ...res.event ] ,start: '', end: '', teamOne: null, teamTwo: null });
               $('#calendar').fullCalendar('renderEvent', res.event, true);
         }
       });
     }else{
        vex.dialog.alert("Vous devez choisir les deux équipes et l'heure du match avant l'enregistrement de votre événement");
      }
  }

  renderImage(item) {
      if(item.logo !== undefined){
        const uriImg = `${URL}/equipe/teamUploads/${item.logo}`;
        return <img src={ uriImg } width='40' height='40' alt='john_young' />
      }
      return <img src={ '/imgs/app/avatars/logoEquipe.jpg' } width='40' height='40' alt='john_young' />
  }
  renderList(){
      return this.state.teams.map((item) => {
        return (
          <div key={item._id} style={{ marginLeft: 50, marginBottom: 20,  marginRight: 50 }}>
            <MenuItem onClick={this.chooseTeam.bind(this,item)}>
              <Grid>
                <Row>
                  <Col xs={2} className='avatar-container' collapseRight>
                    {this.renderImage(item)}
                  </Col>
                  <Col xs={10} className='notification-container' collapseLeft collapseRight>
                    <div className='message-header'>
                      <span>Nom d'équipe: </span><em className='fg-darkblue'>{item.name}</em>
                    </div>
                    <div className='message-details fg-text'>
                      <span>Adresse: </span><em className='fg-darkblue'>{item.adresse}</em>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </MenuItem>
          </div>
      );
    });
  }
  renderModalTeam() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={::this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Choisir une équipe </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId='withIcon'>
              <FormControl type='text' placeholder='Chercher ...' onChange={(text) => {this.onChangeInput(text);}}/>
              <FormControl.Feedback>
                <Icon bundle='fontello' glyph='search' />
              </FormControl.Feedback>
            </FormGroup>
          </Modal.Body>
            {this.renderList() }
        </Modal>
      </div>
    );
  }
  renderImageButton1() {
    if(this.state.teamOne !== null  ){
      if(this.state.teamOne.logo === undefined){
        return <img src={ '/imgs/app/avatars/logoEquipe.jpg' } width='50' height='50' />
      }else {
        const uriImg = `${URL}/equipe/teamUploads/${this.state.teamOne.logo}`;
          return <img src={ uriImg } width='50' height='50'/>
      }

    }
    return <img src={ '/imgs/app/plus.png'} width='50' height='50' />
  }
  renderImageButton2(){
    if(this.state.teamTwo !== null){
      if(this.state.teamTwo.logo === undefined){
        return <img src={ '/imgs/app/avatars/logoEquipe.jpg'} width='50' height='50' />
      }else {
        const uriImg = `${URL}/equipe/teamUploads/${this.state.teamTwo.logo}`;
          return <img src={ uriImg } width='50' height='50'  />
      }

    }
    return <img src={ '/imgs/app/plus.png'} width='50' height='50' />
  }
  render() {
   var  todayDateString = new Date().toJSON().slice(0, 10);
    return (
      <Row>
        <Col sm={8}>
          <PanelContainer>
            <Panel>
              <PanelHeader className='bg-darkblue fg-white' style={{marginBottom: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <h3>Calendar: Agenda</h3>
                    </Col>
                  </Row>
                </Grid>
              </PanelHeader>
              <PanelBody style={{padding: 25}}>
                <div id='calendar'></div>
              </PanelBody>
            </Panel>
          </PanelContainer>
        </Col>
        {this.renderModalTeam()}
          <Col sm={4}>
        <PanelContainer>
          <Panel>
            <PanelBody style={{padding: 0}}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Créer un match</h3>
                    <hr></hr>
                    <div>
                      <label >Choisir les deux équipes</label>
                        <Col xs={6}>
                          <Button lg outlined bsStyle='primary' onClick={()=>{ this.open(1) }}>{this.renderImageButton1()}</Button>
                          <span  className='fg-darkblue'>{ (this.state.teamOne !== null) ? this.state.teamOne.name : ''}</span>
                        </Col>
                        <Col xs={6}>
                          <Button lg outlined bsStyle='primary' onClick={() => { this.open(2) }}>{this.renderImageButton2()}</Button>
                          <span style={{marginLeft: 50}} className='fg-darkblue'>{ (this.state.teamTwo !== null) ? this.state.teamTwo.name : ''}</span>
                        </Col>
                        <Col xs={12} style={{marginTop: 20}}>
                          <label >Date Début</label>
                          <input type="text" id="eventTimeStart" className="form-control" value={this.state.start} />
                        </Col>
                        <Col xs={12} style={{marginTop: 20}}>
                          <label >Date Fin</label>
                          <input type="text" id="eventTimeEnd" className="form-control" value={this.state.end} />
                        </Col>
                      </div>
                      <Button  style={{marginLeft: 160, marginBottom: 20, marginTop:20}} className='bg-darkblue fg-white' onClick={this.onSaveEvent.bind(this)}>Enregistrer</Button>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
      </Col>
      </Row>

    );
  }
}
