/**
 * quizzes.js — Central data file for all Wedgwood Ultimate quizzes.
 *
 * To add a new quiz, push a new object into this array.
 * App.jsx and MainMenu.jsx pick it up automatically — no code changes needed.
 *
 * Shape:
 *   id            – unique string key
 *   title         – display title
 *   description   – short subtitle shown on the card
 *   emoji         – single emoji for the card icon
 *   questionCount – number shown on the card (update if questions change)
 *   estimatedMinutes
 *   comingSoon    – if true, card is grayed-out / non-clickable
 *   hasGuide      – if true, a "Study Guide" button appears during the quiz
 *   certLevel     – if set, shows the certification submission on the results screen
 *   questions     – array of question objects (see below)
 *
 * Question shape:
 *   id           – unique number within quiz
 *   question     – string
 *   options      – string[4]
 *   correctIndex – 0-based index into options
 *   coachTip     – string shown in FeedbackModal regardless of correct/wrong
 */

export const quizzes = [
  // ──────────────────────────────────────────────────────────────────────────
  // QUIZ 1 — The Basics & Our League
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'basics',
    title: 'Quiz 1: The Basics & Our League',
    description: 'Rules, gear, and how we play!',
    emoji: '🥏',
    questionCount: 10,
    estimatedMinutes: 6,
    comingSoon: false,
    questions: [
      {
        id: 1,
        question: 'How many players are on each side?',
        options: ['3', '5', '7', '11'],
        correctIndex: 1,
        coachTip:
          'Ultimate is played 5 vs 5 in our league — just like basketball!',
      },
      {
        id: 2,
        question: "What does 'marking' mean?",
        options: [
          'Throwing the disc',
          'Running a route',
          'Defending a specific player',
          'Calling a foul',
        ],
        correctIndex: 2,
        coachTip:
          'When you mark someone, you shadow them everywhere they go to stop them from getting the disc.',
      },
      {
        id: 3,
        question: "When you're on offense, how do you number the defenders?",
        options: [
          'Left to right, 1–5',
          'Right to left, 1–5',
          'By height, tallest first',
          'By jersey number',
        ],
        correctIndex: 0,
        coachTip:
          'Counting 1–5 left to right helps the whole team talk about the same defender.',
      },
      {
        id: 4,
        question: 'How far must you stay from the person you are marking?',
        options: [
          "Arm's length",
          'Two feet',
          'No minimum',
          'At least one disc-width',
        ],
        correctIndex: 3,
        coachTip:
          'One disc-width of space keeps it fair and prevents fouls on the mark.',
      },
      {
        id: 5,
        question: "What number does the stall count reach before it's a turnover?",
        options: ['5', '7', '10', '15'],
        correctIndex: 2,
        coachTip:
          "The stall count goes 'Stalling 1, 2, 3…10!' If it hits 10, the other team gets the disc.",
      },
      {
        id: 6,
        question: 'What happens if the disc goes out of bounds?',
        options: [
          'The thrower throws again',
          'The other team takes possession',
          'A coin flip decides',
          'The nearest player picks it up',
        ],
        correctIndex: 1,
        coachTip:
          'Out of bounds = turnover. Keep your throws in the field!',
      },
      {
        id: 8,
        question: 'What is the opening throw called?',
        options: ['The Kick', 'The Launch', 'The Toss', 'The Pull'],
        correctIndex: 3,
        coachTip:
          'The Pull starts every point — one team pulls (throws) to the other to begin play.',
      },
      {
        id: 10,
        question: "What does 'Gx' mean in our league?",
        options: [
          'A secret handshake only coaches know',
          'A girl or non-binary player who marks Gx players on the other team',
          'A sports drink preferred by Ultimate players',
          'A super-rare disc throwing trick',
        ],
        correctIndex: 1,
        coachTip:
          "Gx is a girl or non-binary player — and on defense, Gx players mark the Gx players on the other team. That's how our league keeps matchups fair!",
      },
      {
        id: 11,
        question: "What does 'Bx' mean in our league?",
        options: [
          'A boy or non-binary player who marks Bx players on the other team',
          'The player who decides which team goes first',
          'A backwards throw invented in 1987',
          'The kid who is really good at the worm',
        ],
        correctIndex: 0,
        coachTip:
          "Bx is a boy or non-binary player — and on defense, Bx players mark the Bx players on the other team. That's how our league keeps matchups fair!",
      },
      {
        id: 12,
        question: 'In a 5-person lineup, which Gx/Bx ratio is NOT used?',
        options: [
          '3 Gx and 2 Bx',
          '2 Gx and 3 Bx',
          '4 Gx and 1 Bx',
          'Both A and B are used',
        ],
        correctIndex: 2,
        coachTip:
          'Our league alternates between 3Gx/2Bx and 2Gx/3Bx each point. A 4+1 split is never used!',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // QUIZ 2 — Before Your First Game
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'advanced',
    title: 'Quiz 2: Before Your First Game',
    description: 'Essential rules for game day!',
    emoji: '🏆',
    questionCount: 10,
    estimatedMinutes: 6,
    comingSoon: false,
    questions: [
      {
        id: 1,
        question: 'You just caught the disc while running. What must you do?',
        options: [
          'Keep running to get closer to the end zone before you stop',
          'Stop running and plant one foot as your pivot foot',
          'Hide the disc under your shirt and sneak away',
          'Spike the disc and do a celebratory dance',
        ],
        correctIndex: 1,
        coachTip:
          'No running with the disc! Once you catch it, stop and plant a pivot foot. You can spin and look around — but that one foot must stay put.',
      },
      {
        id: 3,
        question: 'The disc hits the ground after a throw. What happens?',
        options: [
          'The thrower gets one more try',
          'Whoever touches it first keeps it',
          "The other team gets the disc — it's a turnover",
          'The point restarts from the end zone',
        ],
        correctIndex: 2,
        coachTip:
          'Any time the disc touches the ground — dropped catch, bad throw, anything — the other team takes possession where it landed.',
      },
      {
        id: 5,
        question:
          "An opponent bumps into you while you're trying to catch the disc, causing you to drop it. What do you do?",
        options: [
          'Bump them back — they started it',
          'Run off the field to tell a grown-up',
          'Raise your arms and call "Foul!"',
          'Cry inside but keep playing',
        ],
        correctIndex: 2,
        coachTip:
          'Ultimate is non-contact. When someone hits or bumps you, raise your arms and call "Foul!" loudly. Play stops and the disc comes back to you if the play is not contested.',
      },
      {
        id: 6,
        question: 'Who are the referees in ultimate frisbee?',
        options: [
          'A professional referee in a striped shirt',
          'One coach from each team standing on the sideline',
          'There are no referees — the players call their own fouls',
          'The oldest player on the field',
        ],
        correctIndex: 2,
        coachTip:
          'Ultimate runs on Spirit of the Game — players are honest and call fouls on themselves and others fairly. No refs needed when everyone plays honestly and treats each other with respect!',
      },
      {
        id: 7,
        question:
          'Can you use your body to box out or bump an opponent away from the disc?',
        options: [
          "Yes, as long as you don't use your hands",
          'Yes, if you get there first',
          'No — ultimate is a non-contact sport',
          'Only when the disc is in the air',
        ],
        correctIndex: 2,
        coachTip:
          'No shielding, bumping, or pushing — ever. If you make contact, expect a foul to be called. Keep your arms to yourself and win the disc with speed and positioning!',
      },
      {
        id: 8,
        question: 'Your teammate catches the disc in the end zone. What happens next?',
        options: [
          'Your team scores a point, then your team pulls to the other team',
          'Your team scores a point, then the other team pulls to you',
          'Play continues — you have to throw it back in',
          'The point is only official if both coaches agree',
        ],
        correctIndex: 0,
        coachTip:
          'Score! After a goal, the team that scored pulls (throws) to the other team to start the next point. The roles flip!',
      },
      {
        id: 9,
        question:
          'You call "Foul!" on the defender. They agree it was a foul. What happens to the disc?',
        options: [
          'You throw it from where you are standing right now',
          'The disc comes back to you and play resumes with a check',
          'You get a free walk to the end zone',
          'The other team picks a new marker',
        ],
        correctIndex: 1,
        coachTip:
          'When the other player agrees it was a foul, the disc comes back to you. The defender taps it to check it in, and play starts again — just a fair do-over!',
      },
      {
        id: 11,
        question: 'Which of these causes a turnover?',
        options: [
          'The stall count reaches 10',
          'The disc lands out of bounds',
          'The defense catches (intercepts) your pass',
          'All of the above',
        ],
        correctIndex: 3,
        coachTip:
          "Turnovers happen four main ways: stall count hits 10, disc goes out of bounds, disc hits the ground, or the defense catches your throw. Any of those = other team's disc!",
      },
      {
        id: 12,
        question:
          "Your teammate drops a catch right at the other team's end zone. What should you do?",
        options: [
          'Shake your head at them so they know they messed up',
          'Stay quiet — they already feel bad enough',
          '"Shake it off! Next one!" and keep playing hard',
          'Ask the coach to substitute them out',
        ],
        correctIndex: 2,
        coachTip:
          "Everyone drops one. Spirit of the Game means lifting your teammates up, not tearing them down. A quick 'shake it off!' keeps the whole team's energy high — and that's what wins games.",
      },
      {
        id: 13,
        question:
          'You catch the disc, but you realize your foot landed out of bounds. Nobody else noticed. What do you do?',
        options: [
          "Play on — if no one saw it, it didn't count",
          'Wait and see if the other team says something',
          'Call it on yourself: "Out of bounds — their disc"',
          'Ask your coach from the sideline to decide',
        ],
        correctIndex: 2,
        coachTip:
          "In ultimate, YOU are the referee. Spirit of the Game means calling it honestly even when it hurts — even on yourself. That's what makes ultimate special.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // QUIZ 3 — Backhand Throw: Level 1 Certification Prep
  // hasGuide     → shows "Study Guide" button during the quiz
  // certLevel    → shows certification submission on results screen
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'throwing',
    title: 'Quiz 3: The Backhand Throw',
    description: 'Level 1 cert prep — G·S·W·A·P!',
    emoji: '🤚',
    questionCount: 10,
    estimatedMinutes: 6,
    comingSoon: false,
    hasGuide: true,
    certLevel: 'Level 1 – Backhand Throw',
    videoUrl: 'https://youtu.be/LFGaW1moL4k?si=W5Tj34PYcBx9aUJz',
    questions: [
      // ── G: Grip ───────────────────────────────────────────────────────────
      {
        id: 1,
        question: 'For a backhand throw, where do your fingers go on the disc?',
        options: [
          'Curled under the rim',
          'Making a peace sign along the top',
          'Fingers crossed over the disc',
          'Spread wide like a high-five on top',
        ],
        correctIndex: 0,
        tipImageKey: 'grip-under',
        coachTip:
          'All four fingers curl under the rim — index finger along the edge, the rest underneath. Start with a fist around the edge and you\'ve got it!',
      },
      {
        id: 2,
        question: 'Where does your thumb go in the backhand grip?',
        options: [
          'Curled under the rim with the other fingers',
          'Along the outside edge',
          'On top of the disc',
          'Tucked under your palm',
        ],
        correctIndex: 2,
        tipImageKey: 'grip-top',
        coachTip:
          'Thumb on top — always. Fingers curled under the rim, thumb resting flat on top. The disc should feel firm, not floppy!',
      },
      // ── S: Stance ─────────────────────────────────────────────────────────
      {
        id: 3,
        question: 'For a backhand throw, which way should your body face?',
        options: [
          'Chest square to your target',
          'With your back toward the target',
          'Side-on, throwing shoulder pointing toward the target',
          'Low on the ground, hiding from your target',
        ],
        correctIndex: 2,
        tipImageKey: 'stance',
        coachTip:
          'Turn side-on so your throwing shoulder points toward the target. This lets your arm swing freely — like a spring that loads up and releases!',
      },
      {
        id: 4,
        question:
          'Which foot is the pivot foot? (Your pivot foot must STAY PLANTED the whole time you hold the disc!)',
        options: [
          'Your front foot — same side as your throwing arm',
          'Your back foot — opposite side from your throwing arm',
          'Whichever foot you planted last',
          "It doesn't matter which foot",
        ],
        correctIndex: 1,
        tipImageKey: 'stance',
        coachTip:
          'Your back foot (opposite your throwing arm) is the pivot — it stays glued to the ground. Lift it while holding the disc and that\'s a travel!',
      },
      {
        id: 5,
        question: 'Which foot steps toward your target as you throw a backhand?',
        options: [
          'Your front foot — same side as your throwing arm',
          'Your back foot — opposite side from your throwing arm',
          'Both feet stay planted the whole time',
          "Either foot — it doesn't matter",
        ],
        correctIndex: 0,
        tipImageKey: 'stance',
        coachTip:
          'Step toward your target with your front foot (throwing-arm side). That step loads up your power and helps aim the disc right where you want it!',
      },
      // ── W: Wrist ──────────────────────────────────────────────────────────
      {
        id: 6,
        question: 'As you start your throw, how is your wrist positioned?',
        options: [
          'Snapped straight out away from your body',
          'Flat and relaxed — no bend at all',
          'Curled in toward your body',
          'Bent up towards the sky',
        ],
        correctIndex: 2,
        tipImageKey: 'wrist',
        coachTip:
          'Wrist curled in toward your body to start — then snap it out at release. That snap is what puts spin on the disc, and spin is what keeps it flying straight!',
      },
      {
        id: 7,
        question: 'What does snapping your wrist away from your body do?',
        options: [
          'Makes the throw go higher',
          'Slows the disc down for easier catching',
          'Puts spin on the disc — and spin keeps it flying straight',
          'Changes which direction the disc curves',
        ],
        correctIndex: 2,
        tipImageKey: 'wrist',
        coachTip:
          'Spin is EVERYTHING. No snap = no spin = wobbly throw that goes nowhere. Wrist curled in to start, then snap it out at the moment of release!',
      },
      // ── A: Angle ──────────────────────────────────────────────────────────
      {
        id: 8,
        question: 'How should the disc be angled when it leaves your hand?',
        options: [
          'Tilted up in front — like it wants to fly high',
          'Flat — level with the ground',
          'Tilted sharply to the side like a tilted clock',
          'Angled up to float over defenders',
        ],
        correctIndex: 1,
        tipImageKey: 'angle',
        coachTip:
          'Flat = straight flight. Tilted up in front sends it high and way off target. When in doubt, keep it flat!',
      },
      {
        id: 9,
        question:
          'What happens if you release the disc tilted up — front edge pointing high?',
        options: [
          'It flies straight and far to your target',
          'It curves to the right every time',
          'It goes high and lands far off target',
          'It drops to the ground immediately',
        ],
        correctIndex: 2,
        tipImageKey: 'angle',
        coachTip:
          'Tilted up = trouble. The disc catches air, balloons up, then falls way short or wide. Aim flat!',
      },
      // ── P: Point (Follow-through) ──────────────────────────────────────────
      {
        id: 10,
        question: 'When you release the disc, where should your hand be pointing?',
        options: [
          'At your target',
          'To the right of your target',
          'To the left of your target',
          'At the sky',
        ],
        correctIndex: 0,
        tipImageKey: 'point',
        coachTip:
          'During the throw, swing your arm toward the target and finish with your arm extended and hand pointing at your target. That follow-through sends the disc exactly where you want it!',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // QUIZ 4 — Pancake Catch: Level 2 Certification Prep
  // hasGuide     → shows "Study Guide" button during the quiz
  // certLevel    → shows certification submission on results screen
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'pancake',
    title: 'Quiz 4: The Pancake Catch',
    description: 'Level 2 cert prep — catch it every time!',
    emoji: '🤲',
    questionCount: 10,
    estimatedMinutes: 6,
    comingSoon: false,
    hasGuide: true,
    certLevel: 'Level 2 – Pancake Catch',
    questions: [
      {
        id: 1,
        question: 'Which catch technique is considered the easiest and most reliable for players at all levels?',
        options: [
          'The overhead catch',
          'The pancake catch',
          'The behind-the-back catch',
          'The one-handed snag',
        ],
        correctIndex: 1,
        tipImageKey: 'cool-catch',
        coachTip:
          'The pancake catch is the most reliable catch in ultimate — beginners and pros use it all the time. Master this and you\'ll be holding on to discs every game!',
      },
      {
        id: 2,
        question: 'The pancake catch works best when the disc is thrown at what height?',
        options: [
          'Below your knees',
          'Between your waist and chin height',
          'Above your head',
          'At ankle height',
        ],
        correctIndex: 1,
        tipImageKey: 'catching-zone',
        coachTip:
          'Sweet spot! Between your waist and chin is the perfect catching zone for a pancake. Throws outside that range need a different technique.',
      },
      {
        id: 3,
        question: 'While making a pancake catch, when can you look away from the disc?',
        options: [
          'As soon as it leaves the thrower\'s hand',
          'Once the disc is halfway to you',
          'Not until it\'s firmly under your control',
          'Whenever you feel ready',
        ],
        correctIndex: 2,
        tipImageKey: 'pancake-eyes',
        coachTip:
          'Watch it ALL the way in! Most drops happen when players look away too early. Keep your eyes locked on the disc until it\'s squished firmly between your hands.',
      },
      {
        id: 4,
        question: 'Where should your chest be when making a pancake catch?',
        options: [
          'To the side of the disc',
          'Below the disc',
          'Right behind the disc',
          'Above the disc',
        ],
        correctIndex: 2,
        tipImageKey: 'move-to-disc',
        coachTip:
          'Get your chest behind the disc! Your body acts as a backup if your hands aren\'t perfect. That\'s what makes the pancake so reliable.',
      },
      {
        id: 5,
        question: 'The throw is coming at you sideways and too far away. What should you do?',
        options: [
          'Wait for it to drift to you',
          'Reach out with just your arms',
          'Call for a redo',
          'Move your feet — step, jump, or slide to get there',
        ],
        correctIndex: 3,
        tipImageKey: 'move-to-disc',
        coachTip:
          'Your feet are your most important catching tool! Move your whole body to get into position — step, jump, or slide. Don\'t just reach with your arms.',
      },
      {
        id: 6,
        question: 'In a game, why should you run toward the disc instead of waiting for it?',
        options: [
          'It makes the throw look harder',
          'It lets you get the disc before an opponent can',
          'It gives your thrower more time to aim',
          'It\'s required by the rules',
        ],
        correctIndex: 1,
        tipImageKey: 'cut-to-disc',
        coachTip:
          'Cutting to the disc is how you beat your defender! Run hard toward the throw and you\'ll get there first. Hesitate and you might lose the race.',
      },
      {
        id: 7,
        question: 'If you\'re worried about the disc jamming your fingertips, what should you do?',
        options: [
          'Point your fingers straight at the disc',
          'Turn your hand so your palm faces the disc instead of your fingertips',
          'Catch with one hand only',
          'Extend your arms completely flat',
        ],
        correctIndex: 1,
        tipImageKey: 'pancake-palm',
        coachTip:
          'Show your palm! Turn your hand so the disc hits your palm, not the tips of your fingers. Much safer — and still reliable.',
      },
      {
        id: 8,
        question: 'Your teammate is about to catch but looks away from the disc early. What\'s likely to happen?',
        options: [
          'They\'ll catch it fine — they\'ve done it before',
          'They\'ll make an even better catch',
          'They might drop it — eyes must stay on the disc',
          'Nothing different — looking away doesn\'t matter',
        ],
        correctIndex: 2,
        tipImageKey: 'pancake-eyes',
        coachTip:
          'Eyes = catches. The disc can wobble or drift in the last second. If you look away early, you won\'t see those final adjustments you need to make.',
      },
      {
        id: 9,
        question: "What's wrong with flapping your whole arms from your shoulders to make a pancake catch?",
        options: [
          "Nothing — that's the right way to do it",
          'It makes the catch happen too fast',
          "It's slow and harder to control than hinging at your elbows",
          "It's against the rules",
        ],
        correctIndex: 2,
        tipImageKey: 'pancake-eyes',
        coachTip:
          "Think alligator jaws — the hinge is your elbow, not your shoulder. Keep your elbows bent and in front of you, and let your forearms close on the disc. Fast, controlled, and reliable!",
      },
      {
        id: 10,
        question: 'Which of these best describes "cutting to the disc"?',
        options: [
          'Walking slowly to where the disc is heading',
          'Calling loudly for the disc',
          'Running hard toward the throw to reach it before a defender can',
          'Waiting for the disc to come to you',
        ],
        correctIndex: 2,
        tipImageKey: 'cut-to-disc',
        coachTip:
          'Cut hard and cut early! Running toward the disc is how you get away from your defender and secure the catch before they get a chance.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // QUIZ 5 — Forehand Throw: Level 3 Certification Prep
  // hasGuide     → shows "Study Guide" button during the quiz
  // certLevel    → shows certification submission on results screen
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'forehand',
    title: 'Quiz 5: The Forehand Throw',
    description: 'Level 3 cert prep — G·L·A·D·S!',
    emoji: '🤙',
    questionCount: 10,
    estimatedMinutes: 6,
    comingSoon: false,
    hasGuide: true,
    certLevel: 'Level 3 – Forehand Throw',
    videoUrl: 'https://www.youtube.com/watch?v=Fbqj33iMIuM',
    questions: [
      // ── G: Grip ───────────────────────────────────────────────────────────
      {
        id: 1,
        question: 'For the standard forehand grip, where do your fingers go on the disc?',
        options: [
          'Two fingers along the inside of the rim, two on the outside',
          'All four fingers curled under the rim',
          'Fingers spread wide on top like a high-five',
          'Just your fingertips resting on the edge',
        ],
        correctIndex: 0,
        tipImageKey: 'forehand-standard-grip',
        coachTip:
          'Think "shake hands with the disc" — two fingers on the inside of the rim, two on the outside. Thumb stays on top. That\'s your forehand grip!',
      },
      {
        id: 2,
        question: 'Your grip isn\'t strong enough yet for the standard forehand. What training grip can you use?',
        options: [
          'Switch to a backhand grip instead',
          'Make a peace sign with two fingers along the inside of the rim',
          'Use your palm to push the disc',
          'Hold the disc with just your thumb',
        ],
        correctIndex: 1,
        tipImageKey: 'forehand-peace-grip',
        coachTip:
          'The peace sign grip is a great stepping stone! Index and middle fingers side by side inside the rim. As your grip gets stronger, move to the standard two-finger grip.',
      },
      // ── L: Lock it ────────────────────────────────────────────────────────
      {
        id: 3,
        question: 'How can you test if your forehand grip is tight enough before you throw?',
        options: [
          'The disc should feel loose so it can spin freely',
          'Squeeze until your fingers are numb',
          'Fake a throw — the disc should not move at all',
          'Ask your coach to pull on it',
        ],
        correctIndex: 2,
        tipImageKey: 'forehand-lockit',
        coachTip:
          'Wiggle the disc — if it moves at all, grip tighter! Lock it before you throw it. A slipping disc means a wobbly, off-target throw.',
      },
      // ── A: Aim ────────────────────────────────────────────────────────────
      {
        id: 4,
        question: 'For a forehand throw, which direction should your chest face?',
        options: [
          'Side-on, throwing shoulder toward the target — same as a backhand',
          'Away from your target',
          'Directly at your target',
          'It doesn\'t matter for a forehand',
        ],
        correctIndex: 2,
        tipImageKey: 'forehand-aim',
        coachTip:
          'Forehand stance is CHEST TO TARGET — the opposite of the backhand! Backhand = side-on. Forehand = face your target. Step out and let your arm come through.',
      },
      {
        id: 5,
        question: 'What do you do with your free foot just before releasing the forehand?',
        options: [
          'Plant it firmly behind you',
          'Keep both feet together',
          'Lift it completely off the ground',
          'Step out toward your target',
        ],
        correctIndex: 3,
        tipImageKey: 'forehand-aim',
        coachTip:
          'Step out to the side with your free foot just before you throw. That step opens your hip and adds power and accuracy!',
      },
      // ── D: Disc angle ─────────────────────────────────────────────────────
      {
        id: 6,
        question: 'How should the disc be angled throughout the entire forehand throw?',
        options: [
          'Flat — level with the ground, the whole way through',
          'Tilted up in front to help it fly higher',
          'Angled down slightly so it dips to the receiver',
          'The angle doesn\'t matter as long as you have spin',
        ],
        correctIndex: 0,
        tipImageKey: 'forehand-disc-angle',
        coachTip:
          'Flat is everything! Keep the disc level with the ground from start to finish. Any tilt and the throw goes off course.',
      },
      {
        id: 7,
        question: 'What happens if your disc tilts during a forehand throw?',
        options: [
          'It spins faster and goes farther',
          'The throw curves or wobbles off target',
          'It floats high and lands softly',
          'Nothing — tilt doesn\'t affect the throw',
        ],
        correctIndex: 1,
        tipImageKey: 'forehand-disc-angle',
        coachTip:
          'Tilt = trouble. Even a small tilt at release sends the disc curving or wobbling. Before you even start, make sure that disc is flat!',
      },
      // ── S: Snap ───────────────────────────────────────────────────────────
      {
        id: 8,
        question: 'Before you release a forehand, how is your wrist positioned?',
        options: [
          'Snapped forward toward the target',
          'Flat and relaxed at your side',
          'Bent back, away from your target',
          'Twisted inward toward your body',
        ],
        correctIndex: 2,
        tipImageKey: 'forehand-wrist-snap',
        coachTip:
          'Pull the wrist BACK first, then snap it FORWARD when you throw. That snap creates spin — and spin keeps the disc flying straight!',
      },
      {
        id: 9,
        question: 'What\'s the best drill to practice the wrist snap before adding your full arm?',
        options: [
          'Throw as hard as you can and gradually slow down',
          'Hold your arm still and throw using only your wrist',
          'Toss the disc up and catch it with the same hand',
          'Watch someone else throw and copy their form',
        ],
        correctIndex: 1,
        tipImageKey: 'forehand-wrist-snap',
        coachTip:
          'Wrist-only throws are the best drill! Lock your arm in place and just snap the wrist. If you can throw 10 feet with just your wrist, you\'ve got the snap — now add the arm.',
      },
      {
        id: 10,
        question: 'The wrist snap for a forehand feels most like:',
        options: [
          'Waving hello to a friend',
          'Turning a doorknob slowly',
          'Catching a falling glass',
          'Flicking something icky off your fingers',
        ],
        correctIndex: 3,
        tipImageKey: 'forehand-awesome',
        coachTip:
          'EXACTLY — like flicking something gross off your fingers! Fast, sharp snap. You\'ll feel the disc roll off with spin. No snap = no spin = wobbly throw.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // QUIZ 6 — Pivot & Fake: Level 4 Certification Prep
  // hasGuide     → shows "Study Guide" button during the quiz
  // certLevel    → shows certification submission on results screen
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'pivot',
    title: 'Quiz 6: Pivot & Fake',
    description: 'Level 4 cert prep — create space, break the mark!',
    emoji: '🕺',
    questionCount: 10,
    estimatedMinutes: 6,
    comingSoon: true,
    hasGuide: true,
    certLevel: 'Level 4 – Pivot & Fake',
    videoUrl: 'https://www.youtube.com/watch?v=gonrOw-6D1s',
    questions: [
      // ── Pivot foot ────────────────────────────────────────────────────────
      {
        id: 1,
        question: 'Which foot is your pivot foot when you\'re holding the disc?',
        options: [
          'The foot on the same side as your throwing hand',
          'The foot on the opposite side from your throwing hand',
          'Whichever foot you last stepped with',
          'Either foot — it doesn\'t matter',
        ],
        correctIndex: 1,
        // TODO: tipImageKey: 'pivot-foot',
        coachTip:
          'Opposite foot = pivot foot. Throw right? LEFT foot is the pivot — always. It stays planted while you hold the disc.',
      },
      {
        id: 2,
        question: 'What happens if you lift your pivot foot while holding the disc?',
        options: [
          'Nothing — pivot rules only apply when running',
          'You get to take one extra step',
          'It\'s called a travel — the other team gets the disc',
          'The stall count resets',
        ],
        correctIndex: 2,
        coachTip:
          'Travel = turnover! Once your pivot foot is planted, it cannot leave the ground while you hold the disc. Use your FREE foot to pivot and open new lanes.',
      },
      // ── Face up field ─────────────────────────────────────────────────────
      {
        id: 3,
        question: 'After you catch the disc, which direction should you try to face?',
        options: [
          'Toward the nearest sideline',
          'Upfield — toward the end zone your team is trying to score in',
          'Back toward where the throw came from',
          'At the closest teammate',
        ],
        correctIndex: 1,
        coachTip:
          'Face up field! You\'ll see all your cutters, open lanes, and the whole offense spread out in front of you. It\'s the best starting position.',
      },
      // ── Selling the fake ──────────────────────────────────────────────────
      {
        id: 4,
        question: 'What makes a fake effective in ultimate?',
        options: [
          'Moving just your eyes, without moving your body',
          'Doing as many fakes as quickly as possible',
          'Making it look exactly like a real throw — move your whole body, not just your arm',
          'Only faking when the stall count reaches 5',
        ],
        correctIndex: 2,
        coachTip:
          'A fake only works if the defender believes it! Full arm, shoulder, and hip commitment. A lazy fake won\'t fool anyone.',
      },
      {
        id: 5,
        question: 'How many convincing fakes do you typically need before throwing?',
        options: [
          'At least three to be safe',
          'One — if it\'s convincing, one is enough',
          'None — just throw quickly every time',
          'As many as the stall count allows',
        ],
        correctIndex: 1,
        coachTip:
          'One good fake is enough! Too many fakes wastes your stall count and gives the defense time to recover. Fake → Pivot → Throw!',
      },
      // ── Eye contact ───────────────────────────────────────────────────────
      {
        id: 6,
        question: 'When should you make eye contact with the receiver you actually want to throw to?',
        options: [
          'Right before you release — not during the fake',
          'During the fake, to signal that the real throw is coming next',
          'After you release, so they know to look for it',
          'Never — eye contact always tips off the defense',
        ],
        correctIndex: 0,
        coachTip:
          'Wait until just before you throw to look at your real target! If you look at them too early, the defender sees where you\'re going and beats you there.',
      },
      // ── Fake types ────────────────────────────────────────────────────────
      {
        id: 7,
        question: 'What is a backhand-forehand fake?',
        options: [
          'Faking a backhand throw, then pivoting to deliver a forehand',
          'Throwing a backhand so hard it spins like a forehand',
          'Faking a forehand, then throwing a backhand',
          'A special throw that combines both grips',
        ],
        correctIndex: 0,
        // TODO: tipImageKey: 'pivot-bh-fh-fake',
        coachTip:
          'Backhand-forehand fake: pump the backhand to pull the defender one way, then pivot to throw forehand the other way. The defender moves — the lane opens!',
      },
      {
        id: 8,
        question: 'What is a forehand-forehand fake?',
        options: [
          'Two forehand throws in a row to the same receiver',
          'Faking your forehand high, then throwing it low — or faking outside and throwing inside',
          'Faking forehand, then switching to a backhand',
          'Pretending you don\'t know how to throw forehand',
        ],
        correctIndex: 1,
        // TODO: tipImageKey: 'pivot-fh-fh-fake',
        coachTip:
          'Same arm, different spot! Fake high → throw low, or fake outside → throw inside. You don\'t need to change the throw type — just change where it\'s going.',
      },
      // ── Reading the mark ──────────────────────────────────────────────────
      {
        id: 9,
        question: 'Your defender is standing to your right, trying to stop your backhand. What does this tell you?',
        options: [
          'You should only throw backhands — it\'s your strong side',
          'Stop and wait for the defender to move',
          'The forehand lane on the left might be open — pivot and look',
          'Call a timeout immediately',
        ],
        correctIndex: 2,
        coachTip:
          'Read the mark! If the defender is blocking one side, the other side might be open. Pivot, look, and throw to the open space!',
      },
      // ── Full combo ────────────────────────────────────────────────────────
      {
        id: 10,
        question: 'Which of these best describes a successful pivot-and-fake combo?',
        options: [
          'One good fake → pivot to the open side → throw to the open teammate',
          'Spinning in a full circle to confuse the defender',
          'Faking three times in a row, then throwing',
          'Pivoting only if the stall count reaches 7',
        ],
        correctIndex: 0,
        coachTip:
          'Fake → Pivot → Throw! One good fake moves the defender. Pivot fast to the open side and throw before they get back in position.',
      },
    ],
  },
]
