import React from 'react';
import moment from 'moment';
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
import { updateStade } from '../api/StadeApi';

export default class ProfileStade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list : [],
                   refresh: ProfileStade.getCounter()
                  };
  }
  static counter: 0;
  static getCounter = function() {
    return 'counter-' + ++ProfileStade.counter;
  };
  static resetCounter = function() {
    ProfileStade.counter = 0;
  };

  componentDidMount() {
    let x= [];
    if (this.props.stade.options.vestiaire) {
      x.push('Vestiaire');
    }
    if (this.props.stade.options.cafe) {
      x.push('Cafe');
    }
    if (this.props.stade.options.lumiere) {
      x.push('Lumière');
    }
    if (this.props.stade.options.arbitre) {
      x.push('Arbitre');
    }
    this.setState({ list: x });
      this.renderEditable();
  }

  componentWillUnmount() {
      ProfileStade.resetCounter();
    $('#body, html').removeClass('social');
  }

  renderEditable() {
    $('.xeditable').editable({
      mode: this.state.mode
    });

    $('#name').editable({
      validate: function(value) {
        if($.trim(value) == '') return 'This field is required';
      }
    });

    var tarton = [];
    $.each({"1":" 1ér Géneration ","2":" 2éme Géneration ", "3":" 3éme Géneration ", "4":" 4éme Géneration ", "5":" 5éme Géneration ", "6":" 6éme Géneration "}, function(i,t){
      tarton.push({id: i, text: t});
    });

    $('#tarton').editable({
      mode: this.state.mode,
      source: tarton,
      select2: {
        width: 200,
        placeholder: 'Choisir qualité de tarton',
        allowClear: true
      }
    });
    var self = this;
    $('#options')
    .editable({
      mode: this.state.mode,
      pk: 1,
      limit: 4,
      source: [
        {value: 1, text: 'Vestiaire'},
        {value: 2, text: 'Café'},
        {value: 3, text: 'Lumière'},
        {value: 4, text: 'Arbitre'},
      ]
    })
    .on('save', function(e, params) {
      let options = { vestiaire: false,
                      cafe: false,
                      lumiere: false,
                      arbitre: false
                    };
      params.newValue.forEach((item) => {
        switch (item) {
          case "1":
            options.vestiaire = true;
            break;
          case "2":
            options.cafe = true;
            break;
          case "3":
            options.lumiere = true;
            break;
          case "4":
            options.arbitre = true;
            break;
          default:
        }
      });

      var stade = { _id: self.props.stade._id,options: options};
      updateStade(self.props.stade._id, stade).then((res, err) => {
        if (err) {
          console.log(err);
        } else {
          self.props.changeStade(res);
        }
      });
    });

    $('#stade .editable').on('hidden', function(e, reason){
      if(reason === 'save') {
        var $next = $(this).closest('tr').next().find('.editable');
        var value = e.target.text;
        var idStade = self.props.stade._id;
        var stade = { _id: idStade,[e.currentTarget.id]: value};

        if (e.currentTarget.id !== 'options') {
          updateStade(idStade, stade).then((res, err) => {
            if (err) {
              console.log(err);
            } else {
              self.props.changeStade(res);
            }
          })  ;
        }
      } else if(reason === 'nochange') {
        var $next = $(this).closest('tr').next().find('.editable');
      }
    });
  }
  toggleEditable() {
    $('#stade .editable').editable('toggleDisabled');
  }

  render() {
    return (
        <Col xs={7}>
          <Row>
            <Col xs={12}>
              <PanelContainer noOverflow>
                <Panel>
                  <PanelHeader className='bg-darkblue fg-white' style={{margin: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Profile</h3>
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
                              <Button outlined bsStyle='green' onClick={::this.toggleEditable}>Activé/Désactivé</Button>
                            </Col>
                          </Row>
                        </Grid>
                      </FormGroup>
                    </Form>
                    <Table striped bordered id='stade' style={{margin: 0}}>
                      <tbody>
                        <tr>
                          <td style={{width: 200}}>Nom de stade</td>
                          <td>
                            <a href='#' key={this.state.refresh} id="name" className='xeditable' data-placeholder='Required' data-pk='1' data-type='text' data-title='Ajouter nom de stade'>{this.props.stade.name}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Adresse</td>
                          <td>
                              <a href='#' key={this.state.refresh} id="adresse"className='xeditable' data-type='text' data-title='Ajouter adresse de stade'>{this.props.stade.adresse}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Ville</td>
                          <td>
                            <a href='#' key={this.state.refresh} id="city" className='xeditable' data-type='text' data-title='Ajouter ville de stade'>{this.props.stade.city}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Date de création</td>
                          <td>
                            <a href='#' key={this.state.refresh} id="createdAt" className='xeditable' data-type='text' data-title='Ajouter date de création'>{moment(this.props.stade.createdAt).format('DD/MM/YYYY')}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Options</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='options' data-type='checklist' data-title='Choisir des options'>{this.state.list+ ""}</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Qualité de stade</td>
                          <td>
                              <a href='#' key={this.state.refresh} id='tarton' data-type='select2' data-pk='1'  data-title='Choisir Qualité de tarton'>{this.props.stade.tarton}</a>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Col>
    );
  }
}
