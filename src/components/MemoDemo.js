import React, { useState, useMemo } from "react";

const MemoDemo = () => {
  const [myNum, setMyNum] = useState(0);
  const [show, setShow] = useState(true);
  const getValue = () => {
    return setMyNum(myNum + 1);
  };
  const countNumber = (num) => {
    console.log("countNumber", num);
    for (let i = 0; i <= 1000000000; i++) {}
    return num;
  };
  const checkData = useMemo(() => {
    return countNumber(myNum);
  }, [myNum]);

  return (
    <>
      <button onClick={getValue}>Counter</button>
      <p>My new number:{checkData}</p>
      <button onClick={() => setShow(!show)}>
        {show ? "You clicked me" : "Click me please"}
      </button>
    </>
  );
};

export default MemoDemo;
