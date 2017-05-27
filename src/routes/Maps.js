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

import { updateStade } from '../api/StadeApi';

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.geocode = null;
    this.state = { latitude: 0, longitude: 0, stade: null, visible: false, inputVide:'' };
  }

  geoCode(address) {
      GMaps.geocode({
      address: address,
      callback: (results, status) => {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.geocode.setCenter(latlng.lat(), latlng.lng());
          var lat = latlng.lat();
          var lng = latlng.lng();
          this.setState({ latitude: lat , longitude: lng });
          this.geocode.removeMarkers();
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
    if(typeof(Storage) !== "undefined"){
       var user = JSON.parse(localStorage.getItem('user'));
       var stade = JSON.parse(localStorage.getItem('stade'));
       this.setState({ stade: stade, visible: true });
         if (user === null) {
             this.props.router.push('/ltr/login');
         }
     }
    (() => {
         this.geocode = new GMaps({
           scrollwheel: false,
           div: '#geocode',
           zoom: 7,
           lat: stade.latitude,
           lng: stade.longitude
         });
         this.geocode.addMarker({
           lat: stade.latitude,
           lng: stade.longitude,
           draggable: true,
           dragend: (e) => {
               this.setState({ latitude: e.latLng.lat(), longitude: e.latLng.lng() });
           }
         });
    })();
  }
  onChangeInput(event) {
    this.setState({ visible: false,inputVide: event.target.value});
  }

  handleSave() {
      this.setState({visible: true, inputVide:''});
    const { latitude, longitude } = this.state;
    const idStade = this.state.stade._id;
    const stade = { _id: idStade, latitude, longitude  };
    updateStade(idStade, stade).then((res, err) => {
      if (err) {
        console.log(err);
      } else {
        localStorage.setItem('stade', JSON.stringify(res));
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.geoCode($('#address').val());
  }

  renderButton() {
    if(this.state.visible == false){
      return(
        <Button style={{margin: 10}}  outlined onClick={this.handleSave.bind(this)} bsStyle='darkgreen45'>Enregistrer</Button>
      );
    }
  }
  render() {
    return (
      <div>
        <Form onSubmit={::this.handleSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl type='text' id='address' placeholder='Address' defaultValue=''   value={this.state.inputVide} onChange={(text) => {this.onChangeInput(text);}} />
              <InputGroup.Button className='plain'>
                <Button outlined onlyOnHover type='submit' onClick={() => this.setState({visible: false})} bsStyle='darkgreen45'>search</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Form>
        {this.renderButton()}
      </div>
    );
  }
}
