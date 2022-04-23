import React from "react";
import { restoreUser } from "../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

function DeleteUserComp(props) {
  const { getListDeleted, deleted, getList } = props;
  const dispatch = useDispatch();

  const restoreApi = (id) => {
    // api call to restore user
    dispatch(restoreUser(id)).then((res) => {
      getListDeleted();
      getList();
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
          {deleted?.data?.map((item, key) => {
            return (
              <tr>
                <th scope="row">{item.name}</th>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary m-2"
                    onClick={() => restoreApi(item.id)}
                  >
                    Restore
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

export default DeleteUserComp;
