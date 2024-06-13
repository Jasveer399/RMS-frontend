import { Table } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";

function Examination() {
  const dispatch = useDispatch();
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://rms-backend-1rd9.onrender.com/api/results/get-all-results",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setExams(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const deleteExam = async (resultId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `https://rms-backend-1rd9.onrender.com/api/results/delete-result/${resultId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        getResults();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };
  
  

  useEffect(() => {
    getResults();
  }, []);

  const columns = [
    {
      title: "Examination",
      dataIndex: "examination",
      key: "examination",
    },
    {
      title: "Class Code",
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    // {
    //     title: "Subjects",
    //     dataIndex: "date",
    //     key: "date",
    //   },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => {
                deleteExam(record._id);
              }}
          ></i>

        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title="Examination" />
      <div className="d-flex justify-content-end align-items-center my-3">
        <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/employee/results/add");
          }}
        >
          Add Exam
        </button>
      </div>
      <Table columns={columns} dataSource={exams} />
    </div>
  );
}

export default Examination;
