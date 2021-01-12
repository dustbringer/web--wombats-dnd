# Wombats DnD
A website for a private Dungeons and Dragons campaign.

## Local Build
- Run `yarn` in both root and `/frontend` folders to install packages
- Add required Heroku environment variables into `/.env`
  - ***DO NOT*** commit `/.env`. Please include it in `.gitignore`
  - For each remote environment variable, run `heroku config:get CONFIG-VAR-NAME -s  >> .env` in root
- **Backend**: run `heroku local` in root
- **Frontend**: Run `yarn start` in `/frontend`

## Development notes
- Hosted on Heroku
- Frontend: ReactJS
- Backend: Express (NodeJS)
- Backend+frontend structure taken from https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18
  - More concrete example (from someone at heroku): https://github.com/mars/heroku-cra-node
