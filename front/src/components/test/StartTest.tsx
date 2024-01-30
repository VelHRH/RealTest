'use client';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faLink,
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

interface StartTestProps {
  testId: string;
  text: string;
  otherTests: ITest[];
}

const StartTest: FC<StartTestProps> = ({ testId, text, otherTests }) => {
  const [isDate, setIsDate] = useState<boolean>(false);
  const [isExplain, setIsExplain] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string>('');
  const [secondTest, setSecondTest] = useState<{ _id: string; name: string }>({
    _id: '',
    name: '',
  });
  const handleSubmit = async () => {
    window.location.reload();
    const res = await fetch(`${process.env.API_HOST}/test/${testId}/result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify({
        testEnd: `${endDate}T00:00:00.000+00:00`,
      }),
    });
    const res2 =
      secondTest._id !== '' &&
      (await fetch(`${process.env.API_HOST}/test/${secondTest._id}/result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({
          testEnd: `${endDate}T00:00:00.000+00:00`,
        }),
      }));
    const response = await res.json();
    const response2 = res2 && (await res2.json());
    if (response.success && (response2.success || secondTest._id === '')) {
      toast.success('Test(s) started!');
    }
  };
  return (
    <>
      {isDate && (
        <div className="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-70">
          <div
            className={`w-2/3 rounded-xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ${
              otherTests.length === 0 ? 'bg-amber-200' : 'bg-sky-200'
            } p-10 flex flex-col items-center font-semibold`}
          >
            {otherTests.length !== 0 ? (
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-4xl">Add test to pair</p>
                <div className="flex gap-2 justify-center">
                  {secondTest._id === '' ? (
                    otherTests.map(t => (
                      <button
                        onClick={() => setSecondTest({ _id: t._id, name: t.name })}
                        className="py-1 px-2 bg-sky-600 rounded-md text-white border-2 border-sky-600 hover:bg-transparent hover:text-sky-600 duration-300"
                        key={t._id}
                      >
                        <FontAwesomeIcon icon={faLink} className="mr-2" />
                        {t.name}
                      </button>
                    ))
                  ) : (
                    <div className="flex justify-center gap-4">
                      <p className="text-2xl">Pair test:</p>
                      <button
                        onClick={() => setSecondTest({ _id: '', name: '' })}
                        className="py-1 px-2 rounded-md border-2 border-green-600 bg-transparent text-green-600 duration-300 hover:border-red-600 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        {secondTest.name}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-4xl ">Your company has no more tests to pair!</p>
            )}

            <div
              className={`flex flex-col w-full items-center ${isExplain && 'border-2'} ${
                otherTests.length === 0 ? 'border-amber-300' : 'border-sky-300'
              } rounded-full p-2 mt-2`}
            >
              <button
                onClick={() => setIsExplain(prev => !prev)}
                className="flex justify-center gap-3 items-center hover:scale-105 duration-300"
              >
                <FontAwesomeIcon icon={!isExplain ? faChevronDown : faChevronUp} /> What is pair?
              </button>
              {isExplain && (
                <p className="w-[95%]">
                  You can run two tests at the same time in order to get all the benefits of A/B
                  testing. It is not necessary to do this and you can stop at one test if you do not
                  have a device or product for the second one.
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4 items-center my-5">
              Start testing at
              <input
                type="date"
                className="rounded-md p-1"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-around w-2/3">
              <div
                onClick={() => {
                  setIsDate(prev => !prev);
                }}
                className="w-1/3"
              >
                <Button color="red" size="medium">
                  Cancel
                </Button>
              </div>
              <div onClick={handleSubmit} className="w-1/3">
                <Button
                  color={endDate !== '' ? 'blue' : 'grey'}
                  size="medium"
                  icon={endDate !== '' ? <FontAwesomeIcon icon={faRocket} /> : null}
                  isDisabled={endDate === ''}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex gap-2 items-center">
        <div
          className={`w-full`}
          onClick={() => {
            setIsDate(prev => !prev);
          }}
        >
          <Button color="yellow" size="medium" icon={<FontAwesomeIcon icon={faRocket} />}>
            {text}
          </Button>
        </div>
      </div>
    </>
  );
};

export default StartTest;
