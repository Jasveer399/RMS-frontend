import { Table } from 'antd';
import React from 'react'
import PageTitle from '../../components/PageTitle';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    const [classes, setClasses] = React.useState([]);
    const navigate= useNavigate();
    const columns = [
        {
            title: 'Class Code',
            dataIndex: 'classCode',
            key: 'classCode',
        },
        {
            title: 'Subjects List',
            dataIndex:'subjects',
            key: 'subjects',
            render: subjects => (
                <ul>
                    {subjects.map(subject => (
                        <li key={subject}>{subject}</li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className="d-flex gap-3">
                  <i
                    className="ri-delete-bin-line"></i>
                    <i
                      className="ri-pencil-line"></i>
                      </div>
                    ),
        }
    ]
  return (
    <div>
      <PageTitle title="Classes" />
      <div className="d-flex justify-content-end align-items-center my-3">
        <button className="primary text-white px-3" onClick={() => navigate("/employee/classes/add")}>Add Class</button>
    </div>
    <Table columns={columns} dataSource={classes} />
    </div>
  );
}

export default Classes
