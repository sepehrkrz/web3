import React, {Component} from 'react';
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import {Router} from '../routes'

class ContributeForm extends Component {
    state = {
        vaule: '',
        errorMessage:'',
        loading: false
    };

    onSubmit = async event => {
        //prevent form from submitting itself to backend
        event.preventDefault();
        this.setState({loading:true});
        this.setState({errorMessage:''});
        const campaign = Campaign(this.props.address);
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            // To refresh the page and update stats shown on the page
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading:false})
    };
    render() {
        return(
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Amount to contribute</label> 
                <Input label="ether" labelPosition='right'
                    onChange={event => this.setState({value: event.target.value})}
                />

            </Form.Field>
            <Button type='submit' loading={this.state.loading} primary>
                Contribute!
            </Button>
            <Message error header="Oopsie!" content={this.state.errorMessage} />
        </Form>
        );
    }
}

export default ContributeForm;