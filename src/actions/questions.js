import {saveQuestionAnswer ,saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS ='RECEIVED_QUESTIONS';
export const ADD_QUESTION ='ADD_QUESTION';
export const ANSWER_QUESTION ='ANSWER_QUESTION';


export function receiveQuestions (questions){
    return {
        type :RECEIVE_QUESTIONS ,
        questions,
    }
}

 function addQuestion (question){
    return {
        type:ADD_QUESTION,
        question
    }
}

 function answerQuestion(answer){
    return{
        type:ANSWER_QUESTION,
        ...answer
    }
}

export function handleAddQuestion(question){
    return (dispatch) => {
        saveQuestion(question).then((retQuestion) =>
            dispatch(addQuestion(retQuestion))
        ).catch((error)=>{
            console.error(error)
            alert('Error occurred while adding your question , please try again')
        })
    }
}

export function handleAnswerQuestion(answer){
    return (dispatch) => {
        saveQuestionAnswer(answer).then(()=>{
            dispatch(answerQuestion(answer))
        })
        .catch((error)=>{
            console.error(error)
            alert('Error occurred while recording your answer , please try again')
        })
    }
}