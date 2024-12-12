import { useState, useEffect } from 'react';
import Description from "./components/Description/Description"; 44
import Options from "./components/Options/Options";
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';

const App = () => {
    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = localStorage.getItem('feedback');
        return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
    });

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);

    const updateFeedback = (feedbackType) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [feedbackType]: prevFeedback[feedbackType] + 1,
        }));
    };

    const resetFeedback = () => {
        setFeedback({
            good: 0,
            neutral: 0,
            bad: 0,
        });
    };

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positivePercentage = totalFeedback > 0 
        ? Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100) 
    : 0;
    
    return (
        <>
            <Description />
            <Options options={['good', 'neutral', 'bad']} onLeaveFeedback={updateFeedback} onResetFeedback={resetFeedback} totalFeedback={totalFeedback} />
            {totalFeedback > 0 ? (
                <Feedback feedback={feedback} totalFeedback={totalFeedback} positivePercentage={positivePercentage} />
            ) : (
                <Notification message="No feedback given yet."/>
            )}
        </>
    );
};

export default App;