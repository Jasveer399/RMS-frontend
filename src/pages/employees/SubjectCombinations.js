import React from 'react'
import SideNavBar from './SideNavBar'
import PageTitle from '../../components/PageTitle'

function SubjectCombinations() {
  return (
    <>
        <div className='flex'>
            <SideNavBar />
            <div className=' w-full'>
                <PageTitle title="Subjects Combination" />
                <h6 className='text-center text-xl pb-3 underline'>Subject Combinations</h6>
                <div className='flex justify-center gap-5'>
                    <div class='flex justify-center'>
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

                    <div class='flex justify-center'>
                        <select
                            class="border-2 border-blue-950 p-2 bg-white rounded-3xl w-52"
                            >
                                <option value="" disabled selected>
                                    Select Subject 
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

                    <div>
                        <button className="bg-blue-950 text-white px-4 font-bold">Add More...</button>
                    </div>
                </div>

                <div className="flex items-center justify-center my-4">
                    <button className="bg-blue-950 text-white px-4 font-bold">Lock Subjects</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default SubjectCombinations