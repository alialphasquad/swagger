import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./route/User";
import taskRouter from "./route/Task";
import stageRouter from "./route/Stage";
import parentRouter from "./route/ParentTask";
import workflowRouter from "./route/Workflow";
import stageTemplate from "./route/StageTemplate"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Workflow API",
      version: "1.0.0",
      description: "Workflow API",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
  },
  apis: ["./route/*.ts"],
};


const specs = swaggerJsDoc(options);
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());


app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/stage", stageRouter);
app.use("/parenttask", parentRouter);
app.use("/workflow", workflowRouter);
app.use("/stagetemplate", stageTemplate);

app.get("/", (req: any, res: any) => {
  res.send("Welcome to Home Page");
  console.log("yo");
});
app.listen(3002, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${3002}`);
  console.log("yo");
});
