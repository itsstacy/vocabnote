import {db} from "../../firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Action 타입 정해줌

const LOAD = "vocab/LOAD";
const CREATE = 'vocab/CREATE';
const UPDATE = 'vocab/UPDATE';
const DELETE = 'vocab/DELETE';


const initialState = {
  list: [
    
  ],
};

// Action Creators 액션 개체
export function loadVocab (vocab_list) {
  return {type: LOAD, vocab_list};
};

export function createVocab (vocab) {
  return {type: CREATE, vocab};
};

export function updateVocab (index) {
  return {type: UPDATE, index};
};

export function deleteVocab (index) {
  return {type: DELETE, index};
};



// 파이어베이스랑 통신하는 함수

export const loadVocabFB = () => {
  return async function (dispatch) {
    const vocab_data = await getDocs(collection(db,"vocab"));
    
    let vocab_list = [];

    vocab_data.forEach((doc)=>{
      vocab_list.push( {id:doc.id, ...doc.data()});
    })

    dispatch(loadVocab(vocab_list));
  }
}

export const createVocabFB = (vocab) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "vocab"), vocab);
    console.log((await getDoc(docRef)).data());
    const vocab_data = {id:docRef.id, ...vocab};
    console.log(vocab_data);

    dispatch(createVocab(vocab_data));
  }
}

// 여기서 dispatch 다음에 getState를 가져오는데 왜?
export const updateVocabFB = (vocab_id, vocab_completed) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "vocab", vocab_id);
    console.log(vocab_completed);
     await updateDoc(docRef, {completed: !vocab_completed})
   
    // console.log(docRef, docRef.completed);
    const _vocab_list = getState().vocab.list;
    const vocab_index = _vocab_list.findIndex((b)=>{
      return b.id === vocab_id;
    })
    dispatch(updateVocab(vocab_index));
  }
}

// export const updateVocabFB = () => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db,"vocab",)
//   }
// }

export const deleteVocabFB = (vocab_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db,"vocab",vocab_id);
    await deleteDoc(docRef);

    const _vocab_list = getState().vocab.list;
    const vocab_index = _vocab_list.findIndex((b)=>{
      return b.id === vocab_id;
  })
  dispatch(deleteVocab(vocab_index));
}
}



// Reducer 순서대로 배치하면 보기좋음
export default function reducer(state= initialState, action = {}) {
  switch (action.type) {
     // do reducer stuff
      case "vocab/LOAD": {
        return {list: action.vocab_list};
    }

      case "vocab/CREATE": {
        const new_vocab_list = [...state.list, action.vocab];
        return {...state, list: new_vocab_list};
      }

      case "vocab/UPDATE": {
        console.log(action.index);
        const updated_vocab_list = state.list.map((l,idx) => {
          if (parseInt(action.index) === idx) {
            return {...l, completed: !l.completed};
            // console.log(l.completed, idx);
          } else {
            return l;
          }
        });
        console.log({updated_vocab_list})
        return {...state, list: updated_vocab_list};
      }


      case "vocab/DELETE": {
        const deleted_vocab_list = state.list.filter((l,idx)=>{
          return parseInt(action.index) !== idx ; 
        })
        return {...state, list: deleted_vocab_list};
      }
 
    default: 
        return state;
  }
}