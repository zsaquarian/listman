### [0.8.1](https://github.com/zsaquarian/listman/compare/v0.8.0...v0.8.1) (2022-05-19)


### Bug Fixes

* closing the popup manually broke the list ([00939fb](https://github.com/zsaquarian/listman/commit/00939fba94fada91b36d0fc5044d23c7a4723eee))

## [0.8.0](https://github.com/zsaquarian/listman/compare/v0.7.2...v0.8.0) (2022-05-13)


### Features

* change the order of items ([273f5c3](https://github.com/zsaquarian/listman/commit/273f5c3ad6eee2c3c1669198a53f7c88661726f6))

### [0.7.2](https://github.com/zsaquarian/listman/compare/v0.7.1...v0.7.2) (2022-05-05)

### [0.7.1](https://github.com/zsaquarian/listman/compare/v0.7.0...v0.7.1) (2022-05-05)


### Bug Fixes

* add input gets stuck with too many items ([437681a](https://github.com/zsaquarian/listman/commit/437681af8205f46678929481d639d35feb966945))
* **desktop:** use the correct icons ([1b12e0d](https://github.com/zsaquarian/listman/commit/1b12e0d69475a18c292b07f7b56819bf081be318))
* **dev-only:** auth cookies now works on localhost ([4318271](https://github.com/zsaquarian/listman/commit/4318271a0e24a56ed6249b5d63768044a519884e))

## [0.7.0](https://github.com/zsaquarian/listman/compare/v0.6.4...v0.7.0) (2022-04-10)


### Features

* edit list items ([6c15b49](https://github.com/zsaquarian/listman/commit/6c15b49da7d6e794337b3320ec8a7af72a53876e))
* show version number in config page ([5db4ca8](https://github.com/zsaquarian/listman/commit/5db4ca863f8a951e213a75aa3da484e2053f80f2))


### Bug Fixes

* properly fix previous bug ([84ebde5](https://github.com/zsaquarian/listman/commit/84ebde5071bb0e4f365c618cbff6b61d37224a36))

### [0.6.4](https://github.com/zsaquarian/listman/compare/v0.6.3...v0.6.4) (2022-04-06)


### Bug Fixes

* **android:** actually add the capacitor storage plugin ([fe7bdec](https://github.com/zsaquarian/listman/commit/fe7bdec9b778c4953155bb538c1943dd0a2a8958))
* change `config` page from `svelte-hero-icons` to `@steeze-ui/heroicons` ([d73c3d0](https://github.com/zsaquarian/listman/commit/d73c3d046b86de409d86fe0d9ceb6f63b9957190))
* list name now saves properly ([1302847](https://github.com/zsaquarian/listman/commit/1302847724ac4772f5cfcb91e0e144672a8bd2fa))
* **ui:** only show the "no lists made yet" if there are no lists ([ef4ef3f](https://github.com/zsaquarian/listman/commit/ef4ef3fb1bf7e36544522e3ba8d0fd3fb400c924))

### [0.6.3](https://github.com/zsaquarian/listman/compare/v0.6.2...v0.6.3) (2022-02-14)


### Bug Fixes

* **auth:** google auth now initializes only on web ([6b59cc7](https://github.com/zsaquarian/listman/commit/6b59cc78d515e94dc4fa13d8ac31e491b8d10719))

### [0.6.2](https://github.com/zsaquarian/listman/compare/v0.6.1...v0.6.2) (2022-02-14)


### Bug Fixes

* **android:** fix google auth in android ([59c0041](https://github.com/zsaquarian/listman/commit/59c004101a874540d2b879cd4ad81fcb94593fb0))
* modified now has a default value ([b96d96b](https://github.com/zsaquarian/listman/commit/b96d96ba75bfb15f657d4c43a5f8c768bc7605e4))
* **ui:** user dropdown is closed by default ([46eef89](https://github.com/zsaquarian/listman/commit/46eef89143e60f56614aeac42a278a85f9b83539))

### [0.6.1](https://github.com/zsaquarian/listman/compare/v0.6.0...v0.6.1) (2022-02-05)


### Bug Fixes

* **android:** update google client id in android strings.xml ([e5780ac](https://github.com/zsaquarian/listman/commit/e5780acb0fae25817e40af715d4f5290dbe4a16b))

## [0.6.0](https://github.com/zsaquarian/listman/compare/v0.5.1...v0.6.0) (2022-02-03)


### Features

* add modified dates to lists ([7370cb1](https://github.com/zsaquarian/listman/commit/7370cb177642b4e99ca0ba27924888e6b526be26))
* **auth:** switch to Capacitor GoogleAuth Plugin so google auth works on android ([72e99fb](https://github.com/zsaquarian/listman/commit/72e99fb58f9e07fe400892a2028880c676ce75ac))


### Bug Fixes

* **backend:** allow capacitor domains in cors ([64af8f3](https://github.com/zsaquarian/listman/commit/64af8f38d9093b52beaf868ccc3adfeb6daac1d2))
* **capacitor:** fix the top-level await issue properly ([9c9246b](https://github.com/zsaquarian/listman/commit/9c9246b87aeacddc713fcd7cc89aa902f5e69d9f))
* **collabaration:** make modified dates work with collabaritive lists ([b0dc4e8](https://github.com/zsaquarian/listman/commit/b0dc4e8728da26d1474c5ee87875e309dfc9ff82))

### [0.5.1](https://github.com/zsaquarian/listman/compare/v0.5.0...v0.5.1) (2022-01-26)


### Bug Fixes

* give initial values to the stores ([66ecb4a](https://github.com/zsaquarian/listman/commit/66ecb4a92529b5b660ff6fa03cb2d97dbd3b4ec8))

## [0.5.0](https://github.com/zsaquarian/listman/compare/v0.4.2...v0.5.0) (2022-01-26)


### Features

* **a11y:** make outline white in dark mode ([2e995f5](https://github.com/zsaquarian/listman/commit/2e995f5afc2f3f3a4b9f9e7103839e0580b80f02))
* added a dark mode ([b9d0cfd](https://github.com/zsaquarian/listman/commit/b9d0cfd720606d5516d8fa8823f1284220b768f5))
* create new `all lists` page to view / search all lists ([6e24491](https://github.com/zsaquarian/listman/commit/6e2449197b4798b8cdad12a497a9cb697c02978b))


### Bug Fixes

* add missing import ([85b5eed](https://github.com/zsaquarian/listman/commit/85b5eedd6a5e35a032a354be28026cdde3f80de3))
* **compatibility:** dont use top-level await ([131bbed](https://github.com/zsaquarian/listman/commit/131bbed8e2eb9a599d1eebfba1ef07837581be1b))
* **heroku:** properly fix the heroku issue ([f2a18b9](https://github.com/zsaquarian/listman/commit/f2a18b91b4761a82c6ca72d180ebb92ea9b8048f))
* **home page:** ignore the `config` key in the home page ([692062d](https://github.com/zsaquarian/listman/commit/692062d55f6f28405f00311874de9b1422ec4977))
* **lockfile:** update lockfile ([d3e0a05](https://github.com/zsaquarian/listman/commit/d3e0a0558af84d5a2e86f8374040ca76a2287b7f))
* login input text should be dark in dark mode ([7c522f2](https://github.com/zsaquarian/listman/commit/7c522f2113dda9dc97328f05164f35c7c0b630e8))

### [0.4.2](https://github.com/zsaquarian/listman/compare/v0.4.1...v0.4.2) (2022-01-10)

### [0.4.1](https://github.com/zsaquarian/listman/compare/v0.4.0...v0.4.1) (2022-01-08)


### Features

* store the username in `authState` ([bc68934](https://github.com/zsaquarian/listman/commit/bc6893475111b9406cf6e892c98a243afbbadad1))

## [0.4.0](https://github.com/zsaquarian/listman/compare/v0.3.2...v0.4.0) (2021-12-29)


### Features

* make google sign in autmatically get the username ([41d30ae](https://github.com/zsaquarian/listman/commit/41d30aef4715217eadfea757d7a389ae4310fdf0))


### Bug Fixes

* add prisma migrate to procfile ([de81a8c](https://github.com/zsaquarian/listman/commit/de81a8ca867dc885e73ec91898c66c544c53d18c))
* bug where you can't click the log out button ([8776ac7](https://github.com/zsaquarian/listman/commit/8776ac7254d82a92569299e9b4c7b2f051eb64b9))
* correctly fix the previous issue ([ac62b7a](https://github.com/zsaquarian/listman/commit/ac62b7a6db24eb92b3f4e8594b1c321f64e2ddbd))
* don't include `auth-state` in the lists ([d40654b](https://github.com/zsaquarian/listman/commit/d40654b7af6fd0ee2445414522fac7ef270eea64))
* fix dev issue with samesite cookies in localhost contexts ([75ea90e](https://github.com/zsaquarian/listman/commit/75ea90e7c36cd83296bd53f384b321505ec4785b))
* fix the cookie setting ([e2155bd](https://github.com/zsaquarian/listman/commit/e2155bd06f0f9ef81db5fd8c5085c1190aa98cc3))
* fix the global yarn lockfile ([3c8b971](https://github.com/zsaquarian/listman/commit/3c8b9713dcdc741ca99e7763f923277056622d5a))
* fix the yarn lock ([61c8f60](https://github.com/zsaquarian/listman/commit/61c8f6069222b3a01eb75da19148968c38a376fd))
* fix typescript compile error ([4b03f21](https://github.com/zsaquarian/listman/commit/4b03f21543eb2f17979396ccc321624f7427d534))
* get server ips from environment variable to deploy ([9fe1987](https://github.com/zsaquarian/listman/commit/9fe19877cf462bc8977d7f0bef7e34592b34b034))
* let vite use top level await ([4ed0071](https://github.com/zsaquarian/listman/commit/4ed00718b23a9d611072335e6d9d2868978755fc))
* master list is broken if loaded for the first time ([eede843](https://github.com/zsaquarian/listman/commit/eede843379a8ed19da9b78c72894923a639fca55))
* only show shared lists if logged in ([69807b3](https://github.com/zsaquarian/listman/commit/69807b337022a37f6573024b6b5e065d1b2132c9))
* persist auth state ([2748031](https://github.com/zsaquarian/listman/commit/2748031c890e9e96c8817192a288e5f9703cf601))
* remove all the unecessary console logs ([69878b9](https://github.com/zsaquarian/listman/commit/69878b9e47ed55daa53760e4455dde3789636fee))

### [0.3.2](https://github.com/zsaquarian/listman/compare/v0.3.1...v0.3.2) (2021-12-11)


### Features

* show "no lists made" text when there are now lists ([fafadd6](https://github.com/zsaquarian/listman/commit/fafadd6087d50f191fd3781d7a120b2307c3c597))


### Bug Fixes

* **collaborative lists:** fixed issue where collaborative list's contents would get wiped sometimes ([db06f3f](https://github.com/zsaquarian/listman/commit/db06f3f6eff9f0f1eae2e854c06b4b7b888645d4))
* **homepage:** make the homepage link for local lists work ([40162b4](https://github.com/zsaquarian/listman/commit/40162b42f6aa2887f5cb3c7b6c1e549db394592d))

### [0.3.1](https://github.com/zsaquarian/listman/compare/v0.3.0...v0.3.1) (2021-11-27)


### Features

* **home page:** show name of remote, unsynced lists ([af1417b](https://github.com/zsaquarian/listman/commit/af1417b87b3396a83f82ec0712e7bdbf4585f9fd))

## [0.3.0](https://github.com/zsaquarian/listman/compare/v0.2.1...v0.3.0) (2021-11-27)


### Features

* **platform:** add tauri for native desktop applications ([22879ca](https://github.com/zsaquarian/listman/commit/22879ca0ef81fd1895b3063a8dc80605222b7f98))

### 0.2.1 (2021-11-22)


### Features

* auth on backend ([1e03f8d](https://github.com/zsaquarian/listman/commit/1e03f8d9c976e3d966dde83549c499d9b68aa094))
* Google sign in and user registration ([105bf7f](https://github.com/zsaquarian/listman/commit/105bf7f562c4bf6682cadfa6268e060176efb428))
* login on frontend and change to storing jwt in cookies ([ecc459e](https://github.com/zsaquarian/listman/commit/ecc459e5d4e40baf09d725e09e3a1d50123a339d))
* refresh tokens ([d646b99](https://github.com/zsaquarian/listman/commit/d646b99ff7de0b48e3fbe96eba1003dbb09c7c13))


### Bug Fixes

* `focus` in outline should be `focus-visible` ([2dde1b5](https://github.com/zsaquarian/listman/commit/2dde1b51a685f5aa9a962731c2d3ae07e9e8f833))
* automatically refresh jwt token ([7dea402](https://github.com/zsaquarian/listman/commit/7dea4025d8766feeb2f947e3c319f978c5b7b550))
* can no longer add empty items ([eaef37a](https://github.com/zsaquarian/listman/commit/eaef37a4fdd372ff45840304fc9c600daa762e00))
* create new list text was bigger than other buttons ([fe8dfe7](https://github.com/zsaquarian/listman/commit/fe8dfe75a5b2652805189c128491e2739b2e0dab))
* elements should have outline for accessibility ([898a8be](https://github.com/zsaquarian/listman/commit/898a8be46e156f99fd46b0f231c4ad2d0e092c87))
