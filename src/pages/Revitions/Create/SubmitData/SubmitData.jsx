import React, { useEffect, useState } from 'react'
import QuestionComp from './QuestionComp';
import createRevition from '../../../../api/RevitionsMannagement/CreateRevition';
import LoadingScreen from '../../../../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import getUid from '../../../../api/UserMannagement/getUid';

export default function SubmitData({ data }) {
  const { title, description, isPublic, questions } = data;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log({ data });
  }, [])


  const sendDataToServer = async () => {
    data.authorID = await getUid();

    console.log("Sending data to server")
    setIsLoading(true);
    await createRevition(data).then(res => {
      console.log(res);
      setIsLoading(false);
      navigate('/');
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }


  if (isLoading) {
    return (
      <LoadingScreen text={"Submiting revition to server"} />
    );
  }

  return (
    <div>
      <div>
        <h1>Submit Form</h1>
        <h2>Title: {title}</h2>
        <p>Des: {description}</p>
        <p>{isPublic ? 'Public' : 'Prviate'}</p>

        <h2>Questions</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <QuestionComp question={question} index={index} />
          </div>
        ))}
      </div>

      <button onClick={sendDataToServer}>Done</button>
    </div>
  )
}
