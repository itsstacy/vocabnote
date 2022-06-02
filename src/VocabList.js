import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {updateVocab, deleteVocab, updateVocabFB, deleteVocabFB} from "./redux/modules/vocab"


const VocabList = (props) => {
  let history = useHistory();
  const vocab_list=  useSelector((state)=>state.vocab.list);
  const dispatch = useDispatch();
  
  
  return (
    <ContainerFlex>
      {vocab_list.map((list, index)=> {
        return (
          <Card
            className="vocab_list">
              <Wrap>
              <CardName>{list.name} </CardName>
              <Wrapper>
                <Span className="material-icons check" 
                onClick={()=>{
                  dispatch(updateVocabFB(list.id, list.completed));
                  
                }}
                completed={list.completed}
                >check_circle</Span>
                <span className="material-icons trash"
                onClick={()=>{
                  dispatch(deleteVocabFB(list.id));
                }}
                >delete</span>
              </Wrapper>
              </Wrap>
             
              <CardPronunciation>[{list.pronunciation}]</CardPronunciation>
              <CardDefinition>{list.definition}</CardDefinition>
              <CardExample>"{list.example}"</CardExample>
              
            </Card>
        )
      })}
      
      
    </ContainerFlex>
    
  );
}


const ContainerFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 30px auto;
`;

const Card = styled.div`
  margin: 10px;
  height: 170px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap; 
  padding: 25px;
  width: 300px;
  border:4px solid var(--primary-color);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  &:hover{
    border:4px solid var(--highlight-color);
  }
`;

const Wrap = styled.div`
  position: relative;
`

const CardName = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--line-color);
  margin: 0px;
  justify-content: center;
  display: inline-flex;

`

const CardPronunciation = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: grey;
  font-weight: lighter;
  margin-bottom: 0.5rem;
`

const CardDefinition = styled.div`
   font-size: 1.1rem;
   font-weight: bold;
   margin-bottom: 0.7rem;
   
`
const CardExample = styled.div`
  font-size: 1rem;
  text-align: left;
`
const Wrapper = styled.div`
  position: absolute;
  right: -8px;
  top: 12px;
  flex-direction: row;
  justify-content: space-between;  
  
`
const Span = styled.div`
  color: ${(props) => (props.completed ? "var(--line-color)" : "grey")} !important;
`

export default VocabList;