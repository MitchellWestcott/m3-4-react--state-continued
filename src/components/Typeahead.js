import React from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components'




const Typeahead = ({suggestions, handleSelect, categories}) => {
    const [value, setValue] = React.useState('');
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(0);

    const results =
    suggestions.filter((book) => {
        const minLength = value.length >= 2;
        const checkInput = book.title.toLowerCase().includes(value.toLowerCase());

        return minLength && checkInput;
    }).slice(0, 6);

    return (
        <>
        <Wrapper>
            <div>
                <Input
                type="text"
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                onKeyDown={(ev) => {
                    switch (ev.key) {
                        case "Enter": {
                            handleSelect(results[selectedSuggestionIndex].title);
                            return;
                        }
                        case "ArrowUp": {
                            setSelectedSuggestionIndex(selectedSuggestionIndex -1);
                            console.log("up");
                            return;

                        }
                        case "ArrowDown": {
                            setSelectedSuggestionIndex(selectedSuggestionIndex +1);
                            return;
                        }
                    }
                }}
                />
                <Button onClick={() => setValue('')}>Clear</Button>
            </div>
            <ListContainer>
                {results.map((suggestion, index) => {
                    const category = categories[suggestion.categoryId];
                    // console.log(category);
                    // console.log("suggestion", suggestion);
                    const suggestionLowerCase = suggestion.title.toLowerCase();
                    const matchIndex = suggestionLowerCase.indexOf(value.toLowerCase());
                    // console.log("match index", matchIndex)

                    const searchEnd = matchIndex + value.length;
                    const firstHalf = suggestion.title.slice(0, searchEnd);
                    const secondHalf = suggestion.title.slice(searchEnd);
                    const isSelected = index === selectedSuggestionIndex;
                    // console.log("first", firstHalf)
                    // console.log("second", secondHalf)
                    return (
                        <ResultsList
                        key={suggestion.id}
                        suggestion = {suggestion}
                        isSelected={isSelected}
                        style={{
                            background: isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent',
                        }}
                        onMouseEnter={() => 
                            setSelectedSuggestionIndex(index)}
                        onMouseDown={() =>
                            handleSelect(suggestion.title)}
                        >
                            <span>
                                {firstHalf}
                                <Prediction>
                                    {secondHalf}
                                </Prediction>
                            </span>
                            <GenreSection>
                                {" "}
                                in <GenreStyles>
                                    {category.name}
                                </GenreStyles>

                            </GenreSection>
                        
                        {/* {suggestion.title} */}
                        </ResultsList>
                        )
                })}
            </ListContainer>
        </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    /* display: flex; */
    width: 50%;
    height: 50%;
    /* border: 1px solid orange; */
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
`
const ListContainer = styled.ul`
    width: 300px;
    margin-left: 0px;
    margin-top: -1px;
    box-shadow: 0px 0px 10px grey;
    border-radius: 3px;
`

const ResultsList = styled.li`
    width: 100%;
    padding: 10px;
    border: 1px solid white;
    /* &:hover {
        background: lightgoldenrodyellow; */
    }
`

const Button = styled.button`
    background: blue;
    width: 100px;
    height: 35px;
    border-radius: 10px;
    color: white;
    text-decoration: none;
    border: none;
`

const Input = styled.input`
    margin-right: 10px;
    height: 35px;
    width: 300px;
`

const Prediction = styled.span`
    font-weight: bold;
`
const GenreSection = styled.span`
    font-style: italic;
`

const GenreStyles = styled.span`
    color: purple; 
`


export default Typeahead
