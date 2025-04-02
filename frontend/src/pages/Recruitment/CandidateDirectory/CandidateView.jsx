import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Container, Row, Label, Input, FormFeedback, Form } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateUser as onUpdateUser, getUsers as onGetUsers } from "/src/store/contacts/actions";

const RecruitmentCandidateView2 = () => {
  const { id } = useParams(); // Get the candidate ID from the URL
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.contacts);

  const [loading, setLoading] = useState(true);

  // Fetch candidates if not already loaded
  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(onGetUsers()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, users]);

  // Find the candidate to edit
  const candidate = users?.find((user) => user.id === parseInt(id));

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: candidate?.name || "",
      designation: candidate?.designation || "",
      tags: candidate?.tags || "",
      email: candidate?.email || "",
      projects: candidate?.projects || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
    }),
    onSubmit: (values) => {
      const updatedUser = {
        id: candidate.id,
        ...values,
      };
      dispatch(onUpdateUser(updatedUser));
      history.push("/candidate-directory"); // Redirect back to the candidate directory
    },
  });

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while fetching data
  }

  if (!candidate) {
    return <div>Candidate not found</div>; // Handle case where candidate is not found
  }

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <h4>Edit Candidate</h4>
                <Form onSubmit={validation.handleSubmit}>
                  <Row form>
                    <Col xs={12}>
                      <div className="mb-3">
                        <Label className="form-label">Name</Label>
                        <Input
                          name="name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={validation.touched.name && validation.errors.name}
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>
                      {/* Add other fields (designation, email, tags, projects) similarly */}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-end">
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecruitmentCandidateView2;