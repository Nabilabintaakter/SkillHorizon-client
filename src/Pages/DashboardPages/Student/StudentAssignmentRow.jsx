import React from 'react';

const StudentAssignmentRow = ({ assignment, index }) => {
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
                <button
                    className="border-none btn btn-sm py-1 md:px-7 w-full rounded-md  bg-green-500 hover:bg-white text-white hover:text-green-600 transition-all duration-500"
                >
                    Submit
                </button>
            </td>
        </tr>
    );
};

export default StudentAssignmentRow;