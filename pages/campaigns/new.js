import React, {Component} from 'react';
import Layout from '../../components/Layout'
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import {Link, Router} from '../../routes'

class CampaignNew extends Component {

    state = {
        minimumContribution:'',
        errorMessage:'',
        loading: false,
        description: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true});
        this.setState({errorMessage:''});
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minimumContribution, this.state.description)
            .send({
                from: accounts[0]
            });
            //To redirect web page to home page
            Router.pushRoute('/');
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading:false})
    }
    // to properly show the error on Message tag, we need to add error prop to our Form
    render() {
        return (
            <Layout>
                <h3> Create a Campaign</h3> 
                {/*must add error element to Form tag */}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label> Minimum contribution </label>
                        <Input 
                            placeholder='Minimum contribution' 
                            label="wei" 
                            labelPosition='right' 
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({minimumContribution: event.target.value})}
                        />
                        
                    </Form.Field>
                    <Form.Field>
                        <label> Description </label>
                        <Input 
                            placeholder='Description' 
                            label="Text" 
                            labelPosition='right' 
                            value={this.state.description}
                            onChange={event =>
                                this.setState({description: event.target.value})}
                        />
                        
                    </Form.Field>
                    
                    <Button type='submit' loading={this.state.loading} primary> Create Campaign</Button> 
                    <Message error header="Oops!" content={this.state.errorMessage} />
                </Form>
            </Layout>
            
        );
    }
}

export default CampaignNew;
