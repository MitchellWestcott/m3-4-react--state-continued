import React from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components'

import data from "../data";
import Typeahead from "./Typeahead.js"

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      {/* TODO */}
      <Wrapper>
        <Typeahead 
        suggestions={data.books}
        categories={data.categories}
        handleSelect={(suggestion) => {
          window.alert(suggestion)
        }}
      />
      </Wrapper>
    </>
  );
};

export default App;


const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`