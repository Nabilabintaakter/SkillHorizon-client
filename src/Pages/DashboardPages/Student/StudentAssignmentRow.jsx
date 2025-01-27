import { Button } from '@headlessui/react';
import React, { useState } from 'react';
import AssignmentSubmissionModal from './AssignmentSubmissionModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const StudentAssignmentRow = ({ assignment, index }) => {
    let [isOpen, setIsOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    function close() {
        setIsOpen(false);
    }

    const thisAssignmentSubmission = (mySubmission) => {
        if (mySubmission.assignmentTitle === assignment?.title) {
            setIsButtonDisabled(true);
            close();
        }
    }

    return (
        <tr

            className={`border-b ${index % 2 === 0 ? 'bg-[#95D3A2] bg-opacity-10' : 'bg-[#95D3A2] bg-opacity-20'} hover:bg-[#95D3A2] hover:bg-opacity-30`}
        >
            {/* index */}
            <td className="px-4 py-3 text-sm font-semibold text-gray-800">{index + 1}</td>
            {/* Title */}
            <td className="px-4 py-3 text-sm font-medium text-gray-800">{assignment.title}</td>
            {/* Description */}
            <td className="px-4 py-3 text-sm font-medium text-gray-600">{assignment.description}</td>
            {/* Deadline */}
            <td className="px-4 py-3 text-sm font-medium text-gray-600">{assignment.deadline}</td>
            <td className="px-4 py-3 md:px-7 text-sm font-medium text-gray-600">
            <Button
          onClick={() => setIsOpen(true)}
          disabled={isButtonDisabled} // Button disable করার জন্য state ব্যবহার
          className={`border-none btn btn-sm py-1 md:px-7 w-full rounded-md ${
            isButtonDisabled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-green-500 hover:bg-white text-white hover:text-green-600 transition-all duration-500"
          }`}
        >
          {isButtonDisabled ? "Submitted" : "Submit"}
        </Button>
                {/*AssignmentSubmissionModal*/}
                <AssignmentSubmissionModal
                    isOpen={isOpen}
                    close={close}
                    assignment={assignment}
                    thisAssignmentSubmission={thisAssignmentSubmission}
                />
            </td>
        </tr>
    );
};

export default StudentAssignmentRow;