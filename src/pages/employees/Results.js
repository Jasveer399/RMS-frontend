import { Table } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import Form from '../../components/Form'
import SideNavBar from './SideNavBar'

function Results(){
  const dispatch = useDispatch();
  const [results, setResults] = React.useState([]);
  const navigate = useNavigate();
  const getResults = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/results/get-all-results",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  // const deleteResult = async (resultId) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.post(
  //       `/api/result/delete-result/${resultId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       getResults();
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     toast.error(error.message);
  //   }
  // };
  
  

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
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3">
          <i
            className="ri-pencil-line"
            onClick={() => {
              navigate(`/employee/results/edit/${record._id}`);
            }}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div className="flex">
      <SideNavBar/>
    <div className="w-full h-full">
      <PageTitle title="Results" />
      <h6 className='text-center text-xl pb-3 underline'>Add Result</h6>
        <form >
          <div className="flex items-center justify-center gap-4">
              <div class='flex justify-center items-center pt-3'>
                <select
                    class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52"
                    >
                        <option value="" disabled selected>
                            Select Class 
                        </option>
                        <option value="">
                            Class 1
                        </option>
                        <option value="">
                            Class 2
                        </option>
                        <option value="">
                            Class 3
                        </option>
                        <option value="">
                            Class 4
                        </option>
                </select>
              </div>
              <div class='flex justify-center items-center pt-3'>
                <select
                    class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52"
                    >
                        <option value="" disabled selected>
                            Select Semester 
                        </option>
                        <option value="">
                            Sem 1st
                        </option>
                        <option value="">
                            Sem 2nd
                        </option>
                        <option value="">
                            Sem 3rd
                        </option>
                        <option value="">
                            Sem 4th
                        </option>
                        <option value="">
                            Sem 5th
                        </option>
                        <option value="">
                            Sem 6th
                        </option>
                        <option value="">
                            Sem 7th
                        </option>
                        <option value="">
                            Sem 8th
                        </option>
                </select>
              </div>
              <div class='flex justify-center items-center pt-3'>
                <select
                    class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52"
                    >
                        <option value="" disabled selected>
                            Select Subject 
                        </option>
                        <option value="">
                            sub 1
                        </option>
                        <option value="">
                            sub 2
                        </option>
                        <option value="">
                            sub 3
                        </option>
                        <option value="">
                            sub 4
                        </option>
                </select>
              </div>
          </div>
          <div className="flex items-center justify-center my-3">
            <button className="bg-blue-950 text-white px-4 font-bold">Confirm</button>
          </div>
        </form>
        {/* <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/employee/results/add");
          }}
        >
          Add Result
        </button> */}
      
      <Table columns={columns} dataSource={results} />
    </div>
    </div>
  );
}

export default Results;
