import React, {Component} from 'react';
import factory from '../ethereum/factory';  // 1- Factory instance 
import {Card, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout';
import {Link} from '../routes';
import Campaign from '../ethereum/campaign'

class CampaingIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns}
    }
    
    //A function to render card groups dispaying campaigns:
    renderCampaigns(){
        //we pass a function into map that function will be called one time for each element in the array, what ever we return from that function will be assigned to items.
        const  items = this.props.campaigns.map(address => {
            //card object properties from react-ui-semantic
            return {
                header: address, 
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Layout>
                <div>
                    <h3> Open Campaigns</h3>
                    <Link route="/campaigns/new/">
                        <a>
                            <Button
                                content="Create Campaign"
                                icon="add circle"
                                primary
                                floated='right'
                            />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
                
            </Layout>
        );
    }

}

export default CampaingIndex;