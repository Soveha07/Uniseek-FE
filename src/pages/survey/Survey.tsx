import React, { useState } from 'react';
import ProcessBar from './ProcessBar';
import { questions } from './QueAns';
import './Survey.css';
import { submitSurvey } from '../../services/survey/surveyService';
import Loading from '../../components/common/Loading';
import { useNavigate } from 'react-router-dom';
import { University } from '../../interfaces/university.interface';

type AnswerValue = string | string[] | null;
interface Answers {
  [questionId: number]: AnswerValue;
}

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState<University[]>();
  const userUID = localStorage.getItem("userID");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>(() => {
    const initial: Answers = {};
    questions.forEach(q => {
      initial[q.id] = q.selectionType === 'multiple' ? [] : null;
    });
    return initial;
  });

  const [loading, setLoading] = useState<boolean>(false); // Loading state for submission

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  const handleChoiceSelect = (choice: string) => {
    const questionId = currentQuestion.id;
    if (currentQuestion.selectionType === 'multiple') {
      setAnswers(prev => {
        const currentSelections = (prev[questionId] as string[]) || [];
        let updatedSelections: string[] = [];

        if (currentSelections.includes(choice)) {
          updatedSelections = currentSelections.filter(item => item !== choice);
        } else {
          if (currentQuestion.maxSelections && currentSelections.length >= currentQuestion.maxSelections) {
            updatedSelections = currentSelections;
          } else {
            updatedSelections = [...currentSelections, choice];
          }
        }
        return { ...prev, [questionId]: updatedSelections };
      });
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: choice,
      }));
    }
  };

  const handleNext = async () => {
    if (currentQuestion.selectionType === 'multiple') {
      const selections = (answers[currentQuestion.id] as string[]) || [];
      if (currentQuestion.minSelections && selections.length < currentQuestion.minSelections) {
        alert(`Please select at least ${currentQuestion.minSelections} option(s).`);
        return;
      }
    } else {
      if (!answers[currentQuestion.id]) {
        alert('Please select an option before proceeding.');
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      try {
        setLoading(true);
        const payload = {
          studyTrack: answers[1], // Adjust IDs according to your data
          strongestSubjects: answers[2],
          extraCourse: answers[3],
          futureCareer: answers[4],
          budget: answers[5],
          scholarships: answers[6],
          exchangeProgram: answers[7],
          facilities: answers[8],
          shift: answers[9],
          classSize: answers[10],
          studentId: userUID,
        };

        console.log('Submitting survey with payload:', payload);
        const response = await submitSurvey(payload);
        setApiResponse(response);
        localStorage.setItem("universities", JSON.stringify(response));
        alert('Survey submitted successfully!');
        console.log("Navigating with universities:", response);
        navigate('/recommendation', { state: { universities: response } });
      } catch (error) {
        alert('Failed to submit survey. Please try again.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;


  if (loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    )
  }

  return (
    <div className="survey-container">
      <header className="survey-header">
        <h1>Survey</h1>
      </header>

      <div className="survey-content">
        <h2>{currentQuestion.question}</h2>
        <p>{currentQuestion.subQuestion}</p>
        <ul className="survey-choices">
          {currentQuestion.choices.map((choice, index) => {
            const choiceValue = typeof choice === 'string' ? choice : choice.value;
            const choiceLabel = typeof choice === 'string' ? choice : choice.label;

            return (
              <li
                key={index}
                className={`choice-item ${currentQuestion.selectionType === 'multiple'
                  ? ((selectedAnswer as string[]) || []).includes(choiceValue)
                    ? 'selected'
                    : ''
                  : selectedAnswer === choiceValue
                    ? 'selected'
                    : ''
                  }`}
                onClick={() => handleChoiceSelect(choiceValue)}
              >
                {choiceLabel}
              </li>
            );
          })}
        </ul>

      </div>

      {/* Fixed Footer */}
      <div className="survey-footer">
        <div className="process-bar-container">
          <ProcessBar progress={progressPercentage} />
        </div>
        <div className="survey-navigation">
          <button
            className="btn-back"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          <button className="btn-next" onClick={handleNext}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
