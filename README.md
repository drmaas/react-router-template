# Remix App Template

A remix app template packaged with a custom express server.

## Docs

- 📖 [Remix docs](https://remix.run/docs)

## Setup

```sh
npm i
```

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Or run it locally in production mode:

```sh
npm start:local
```

## Heroku Deployment

```sh
heroku login
heroku git:remote -a remix-app-template
git push heroku main
```

## Set Heroku Configs

```sh
sed 's/#.*$//;s/^#.*$//' .env | xargs heroku config:set --app remix-app-template
```
