import { createStore } from "redux";




// const add = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");


// const ADD = "ADD";
// const MINUS = "MINUS";
// const countModifier = (count = 0, action) => {
//     switch (action.type) {
//         case ADD:
//             return count + 1;
//         case MINUS:
//             return count - 1;
//         default:
//             return count;
//     };
// };
// const countStore = createStore(countModifier);

// const onChange = () => {
//     number.innerText = countStore.getState();

// };
// countStore.subscribe(onChange);

// const handleAdd = () => {
//     countStore.dispatch({ type: "ADD" })
// };
// const handleMinus = () => {
//     countStore.dispatch({ type: "MINUS" })
// };

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text
    };
};
const deleteTodo = id => {
    return {
        type: DELETE_TODO,
        id
    };
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() };
            return [newToDoObj, ...state];
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            return cleaned;
        default:
            return state;

    }
};

const store = createStore(reducer);
store.subscribe(() => { console.log(store.getState()); })
const onSubmit = (e) => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

const dispatchAddToDo = (text) => {
    store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteTodo(id));
};

const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        li.id = toDo.id;
        li.innerText = toDo.text;
        btn.innerText = "DEL";
        btn.addEventListener("click", dispatchDeleteTodo);
        ul.appendChild(li);
        li.appendChild(btn);
    })
}

store.subscribe(paintToDos);

form.addEventListener("submit", onSubmit);

// 유일하게 state를 바꿀 수 있는 방법은 action을 send하는것뿐

//절대 mutate state!