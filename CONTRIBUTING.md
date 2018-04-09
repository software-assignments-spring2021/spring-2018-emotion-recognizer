# Contributing

## Work Flow
Our team follows a ~~Feature Branch Workflow~~ slow-motion version of a **trunk-based workflow**:
1. Changes are committed to local branches
2. These new branches are pushed to GitHub no more than 2 days after they were initially created
3. Pull requests are used to ensure peer review of the changes in these branches
4. Peer review is completed within 1 day of the initiation of the pull request and the branch is merged with master

## How we will resolve conflicts
1. Communicate about **all decisions** to avoid problems when possible
1. Work together to compromise to come to a decision
2. In case of ties, use a random number generator

## Regular duties
1. Maintain the Task Board in GitHub repository's Project tab
2. Assign all tasks to specific team members at Sprint Planning meetings and at daily scrums
3. Rotate Product Owner and Scrum Master roles every Sprint

## Maintaining task boards
The product owner for each Sprint is responsible for creating that Sprint's initial Task Board in the GitHub repository's Projects tab
- all team members are responsible for helping to write user stories and their corresponding tasks

Team members can claim any unassigned task in the "To Do" column of the Task Board
- Assigning that task to yourself
- Move the task from the "To Do" to "In Process" columns
- It is your responsibility to maintain that task in the proper position on the Task Board until complete

## Communication
**All team members agree** to...
- work together, if you are stuck ask questions!
- practice pristine communication
- discuss problems or disagreements as soon as they arise

### Response time expectations
**All team members agree** to respond to queries within the following limits:
1. Monday - Friday 10am - 8pm: 3 hours 
2. Saturday - Sunday: 8 hours 

### Daily scrums ##
**All team members agree** to participate in daily scrums at the following times and places:
- Sundays 4:45pm IN-PERSON
- Monday 12:30pm REMOTE
- Tuesday 4:45 IN-PERSON
- Thursday 3:30 REMOTE 

Let team members know in advance if you will be unavailable 

## In case of a member not meeting expectations
Diagreements or problems with team members will be addressed as follows:
1. Group meeting to find out why
2. **Notify the stakeholders** if the problem is not resolved within 2 days
 
## Set up development environment
The following steps will set up the development environment for anyone interested in contributing:

1. Clone the git repository
```
git clone https://github.com/nyu-software-engineering/emotion-recognizer.git
```

2. Navigate the working directory to the 'app' directory where the application code resides:
```
cd emotion-recognizer/app
```

3. Have npm install all dependencies listed in package.json
```
npm install
```

4. Set system kernel max file size and files per process (this was necessary on a Mac running OS X... but it may not be necessary for all machines, and is only available for UNIX/Mac machines):
```
sudo sysctl -w kern.maxfiles=5242880
sudo sysctl -w kern.maxfilesperproc=524288
```

5. Start node.js server
```
npm start
```

6. When the menu appears, press 'i' to launch XCode Simulator
```
i
```

If you see a ``Unable to verify Xcode and Simulator installation`` error, make sure to [enable XCode's command-line tools] (https://stackoverflow.com/questions/45537048/react-native-ios-simulator-simulator-is-installed-but-is-identified-as-don#45537180).

7. If you want to simulate the app running on a real device (e.g. a phone)...
- download an app called 'Expo Client' from your phone's app store onto your phone
- use that app to scan the QR code that appeared when you started the node.js server above
- this simulates the app within a web browser in the app, so it is not exactly the same as running the native version

