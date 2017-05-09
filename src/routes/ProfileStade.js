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

export default class ProfileStade extends React.Component {

  static counter: 0;
  static getCounter = function() {
    return 'counter-' + ++ProfileStade.counter;
  };
  static resetCounter = function() {
    ProfileStade.counter = 0;
  };

  state = {
    refresh: ProfileStade.getCounter() // used to redraw the component
  };
  componentDidMount() {
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

    $('#fruits').editable({
      mode: this.state.mode,
      pk: 1,
      limit: 3,
      source: [
        {value: 1, text: 'Lumière'},
        {value: 2, text: 'Café'},
        {value: 3, text: 'Vestiaire'},
        {value: 4, text: 'Arbitre'},
      ]
     });

    var countries = [];
    $.each({"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Bartelemey", "BM": "Bermuda", "BN": "Brunei Darussalam", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "O1": "Other Country", "LV": "Latvia", "RW": "Rwanda", "RS": "Serbia", "TL": "Timor-Leste", "RE": "Reunion", "LU": "Luxembourg", "TJ": "Tajikistan", "RO": "Romania", "PG": "Papua New Guinea", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "BZ": "Belize", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "TM": "Turkmenistan", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "RU": "Russian Federation", "EE": "Estonia", "EG": "Egypt", "TK": "Tokelau", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "EU": "Europe", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova, Republic of", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania, United Republic of", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "FX": "France, Metropolitan", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands (Malvinas)", "FM": "Micronesia, Federated States of", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "CI": "Cote d'Ivoire", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos (Keeling) Islands", "CA": "Canada", "CG": "Congo", "CF": "Central African Republic", "CD": "Congo, The Democratic Republic of the", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syrian Arab Republic", "KG": "Kyrgyzstan", "KE": "Kenya", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "Korea, Republic of", "SI": "Slovenia", "KP": "Korea, Democratic People's Republic of", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "Virgin Islands, British", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Lao People's Democratic Republic", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "A1": "Anonymous Proxy", "TO": "Tonga", "LT": "Lithuania", "A2": "Satellite Provider", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libyan Arab Jamahiriya", "VA": "Holy See (Vatican City State)", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "Virgin Islands, U.S.", "IS": "Iceland", "IR": "Iran, Islamic Republic of", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AN": "Netherlands Antilles", "AQ": "Antarctica", "AP": "Asia/Pacific Region", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}, function(k, v) {
        countries.push({id: k, text: v});
    });
    var tarton = [];
    $.each({"1":" 1ér Géneration ","2":" 2éme Géneration ", "3":" 3éme Géneration ", "4":" 4éme Géneration ", "5":" 5éme Géneration ", "6":" 6éme Géneration "}, function(i,t){
      tarton.push({id: i, text: t});
    });

    $('#country').editable({
      mode: this.state.mode,
      source: countries,
      select2: {
        width: 200,
        placeholder: 'Choisir votre pays',
        allowClear: true
      }
    });
    $('#countries').editable({
      mode: this.state.mode,
      source: countries,
      select2: {
        width: 200,
        placeholder: 'Choisir votre pays',
        allowClear: true
      }
    });
    $('#stade').editable({
      mode: this.state.mode,
      source: tarton,
      select2: {
        width: 200,
        placeholder: 'Choisir qualité de tarton',
        allowClear: true
      }
    });

    var self = this;
    $('#user .editable').on('hidden', function(e, reason){
      if(reason === 'save' || reason === 'nochange') {
        var $next = $(this).closest('tr').next().find('.editable');
        if(self.refs.autoopen.isChecked()) {
          setTimeout(function() {
            $next.editable('show');
          }, 300);
        } else {
          $next.focus();
        }
      }
    });
    $('#stade .editable').on('hidden', function(e, reason){
      if(reason === 'save' || reason === 'nochange') {
        var $next = $(this).closest('tr').next().find('.editable');
        if(self.refs.autoopen.isChecked()) {
          setTimeout(function() {
            $next.editable('show');
          }, 300);
        } else {
          $next.focus();
        }
      }
    });
  }
  toggleEditablePrfile() {
    $('#user .editable').editable('toggleDisabled');
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
                            <a href='#' key={this.state.refresh} className='xeditable' data-type='text' data-title='Modifier nom de stade'>Nom</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Adresse</td>
                          <td>
                              <a href='#' key={this.state.refresh} id='countries' data-type='select2' data-pk='1' data-value='TN' data-title='Choisir votre pays'></a>
                          </td>
                        </tr>
                        <tr>
                          <td>Ville</td>
                          <td>
                            <a href='#' key={this.state.refresh} className='xeditable' data-type='text' data-title='Modifier ville de stade'> Ville</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Date de création</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='dob' className='xeditable' data-type='combodate' data-placeholder='Required' data-pk='1' data-title='Select Date of birth' data-value='1984-05-15' data-format='YYYY-MM-DD' data-viewformat='DD/MM/YYYY' data-template='D / MM / YYYY'></a>
                          </td>
                        </tr>
                        <tr>
                          <td>Options</td>
                          <td>
                            <a href='#' key={this.state.refresh} id='fruits' data-type='checklist' data-value='2,3' data-title='Select fruits'></a>
                          </td>
                        </tr>
                        <tr>
                          <td>Qualité de stade</td>
                          <td>
                              <a href='#' key={this.state.refresh} id='stade' data-type='select2' data-pk='1' data-value='5' data-title='Choisir Qualité de tarton'></a>
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