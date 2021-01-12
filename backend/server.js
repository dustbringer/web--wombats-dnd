import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { InputError, AccessError } from "./error";
import CalenderService from "./service/CalenderService";
const cs = new CalenderService();

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const catchErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
    // save();
  } catch (err) {
    console.log("CAUGHT ERROR", err.message);
    // console.log(err);
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: "A system error ocurred" });
    }
  }
};

const authed = (fn) => async (req, res) => {
  const pass = req.header("Authorization");
  if (pass !== process.env.POSTGRES_EDIT_TOKEN) {
    throw new AccessError("Invalid Token");
  }
  await fn(req, res);
};

// /****************************************************************
//                        Calender Functions
// ****************************************************************/

// Serve our base route that returns a Hello World cow
app.get(
  "/api/test/",
  catchErrors(async (req, res) => {
    const moo = "mooooooo!";
    res.json({ moo });
  })
);

// Get all calender data
app.get(
  "/api/calender/all",
  catchErrors(async (req, res) => {
    const result = await cs.getAll();
    res.json({ result });
  })
);

// Get yearly calender data
app.get(
  "/api/calender/year",
  catchErrors(async (req, res) => {
    const { y } = req.query;
    const result = await cs.getYear(y);
    res.json({ query: { y }, result });
  })
);

// Get monthly calender data
app.get(
  "/api/calender/month",
  catchErrors(async (req, res) => {
    const { m, y } = req.query;
    const result = await cs.getMonth(m, y);
    res.json({ query: { m, y }, result });
  })
);

// Get daily calender data
app.get(
  "/api/calender/day",
  catchErrors(async (req, res) => {
    const { d, m, y } = req.query;
    const result = await cs.getDay(d, m, y);
    res.json({ query: { d, m, y }, result });
  })
);

// Add event calender
app.post(
  "/api/calender/",
  catchErrors(
    authed(async (req, res) => {
      const { day, month, year, title, description, priority } = req.body;
      const result = await cs.addEvent(
        day,
        month,
        year,
        title,
        description,
        priority
      );
      res.json({ result });
    })
  )
);

// Edit event calender
app.put(
  "/api/calender/",
  catchErrors(
    authed(async (req, res) => {
      const { id, day, month, year, title, description, priority } = req.body;
      const result = await cs.editEvent(
        id,
        day,
        month,
        year,
        title,
        description,
        priority
      );
      res.json({ result });
    })
  )
);

// Remove event calender
app.delete(
  "/api/calender/",
  catchErrors(
    authed(async (req, res) => {
      const { id } = req.body;
      const result = await cs.removeEvent(id);
      res.json({ result });
    })
  )
);

/********************** Running the server ************************/

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../frontend/build", "index.html"));
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});

// /***************************************************************
//                        Auth Functions
// ***************************************************************/

// const authed = fn => async (req, res) => {
//   const email = getEmailFromAuthorization(req.header('Authorization'));
//   await fn(req, res, email);
// };

// app.post('/admin/auth/login', catchErrors(async (req, res) => {
//   const { email, password, } = req.body;
//   const token = await login(email, password);
//   return res.json({ token, });
// }));

// app.post('/admin/auth/register', catchErrors(async (req, res) => {
//   const { email, password, name, } = req.body;
//   const token = await register(email, password, name);
//   return res.json({ token, });
// }));

// app.post('/admin/auth/logout', catchErrors(authed(async (req, res, email) => {
//   await logout(email);
//   return res.json({});
// })));

// /***************************************************************
//                        Quiz Functions
// ***************************************************************/

// app.get('/admin/quiz', catchErrors(authed(async (req, res, email) => {
//   return res.json({ quizzes: await getQuizzesFromAdmin(email), });
// })));

// app.post('/admin/quiz/new', catchErrors(authed(async (req, res, email) => {
//   return res.json({ quizId: await addQuiz(req.body.name, email), });
// })));

// app.get('/admin/quiz/:quizid', catchErrors(authed(async (req, res, email) => {
//   const { quizid, } = req.params;
//   await assertOwnsQuiz(email, quizid);
//   return res.json(await getQuiz(quizid));
// })));

// app.put('/admin/quiz/:quizid', catchErrors(authed(async (req, res, email) => {
//   const { quizid, } = req.params;
//   const { questions, name, thumbnail, } = req.body;
//   await assertOwnsQuiz(email, quizid);
//   await updateQuiz(quizid, questions, name, thumbnail);
//   return res.status(200).send({});
// })));

// app.delete('/admin/quiz/:quizid', catchErrors(authed(async (req, res, email) => {
//   const { quizid, } = req.params;
//   await assertOwnsQuiz(email, quizid);
//   await removeQuiz(quizid);
//   return res.status(200).send({});
// })));

// app.post('/admin/quiz/:quizid/start', catchErrors(authed(async (req, res, email) => {
//   const { quizid, } = req.params;
//   await assertOwnsQuiz(email, quizid);
//   await startQuiz(quizid);
//   return res.status(200).json({});
// })));

// app.post('/admin/quiz/:quizid/advance', catchErrors(authed(async (req, res, email) => {
//   const { quizid, } = req.params;
//   await assertOwnsQuiz(email, quizid);
//   const stage = await advanceQuiz(quizid);
//   return res.status(200).json({ stage, });
// })));

// app.post('/admin/quiz/:quizid/end', catchErrors(authed(async (req, res, email) => {
//   const { quizid, } = req.params;
//   await assertOwnsQuiz(email, quizid);
//   await endQuiz(quizid);
//   return res.status(200).send({});
// })));

// app.get('/admin/session/:sessionid/status', catchErrors(authed(async (req, res, email) => {
//   const { sessionid, } = req.params;
//   await assertOwnsSession(email, sessionid);
//   return res.status(200).json({ results: await sessionStatus(sessionid), });
// })));

// app.get('/admin/session/:sessionid/results', catchErrors(authed(async (req, res, email) => {
//   const { sessionid, } = req.params;
//   await assertOwnsSession(email, sessionid);
//   return res.status(200).json({ results: await sessionResults(sessionid), });
// })));

// /***************************************************************
//                        Play Functions
// ***************************************************************/

// app.post('/play/join/:sessionid', catchErrors(async (req, res) => {
//   const { sessionid, } = req.params;
//   const { name, } = req.body;
//   const playerId = await playerJoin(name, sessionid);
//   return res.status(200).send({ playerId, });
// }));

// app.get('/play/:playerid/status', catchErrors(async (req, res) => {
//   const { playerid, } = req.params;
//   return res.status(200).send({ started: await hasStarted(playerid), });
// }));

// app.get('/play/:playerid/question', catchErrors(async (req, res) => {
//   const { playerid, } = req.params;
//   return res.status(200).send({ question: await getQuestion(playerid), });
// }));

// app.get('/play/:playerid/answer', catchErrors(async (req, res) => {
//   const { playerid, } = req.params;
//   return res.status(200).send({ answerIds: await getAnswers(playerid), });
// }));

// app.put('/play/:playerid/answer', catchErrors(async (req, res) => {
//   const { playerid, } = req.params;
//   const { answerIds, } = req.body;
//   await submitAnswers(playerid, answerIds);
//   return res.status(200).send({});
// }));

// app.get('/play/:playerid/results', catchErrors(async (req, res) => {
//   const { playerid, } = req.params;
//   return res.status(200).send(await getResults(playerid));
// }));

// /***************************************************************
//                        Running Server
// ***************************************************************/

// app.get('/', (req, res) => res.redirect('/docs'));

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const configData = JSON.parse(fs.readFileSync('./frontend/src/config.json'));
// const port = 'BACKEND_PORT' in configData ? configData.BACKEND_PORT : 5000;

// const server = app.listen(port, () => {
//   console.log(`Backend is now listening on port ${port}!`);
// });

// export default server;
