import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { ImSpinner9, ImCross } from 'react-icons/im';
import { imageUpload } from '../../api/utils';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateClassModal = ({ isOpen, close, classItem ,refetch}) => {
    const axiosSecure = useAxiosSecure();
    const [uploadImage, setUploadImage] = useState({
        image: { name: 'Choose Image' },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (isOpen && classItem) {
            reset({
                title: classItem.title,
                price: classItem.price,
                description: classItem.description,
            });
            setUploadImage({
                image: { name: 'Choose Image' },
            });
        }
    }, [isOpen, classItem, reset]);

    // REQUEST (PATCH)
    const { mutate: UpdateClass, isPending } = useMutation({
        mutationFn: async (classInfo) => {
            try {
                const response = await axiosSecure.patch(`/update-class/${classInfo?.id}`, classInfo);
                return response.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Something went wrong');
            }
        },
        onSuccess: () => {
            toast.success("Your class has been updated successfully!");
            close();
            refetch();
        },
        onError: (error) => {
            toast.error(error.message || 'Error occurred during class update');
        },
    });
    console.log("isPending:", isPending);

    const onSubmit = async (data) => {
        if (!data.image || data.image[0]?.size > 5 * 1024 * 1024) {
            toast.error('Please upload a valid image under 5MB!');
            return;
        }

        try {
            const imgData = await imageUpload(data.image[0]);
            const classInfo = {
                ...data,
                image: imgData,
                price: parseInt(data?.price, 10),
                id: classItem?._id,
            };
            console.log(classInfo);
            UpdateClass(classInfo);  // Call the mutation to update class
        } catch (error) {
            toast.error(error.message || 'Error uploading image');
        }
    };

    const handleClose = () => {
        reset();
        close();
    };

    return (
        <Dialog open={isOpen} as="div" className="relative z-10" onClose={handleClose}>
            <div className="fixed inset-0 backdrop-blur-[0.5px]"></div>
            <div className="fixed inset-0 flex items-center justify-center p-4 font-josefin">
                <DialogPanel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-gray-900 relative">
                    <button
                        className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                        onClick={handleClose}
                    >
                        <ImCross className="text-lg" />
                    </button>
                    <DialogTitle as="h3" className="text-2xl md:text-3xl font-semibold text-center mb-4">
                        Update Your Class Details
                    </DialogTitle>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
                        <div className="mb-1">
                            <label htmlFor="title" className="block text-base md:text-lg font-semibold mb-1">
                                Class Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter class title"
                                className="bg-gray-200 w-full p-3 rounded-md"
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                        </div>

                        <div className="mb-1">
                            <label htmlFor="price" className="block text-base md:text-lg font-semibold mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                placeholder="Enter price"
                                className="bg-gray-200 w-full p-3 rounded-md"
                                {...register('price', { required: 'Price is required', min: 0 })}
                            />
                            {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                        </div>

                        <div className="mb-1 col-span-2">
                            <label htmlFor="description" className="block text-base md:text-lg font-semibold mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows="3"
                                placeholder="Write a short description about your class..."
                                className="bg-gray-200 w-full p-3 rounded-md"
                                {...register('description', { required: 'Description is required' })}
                            ></textarea>
                            {errors.description && (
                                <span className="text-red-500 text-sm">{errors.description.message}</span>
                            )}
                        </div>

                        <div className="w-full m-auto rounded-lg flex-grow col-span-2">
                            <div className="file_upload p-2 md:p-3 relative border-2 border-dotted border-gray-300 rounded-lg">
                                <div className="flex flex-col w-max mx-auto text-center">
                                    <label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept="image/*"
                                            className="text-sm cursor-pointer w-36 hidden"
                                            {...register('image', {
                                                required: 'Image is required',
                                                validate: {
                                                    validImage: (files) => {
                                                        if (!files || !files[0]) return 'Please upload an image';
                                                        if (files[0]?.size > 5 * 1024 * 1024)
                                                            return 'Image size exceeds 5MB';
                                                        return true;
                                                    },
                                                },
                                                onChange: (e) =>
                                                    setUploadImage({
                                                        image: e.target.files[0],
                                                        url: URL.createObjectURL(e.target.files[0]),
                                                    }),
                                            })}
                                        />
                                        <div className="bg-[#009478] text-white rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#139196]">
                                            {uploadImage?.image?.name || 'Choose Image'}
                                        </div>
                                    </label>
                                </div>
                                {uploadImage?.image?.size && (
                                    <div className="flex gap-2 md:gap-5 items-center mt-3">
                                        <img
                                            className="w-1/2 h-20 object-cover border border-gray-300"
                                            src={uploadImage?.url}
                                            alt=""
                                        />
                                        <p>
                                            <span className="font-medium">Image Size:</span>{' '}
                                            {uploadImage?.image?.size} Bytes
                                        </p>
                                    </div>
                                )}
                                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="text-white rounded-[5px] bg-gradient-to-r from-[#66BE80] to-[#139196] font-medium hover:bg-gradient-to-r hover:from-[#139196] hover:to-[#139196] cursor-pointer w-full py-2 flex justify-center items-center duration-1000 ease-in-out transition-all"
                            >
                                {isPending ? (
                                    <p className="flex items-center gap-2">
                                        Saving...
                                        <ImSpinner9 className="animate-spin m-auto text-sm" />
                                    </p>
                                ) : (
                                    'Update Class'
                                )}
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default UpdateClassModal;
