import React, { useState } from 'react';
import './AIAssistant.css';

function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (question.trim()) {
      // 将输入框中的内容显示到结果区域
      setAnswer(question);
      // 可选：清空输入框
      // setQuestion('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <h1 className="title">问答助手</h1>
      
      <div className="input-section">
        <div className="input-group">
          <input
            type="text"
            className="question-input"
            placeholder="请输入您的问题..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="submit-button"
            onClick={handleSubmit}
          >
            提交问题
          </button>
        </div>
      </div>

      <div className="answer-section">
        <div className="answer-label">回答：</div>
        <div className="answer-content">
          {answer ? (
            answer
          ) : (
            <span className="answer-placeholder">回答将显示在这里...</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;

