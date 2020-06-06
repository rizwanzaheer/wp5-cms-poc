import React from "react";
import ReactDOM from "react-dom";
import { Header, Container, Menu, Button } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

const EmbedPage = React.lazy(() => import("admin/EmbedPage"));
const EmbedEditor = React.lazy(() => import("admin/EmbedEditor"));

const Page = () => {
  const { pageId } = useParams();
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <EmbedPage page={pageId} />
    </React.Suspense>
  );
};

const Editor = () => {
  const { pageId } = useParams();
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <EmbedEditor page={pageId} />
    </React.Suspense>
  );
};

const PageTitle = () => {
  const { pageId } = useParams();
  return <h1 style={{ color: "white" }}>Home Page: {pageId}</h1>;
};

const App = () => {
  const [editMode, editModeSet] = React.useState(false);
  return (
    <Router>
      <Container>
        <Menu fixed="top" inverted style={{ background: "darkgreen" }}>
          <Container
            style={{
              marginTop: "1em",
              marginBottom: "1em",
            }}
          >
            <Header>
              <Route path="/" exact>
                <h1 style={{ color: "white" }}>Home Page</h1>
              </Route>
              <Route path="/:pageId">
                <PageTitle />
              </Route>
            </Header>
          </Container>
        </Menu>
        <Container style={{ paddingTop: "7em" }}>
          <Switch>
            <Route path="/:pageId">
              <Button
                onClick={() => editModeSet(!editMode)}
                style={{ marginBottom: "1em" }}
                primary
              >
                {editMode ? "Display" : "Edit"}
              </Button>
              {editMode && <Editor />}
              {!editMode && <Page />}
            </Route>
            <Route path="/" exact>
              <div>Home</div>
            </Route>
          </Switch>
        </Container>
      </Container>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
