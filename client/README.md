## The client for listman

Unfortunately, until [cypress-svelte-unit-test pr#270](https://github.com/bahmutov/cypress-svelte-unit-test/pull/270) is merged, you have to manually comment the following code in `node_modules/cypress-svelte-unit-test/dist/utils.js` at line 16:

```js
  if (Cypress.spec.specType !== 'component') {
      throw new Error("In order to use mount or unmount functions please place the spec in component folder");
  }
```

If you have have run cypress before, remember to run `rm -rfd node_modules/.vite` so that vite takes the new file

---

This project was generated with the [`svelte-capacitor template`](https://github.com/drannex42/svelte-capacitor)
