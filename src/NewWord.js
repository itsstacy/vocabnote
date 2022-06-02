import React from 'react';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import './App.css';
import { createVocab, createVocabFB } from './redux/modules/vocab';


const NewWord = (props) => {
  let history = useHistory();
  const vocab_list = useSelector((state) => state.vocab.list);

  const dispatch = useDispatch();

  const _name = React.useRef(null);
  const _pronunciation = React.useRef(null);
  const _definition = React.useRef(null);
  const _example = React.useRef(null);
 

  const  addVocab = () => {
    // dispatch(createVocab({name: _name.current.value, pronunciation: _pronunciation.current.value, definition: _definition.current.value, example: _example.current.value, completed: false}));
    dispatch(createVocabFB({name: _name.current.value, pronunciation: _pronunciation.current.value, definition: _definition.current.value, example: _example.current.value, completed: false}))
    history.push("/")
  };

  return (
    <div>
      <Container>
         <div className="heading2"> 단어 추가하기</div>
         <Wrapper>
          <label>단어</label>
          <input type="text" ref={_name}></input>
          <label>발음</label>
          <input type="text" ref={_pronunciation}></input>
          <label>설명</label>
          <input type="text" ref={_definition}></input>
          <label>예시</label>
          <input type="text" ref={_example}></input>
         </Wrapper>
         <Button
         onClick={addVocab}>추가하기</Button>
         <Button
         onClick={()=>{
           history.push("/")
         }}><Span>🏠</Span></Button>
      </Container>

    {/* 데이터를 가져와서 넣을수있을지 확인 */}
    </div>


  )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
  margin: 50px auto;
`
const Wrapper = styled.div`
  margin-top: 30px;
  text-align: left;
`

const Button = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--primary-color);
  height: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: white;
  &:hover{
    background-color: var(--line-color);
  } 
`

const Span = styled.div`
  font-size: 1.3rem !important;
`

export default NewWord;