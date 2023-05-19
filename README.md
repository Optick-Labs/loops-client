# loops-client

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> An unofficial javascript/typescript client for loops.so

## Install

```bash
# yarn
npm install loops-client

# yarn
yarn add loops-client
```

## Usage

```ts
import { LoopsClient } from 'loops-client';

const client = new LoopsClient('YOUR-API-KEY');
const response = await client.addContact({ email: 'email@example.com', firstName: 'foo', lastName: 'bar' });
if(response.success) {
    // Yay
} else {
    // Boo
}
```

[build-img]:https://github.com/Optick-Labs/loops-client/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/Optick-Labs/loops-client/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/loops-client
[downloads-url]:https://www.npmtrends.com/loops-client
[npm-img]:https://img.shields.io/npm/v/loops-client
[npm-url]:https://www.npmjs.com/package/loops-client
[issues-img]:https://img.shields.io/github/issues/Optick-Labs/loops-client
[issues-url]:https://github.com/Optick-Labs/loops-client/issues
[codecov-img]:https://codecov.io/gh/Optick-Labs/loops-client/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/Optick-Labs/loops-client
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
