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

@withRouter
export default class Signup extends React.Component {
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
   handleNavigation() {
    this.props.router.push('/ltr/ContactInformation');
  }
    componentDidMount() {
    $('#my-awesome-dropzone').dropzone({
      paramName: "file", // The name that will be used to transfer the file
      maxFilesize: 2, // MB
      accept: (file, done) => {
        done();
      }
    });
  }
  render() {

    return (
      <div id='auth-container' className='login' style={{background:"#fff"}}>
        <div id='auth-row'>
          <div id='auth-cell' >
            <Grid>
              <Row>
                <Col sm={6} smOffset={3} xs={10} xsOffset={1} >
                  <PanelContainer controls={false} >
                    <Panel>
                      <PanelBody style={{padding: 0}} >
                        <div className='text-center  fg-white'style={{background:"#281454"}}>
                          <h3 style={{margin: 0, padding: 25}}>Welcome to Treatwell.Let's get started</h3>
                        </div>
                        <div className=' fg-black50 text-center' style={{padding: 25, paddingTop: 12.5,background:'#fff'}}>
                            <Grid>
                              <Row>
                                <Col xs={12}>
                             
                                  <Form onSubmit={::this.back}>
                                      <FormGroup controlId='username'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-user' />
                                          </InputGroup.Addon>
                                          <FormControl autoFocus type='text' className='border-focus-blue' placeholder='Username' />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup controlId='emailaddress'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-mail' />
                                          </InputGroup.Addon>
                                          <FormControl type='email' className='border-focus-blue' placeholder='support@sketchpixy.com' />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup controlId='emailaddress'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-mail' />
                                          </InputGroup.Addon>
                                          <FormControl type='email' className='border-focus-blue' placeholder='support@sketchpixy.com' />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup controlId='emailaddress'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-mail' />
                                          </InputGroup.Addon>
                                          <FormControl type='email' className='border-focus-blue' placeholder='support@sketchpixy.com' />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup controlId='password'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-key' />
                                          </InputGroup.Addon>
                                          <FormControl type='password' className='border-focus-blue' placeholder='password' />
                                        </InputGroup>
                                      </FormGroup>
                                  </Form>
                                       <FormGroup controlId='City'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-location-6' />
                                          </InputGroup.Addon>
                                          <FormControl autoFocus type='text' className='border-focus-blue' placeholder='City' />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup controlId='Country'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-location-6' />
                                          </InputGroup.Addon>
                                          <FormControl autoFocus type='text' className='border-focus-blue' placeholder='Country' />
                                        </InputGroup>
                                      </FormGroup>
                                           <FormGroup controlId='Birthday'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-calendar-5' />
                                          </InputGroup.Addon>
                                          <FormControl autoFocus type='text' className='border-focus-blue' placeholder='Birthday' />
                                        </InputGroup>
                                      </FormGroup>
                                       <FormGroup controlId='Phone'>
                                        <InputGroup bsSize='large'>
                                          <InputGroup.Addon>
                                            <Icon glyph='icon-fontello-phone-3' />
                                          </InputGroup.Addon>
                                          <FormControl autoFocus type='text' className='border-focus-blue' placeholder='Phone' />
                                        </InputGroup>
                                      </FormGroup>
                                   <Form action='/dropzone/file-upload'
                            className='dropzone'
                            id='my-awesome-dropzone'>
                      </Form>
                                  <p>Accept term and conditions</p>
                                  <Button block type='submit' id='twitter-btn' lg  onClick={::this.handleNavigation} style={{background:'pink'}}>
                                    
                                    <span>Create account</span>
                                  </Button>
                                </Col>
                              </Row>
        
                            </Grid>

                            
                        </div>
                        <div className=' fg-black50 text-center' style={{padding: 5,background:'#ddd',paddingLeft:'50%'}}>
                          <div>
                            Already have an account? <Link to={::this.getPath('login')}>Login</Link>
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
