<!--
 Copyright 2025 Daniel Maas
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     https://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# React Router Template

A react router template use framework mode, packaged with a custom express server.

## Docs

- 📖 [React Router docs](https://reactrouter.com/home)

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
heroku git:remote -a react-router-template
git push heroku main
```

## Set Heroku Configs

```sh
sed 's/#.*$//;s/^#.*$//' .env | xargs heroku config:set --app react-router-template
```
