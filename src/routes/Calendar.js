import React from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Grid,
  Panel,
  Table,
  Checkbox,
  PanelBody,
  PanelHeader,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';

export default class Calendar extends React.Component {
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
       }
  }
  componentDidMount() {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2014-08-12',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2014-08-01'
        },
        {
          title: 'Long Event',
          start: '2014-08-07',
          end: '2014-08-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2014-08-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2014-08-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2014-08-11',
          end: '2014-08-13'
        },
        {
          title: 'Meeting',
          start: '2014-08-12T10:30:00',
          end: '2014-08-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2014-08-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2014-08-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2014-08-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2014-08-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2014-08-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2014-08-28'
        }
      ]
    });
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <PanelContainer>
            <Panel>
              <PanelHeader className='bg-darkgreen45 fg-white' style={{marginBottom: 0}}>
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
      </Row>
    );
  }
}
