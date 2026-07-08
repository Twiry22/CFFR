# CFFR — Career Fit & Future Readiness

CFFR is a statistical assessment tool that helps Form 3 and Form 4 students in Kenya
make more informed career choices. Students answer a short set of questions about
their interests, strengths, personality, and circumstances, and CFFR scores a set
of career clusters against five weighted factors to recommend the directions most
likely to fit them.

## How the scoring works

Each career cluster is scored against a student's answers using five weighted factors:

| Factor            | Weight |
| Market Demand      | 25%   |
| Future Relevance   | 25%   |
| Aptitude           | 25%   |
| Interest           | 15%   |
| Accessibility      | 10%   |

**Interest** — how well the student's enjoyed subjects, preferred activities, job
  values, and chosen career spaces align with a cluster.
**Aptitude** — how well the student's best-performed subjects and personality
  align with a cluster, adjusted by their KCSE cluster points (Q11) when they've
  sat the exam.
**Future Relevance** — how forward-looking the cluster is, weighted by the
  student's tech comfort, chosen career spaces, and mindset toward change.
**Market Demand** — a baseline demand index per cluster, nudged for students who
  said income matters to them.
**Accessibility** — how realistic the path is given the student's county
  (geographic access) and family education budget, adjusted by KCSE points (very
  low or very high scores shift weight between TVET and university-track clusters).

The top 3 clusters become the student's primary recommendations. Students who
selected two personality types also get 3 alternate recommendations built around
their second personality, with an explanatory note that they're "also worth
exploring."

Each recommendation includes a specific career title (not just the cluster),
a plain-language explanation of *why* it fits, the relevant Senior School subject
pathway, a 3-year outlook, and matching schools.

## User flow

```
Welcome (public) → Payment (Pesapal) → Assessment (11 questions) → Results
```

- **Welcome** — public landing page, no login or code required.
- **Payment** — a one-time KES 250 fee via Pesapal (Mpesa, Airtel Money, Visa, or
  bank transfer). An owner bypass (`?bypass=cffr-admin-2025`) skips payment for
  testing/admin use.
- **Assessment** — 11 questions covering subjects enjoyed, subjects excelled in,
  preferred activities, personality, job values, tech comfort, career spaces,
  future mindset, county, education budget, and (optional/skippable) KCSE cluster
  points.
- **Results** — top 3 career matches, optional alternate matches, and a profile
  summary (personality type, tech readiness, subject breadth, academic alignment).

## Project structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Welcome.jsx
│   │   ├── Payment.jsx
│   │   ├── Assessment.jsx
│   │   └── Results.jsx
│   ├── components/
│   │   ├── QuestionCard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── ResultCard.jsx
│   ├── data/
│   │   └── questions.js        # the 11-question definitions
│   ├── services/
│   │   └── api.js              # submitAssessment, initiatePayment
│   ├── styles/
│   │   └── global.css
│   └── App.jsx                 # page routing / flow state
└── package.json                # [TODO: paste this — not yet shared]

backend/
├── routes/
│   ├── assess.js               # POST /api/assess, GET /api/health
│   ├── export.js               # POST /api/export/save, GET /api/export/records
│   ├── pay.js                  # POST /api/pay/initiate, GET /api/pay/callback,
│   │                           # GET /api/pay/status/:ref (Pesapal integration)
│   └── email.js                # [TODO: not yet shared — sends results email]
├── engine/
│   ├── scorer.js                # runCFFRAssessment, validateAnswers
│   ├── careers.js               # [TODO: not yet shared — cluster/career lookup]
│   └── schools.js               # [TODO: not yet shared — school matching by
│   │                             #  county, budget, KCSE points]
├── data/
│   └── student-records.json     # persisted assessment records (auto-created)
└── package.json                 # [TODO: paste this — not yet shared]
```

## Environment variables

**Frontend** (`.env`):
```dotenv
VITE_API_URL=http://localhost:4000
```

**Backend** (Render environment variables):
```dotenv
PESAPAL_CONSUMER_KEY=
PESAPAL_CONSUMER_SECRET=
PESAPAL_CALLBACK_URL=https://cffr-backend.onrender.com/api/pay/callback
PESAPAL_ENV=production          # omit or set to anything else for sandbox
PESAPAL_IPN_ID=                 # optional — cached automatically after first registration
FRONTEND_URL=https://cffr.projectdatahub.org
EXPORT_SECRET=                  # protects GET /api/export/records
```

> Never commit real Pesapal credentials or `EXPORT_SECRET` values to source control.

## API summary

| Method | Path                     | Purpose                                            |
|--------|--------------------------|-----------------------------------------------------|
| POST   | `/api/assess`            | Validates answers, runs scoring, saves the record, emails results |
| GET    | `/api/health`            | Health check                                        |
| POST   | `/api/export/save`       | Internal — saves a completed assessment record      |
| GET    | `/api/export/records`    | Downloads all records (requires `x-export-secret` header) |
| POST   | `/api/pay/initiate`      | Creates a Pesapal order, returns a redirect URL      |
| GET    | `/api/pay/callback`      | Pesapal redirects here after payment; verifies status and redirects back to the frontend |
| GET    | `/api/pay/status/:ref`   | Polls the status of a given payment order            |

## Setup

**[TODO: exact install/run commands once package.json files are shared. Expected
to be roughly:]**

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm start
```

## Disclaimer

CFFR is a directional tool, not a final verdict. Students are encouraged to
retake the assessment at key points in their education as their interests grow
and change.
