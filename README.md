# lab-surveys-frontend

A prototype of the current Kang Lee Lab Surveys front-end but redeveloped in the React.js framework. Currently hosted on [Heroku](https://kangleelab-surveys-qa-ae98ac8adddf.herokuapp.com/) on the QA environment.

## Running locally

To run locally open Visual Studio Code and clone the repository.

Make sure you have at least Node version of v14.16.1 or higher.

In the terminal, open the repository and run `npm install` to install all required node modules to run the project.

Once that is finished, run `npm start` in the terminal which will start a local server on `localhost:3000`

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
REACT_APP_API_ADDRESS=http://localhost:3000
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD_HASH=<your_password_hash>
```

#### Generating a Password Hash

To generate a password hash for admin login, run:

```bash
node scripts/generate-password-hash.js yourpassword
```

This will output the hash to add to your `.env` file.

## Development

Please download the 'Prettier - Code formatter' extension on VSCode so we can keep our formatting consistent. This also reduces conflicts when committing code since it'll adjust spacing, tabbing, etc for us.

## Admin Authentication

The application includes a simple admin authentication system for accessing survey history and data exports.

### Features available to authenticated admins:
- View survey response history
- Download survey data as CSV

### Setting up admin credentials:

1. Generate a password hash:
   ```bash
   node scripts/generate-password-hash.js your_secure_password
   ```

2. Add the credentials to your `.env` file:
   ```
   REACT_APP_ADMIN_USERNAME=admin
   REACT_APP_ADMIN_PASSWORD_HASH=<hash_from_step_1>
   ```

3. Restart the development server if it's running.

**Note:** Sessions expire after 24 hours and are stored in localStorage.
