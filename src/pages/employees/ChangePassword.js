import React from 'react'
import PageTitle from '../../components/PageTitle'
import Form from '../../components/Form'
import SideNavBar from './SideNavBar'

function ChangePassword() {
  return (
    <>
    <div className='flex'>
      <SideNavBar />
      <div className="w-full h-full">
        <PageTitle title="Change Password" />
        <h6 className='text-center text-xl pb-3 underline'>Change Password</h6>

        <form>
            <div className='flex justify-center gap-4 mt-2'>
                <Form title="Enter Old Password" name="oldpass" />
                <Form title="Enter New Password" name="newpass" />
            </div>

            <div className="flex items-center justify-center my-3">
              <button className="bg-blue-950 text-white px-4 font-bold">Change Password</button>
            </div>
        </form>

        <h6 className='text-center text-xl pb-3'>OR</h6>
        <h6 className='text-center text-xl pb-3 underline'>Reset Password</h6>

        <form>
            <div className='flex justify-center gap-4 mt-2'>
                <Form title="Enter your mail" name="mailpass" />
            </div>

            <div className="flex items-center justify-center my-3">
              <button className="bg-blue-950 text-white px-4 font-bold">Send</button>
            </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default ChangePassword