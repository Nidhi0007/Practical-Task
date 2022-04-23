import "./App.css";

import { Container, Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";

import AddForm from "./component/AddForm";
import DeleteUserComp from "./component/DeleteUserComp";
import UserComp from "./component/UserComp";
import { getAllUser } from "./Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [deletedState, setDeleted] = useState([]);
  const [allData, setAllData] = useState([]);
  const getListDeleted = () => {
    let data = {
      deleted: true,
    };
    dispatch(getAllUser(data)).then((res) => {
      setDeleted(res.payload);
    });
  };
  const getList = () => {
    let data = {
      deleted: false,
    };
    dispatch(getAllUser(data)).then((res) => {
      setAllData(res.payload);
    });
  };
  useEffect(() => {
    getList();
    getListDeleted();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Container>
        <Tabs
          defaultActiveKey="user"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="user" title="User">
            <div className="d-flex mt-2 mb-2">
              <AddForm getList={getList} />
            </div>
            <UserComp
              allData={allData}
              getList={getList}
              getListDeleted={getListDeleted}
            />
          </Tab>
          <Tab eventKey="deleteUser" title="Delete User">
            <DeleteUserComp
              deleted={deletedState}
              getListDeleted={getListDeleted}
              getList={getList}
            />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
