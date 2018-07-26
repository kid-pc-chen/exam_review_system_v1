import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import exam1 from "./exam_data/exam1";
import exam2 from "./exam_data/exam2";
import exam3 from "./exam_data/exam3";


class ExamReviewer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleKeyWordChange = this.handleKeyWordChange.bind(this);
    this.handleExamOptionChange = this.handleExamOptionChange.bind(this);

    this.state = {
        keyword: '',
        exam_option: 'exam1'
    };
  }

  handleKeyWordChange(keyword) {        
    this.setState({ keyword: keyword });
    // console.log("ExamReviewer keyword: " + keyword);
  }

  handleExamOptionChange(exam_option) {
    this.setState({ keyword: '' });
    this.setState({ exam_option: exam_option });
  }

  render() {    
    const exam_list = {
      "exam1": exam1,
      "exam2": exam2,
      "exam3": exam3
    };

    return (
      <div>
        <ExamSelector onChange={this.handleExamOptionChange} />
        <SearchBox defaultKeyword={this.state.keyword} onChange={this.handleKeyWordChange} />
        <QuestionsList exam={exam_list[this.state.exam_option]} keyword={this.state.keyword} />
      </div>
    );
  }
}

class ExamSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
          <h1>試卷選擇 Choosing examination paper</h1>
          <select onChange={this.handleChange}>
              <option value="exam1">試卷1</option>
              <option value="exam2">試卷2</option>
              <option value="exam3">試卷3</option>                  
          </select>
      </div>
    );
  }
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);        
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const {defaultKeyword} = this.props;
    return (      
      <div>
          <h1>關鍵字查詢 Keyword search</h1>
          <input type="text" placeholder="在此輸入關鍵字" value={defaultKeyword} onChange={this.handleTextChange} />
      </div>
    );    
  }
}

// https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
function getHighlightedText(text, higlight) {
  // Split on higlight term and include term into parts, ignore case
  let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
  return <span> { parts.map((part, i) => 
      <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor: 'yellow' } : {} }>
          { part }
      </span>)
  } </span>;
}

class QuestionsList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    const {keyword} = this.props;
    const {exam} = this.props;
    return (
      <div> {
        Object.keys(exam).map(function(k, i) {                
            // console.log("this: " + this);
            return (
                <div key={"examType" + i}>
                    <h1 key={"examType" + i}> {k} </h1>
                    <div>
                        {
                            exam[k].map(function (question, j) {
                                // console.log("keyword: " + keyword);
                                return question.toLowerCase().includes(keyword.toLowerCase()) ? 
                                    (<div key={"question" + j}> {getHighlightedText(question, keyword)} </div>) : 
                                    (<div key={"question" + j}></div>);
                            })
                          }
                    </div>
                </div>
            )
          
        })
      } </div>
    );
  }

}

class App extends Component {
  render() {
    /*
    return (
      <ExamReviewer/>
    )
    */
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Exam Review System v1.</h1>
        </header>
        <p className="App-intro">
          This toy project helps me to learn React.js.
        </p>
        <div className="App-content">
          <ExamReviewer/>
        </div>
      </div>      
    );
    
  }
}

export default App;
