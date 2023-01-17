import React, {Component} from 'react'
import { Table, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3';

class RequestRow extends Component{

    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send ({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send ({
            from: accounts[0]
        });
    };


    render() {
        const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2 ;
        return(
            <Table.Row disabled={this.props.request.complete} positive={readyToFinalize}>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell>{this.props.request.description}</Table.Cell>
                <Table.Cell>{this.props.request.value}</Table.Cell>
                <Table.Cell>{this.props.request.recipient}</Table.Cell>
                <Table.Cell>{this.props.request.approvalCount} / {this.props.approversCount}</Table.Cell>
                <Table.Cell>
                    {this.props.request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>
                         Approve 
                    </Button>
                    )}
                </Table.Cell>
                <Table.Cell>
                    {this.props.request.complete ? null : (
                    <Button color="blue" basic onClick={this.onFinalize}>
                         Finalize 
                    </Button>
                    )}
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RequestRow;