// AUTHOR: JIEUN



import React from 'react';
import {Route, Switch} from "react-router-dom";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import './App.css';

import VocabList from './VocabList';
import NewWord from './NewWord';
import NotFound from "./NotFound";
import {useSelector, useDispatch } from "react-redux";

// import {db } from "./firebase";
// import { collection, addDoc } from "firebase/firestore";
import {loadVocabFB} from "./redux/modules/vocab"
import { JoinInnerRounded, KeyTwoTone } from '@mui/icons-material';


function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadVocabFB())
  },[]);

  let history = useHistory();


  return (
    <div className="App">
      <Container>
        <Header>VOCAB NOTE</Header>
        <Switch>
          <Route exact path="/" component = {VocabList} />
          <Route exact path="/newword" component = {NewWord} />
          <Route component = {NotFound}/>
        </Switch>
      </Container>
      <Up className="addbtn" 
        onClick={()=> {
        history.push("/NewWord");
      }}>+</Up>  
      <Up onClick={()=>{
        window.scrollTo({top:0, left:0, behavior:"smooth"});
      }}>⇧</Up>  
    </div>
  );
}

// styled-components

const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  background-color: #fff;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 100;
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  box-shadow: inset 0px -1px 1px #e7ebf0;
  font-size: 1.6rem;
  font-weight: bold;
  padding-bottom: 20px;


`;

const Up = styled.div`
  height: 50px;
  width: 50px;
  border-radius:50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--primary-color);
  font-size: 2rem;
  font-weight: 800;
  cursor: pointer;
  &:hover{
    background-color: var(--line-color);
  }
`;

export default App;
