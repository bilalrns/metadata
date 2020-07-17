# Saleor Dashboard

![1 copy 2x](https://user-images.githubusercontent.com/5421321/47799917-8afd7a00-dd2b-11e8-88c7-63588e25bcea.png)

A GraphQL-powered, single-page dashboard application for [Saleor](https://github.com/mirumee/saleor/).

## Demo

See the [public demo](https://pwa.saleor.io/dashboard/) of Saleor Dashboard!

Or launch the demo on a free Heroku instance.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 10.0+
- A running instance of [Saleor](https://github.com/mirumee/saleor/).

### Installing

Clone the repository:

```
$ git clone https://github.com/bilalrns/metadata.git
```

Enter the project directory:

```
$ cd metadata
```

Install NPM dependencies:

```
$ npm i
```

### Configuration with backend

```
export API_URI=http://localhost:8000/graphql/
```

### Development

To start the development server run:

```
$ npm start
```

### Production

To build the application bundle run:

```
$ npm run build
```
