import type { GenericList } from '../../src/utils/listUtils';
import { LIST_SCHEMA_VERSION_NO } from '../../src/utils/constants';
import { DateTime } from 'luxon';
import { Settings } from 'luxon';

// it's always Apr 1, 2022
Settings.now = () => new Date(2022, 3, 1).valueOf();

describe('Normal List', () => {
  const key = 'test-key';
  const capKey = 'CapacitorStorage.' + key;
  const time = DateTime.now().toISO();
  const testList = {
    name: 'test list',
    version: LIST_SCHEMA_VERSION_NO,
    isShared: false,
    modified: time,
    items: [{ item: 'test item', done: false }],
  } as GenericList;

  before(() => {
    cy.visit('/');
    window.localStorage.setItem(capKey, JSON.stringify(testList));
  });

  it('should load the key', () => {
    cy.visit(`/list/${key}`);
    expect(cy.contains('test item'));
  });

  describe('should save changes', () => {
    it('when adding items', () => {
      cy.get('.input').type('new item');
      cy.get('.absolute > .ml-auto').click();
      cy.getLocalStorage(capKey)
        .then((val) => JSON.parse(val))
        .toMatchSnapshot();
    });

    it('when changing the title', () => {
      cy.get('.text-4xl').clear().type('new title');
      cy.getLocalStorage(capKey)
        .then((val) => JSON.parse(val))
        .toMatchSnapshot();
    });

    it('when toggling items', () => {
      cy.get('div.w-full > :nth-child(2) > .mr-2').click();
      cy.getLocalStorage(capKey)
        .then((val) => JSON.parse(val))
        .toMatchSnapshot();
    });
  });
});
