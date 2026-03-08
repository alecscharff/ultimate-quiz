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
          'When you mark someone, you shadow them everywhere they go to stop them getting the disc.',
      },
      {
        id: 3,
        question: 'On offense, how do we number the defense?',
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
          'Ultimate runs on Spirit of the Game — players are honest and call fouls on themselves and others fairly. No refs needed when everyone plays with integrity!',
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
          'When a foul is accepted, the disc returns to the fouled player. The defender "checks" it in by touching it, then play restarts. No free yards — just a fair do-over!',
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
    questions: [
      // ── G: Grip ───────────────────────────────────────────────────────────
      {
        id: 1,
        question:
          'For a backhand throw, where does your index finger go on the disc?',
        options: [
          'Flat on top of the disc',
          'Curled under the rim with the other fingers',
          'Curled under the center of the disc',
          'Wrapped around the outside edge only',
        ],
        correctIndex: 1,
        tipImageKey: 'grip-under',
        coachTip:
          'All fingers curl under the rim — index finger along the edge, others underneath. Start from a fist around the edge and you\'ve got it!',
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
        question:
          'For a backhand throw, which way should your body face?',
        options: [
          'Chest square to your target',
          'With your back toward the target',
          'Side-on, throwing shoulder pointing toward the target',
          'Facing sideways away from the target',
        ],
        correctIndex: 2,
        tipImageKey: 'stance',
        coachTip:
          'Turn side-on so your throwing shoulder points toward the target. This lets your arm swing freely — like a spring that loads up and releases!',
      },
      {
        id: 4,
        question: 'Which foot is the pivot foot on a backhand throw?',
        options: [
          'Your front foot — same side as your throwing arm',
          'Your back foot — the opposite side from your throwing arm',
          'Whichever foot you planted last',
          "It doesn't matter which foot",
        ],
        correctIndex: 1,
        tipImageKey: 'stance',
        coachTip:
          'Your front foot (throwing-arm side) steps toward the target — your back foot (opposite side) is the pivot and stays planted. Lifting it is a travel!',
      },
      // ── W: Wrist ──────────────────────────────────────────────────────────
      {
        id: 5,
        question: 'Before you release, how is your wrist positioned?',
        options: [
          'Snapped straight out away from your body',
          'Flat and relaxed — no bend at all',
          'Curled in toward your body',
          'Bent backward behind your wrist',
        ],
        correctIndex: 2,
        tipImageKey: 'wrist',
        coachTip:
          'Wrist curled in toward your body to start — then snap it out at release. That snap is what puts spin on the disc, and spin is what keeps it flying straight!',
      },
      {
        id: 6,
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
          'Spin is VITAL. No snap = no spin = wobbly throw that goes nowhere. Wrist curled in to start, then snap it out at the moment of release!',
      },
      // ── A: Angle ──────────────────────────────────────────────────────────
      {
        id: 7,
        question: 'How should the disc be angled when it leaves your hand?',
        options: [
          'Tilted nose-up for more height and distance',
          'Flat, or very slightly nose-down',
          'Tilted sharply to the side for a curve',
          'Nose-up to float over defenders',
        ],
        correctIndex: 1,
        tipImageKey: 'angle',
        coachTip:
          'Flat (or slightly nose-down) = straight flight. Nose-up sends it high and far off target. When in doubt, keep it flat!',
      },
      {
        id: 8,
        question: 'What happens if you release the disc nose-up?',
        options: [
          'It flies straight and far to your target',
          'It curves to the right every time',
          'It goes high and lands far off target',
          'It drops to the ground immediately',
        ],
        correctIndex: 2,
        tipImageKey: 'angle',
        coachTip:
          'Nose-up = trouble. The disc catches air, balloons up, then falls way short. Aim flat — or just a tiny bit nose-down!',
      },
      // ── P: Point (Follow-through) ──────────────────────────────────────────
      {
        id: 9,
        question: 'As you release the disc, what should your arm do?',
        options: [
          'Pull back to your side quickly',
          'Stop right at the wrist snap',
          'Drop naturally once the disc is gone',
          'Continue swinging forward — extend and point toward your target',
        ],
        correctIndex: 3,
        tipImageKey: 'point',
        coachTip:
          'As the disc leaves your hand, keep your arm swinging forward and point at your target. The follow-through is part of the throw — not something that happens after it!',
      },
      {
        id: 10,
        question:
          'Why does stopping your throwing motion early hurt your throw?',
        options: [
          'It makes the defender think you are still throwing',
          'The disc veers off target and you lose power',
          "It's just bad style — it doesn't affect the throw",
          'It protects your shoulder from injury',
        ],
        correctIndex: 1,
        tipImageKey: 'point',
        coachTip:
          'Throw THROUGH the target, not just to it. Cutting the motion short bleeds off power and accuracy. Full follow-through = full throw!',
      },
    ],
  },
]
