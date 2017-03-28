import { createSelector } from 'reselect';
 
const LoginData= (state) => state.toJS().LoginData;

export const bookSelector = createSelector(
  [LoginData],
  (LoginData) => {
    return {
      LoginData
    };
  }
);