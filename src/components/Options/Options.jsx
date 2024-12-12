export default function Options({ options, onLeaveFeedback, onResetFeedback, totalFeedback}) {
    return (
        <div>
            {options.map(option => (
                <button key={option} onClick={() => onLeaveFeedback(option)}>
                    {option}
                </button>
            ))}
            { totalFeedback > 0 && (
                <button onClick={onResetFeedback} style={{marginLeft: '10px'}}>
                    Reset
                </button>
            )}
        </div>
    );
};