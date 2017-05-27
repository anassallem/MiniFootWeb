import React from 'react';
import {
  Row,
  Col,
  Icon,
  Grid,
  Panel,
  Image,
  Button,
  PanelBody,
  PanelHeader,
  PanelFooter,
  FormControl,
  PanelContainer,
  Nav,
  Form,
  Radio,
  Table,
  Checkbox,
  FormGroup,
  InputGroup,
  ButtonGroup,
  ControlLabel,
} from '@sketchpixy/rubix';
import { updateUser, uploadImageUser } from '../api/UserApi';
import { URL } from '../api/config';

export default class ProfileUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        refresh: ProfileUser.getCounter(),
        changeButton: false
    };
  }
  static counter: 0;
  static getCounter = function() {
    return 'counter-' + ++ProfileUser.counter;
  };
  static resetCounter = function() {
    ProfileUser.counter = 0;
  };

  componentDidMount() {
      this.renderEditable();
  }

  componentWillUnmount() {
      ProfileUser.resetCounter();
    $('#body, html').removeClass('social');
  }

  renderEditable() {
    $('.xeditable').editable({
      mode: this.state.mode
    });

    var self = this;
    $('#user .editable').on('hidden', function(e, reason){
      if(reason === 'save') {
        var $next = $(this).closest('tr').next().find('.editable');
        var value = e.target.text;
        var idUser = self.props.user._id;
        var user = { _id: idUser,[e.currentTarget.id]: value};
          updateUser(idUser, user).then((res, err) => {
            if (err) {
              console.log(err);
            } else {
              self.props.changeUser(res);
            }
          });
      } else if(reason === 'nochange') {
        var $next = $(this).closest('tr').next().find('.editable');
      }
    });
  }
  toggleEditableProfile() {
    $('#user .editable').editable('toggleDisabled');
  }
   uploadImage(e) {
      var idUser = this.props.user._id;
       let file = e.target.files[0];
       console.log(file);
      //var photo = this.props.user.photo;
      var data = new FormData();
      data.append('file', file);
      data.append('name', 'name');

    uploadImageUser(idUser,data ).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
          this.props.changeUser(res);
      }
    });
  }
   renderButton() {
    if(this.state.changeButton == true){
      return(
        <Button style={{margin: 10}} onClick={this.uploadImage.bind(this)}>Changer</Button>
      );
    }
  }

  render() {
    return (
        <PanelContainer noOverflow>
                <Panel>
                  <PanelHeader className='bg-darkblue fg-white' style={{margin: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Profile Manager</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody style={{padding: 25}}>
                    <Form>
                      <FormGroup controlId='changemode'>
                        <Grid>
                          <Row>
                            <Col xs={12} className='text-right' collapseRight>
                              <Button outlined bsStyle='green' onClick={::this.toggleEditableProfile}>Activé/Désactivé</Button>
                            </Col>
                          </Row>
                        </Grid>
                      </FormGroup>
                    </Form>
                    <Table striped bordered id='user' style={{margin: 0}}>
                      <tbody>
                        <tr>
                          <td style={{width: 150}}>Nom</td>
                          <td>
                            <a href='#' key={this.state.refresh} id="firstname" className='xeditable' data-type='text' data-title='Modifier votre nom'>{this.props.user.firstname}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Prénom</td>
                          <td>
                            <a href='#' key={this.state.refresh} id="lastname" className='xeditable' data-type='text' data-title='Modifier votre prénom'>{this.props.user.lastname}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>E-mail</td>
                          <td>
                            <a href='#' key={this.state.refresh} id="email" className='xeditable' data-type='text' data-title='Modifier votre e-mail'>{this.props.user.email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Adresse</td>
                          <td>
                          <a href='#' key={this.state.refresh} id="adresse" className='xeditable' data-type='text' data-title='Modifier votre adresse'>{this.props.user.adresse}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Photo</td>
                          <td>
                            <form >
                              <input name="file" type="file" onChange={() => {this.setState({ changeButton: true });}}/>
                              {this.renderButton()}
                          </form>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </PanelBody>
                </Panel>
              </PanelContainer>

    );
  }
}
