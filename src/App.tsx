import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { addCircleOutline, images, informationCircleOutline, list, listOutline, square, triangle } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle auto-hide="false">
                <IonItem
                  button
                  routerLink="/tasks"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={list} />
                  View Tasks
                </IonItem>
                <IonItem
                  button
                  routerLink="/new-task"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={addCircleOutline} />
                  Add Task
                </IonItem>
                <IonItem
                  button
                  routerLink="/about"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={informationCircleOutline} />
                  About
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <div id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonMenuButton slot="start" />
              <IonTitle>Your Task Manager</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonRouterOutlet>
              <Route path="/tasks" component={TaskList} exact />
              <Route path="/new-task" component={TaskForm} exact />
              <Route path="/edit-task/:id" component={TaskForm} exact />
              <Route path="/tasks/:id" component={TaskDetail} exact />
              <Redirect from="/" to="/tasks" exact />
            </IonRouterOutlet>
          </IonContent>

          <IonFooter>
            <IonToolbar>
              <IonTitle>Footer Content</IonTitle>
            </IonToolbar>
          </IonFooter>
        </div>
      </IonReactRouter>
    </IonApp>
  </IonApp>
);

export default App;