# PicoGalaxy

- Install dependencies
```
npm install
```

- Start in development mode / watch file mode
```
npm run start:dev
```

- Start in server mode
```
npm run start
```

- Start in production mode
```
npm run start:prod
```

- To connect a database in dev mode, replace 'host' field in ```/ormconfig.json``` but DON'T COMMIT IT

## Deployment
- [PREREQUISITES] Host : CentOS 7 / Python 2.7 / pip 20.3.4 / Docker Compose for Python (Docker SDK 4.4.4)
- Ensure that the following CI/CD variables are set: `SSH_HOST`, `SSH_CONFIG`, `SSH_PRIVATE_KEY`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `GITLAB_TOKEN`.
- Ensure that changes are pushed to the `main` branch
- Create a tag with release notes corresponding to the desired version
- The build is launched automatically. Estimated time: approximately 5 min