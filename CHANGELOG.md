# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
