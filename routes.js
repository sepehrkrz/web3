// the second set of pranthesis means the require statement returns a function AND that function will invoke immediatly after we require it to this file
const routes = require('next-routes')();

//we want CampaignShow (show.js) to render anytime a user goes to a specific capmaign directory
// the first argument to routes.add is the pattern we are going to look for, the variable comes after: can be passed to our component (CampaignShow)
// the second argument is the component in the route inside our pages directory we want this thing to show when someone goes to this address

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new")

module.exports = routes;