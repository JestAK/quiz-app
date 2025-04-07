# Quiz App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

App to create quizzes and take quizzes. The app is built using React, Tailwind and TypeScript. It uses the **Contentful API** to fetch questions.


## How to launch
1. Clone the repository to your computer
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add your Contentful API keys:
   ```
   REACT_APP_SPACE_ID=your_space_id
   REACT_APP_ACCESS_TOKEN=your_access_token
   ```
   You can get these keys from your Contentful account.
4. Run `npm start` to start the development server or `npm build` to build the app

## Test dataset
If you want to see example of the data sctructure or test the app without creating your own questions, you can use the test dataset `test_data.json`.

