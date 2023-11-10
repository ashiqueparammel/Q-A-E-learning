import React, { useEffect, useState } from 'react'
import { baseUrl } from "../../Api/Api"
import { useNavigate } from "react-router-dom";
import { getLocal } from '../../Helpers/Auth';
import axios from "axios";

import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { data } from 'autoprefixer';




// localStorage.removeItem('authToken')

function Test() {
  const history = useNavigate()
  const token = getLocal();
  const [head, setHead] = useState([])
  const [question, setQuestion] = useState([])
  const [option, setOption] = useState([])
  const [count, setCount] = useState(1)
  const [mark, setMark] = useState(0)
  const [questionCount, setQuestionCount] = useState(0);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(4);
  const [final, setFinal] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(90);
  
  function score_sending() {
    let response = getLocal();
    
    if (response) {
      const decode_data = jwtDecode(response);
      let data = head[0];
  
      axios.post(`${baseUrl}/test/resultsadd/`, {
        score: mark +'/ '+question.length,
        candidate: decode_data.user_id,
        test_name: data.id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error sending score:', error);
      });
  
    }
  }
  
  const logout =() =>{
    localStorage.removeItem('authToken')
    history('/login')
   }
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        check_answer(false)
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(90);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);



  async function getHead() {
    const heads = await axios.get(`${baseUrl}/test/testadd/`)
    setHead(heads.data)
  }

  async function getQuestion() {
    const questions = await axios.get(`${baseUrl}/test/questionadd/`)
    setQuestion(questions.data)
    setQuestionCount(questions.data.length)
  }

  async function getOption() {
    const options = await axios.get(`${baseUrl}/test/optionsadd/`)
    setOption(options.data)
  }

  const check_answer = (is_correct) => {
    if (is_correct) {
      setCount((prevCount) => prevCount + 1);
      setMark((prevMark) => prevMark + 1);
      setSeconds(90);
      setQuestionCount((questionCount) => questionCount - 1);
      setStart(limit);
      setLimit((prevLimit) => prevLimit + 4)
      toast.success('True!')
      if (questionCount === 1) {

        setFinal(true)
      }

    } else {
      setStart(limit);
      setSeconds(90);
      setLimit((prevLimit) => prevLimit + 4)
      setCount((prevCount) => prevCount + 1);
      setQuestionCount((questionCount) => questionCount - 1);
      toast.error('false!')
      if (questionCount === 1) {
        setFinal(true)
      }
    }
  };


  useEffect(() => {
    if (!token) {
      history('/')
    }
    getHead()
    getQuestion()
    getOption()
  }, [])



  return (
    <>


      {final ? (



        <div className='bg white-200 bg-cover h-full w-full'>
          <br />
          <Button className='ml-[90%]' onClick={logout}>Logout</Button>
          <br />
              <Typography variant="h2" color="blue-gray" className="mb-2 text-center">
                <FontAwesomeIcon icon={faCheckCircle} className='justify-center'
                  style={{ fontSize: '6rem', color: 'green', transition: 'color 0.3s ease-in-out', }} />
                <br />
                WellDone
              </Typography>

              <Typography variant="h6" className='  text-center' >
                Excellent! You Are Grate In Grammer

              </Typography>
              <Typography variant="h2" className=' text-center' >
                <h1 className='text-sm text-gray-500'>Your Score</h1> {mark}/{question.length}
              </Typography>


              <br />
              <Typography variant="h6" className=' text-center'>
                Your Grammer is mostly on Point,
                <br />
                Your Are Just One More Step Away
                <br />
                From Finding Your Level
              </Typography>
              <br />

              <div className='flex justify-center items-center'>
                <div>

                  <div >
                    <Button
                      className='w-80 text-black border-radius:20px text-xl p-6 bg-yellow-400' onClick={score_sending}>
                      Email Your Score
                    </Button>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
        </div>


      ) : (
        <div className='bg white-200 bg-cover h-full w-full'>
          <Card className="mt-6 w-3/5">
            <CardBody>
              <Typography variant="h2" color="blue-gray" className="mb-2 text-center">
                {head.map(obj => (obj.heading))}
              </Typography>

              <Typography className='ml-28 w-[600px] text-center' >
                {head.map(obj => (obj.description))}
              </Typography>


              <br />
              <Typography variant="h6" className='flex justify-between'>
                <h1> No Of Questions {questionCount} More go</h1>
                <h1 >Time Remaining :{seconds} Seconds</h1>
              </Typography>
              <br />

              <div className='flex justify-center items-center'>
                <div>
                  <Typography variant="h6" className='text-black' >

                    {count}. {count <= question.length ? (
                      <div>
                        <h3>{question[count - 1].question}</h3>
                        <button onChange={count}></button>
                      </div>
                    ) : (
                      <p>No more questions!</p>
                    )}
                  </Typography>
                  <br />

                  {option.slice(start, limit).map((obj, index) => (
                    <div key={index}>
                      <Button
                        className='w-80 text-black p-6 bg-gray-100' onChange={limit}
                        onClick={() => check_answer(obj.is_correct)}
                      >
                        {obj.option}
                      </Button>
                      <br />
                      <br />
                    </div>
                  ))}


                </div>
              </div>

            </CardBody>
          </Card>


          <Toaster />
        </div>
      )}
    </>

  )
}

export default Test