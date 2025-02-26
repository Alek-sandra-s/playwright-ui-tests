## Study project UI testing with Playwright
### Requirements:
- node.js v23.3.0
- git

### Set up:
- clone project by following command ```git clone```
- install project's dependencies ```npm ci```
- set up environment variable ```export APP_URL=https://fe-delivery.tallinn-learning.ee/signin```
- set up playwright browsers ```npm run init:playwright```

### Run tests:
- Run all tests: ```npm test```
- Run all tests in debug mode in chromium webkit```npm run test:debug:chromium```

### Additional runs:
In case of debug some specific test suite please follow next command example:
```npx playwright test path/to/test.ts --debug --project=chromium```

if you want to run some specific test please change the code of tests to use property `only` for example:

```typescript
    test.only('FE delivery app login page opens', async ({ page }) => {
...
    })
```

