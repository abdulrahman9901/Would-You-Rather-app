
import {ANSWER_QUESTION, RECEIVE_QUESTIONS , ADD_QUESTION} from '../actions/questions'

export default function questions (state={},action){
    switch(action.type){
    case RECEIVE_QUESTIONS :
        console.log('questions at the reducer : ',action.questions)
        return {
            ...state,
            ...action.questions
        }
    case ANSWER_QUESTION:
        return{
            ...state,
            [action.qid]: {
              ...state[action.qid],
              [action.answer]: {
                ...state[action.qid][action.answer],
                votes: state[action.qid][action.answer].votes.concat([action.authedUser])
              }
            }
        }
    case ADD_QUESTION:
        return{
            ...state,
            [action.question.id]:{
                ...action.question
            }
        }
    default:
        return state
    }
}