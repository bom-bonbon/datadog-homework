import * as axios from 'axios';
import {
  jest, describe, test, expect,
} from '@jest/globals';
import { makeQueryAPICall, ITEMS_PER_PAGE } from '../DataManager';
import token from '../api_token/token';

// Mock axios module, and all the setters that we pass into its functions
const setData = jest.fn();
const setErrorMsg = jest.fn();
const setIsLoading = jest.fn();

const currentPage = 14;
const searchTerm = 'javascript';
const response = {
  status: 200,
  data: 'fake data',
};

// NOTE: good unit test should cover all PUBLIC functions,
// a.k.a makeQueryAPICall & makeDetailAPICall
jest.doMock('axios', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(response),
}));

describe('makeQueryAPICall', () => {
  // BELOW: test basic functionality of making an API call
  test('Makes API call to GitHub, with the searchTerm as param', () => {
    const spyDefault = jest.spyOn(axios, 'default');
    makeQueryAPICall(searchTerm, currentPage, setData, setErrorMsg, setIsLoading);

    // TODO: this fails. FIXME
    expect(spyDefault).toHaveBeenCalledWith({
      method: 'get',
      url: `https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc&per_page=${ITEMS_PER_PAGE}&page=${currentPage}&accept=application/vnd.github.v3+json`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  // TODO: Test each scenario of the returned result
  describe('When the request is successful', () => {
    test('Set data which comes from the response', () => {
      // TODO: assert that setData is called with mock response.data
    });

    test('Stops loading', () => {
      // TODO: assert that setIsLoading is called with `false` as param
    });
  });

  describe('When the request fails', () => {
    // TODO: mock a response with status 4XX. Look at jest.mockResolvedValue() function
    test('Set erros', () => {
      // TODO: assert that setErrorMsg is called with the correct error message.
    });
  });
});

describe('makeDetailAPICall', () => {
  test('Fetch commits info', () => {
    // TODO: assert that it calls axios with correct info
  });

  test('Fetch forks info', () => {
    // TODO: assert that it calls axios with correct info
  });

  test('Fetch owner info', () => {
    // TODO: assert that it calls axios with correct info
  });

  describe('When all calls are successful', () => {
    test('Returns with info', () => {
      // TODO: assert return value of makeDetailAPICall
    });
  });

  describe('When fetching commits info fails', () => {
    // TODO
  });
});
