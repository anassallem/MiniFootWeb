import React from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import axios from 'axios';
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
  ControlLabel,
  FormControl,
  PanelBody,
  FormGroup,
  ListGroup,
  LoremIpsum,
  ButtonGroup,
  ButtonToolbar,
  ListGroupItem,
  PanelContainer,
  HelpBlock,
  Form,
  Table,
  PanelHeader
} from '@sketchpixy/rubix';
import { URL } from '../api/config';
import { uploadImageEvent, addAdvertEvenement, getListEvents, deleteEventById } from '../api/EvenementApi';

export default class Evenement extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], title: '', description: '', error: '', dateBegin: moment(new Date()).format('YYYY-MM-DD').toString() , dateEnd:  moment(new Date()).format('YYYY-MM-DD').toString()};
  }
  componentDidMount() {
      const stade = JSON.parse(localStorage.getItem('stade'));
      getListEvents(stade._id).then((res) => {
          this.setState({ events: res });
      }, (err) => {
          console.log(err);
      });
  }
  onChangeDescription(event) {
      this.setState({ description: event.target.value });
  }
  onChangeTitle(event) {
      this.setState({ title: event.target.value });
  }
  onChangeDateBegin(e) {
      this.setState({ dateBegin: e.target.value });
  }
  onChangeDateEnd(e) {
      this.setState({ dateEnd: e.target.value });
  }
  handleClick(e) {
    //e.preventDefault();
    if (this.state.description === '') {
        this.setState({ error: 'description est vide' });
    } else if (this.state.title === '') {
        this.setState({ error: 'titre est vide' });
    } else if (this.state.dateBegin > this.state.dateEnd) {
        this.setState({ error: 'Date fin est supérieure à date début' });
    } else {
        var stade = JSON.parse(localStorage.getItem('stade'));
        if (this.fileUpload.files.length > 0) {
            const file = this.fileUpload.files[0];
            var data = new FormData();
            data.append('photo', file);
            data.append('name', 'name');
            data.append('title', this.state.title);
            data.append('description', this.state.description);
            data.append('dateBegin', this.state.dateBegin);
            data.append('dateEnd', this.state.dateEnd);
            uploadImageEvent(data, stade._id).then((res) => {
                this.setState({ events: [...res, ...this.state.events], title: '', description: '', error: '', dateBegin:  moment(new Date()).format('YYYY-MM-DD').toString(), dateEnd: moment(new Date()).format('YYYY-MM-DD').toString() });
            }, (err) => {
                console.log(err);
            });
        } else {
            const advert = { advertEvent: { title: this.state.title, description: this.state.description, dateBegin: this.state.dateBegin, dateEnd: this.state.dateEnd }, type: 'AdvertEvent' };
            addAdvertEvenement(advert, stade._id).then((res) => {
                this.setState({ events: [...res, ...this.state.events], title: '', description: '', error: '', dateBegin:  moment(new Date()).format('YYYY-MM-DD').toString(), dateEnd: moment(new Date()).format('YYYY-MM-DD').toString() });
            }, (err) => {
                console.log(err);
            });
        }

    }
  }
  handleClickDelete(evenement, e) {
      deleteEventById(evenement._id).then((res) => {
          this.setState({ events: this.state.events.filter((item => { return (item._id !== evenement._id) })) });
        }, (err) => {
          console.log(err);
        }
      );
  }
  renderEvents() {
      return this.state.events.map((item) => {
          return (
              <tr key={item._id}>
                  <td>
                    <label>{item.advertEvent.title}</label>
                  </td>
                  <td>
                    <label>{item.advertEvent.description}</label>
                  </td>
                  <td>
                    <label>{moment(item.advertEvent.dateBegin).format('YYYY-MM-DD').toString()}</label>
                  </td>
                  <td>
                    <label>{moment(item.advertEvent.dateEnd).format('YYYY-MM-DD').toString()}</label>
                  </td>
                  <td>
                    <Button sm outlined  bsStyle='danger' onClick={this.handleClickDelete.bind(this, item)}>Supprimer</Button>
                  </td>
              </tr>
          );
      });
  }
  render() {
    return (
        <Row>
          <Row>
            <Col xs={12}>
              <PanelContainer>
                <Panel>
                  <PanelHeader className='bg-darkblue fg-white' style={{marginBottom: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Événements</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody style={{padding: 25}}>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                              <FormGroup controlId='blockhelp'>
                                 <ControlLabel>Titre</ControlLabel>
                                  <FormControl type='text' placeholder='Ecrire votre titre' value={this.state.title} onChange={this.onChangeTitle.bind(this)} />
                              </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                              <FormGroup controlId='textarea'>
                                  <ControlLabel>Description</ControlLabel>
                                  <FormControl componentClass='textarea' rows='3' placeholder='Ecrire une description...' value={this.state.description} onChange={this.onChangeDescription.bind(this)} />
                              </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                              <form>
                                  <FormGroup controlId="formControlsFile">
                                      <ControlLabel>Choisir une image</ControlLabel>
                                      <input name="file" type="file" ref={(ref) => this.fileUpload = ref} />
                                      <HelpBlock>Cette option n'est pas obligatoire</HelpBlock>
                                  </FormGroup>
                              </form>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={3}>
                              <label>Date début</label>
                          </Col>
                          <Col xs={3}>
                              <input name='date' type ='date' onChange={this.onChangeDateBegin.bind(this)} value={moment(this.state.dateBegin).format('YYYY-MM-DD').toString()}></input>
                          </Col>
                          <Col xs={3}>
                               <label>Date fin</label>
                          </Col>
                          <Col xs={3}>
                              <input name='date' type ='date' onChange={this.onChangeDateEnd.bind(this)} value={moment(this.state.dateEnd).format('YYYY-MM-DD').toString()}></input>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                          <Col xs={12}>
                              <Button lg outlined style={{marginBottom: 5}} bsStyle='primary' onClick={this.handleClick.bind(this)}>Enregistrer</Button>
                              <label>{ (this.state.error !== '')? this.state.error : '' }</label>
                          </Col>
                        </Row>
                      </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PanelContainer>
                <Panel>
                  <PanelHeader className='bg-darkblue fg-white' style={{marginBottom: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Listes des Événements</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody style={{padding: 25}}>
                      <Table striped bordered className='tablesaw' data-tablesaw-sortable data-tablesaw-sortable-switch>
                          <thead>
                            <tr>
                              <th>Titre</th>
                              <th>Description</th>
                              <th>Date début</th>
                              <th>Date fin</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                              {this.renderEvents()}
                          </tbody>
                      </Table>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Row>
    );
  }
}
