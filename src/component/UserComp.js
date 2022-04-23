import EditForm from "./EditForm";
import React from "react";
import { deleteUser } from "../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

function UserComp(props) {
  const { getList, allData, getListDeleted } = props;
  const dispatch = useDispatch();

  const deleteUserFunc = (id) => {
    // api call to delete user.
    dispatch(deleteUser(id)).then((res) => {
      getList();
      getListDeleted();
    });
  };

  return (
    <>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allData?.data?.map((item, key) => {
            return (
              <tr>
                <th scope="row">{item.name}</th>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {/* edit user form */}
                  <EditForm userData={item} getList={getList} />
                  <button
                    type="button"
                    className="btn btn-secondary m-2"
                    onClick={() => deleteUserFunc(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default UserComp;
