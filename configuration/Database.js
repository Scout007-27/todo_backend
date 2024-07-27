import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import UserModel from "../model/User.js";
import WorkspaceModel from "../model/Workspace.js";
import CategoryModel from "../model/Category.js";
import NotificationModel from "../model/Notification.js";
import SessionModel from "../model/Session.js";
import SubTaskModel from "../model/SubTask.js";
import TagModel from "../model/Tag.js";
import TaskModel from "../model/Task.js";
import TaskTagModel from "../model/TaskTag.js";
import UserWorkspaceModel from "../model/UserWorkspace.js";

// Load environment variables from .env file
dotenv.config();

const databaseConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

// Determine the environment and get the corresponding database configuration
const env = process.env.NODE_ENV || "development";
const dbConfig = databaseConfig[env];

// Initialize Sequelize instance with the database configuration
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error?.message);
  }
})();

// Define Sequelize models using imported model definitions
const User = sequelize.define(...UserModel);
const Workspace = sequelize.define(...WorkspaceModel);
const Category = sequelize.define(...CategoryModel);
const Notification = sequelize.define(...NotificationModel);
const Session = sequelize.define(...SessionModel);
const SubTask = sequelize.define(...SubTaskModel);
const Tag = sequelize.define(...TagModel);
const Task = sequelize.define(...TaskModel);
const TaskTag = sequelize.define(...TaskTagModel);
const UserWorkspace = sequelize.define(...UserWorkspaceModel);

// Define associations between models
// A Category can have many Tasks and a Task belongs to one Category
Category.hasMany(Task, { foreignKey: "categoryID" });
Task.belongsTo(Category, { foreignKey: "categoryID" });

// A Task can have many SubTasks and a SubTask belongs to one Task
Task.hasMany(SubTask, { foreignKey: "taskID" });
SubTask.belongsTo(Task, { foreignKey: "taskID" });

// A Task can have many Tags and a Tag can belong to many Tasks
Task.belongsToMany(Tag, { through: TaskTag, foreignKey: "taskID" });
Tag.belongsToMany(Task, { through: TaskTag, foreignKey: "tagID" });

// A Task can have many Notifications and a Notification belongs to one Task
Task.hasMany(Notification, { foreignKey: "taskID", onDelete: "CASCADE" });
Notification.belongsTo(Task, { foreignKey: "taskID" });

// A User can have many Tasks and a Task belongs to one User
User.hasMany(Task, { foreignKey: "userID" });
Task.belongsTo(User, { foreignKey: "userID" });

// A Workspace can have many Tasks and a Task belongs to one Workspace
Workspace.hasMany(Task, { foreignKey: "workspaceID" });
Task.belongsTo(Workspace, { foreignKey: "workspaceID" });

// A User can belong to many Workspaces and a Workspace can have many Users
User.belongsToMany(Workspace, { through: UserWorkspace, foreignKey: "userID" });
Workspace.belongsToMany(User, {
  through: UserWorkspace,
  foreignKey: "workspaceID",
});

// A User can have many Notifications and a Notification belongs to one User
User.hasMany(Notification, { foreignKey: "userID" });
Notification.belongsTo(User, { foreignKey: "userID" });

// A User can have many Sessions and a Session belongs to one User
User.hasMany(Session, { foreignKey: "userID" });
Session.belongsTo(User, { foreignKey: "userID" });

// A Workspace can have many Sessions and a Session belongs to one Woekspace
Workspace.hasMany(Session, { foreignKey: "workspaceID" });
Session.belongsTo(Workspace, { foreignKey: "workspaceID" });

// A Session can have many Notifications and a Notification belongs to one Session
Session.hasMany(Notification, { foreignKey: "sessionID" });
Notification.belongsTo(Session, { foreignKey: "sessionID" });

// Synchronize all models with the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Unable to sync with the database:", error?.message);
  }
})();

// Export the Sequelize instance and models for use in other parts of the application
const db = {
  instance: sequelize,
  models: {
    User,
    Workspace,
    Category,
    Notification,
    Session,
    SubTask,
    Tag,
    Task,
    TaskTag,
    UserWorkspace,
  },
};

export default db;
