import {initFirebase} from './InitFirebase';
const firebase = new initFirebase();
const db = firebase.firestore();
let uid;

// hack/workaround for firestore operations breaking on android
// from Dmitri Bizyaev https://github.com/firebase/firebase-js-sdk/issues/283#issuecomment-345099364
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  if (body === '') {
    originalSend.call(this);
  } else {
    originalSend.call(this, body);
  }
};

// driver for the SmileGame
// abstracts away keeping track of which emotions have been shown, and reporting that to the firebase server
class GameDriver {

  /*
  emotions should be in the form...
    [{
      name: String,
      imgs: [String]
    }]
  */
  constructor ( emotions, n, name ) {
    uid = firebase.auth().currentUser.uid;

    this.emotions = emotions;
    this.question = 0;

    const questions = [];
    for( let i=0; i<n; i++ ) {
      // pick a random emotion for the image to be of
      const emotionImgIndex = Math.floor(Math.random()*emotions.length);
      // pick a random image of that emotion
      const emotionImg = emotions[emotionImgIndex].imgs[Math.floor(Math.random()*emotions[emotionImgIndex].imgs.length)];
      // pick a random emotion
      const emotionNameIndex = Math.floor(Math.random()*emotions.length);
      // get the name of that emotion
      const emotionName = emotions[emotionNameIndex].name;

      // push our newly constructed question to the list, indicating the correct answer (true if the image and emotion name match)
      questions.push({
        emotion: emotionName,
        img: emotionImg,
        correct: (emotionImgIndex === emotionNameIndex)
      });
    }
    this.questions = questions;

    const answers = [];
    for ( const question of questions ) {
      answers.push( { emotion: question.emotion } );
    }
    this.answers = answers;
    this.reported = false;
    this.name = name;
  }
  /*
  * questions are in the format:
  [
    {
      emotion: String,
      img: String,
      correct: Boolean
    }
  ]

  * answers are in the format:
   [
    {emotion: String, correct: Boolean}
   ]
  */

  getQuestion( n ) {
    return this.questions[n];
  }

  // n: Number, the index for the question being answered
  // a: Boolean, the answer
  setAnswer( n, a ) {
    this.answers[n].correct = (this.questions[n].correct === a);
  }

  //reports whether or not all questions have been answered
  gameOver() {
    return this.answers.reduce( (a,b) => a&&b.hasOwnProperty('correct'), true );
  }

  reportAnswers() {
    // only report if the game is over and we haven't already reported
    if ( this.gameOver() && !this.reported ) {
      // hack just to get this inside the promise without bind
      const that = this;
      // querry for the current user's data
      db.collection('users').doc(uid).get()
        .then( function( doc ){
          console.log('inside promise');

          let userData;
          if ( doc.exists ) {
            userData = doc.data();
          }
          else {
            userData = {
              emotions: [],
              testResults: []
            };
          }

          //console.log('initial userData:', userData);
          //console.log('answers:', that.answers);

          //set the emotions part...
          for ( const a in that.answers ) {
            const numRight = that.answers[a].correct ? 1 : 0;

            // first find the index of this emotion in the userData if it exists at all
            let i = -1;
            for( const e in userData.emotions ) {
              if ( userData.emotions[e].name === that.answers[a].emotion ) {
                i = e;
              }
            }

            // if that emotion does not exist...
            if ( i === -1 ) {
              userData.emotions.push({
                name: that.answers[a].emotion,
                total: 1,
                correct: numRight
              });
            }
            else {
              userData.emotions[i].total++;
              userData.emotions[i].correct += numRight;
            }
          }

          //set the testResult record
          userData.testResults.push({
            testName: that.name,
            questionsTotal: that.answers.length,
            questionsCorrect: that.answers.reduce( (a,b) => a+b.correct, 0 ),
            timeTaken: new Date()
          });

          //console.log('about to set user data:', userData);

          //now write the updated data to firestore
          return db.collection( 'users' ).doc( uid ).set( userData );
        })
        .catch( function( err ) {
          //console.log('this is:', this);
          console.log( 'problem retrieving user data:', err );
        });
    }
  }

}

export {GameDriver};
