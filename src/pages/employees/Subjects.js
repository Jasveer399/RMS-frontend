import { Table } from 'antd';
import React from 'react'
import PageTitle from '../../components/PageTitle';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form';

const Subjects = () => {
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
      <PageTitle title="Manage Subjects" />
      <h6 className='text-center text-xl pb-3 underline'>Add New Subject</h6>
      <form>
        <div className='flex justify-center gap-4'>
          <Form title="Subject Name" name="subname" />
          <Form title="Subject Code" name="subcode" />
        </div>

        <div className="flex items-center justify-center my-3">
          <button className="bg-blue-950 text-white px-4 font-bold">Add Subject</button>
        </div>
      </form>
    <Table columns={columns} dataSource={classes} />
    </div>
  );
}

export default Subjects
