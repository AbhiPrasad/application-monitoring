# Application Monitoring
Also called the Empower Plant UI/UX. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Features the following...
- Error Monitoring...Performance Monitoring...Release Health...
- BrowserTracing (Performance)  
- Sentry.Profiler (class components)  
- Sentry.withSentryRouting(Route); (react-router)  
- FlaskIntegration, SqlAlchemyIntegration

| sentry    | version
| ------------- |:-------------:|
| @sentry/react | ^6.2.5 |
| @sentry/tracing | ^6.2.5 |
| sentry_sdk | 1.1.0 |

## Setup
**Test** - Create a .env and a flask/.env and put your DSN in it. See .env.default and flask/.env.default for examples

**Production** - (AppEngine) you'll need REACT_APP_BACKEND in .env and the db credentials in flask/.env

```
# React
npm install

# Flask
cd flask
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

## Run
**Test**
```
# React, the 'start' script in package.json sets the Release
npm start

# Flask
cd flask && ./run.sh
```

**Prod**
```
# React, the 'build' script in package.json sets the Release
npm build && serve -s build

# Flask, run.sh sets the Release and environment
cd flask && ./run.sh
```

## Deploy
**Prod**
```
# React
npm run build && gcloud app deploy --version=<version>

# Flask, run.sh is not used here, so the environment will default to production...?
cd flask && gcloud app deploy
```

## Troubleshooting
### Releases
Q. `--update-env-vars` is not available for `gcloud app deploy`, therefore can't pass a RELEASE upon deploying. Luckily it's already built into the /build which gets uploaded, and sentry-cli generated it, as well as the RELEASE that sentry-cli uses for uploading source maps.

A. So, creating the dynamic Release inside of main.py. Hard-coding it into .env wouldn't help, as it needs to be dynamic. This release may not match what sentry-cli is generating for release (due to clock skew), but we're not uploading source maps for python. Worst case, the Python release is slightly different than the React release, but this shouldn't matter, because two separate apps (repo) typically have unique app version numbers anyways (you version them separately).

### Gcloud commands
```
gcloud app versions list
gcloud app deploy
gcloud app browse
gcloud app services list
gcloud app logs tail -s application-monitoring-react
gcloud app logs tail -s application-monitoring-flask
```

### Other
Don't use a sqlalchemy or pg8000 that is higher than sqlalchemy==1.3.15, pg8000==1.12.5, or else database won't work.

| non-sentry    | version
| ------------- |:-------------:|
| npx | 7.8.0 |
| npm | 7.8.0 |
| node | v.14.2.0 |
| python | 3 |
| react | ^17.0.2 |
| react-dom | ^17.0.2 |
| react-router-dom | ^5.2.0 |
| react-scripts | 4.0.3 |

TODO redux, react-redux, redux-logger.

'default' is a function applied to objects that aren't serializable.  
use 'default' or else you get "Object of type datetime is not JSON serializable":  
json.dumps(results, default=str)  