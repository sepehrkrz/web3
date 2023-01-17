//This file takes care of showing info about each campaig

import React, {Component} from 'react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import {Card, Button, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import {Link} from '../../routes';
import Campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            description1: summary[5],
            //props.query.address comes from routes.js
            address: props.query.address
        };
    }
    renderCards(){
        const items = [
          {
            header: this.props.description1,
            description:'Provided by the manager',
            meta: 'Title',
          },  
          {
            header: this.props.address,
            description:'',
            meta: 'Address of the contract',
            style: {overflowWrap:'break-word'}
          },
          {
              header: web3.utils.fromWei(this.props.balance, 'ether'),
              description:
                'The balance is how much money this campaing has left to spend',
              meta: 'Campaign balance (ether)',
            },
            {
              header: this.props.minimumContribution,
              description:
                'Minimum wei need to contribute to this campaign',
              meta: 'Minimum contrubution (wei)' ,
            },
            {
              header: this.props.requestsCount,
              description:
                'Requests',
              meta: 'Total requests this campaign has',
            },
            {
                header: this.props.approversCount,
                description:
                  'Approvers count',
                meta: 'Number of approvers',
              },
              {
                header: this.props.manager,
                description:
                  'The manager created this campaign and can create requests to withdraw money',
                meta: 'Address of Manager',
                style: {overflowWrap:'break-word'}
              },
          ]
          return <Card.Group items={items} />;
    }
    render() {
        return(
        <Layout>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ContributeForm  address={this.props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
        );
    }
}

export default CampaignShow;