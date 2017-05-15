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
} from '@sketchpixy/rubix';
import { auth } from '../api/UserApi';
const INITIALSTATE = {
  email: '',
  password: '',
  testEmail: null,
  testPassword: null,
  error: ''
 }
@withRouter
export default class Login extends React.Component {

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

  onChangeEmail(event) {
    this.setState({ email: event.target.value, testEmail: this.validateEmail(event.target.value) });

  }
  onChangePassword(event) {
    this.setState({ password: event.target.value, testPassword: this.validatePassword(event.target.value) });
  }
  handleClick(event) {
    event.preventDefault();
    const { testEmail, testPassword, email, password, error } = this.state;
    if(testEmail === true && testPassword === true){
      const user = { email: this.state.email, password: this.state.password };
      auth(user).then((res) => {
        if (res.success === true) {
          if(res.user.role !== 'Manager') {
             this.setState({ error: "User Not Found"});
          } else {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('stade', JSON.stringify(res.stade));
            this.setState(INITIALSTATE);
            setTimeout(() => {
              this.props.router.push('/ltr/profile');
            }, 1000);
          }
        } else if (res.success === false) {
            this.setState({ error: res.message });
        }
        }, (err) => {
          console.log(err);
        }
      );
    } else {
      this.setState({ error: "Vérifier vos champs "});
    }
  }

  render() {
    return (
      <div id='auth-container' className='login'>
        <div id='auth-row'>
          <div id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={4} smOffset={4} xs={10} xsOffset={1} collapseLeft collapseRight>
                  <PanelContainer controls={false}>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Connecter à MiniFoot</h3>
                        </div>
                        <div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={::this.back}>
                              <FormGroup controlId='emailaddress'>
                                <InputGroup bsSize='large'>
                                  <InputGroup.Addon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroup.Addon>
                                  <FormControl autoFocus type='email' className='border-focus-blue' placeholder='exemple@exemple.com'
                                      value={this.state.email} onChange={this.onChangeEmail.bind(this)}
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
                                      value={this.state.password} onChange={this.onChangePassword.bind(this)}
                                  />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <label>{ (this.state.testPassword === false)? 'Password non valide' : '' }</label>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      <label>{ this.state.error }</label>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      <Link to={::this.getPath('signup')}>Créer un compte</Link>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                                      <Button outlined lg type='submit' bsStyle='blue' onClick={this.handleClick.bind(this)}>Connection</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
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
