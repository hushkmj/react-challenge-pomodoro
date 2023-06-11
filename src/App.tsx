import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { goalAtom, minutesAtom, roundAtom, secondAtom } from "./atoms";

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 45vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 60px;
  font-weight: 600;
  margin: 50px;
`;
const Body = styled.div`
  
`;
const Footer = styled.div`

`;

const Section1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
`;
const Section2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
`;
const Section3 = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    width: 30vw;
    margin: 50px;

`;

const Time = styled(motion.div)`
  width: 200px;
  height: 300px;
  display: grid;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(7, 35, 149);
  font-size: 100px;
  font-weight: 600;
`;

const time = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
  exit: {
    scale: 0,
  }

}
const Colon = styled.div`
  font-size: 100px;
  font-weight: 600;
  margin: 10px;
`;

const Result = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    opacity: 0.7;
    margin: 10px;
`;

const Subject = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    margin: 10px;
`;

const Svg = styled.svg`
    
`;
function App() {
  const setMinutes = useSetRecoilState(minutesAtom);
  const minutes = useRecoilValue(minutesAtom);
  const setSecond = useSetRecoilState(secondAtom);
  const second = useRecoilValue(secondAtom);
  const setGoal = useSetRecoilState(goalAtom);
  const goal = useRecoilValue(goalAtom);
  const setRound = useSetRecoilState(roundAtom);
  const round = useRecoilValue(roundAtom);
  const [stop, setStop] = useState(false);
  const [count, setCount] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!stop) {
        if (second > 0) {
          setSecond((c) => c - 1);
        }
        else {
          if (minutes !== 0) {
            setMinutes((c) => c - 1);
            setSecond(2);
          } else {
            if (round !== 1) {
              setRound((c) => c + 1);
              setMinutes(1);
              setSecond(2);
            } else {
              setGoal((c) => c + 1);
              if (goal !== 1) {
                setRound(0);
                setMinutes(1);
                setSecond(2);
              } else {
                setRound((c) => c + 1);
                clearInterval(timer);
              }
            }
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer)
    };
  }, [second, stop]);

  const onClick = () => {
    setStop((c) => !c);
  }

  return (
    <Wrapper>
      <Header>Pomodoro</Header>
      <Body>
        <Section1>
          <Time
            variants={time}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {minutes > 10 ? minutes : "0" + minutes}
          </Time>
          <Colon>:</Colon>
          <Time
            variants={time}
            initial="initial"
            animate="animate"
          >
            {second > 10 ? second : "0" + second}
          </Time>

        </Section1>
        <Section2>
          {stop ? (
            <Svg
              onClick={onClick}
              fill="currentColor"
              viewBox="-10 -10 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path clipRule="evenodd" fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" />
            </Svg>
          ) : (
            <Svg
              onClick={onClick}
              fill="currentColor"
              viewBox="-10 -10 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path clipRule="evenodd" fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"></path>
            </Svg>
          )}
        </Section2>
      </Body>
      <Footer>
        <Section3>
          <Result>{round}/2</Result>
          <Result>{goal}/2</Result>
          <Subject>ROUND</Subject>
          <Subject>GOAL</Subject>
        </Section3>
      </Footer>
    </Wrapper >
  );
}

export default App;
