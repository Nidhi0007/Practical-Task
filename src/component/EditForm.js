import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

import { Formik } from "formik";
import React from "react";
import { editUser } from "../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import validationSchema from "./validation";

function EditForm(props) {
  const dispatch = useDispatch();
  const { userData, getList } = props;
  const [show, setShow] = useState(false);
  const [errorState, setErrorState] = useState({
    state: false,
  });
  const [initialValuesData, setInitialValuesData] = useState({});

  const handleClose = () => {
    setErrorState({ state: false });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    setInitialValuesData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });
  }, [userData]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>

          {/* validation for same email */}
          {errorState?.state && (
            <p style={{ color: "red" }}>{errorState?.message}</p>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValuesData}
            validationSchema={validationSchema[1]}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // When button submits form and form is in the process of submitting, submit button is disabled
              setSubmitting(true);

              var data;
              if (values.email !== initialValuesData.email) {
                data = {
                  id: userData.id,
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                };
              } else {
                data = {
                  id: userData.id,
                  name: values.name,
                  phone: values.phone,
                };
              }
              //api call for update user
              dispatch(editUser(data)).then((res) => {
                if (res?.payload?.data?.id) {
                  resetForm();
                  setSubmitting(false);
                  handleClose();
                  getList();
                } else {
                  setSubmitting(false);
                  setErrorState({
                    state: true,
                    message: "Email Already Exist",
                  });
                }
              });
            }}
          >
            {/* Callback function containing Formik state and helpers that handle common form actions */}
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} className="mx-auto">
                <Form.Group controlId="formName">
                  <Form.Label>Name :</Form.Label>
                  <Form.Control
                    type="text"
                    /* This name property is used to access the value of the form element via values.nameOfElement */
                    name="name"
                    placeholder="Full Name"
                    /* Set onChange to handleChange */
                    onChange={handleChange}
                    /* Set onBlur to handleBlur */
                    onBlur={handleBlur}
                    /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                    value={values.name}
                    /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
                    className={touched.name && errors.name ? "error" : null}
                  />
                  {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={touched.email && errors.email ? "error" : null}
                  />
                  {touched.email && errors.email ? (
                    <div className="error-message">{errors.email}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone :</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    className={touched.phone && errors.phone ? "error" : null}
                  />
                  {touched.phone && errors.phone ? (
                    <div className="error-message">{errors.phone}</div>
                  ) : null}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 mb-3"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditForm;
