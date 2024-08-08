# lab-surveys-frontend

A prototype of the current Kang Lee Lab Surveys front-end but redeveloped in the React.js framework. Currently hosted on [Heroku](https://kangleelab-surveys-qa-ae98ac8adddf.herokuapp.com/) on the QA environment.

## Running locally

To run locally open Visual Studio Code and clone the repository.

Make sure you have at least Node version of v14.16.1 or higher.

In the terminal, open the repository and run `npm install` to install all required node modules to run the project.

Once that is finished, run `npm start` in the terminal which will start a local server on `localhost:3000`

Go into the `.env` file and set the `REACT_APP_API_ADDRESS=http://localhost:3000`.
Next, log into the master Auth0 account (designated for managing the lab's applications). Select the 'Applications' section on the sidebar, and then select the 'Applications' page. Following this, select the 'ML Survey Website' application and copy the 'Domain' and 'Client ID' and paste it into the `REACT_APP_AUTH0_DOMAIN=<domain>` and `REACT_APP_AUTH0_CLIENT_ID=<client_id>` sections respectively.

## Development

Please download the 'Prettier - Code formatter' extension on VSCode so we can keep our formatting consistent. This also reduces conflicts when committing code since it'll adjust spacing, tabbing, etc for us.

## Account Management

To manage accounts, please login to Auth0 using the Kang Lee Lab Surveys general account by following the instructions below:
1. Log into the Kang Lee Lab Surveys Gmail account.
2. Sign into Auth0 (https://auth0.com/) using the "Continue with Google" option.

This will allow you to:
- Manage user identities including password resets, creating and provisioning, blocking and deleting users.
- Associate user accounts with multiple connections such as database, enterprise or social with the same user on Auth0, allowing that user to authenticate with any of them.
- Store arbitrary JSON objects attached to an Auth0 user.
