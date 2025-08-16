import React, { useEffect, useState, useRef, useMemo } from "react";
import { withRouter, Link } from "react-router-dom";
import TableContainer from "./TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";


import { Name, Email, Tags, Projects, Img } from "./contactlistCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "/src/store/contacts/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const JobList = props => {

  //meta title
  document.title="Jobs | Optumus Suite ";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
      globalStatus: (contact && contact.globalStatus) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string().required("Please Enter Your Email"),
      projects: Yup.number().required("Please Enter Your Project"),
      globalStatus: Yup.number().required("Please Enter the Status"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        };

        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        };
        // save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }));

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" />;
      //   },
      // },
      // {
      //   Header: " ",
      //   // accessor: "name",
      //   disableFilters: true, 
      //   filterable: true,
      //   accessor: (cellProps) => (
      //     <>
      //       {!cellProps.img ? (
      //           <div className="avatar-xs">
      //               <span className="avatar-title rounded-circle">
      //                   {cellProps.name.charAt(0)}
      //               </span>
      //           </div>
      //       ) : (
      //           <div>
      //               <img
      //                   className="rounded-circle avatar-xs"
      //                   src={cellProps.img}
      //                   alt=""
      //               />
      //           </div>
      //       )}
      //   </>
      //   ),
      // },
      {
        Header: "Client",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Role",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Start Date",
        accessor: "globalStatus",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Employees Needed",
        accessor: "globalStatus2",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Employees Hired",
        accessor: "globalStatus23",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Last Action Date",
        accessor: "globalStatus24",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Recruiting Lead",
        accessor: "globalStatus25",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "projects",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Projects {...cellProps} />{" "}
            </>
          );
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                  to="#"
                  className="text-danger"
                  onClick={() => {
                    const userData = cellProps.row.original;
                    onClickDelete(userData);
                  }}
                >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete Job
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-secondary"
                onClick={() => {
                  const userData = cellProps.row.original;
                  props.history.push(`/recruitment/edit-job/${userData.id}`); // Redirect to the edit route
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit Job
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-secondary"
                onClick={() => {
                  const userData = cellProps.row.original;
                  props.history.push(`/recruitment/job/${userData.id}`); // Redirect to the edit route
                }}
              >
                <i className="mdi mdi-eye font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  View Job
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = arg => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
      globalStatus: user.globalStatus,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = users => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(contact));
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Recruitment" titleLink="/recruitment/" breadcrumbItem="Jobs" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    addUserLabel="Add Job"
                    handleUserClick={ () => props.history.push(`/recruitment/edit-candidate/9}`) }
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
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
                                invalid={
                                  validation.touched.name &&
                                    validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                                validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Designation</Label>
                              <Input
                                name="designation"
                                label="Designation"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                                invalid={
                                  validation.touched.designation &&
                                    validation.errors.designation
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.designation &&
                                validation.errors.designation ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.designation}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                    validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                                validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Option</Label>
                              <Input
                                type="select"
                                name="tags"
                                className="form-select"
                                multiple={true}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tags || []}
                                invalid={
                                  validation.touched.tags &&
                                    validation.errors.tags
                                    ? true
                                    : false
                                }
                              >
                                <option>Photoshop</option>
                                <option>illustrator</option>
                                <option>Html</option>
                                <option>Php</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>UI/UX Designer</option>
                                <option>Ruby</option>
                                <option>Css</option>
                              </Input>
                              {validation.touched.tags &&
                                validation.errors.tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Positions Applied</Label>
                              <Input
                                name="globalStatus"
                                label="Projects"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.globalStatus || ""}
                                invalid={
                                  validation.touched.globalStatus &&
                                    validation.errors.globalStatus
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.globalStatus &&
                                validation.errors.globalStatus ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.globalStatus}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(JobList);
