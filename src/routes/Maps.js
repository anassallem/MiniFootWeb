import React from 'react';

import {
  Row,
  Col,
  Grid,
  Form,
  Panel,
  Button,
  FormGroup,
  PanelBody,
  InputGroup,
  FormControl,
  PanelHeader,
  PanelContainer,
} from '@sketchpixy/rubix';

class MapContainer extends React.Component {
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 25}}>
            <h4 className='text-center' style={{marginTop: 0}}>{this.props.name}</h4>
            {this.props.children}
            <div id={this.props.id} style={{height: 300}}></div>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.geocode = null;
    this.state = { latitude: 0, longitude: 0 };
  }

  geoCode(address) {
    GMaps.geocode({
      address: address,
      callback: (results, status) => {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.geocode.setCenter(latlng.lat(), latlng.lng());
          this.geocode.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            draggable: true,
            dragend: (e) => {
                this.setState({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
            },
            infoWindow: {
              content: '<div><strong>Address:</strong> '+results[0].formatted_address+'</div>'
            }
          });
        }
      }
    });
  }

  componentDidMount() {
    (() => {
      this.geocode = new GMaps({
        scrollwheel: false,
        div: '#geocode',
        zoom: 7,
        lat: 35.825603,
        lng: 10.608394999999973
      });
    })();

  }
  handleSave() {
      console.log(this.state);
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.geoCode($('#address').val());
  }


  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            <MapContainer id='geocode' name='Geocoding'>
              <Form onSubmit={::this.handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <FormControl type='text' id='address' placeholder='Address' defaultValue='' />
                    <InputGroup.Button className='plain'>
                      <Button outlined onlyOnHover type='submit' bsStyle='darkgreen45'>search</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </Form>
              <Button lg outlined onClick={this.handleSave.bind(this)} bsStyle='darkgreen45'>Enregistrer</Button>
            </MapContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
