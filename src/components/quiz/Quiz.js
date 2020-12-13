import React, { useState, useEffect } from "react";
import Header from "../layout/header/Header";
import Button from "../general/Button";
import Question from "./Question";
import Navigation from "./Navigation";
import arch from "../../assets/white_arch.svg";
import Overlay from '../general/Overlay';
import SignUp from '../user/SignUp';
import './Quiz.scss';

function Quiz() {
  const [qNumber, setQNumber] = useState(1);
  const [qTotal, setQTotal] = useState(10);
  const [qComplete, setQComplete] = useState(false);
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    if (qNumber === qTotal) {
      setQComplete(true);
    } else {
      setQComplete(false);
    }
  });

  const navigate = (value) => {
    let next = qNumber + value;
    if (next === 0) {
      next = 1;
    } else if (next > qTotal) {
      next = qTotal;
    }
    setQNumber(next);
  };

  const signUpHandler = () => {
    setSignUp(!signUp);
  }

  return (
    <>
      <img src={arch} alt="arch" />
      <div className="quiz">
        <h2 className="quiz-header">Travel preferences?</h2>
        <div className="quiz-underline" />
        <Question />
        {!qComplete && (
          <Navigation current={qNumber} total={qTotal} navigate={navigate} />
        )}
        {qComplete && (
            <Button
              title="Get Results"
              onClick={setSignUp}
              className="get-results-button"
            />
        )}
        {
          signUp &&
            <>
              <SignUp />
              <Overlay onClick={signUpHandler}/>
            </>
        }
        <Header />
      </div>
    </>
  );
}

export default Quiz;
