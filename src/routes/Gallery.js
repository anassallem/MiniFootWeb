import React from 'react';
import axios from 'axios';

import {
  Row,
  Col,
  Icon,
  Grid,
  Panel,
  Image,
  Form,
  FormControl,
  Table,
  Button,
  PanelBody,
  PanelHeader,
  PanelContainer,
} from '@sketchpixy/rubix';

import { URL } from '../api/config';
import { getImagesStade } from '../api/StadeApi';
class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active || false
    };
  }
  handleIncrement(e) {
    if(this.state.active) return;
    this.setState({ active: true });
  }
  componentDidMount() {

  }
  render() {
      const img =`${URL}/stade/stadeUploads/${this.props.image}`;
    return (
      <PanelContainer>
        <Panel>
          <PanelHeader>
            <Grid className='gallery-item'>
              <Row>
                <Col xs={12} style={{padding: 12.5}}>
                  <a className='gallery-1 gallery-item-link' href={img} title={this.props.title}>
                    <Image responsive src={img} alt={this.props.title} width='200' height='150'/>
                    <div className='black-wrapper text-center'>
                      <Table style={{height: '100%', width: '100%'}}>
                        <tbody>
                          <tr>
                            <td>
                              <Icon glyph='icon-outlined-magnifier-plus icon-3x' />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </a>
                </Col>
              </Row>
            </Grid>
          </PanelHeader>
        </Panel>
      </PanelContainer>
    );
  }
}

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { images: [], visible: false, photos: [] };
    }
    componentDidMount() {
        const stade = JSON.parse(localStorage.getItem('stade'));
        getImagesStade(stade._id).then((res) => {
            this.setState({ photos: res });
          }, (err) => {
            console.log(err);
          });
        var links = document.getElementsByClassName('gallery-1');
        $('.gallery-1').unbind('click').bind('click', function(event) {
          blueimp.Gallery(links, {
            index: $(this).get(0),
            event: event
          });
        });
        $('#my-awesome-dropzone').dropzone({
          paramName: "file", // The name that will be used to transfer the file
          maxFilesize: 2, // MB
          accept: (file, done) => {
            this.setState({ visible: true, images: [...this.state.images, ...file]});
            done();
          }
        });
    }
    handleUploadImages() {
        const stade = JSON.parse(localStorage.getItem('stade'));
        let self = this;
        this.state.images.forEach((item) => {
            const imageName = `image${Date.now()}`;
            let form = new FormData();
            form.append('name', imageName);
            form.append('photo', item);
             axios.post(`${URL}/stade/stadeUploads/${stade._id}/photos`,form,
                {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }})
                            .then(function (response) {
                                console.log(response);
                                self.setState({ visible: false,
                                images: self.state.images.filter((img)=> img.name === item.name),
                                photos: [...response.data.name, ...self.state.photos]
                            });
                            }) .catch(function (error) {
                                console.log(error);
                            });
        });
        $('#my-awesome-dropzone').empty();
    }
    renderButtonUpload() {
        if (this.state.visible) {
            return <Button outlined bsStyle='success' onClick={this.handleUploadImages.bind(this)}>Upload</Button>;
        }
    }
    renderPhotosStade() {
        console.log(this.state.photos);
        if (this.state.photos.length > 0) {
            return this.state.photos.map((item) => {
                return (
                    <Col xs={6} sm={4} collapseRight key={item}>
                        <GalleryItem image={item} title='Image' />
                    </Col>
                );
            });
        }
    }
    render() {
        return (
          <div>
              <Row>
                <Col sm={12}>
                  <PanelContainer>
                    <Panel>
                      <PanelHeader className='bg-darkgreen45 fg-white' style={{margin: 0}}>
                        <Grid>
                          <Row>
                            <Col xs={12}>
                              <h3>Upload images</h3>
                            </Col>
                          </Row>
                        </Grid>
                      </PanelHeader>
                      <PanelBody>
                        <Grid>
                          <Row style={{marginTop: 10}}>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={10}>
                                        <h4>Clicker ou gliser vos images pour les télécharger dans le serveur</h4>
                                    </Col>
                                    <Col xs={2}>
                                        {this.renderButtonUpload()}
                                    </Col>
                                </Row>
                              <Form action='/dropzone/file-upload'
                                    className='dropzone'
                                    id='my-awesome-dropzone'>
                              </Form>
                            </Col>
                          </Row>
                        </Grid>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
              <Row className='gallery-view'>
                {this.renderPhotosStade()}
              </Row>
          </div>
    );
    }
}
