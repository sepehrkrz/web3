import React, { Component } from "react";
import Layout from "../../../components/Layout";
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaign'
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
               return campaign.methods.requests(index).call(); 
            })
        );
        console.log(approversCount);
        return{ address: address, requests, requestCount, approversCount}; //equivalent to {address}
    }

  // a helper method to render fetched requests info later in render() method
    renderRow() {
        return this.props.requests.map((request, index) => {
            return(
                <RequestRow
                    //{/*react needs a key when rendering a list of components*/}
                    key={index}
                    id={index} 
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }
  render() {
    //ES2015 de-structuring
    const {Header, Row, HeaderCell, Body} = Table;
    return(
        <Layout>
            
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary> Add Request </Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRow()}
                </Body>
            </Table>
        </Layout>
    );
  }
}

export default RequestIndex;
