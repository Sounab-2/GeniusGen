export const quiz = {
    topic: 'Javascript',
    level: 'Beginner',
    totalQuestions: 10,
    perQuestionScore: 1,
    questions: [
      {
        question: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
        type: 'MCQs',
        correctAnswer: 'stringify()',
      },
      {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        choices: ['var', 'let', 'var and let', 'None of the above'],
        type: 'MCQs',
        correctAnswer: 'var and let',
      },
      {
        question:
          'Which of the following methods can be used to display data in some form using Javascript?',
        choices: ['document.write()', 'console.log()', 'window.alert', 'All of the above'],
        type: 'MCQs',
        correctAnswer: 'All of the above',
      },
      {
        question: 'How can a datatype be declared to be a constant type?',
        choices: ['const', 'var', 'let', 'constant'],
        type: 'MCQs',
        correctAnswer: 'const',
      },
      {
        question: 'What is the purpose of the "use strict" directive in JavaScript?',
        choices: ['To enforce stricter syntax rules', 'To enable strict mode for the entire script', 'To indicate that a function should be executed in strict mode', 'To prevent certain actions and catch common coding errors'],
        type: 'MCQs',
        correctAnswer: 'To enable strict mode for the entire script',
      },
      {
        question: 'How can you check if a variable is an array in JavaScript?',
        choices: ['Using the typeof operator', 'Using the isArray() method', 'Using the instanceof operator', 'Using the isArray() function'],
        type: 'MCQs',
        correctAnswer: 'Using the isArray() method',
      },
      {
        question: 'What is the purpose of the "let" keyword in JavaScript?',
        choices: ['To declare a block-scoped variable', 'To declare a constant variable', 'To declare a globally-scoped variable', 'To declare a function-scoped variable'],
        type: 'MCQs',
        correctAnswer: 'To declare a block-scoped variable',
      },
      {
        question: 'What does the "typeof" operator return when used with a function?',
        choices: ['"function"', '"object"', '"undefined"', '"string"'],
        type: 'MCQs',
        correctAnswer: '"function"',
      },
      {
        question: 'Which method is used to remove the last element from an array in JavaScript?',
        choices: ['pop()', 'shift()', 'remove()', 'slice()'],
        type: 'MCQs',
        correctAnswer: 'pop()',
      },
      {
        question: 'What is the purpose of the "NaN" value in JavaScript?',
        choices: ['To represent "Not a Number"', 'To indicate an error', 'To represent a null value', 'To represent an undefined value'],
        type: 'MCQs',
        correctAnswer: 'To represent "Not a Number"',
      },
    ],
  }