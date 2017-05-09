import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router';

import {
  Row,
  Col,
  Icon,
  Grid,
  Form,
  Badge,
  Panel,
  Button,
  PanelBody,
  FormGroup,
  LoremIpsum,
  InputGroup,
  FormControl,
  ButtonGroup,
  ButtonToolbar,
  PanelContainer,
  Image
} from '@sketchpixy/rubix';
import { create } from '../api/UserApi';

const INITIALSTATE = {
  email: '',
  password: '',
  testEmail: null,
  testPassword: null,
  firstname: '',
  lastname: '',
  adresse: '',
  testFirstName: null,
  testLastName: null,
  testAdresse: null,
  error: ''
 }

@withRouter
export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = INITIALSTATE;
  }
   validateEmail(email){
    if (email !== '') {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
      return null;
  }
   validatePassword(password) {
    if (password !== '') {
      const re =(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
      return re.test(password);
    }
    return null;
  }
  testChampVide(text) {
    if (text === '' || text.length < 3) {
      return false;
    }
    return true;
  }

  back(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.router.goBack();
  }

  componentDidMount() {
    $('html').addClass('authentication');
  }

  componentWillUnmount() {
    $('html').removeClass('authentication');
  }

  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }
   handleSignUp(event) {
     event.preventDefault();
     const { firstname, lastname, adresse,
             email, password, testEmail, testPassword,
             testFirstName, testLastName, testAdresse
           } = this.state;

     const user = { firstname, lastname, adresse, email, password, role: 'Manager' };
     if ((testEmail === true) &&
         (testPassword === true) &&
         (testFirstName === true) &&
         (testLastName === true) &&
         (testAdresse === true)) {
           create(user).then((res) => {
             if (res.success === true) {
               this.setState({ INITIALSTATE });
               this.props.router.push('/ltr/Login');
             } else if (res.success === false) {
               this.setState({ error: res.message });
             }
             }, (err) => {
               console.log(err);
             }
           );
     } else {
      this.setState({ error: 'Veuillez vérifier vos champs' });
     }

  }

  onChangeTextInput(event, prop) {
    switch (prop) {
      case 'firstname':
        return this.setState({ firstname: event.target.value, testFirstName: this.testChampVide(event.target.value) });
      case 'lastname':
        return this.setState({ lastname: event.target.value, testLastName: this.testChampVide(event.target.value) });
      case 'adresse':
        return this.setState({ adresse: event.target.value, testAdresse: this.testChampVide(event.target.value) });
      case 'email':
        return this.setState({ email: event.target.value, testEmail: this.validateEmail(event.target.value) });;
      case 'password':
        return this.setState({ password: event.target.value, testPassword: this.validatePassword(event.target.value) });;
      default:
          return true;
    }

  }

  render() {

    return (
      <div id='auth-container' className='login'>
        <div id='auth-row'>
          <div id='auth-cell' >
            <Grid>
              <Row>
                <Col sm={6} smOffset={3} xs={10} xsOffset={1} >
                  <PanelContainer controls={false} >
                    <Panel>
                      <PanelBody style={{padding: 0}} >
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Bienvenue</h3>
                        </div>
                        <div className=' fg-black50 text-center' style={{padding: 25, paddingTop: 12.5,background:'#fff'}}>
                            <Grid>
                              <Row>
                                <Col xs={12}>

                                  <Form>
                                      <FormGroup controlId='username'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-user' />
                                          </InputGroup.Addon>
                                          <FormControl autoFocus type='text' className='border-focus-blue' placeholder='Nom'
                                            value={this.state.firstname} onChange={(text) => {this.onChangeTextInput(text, 'firstname');}}
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <label>{ (this.state.testFirstName === false)? 'Nom non valide' : '' }</label>
                                      </FormGroup>
                                      <FormGroup controlId='userlastname'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-user' />
                                          </InputGroup.Addon>
                                          <FormControl type='email' className='border-focus-blue' placeholder='Prénom'
                                              value={this.state.lastname} onChange={(text) => {this.onChangeTextInput(text, 'lastname');}}
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <label>{ (this.state.testLastName === false)? 'Prénom non valide' : '' }</label>
                                      </FormGroup>
                                      <FormGroup controlId='emailaddress'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-mail' />
                                          </InputGroup.Addon>
                                          <FormControl type='email' className='border-focus-blue' placeholder='exemple@exemple.com'
                                              value={this.state.email} onChange={(text) => {this.onChangeTextInput(text, 'email');}}
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <label>{ (this.state.testEmail === false)? 'E-mail non valide' : '' }</label>
                                      </FormGroup>
                                      <FormGroup controlId='password'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-key' />
                                          </InputGroup.Addon>
                                          <FormControl type='password' className='border-focus-blue' placeholder='Mot de passe'
                                              value={this.state.password} onChange={(text) => {this.onChangeTextInput(text, 'password');}}
                                           />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <label>{ (this.state.testPassword === false)? 'Mot de passe non valide' : '' }</label>
                                      </FormGroup>
                                      <FormGroup controlId='City'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-location-6' />
                                          </InputGroup.Addon>
                                          <FormControl type='text' className='border-focus-blue' placeholder='Adresse'
                                            value={this.state.adresse} onChange={(text) => {this.onChangeTextInput(text, 'adresse');}}
                                            />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <label>{ (this.state.testAdresse === false)? 'Adresse non valide' : '' }</label>
                                      </FormGroup>
                                        <label>{ this.state.error }</label>
                                      <Button block lg type='submit' bsStyle='blue'  id='twitter-btn'  onClick={this.handleSignUp.bind(this)}>
                                        <span>Inscription</span>
                                      </Button>

                                  </Form>
                                </Col>
                              </Row>

                            </Grid>


                        </div>
                        <div className=' fg-black50 text-center' style={{padding: 5,background:'#ddd',paddingLeft:'50%'}}>
                          <div>
                            Vous avez déja un compte ? <Link to={::this.getPath('login')}>Connecter</Link>
                          </div>
                        </div>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
