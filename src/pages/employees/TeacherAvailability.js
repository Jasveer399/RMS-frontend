import { Table } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import SideNavBar from "./SideNavBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";

const TeacherAvailability = () => {
  const [teachers, setTeachers] = useState([]);
  const [bookedTeachers, setBookedTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [teacherAvaFrom, setTeacherAvaFrom] = useState("");
  const [teacherAvaTo, setTeacherAvaTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [addAvaComp, setAddAvaComp] = useState(true);
  const [bookedAppComp, setBookedAppComp] = useState(false);
  const dispatch = useDispatch();

  const onChangeTeacherName = (name, value) => {
    setTeacherName(value);
  };
  const onChangeTeacherAvaFrom = (name, value) => {
    setTeacherAvaFrom(value);
  };
  const onChangeTeacherAvaTo = (name, value) => {
    setTeacherAvaTo(value);
  };
  const onChangeTimeFrom = (name, value) => {
    setTimeFrom(value);
  };
  const onChangeTimeTo = (name, value) => {
    setTimeTo(value);
  };

  const addTeacherAvailability = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://rms-backend-1rd9.onrender.com/api/teacheravl/add-teacheravl",
        {
          teacherName,
          teacherAvaFrom,
          teacherAvaTo,
          timeFrom,
          timeTo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setTeacherName("");
      setTeacherAvaFrom("");
      setTeacherAvaTo("");
      setTimeFrom("");
      setTimeTo("");
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAllTeacherAvailable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    } finally {
      setTeacherName("");
      setTeacherAvaFrom("");
      setTeacherAvaTo("");
      setTimeFrom("");
      setTimeTo("");
      setIsUpdate(false);
    }
  };

  const deleteSubject = async (id) => {
    try {
      const response = await axios.post(
        `https://rms-backend-1rd9.onrender.com/api/teacheravl/delete-Teacher/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      getAllTeacherAvailable();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateSubject = async (e, id) => {
    e.preventDefault();
    try {
      console.log(id);
      dispatch(ShowLoading());
      const response = await axios.post(
        `https://rms-backend-1rd9.onrender.com/api/teacheravl/update-teacher`,
        {
          teacherName: teacherName,
          teacherAvaFrom: teacherAvaFrom,
          teacherAvaTo: teacherAvaTo,
          timeFrom: timeFrom,
          timeTo: timeTo,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAllTeacherAvailable();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    } finally {
      setIsUpdate(false);
      setTeacherName("");
      setTeacherAvaFrom("");
      setTeacherAvaTo("");
      setTimeFrom("");
      setTimeTo("");
      setTeacherId("");
    }
  };

  const getAllTeacherAvailable = async () => {
    try {
      const response = await axios.get(
        "https://rms-backend-1rd9.onrender.com/api/teacheravl/get-all-availablesTeacher"
      );
      setTeachers(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllTeacherAvailable();
  }, []);

  const checkBookedHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://rms-backend-1rd9.onrender.com/api/teacheravl/get-all-bookedTeacher");
      console.log(response.data.data);
      setBookedTeachers(response.data.data);
      setAddAvaComp(false);
      setBookedAppComp(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const unBookTeacher = async (e,id) => {
    try {
      const response = await axios.post("https://rms-backend-1rd9.onrender.com/api/teacheravl/unbookedTeacher", {
        id: id,
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      checkBookedHandler(e);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addAvaHandler = (e) => {
    e.preventDefault();
    setAddAvaComp(true);
    setBookedAppComp(false);
  };

  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "Available From",
      dataIndex: "teacherAvaFrom",
      key: "teacherAvaFrom",
    },
    {
      title: "Available To",
      dataIndex: "teacherAvaTo",
      key: "teacherAvaTo",
    },
    {
      title: "Time From",
      dataIndex: "timeFrom",
      key: "timeFrom",
    },
    {
      title: "Time To",
      dataIndex: "timeTo",
      key: "timeTo",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteSubject(record._id);
            }}
          ></i>
          <i
            onClick={() => {
              setTeacherName(record.teacherName);
              setTeacherAvaFrom(record.teacherAvaFrom);
              setTeacherAvaTo(record.teacherAvaTo);
              setTimeFrom(record.timeFrom);
              setTimeTo(record.timeTo);
              setIsUpdate(true);
              setTeacherId(record._id);
            }}
            className="ri-pencil-line"
          ></i>
        </div>
      ),
    },
  ];

  const bookedColumn = [
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "Date",
      dataIndex: "bookedDate",
      key: "bookedDate",
    },
    {
      title: "Time From",
      dataIndex: "timeFrom",
      key: "timeFrom",
    },
    {
      title: "Time To",
      dataIndex: "timeTo",
      key: "timeTo",
    },
    {
      title: "Student Name",
      dataIndex: "bookedBy",
      key: "bookedBy",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <button
            onClick={(e) => unBookTeacher(e,record._id)}
            className="bg-blue-950 rounded-lg h-5 text-white px-2" // Disable the button if already booked
          >
            UnBooked
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex">
        <SideNavBar />
        <div className="w-full border-l-2 border-blue-950">
          <PageTitle title="Teacher Availability" />
          {addAvaComp && (
            <>
              <div className="flex justify-center">
                <h6 className="text-center text-xl mb-4 mt-2 underline">
                  Add Teacher Availability
                </h6>
                <button
                  className="absolute right-2 bg-blue-950 text-white px-4 font-bold"
                  onClick={checkBookedHandler}
                >
                  Check Booked Appointment
                </button>
              </div>
              <form>
                <div className="flex justify-center gap-4">
                  <Form
                    value={teacherName}
                    onChange={onChangeTeacherName}
                    title="Teacher Name"
                    name="teachername"
                    type="text"
                  />
                  <Form
                    value={teacherAvaFrom}
                    onChange={onChangeTeacherAvaFrom}
                    title="Teacher Available From"
                    name="avafrom"
                    type="date"
                  />
                  <Form
                    value={teacherAvaTo}
                    onChange={onChangeTeacherAvaTo}
                    title="Teacher Available To"
                    name="avato"
                    type="date"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <Form
                    value={timeFrom}
                    onChange={onChangeTimeFrom}
                    title="Time From"
                    name="timefrom"
                    type="time"
                  />
                  <Form
                    value={timeTo}
                    onChange={onChangeTimeTo}
                    title="Time To"
                    name="timeto"
                    type="time"
                  />
                </div>

                {isUpdate ? (
                  <div className="flex items-center justify-center my-3">
                    <button
                      onClick={(e) => {
                        updateSubject(e, teacherId);
                      }}
                      className="bg-blue-950 text-white px-4 font-bold"
                    >
                      Update Teacher Availability
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center my-3">
                    <button
                      onClick={addTeacherAvailability}
                      className="bg-blue-950 text-white px-4 font-bold"
                    >
                      Add Teacher Availability
                    </button>
                  </div>
                )}
              </form>
              <Table columns={columns} dataSource={teachers} />
            </>
          )}
          {bookedAppComp && (
            <>
              <div className="flex justify-center">
                <h6 className="text-center text-xl mb-4 mt-2 underline">
                  Booked Appointment
                </h6>
                <button
                  className="absolute right-2 bg-blue-950 text-white px-4 font-bold"
                  onClick={addAvaHandler}
                >
                  Add Teacher Availability
                </button>
              </div>
              <Table columns={bookedColumn} dataSource={bookedTeachers} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherAvailability;
