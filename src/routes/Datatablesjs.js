import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Grid,
  Panel,
  Table,
  PanelBody,
  PanelHeader,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';
import { getAbonneesStade } from '../api/StadeApi';

export default class Datatablesjs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        $(ReactDOM.findDOMNode(this.example))
          .addClass('nowrap')
          .dataTable({
            responsive: true,
            "paging": false,
            "bFilter": false,
            columnDefs: [
              { targets: [-1, -3], className: 'dt-body-right' }
            ]
        });
        const stade = JSON.parse(localStorage.getItem('stade'));
        getAbonneesStade(stade._id).then((res) => {
            this.setState({ users: res.abonnees });
          }, (err) => {
            console.log(err);
          }
        );
    }
    renderUsers() {
        return this.state.users.map((item) => {
            return (
                <tr key={item.user._id}>
                  <td>{item.user.firstname}</td>
                  <td>{item.user.lastname}</td>
                  <td>{item.user.adresse}</td>
                  <td>{item.user.joueur.poste}</td>
                  <td>{item.user.joueur.age}</td>
                  <td>{item.user.joueur.taille} cm</td>
                </tr>
            );
        });
    }
    render() {
        return (
          <Row>
            <Col xs={12}>
              <PanelContainer>
                <Panel>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                            <Table ref={(c) => this.example = c} className='display' cellSpacing='0' width='100%'>
                              <thead>
                                <tr>
                                  <th>Nom</th>
                                  <th>Prénom</th>
                                  <th>Adresse</th>
                                  <th>Position</th>
                                  <th>Age</th>
                                  <th>Taille</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.renderUsers()}
                              </tbody>
                            </Table>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
      );
    }
}
