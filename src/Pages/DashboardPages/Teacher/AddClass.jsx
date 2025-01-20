import { useForm } from 'react-hook-form';
import bg from '../../../assets/add-class.jpg';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { imageUpload, shortImageName } from '../../../api/utils';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [uploadImage, setUploadImage] = useState({
        image: { name: 'Choose Image' },
    });

    // useMutation hook
    // const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async classData => {
            await axiosSecure.post(`/classes`, classData)
        },
        onSuccess: () => {
            console.log('class data saved')
            // queryClient.invalidateQueries({ queryKey: ['classes'] })
        },
        onError: err => {
            console.log(err.message)
        },
    })

    const onSubmit = async (data) => {
        if (!data.image || data.image.size > 5 * 1024 * 1024) {
            toast.error('Please upload a valid image under 5MB!');
            return;
        }
        // console.log(data.image[0]);
        const imgData = await imageUpload(data.image[0]);
        console.log(imgData);

        const classInfo = {
            ...data,
            name: user?.displayName,
            email: user?.email,
            image: imgData,
            status: 'Pending',
            price: parseInt(data?.price, 10) // Parse the price to an integer
        }
        try {
            // 1. make a post request using useMutation hook
            await mutateAsync(classInfo)
            // 2. Reset form
            reset();
            setUploadImage({ image: { name: 'Choose Image' } });
            // 3. Show toast and navigate
            console.log(classInfo);
            toast.success('Class added successfully!');
            navigate('/dashboard/my-class')
        } catch (err) {
            toast.error(err.message)
        }
    };

    return (
        <div
            className="hero md:min-h-screen"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-neutral-content">
                <div className="w-full bg-white bg-opacity-90 p-4 md:p-6 rounded-lg shadow-lg text-gray-800">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Add Your Class Details
                    </h2>
                    <p className="text-sm text-gray-600 mb-6 text-center">
                        Please fill out the form to add a new class. Ensure all fields are correctly filled.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
                        {/* Name */}
                        <div className="mb-1">
                            <label htmlFor="name" className="block text-base font-semibold mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="text-sm w-full p-3 rounded-md"
                                value={user?.displayName || ''}
                                readOnly
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-1">
                            <label htmlFor="email" className="block text-base font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="text-sm w-full p-3 rounded-md"
                                value={user?.email || ''}
                                readOnly
                            />
                        </div>

                        {/* Class Title */}
                        <div className="mb-1">
                            <label htmlFor="title" className="block text-base font-semibold mb-1">
                                Class Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter your class title"
                                className="text-sm w-full p-3 rounded-md bg-white"
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-1">
                            <label htmlFor="price" className="block text-base font-semibold mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                placeholder="Enter price"
                                className="text-sm w-full p-3 rounded-md"
                                {...register('price', { required: 'Price is required', min: 0 })}
                            />
                            {errors.price && (
                                <span className="text-red-500 text-sm">
                                    {errors.price.message}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-1 col-span-1">
                            <label htmlFor="description" className="block text-base font-semibold mb-1">
                                Class Description
                            </label>
                            <textarea
                                id="description"
                                rows="5"
                                placeholder="Write a short description about your class..."
                                className="text-sm w-full p-3 rounded-md"
                                {...register('description', { required: 'Description is required' })}
                            ></textarea>
                            {errors.description && (
                                <span className="text-red-500 text-sm">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>

                        {/* Image */}
                        <div className="w-full m-auto rounded-lg flex-grow">
                            <div className="file_upload p-2 md:px-5 md:py-3 relative border-2 border-dotted border-gray-300 rounded-lg">
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
                                                onChange: (e) =>
                                                    setUploadImage({
                                                        image: e.target.files[0],
                                                        url: URL.createObjectURL(e.target.files[0]),
                                                    }),
                                            })}
                                        />
                                        <div className="bg-[#009478] text-white rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#009478] text-sm">
                                            {shortImageName(uploadImage?.image)}
                                        </div>
                                    </label>
                                </div>
                                {uploadImage && uploadImage?.image?.size && (
                                    <div className="flex gap-2 md:gap-5 items-center mt-5">
                                        <img
                                            className="w-20 h-16 object-cover border border-gray-300"
                                            src={uploadImage?.url}
                                            alt=""
                                        />
                                        <p className="text-sm">
                                            Image Size: {uploadImage?.image?.size} Bytes
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2">
                            <button
                                type='submit' className="text-white rounded-[5px] bg-gradient-to-r from-[#66BE80] to-[#139196] font-medium hover:bg-gradient-to-r hover:from-[#139196] hover:to-[#139196] cursor-pointer w-full py-2 flex justify-center items-center duration-1000 ease-in-out transition-all"
                            >
                                {isPending ? (
                                    <p className="flex items-center gap-2">
                                        Saving...
                                        <ImSpinner9 className="animate-spin m-auto text-sm" />
                                    </p>
                                ) : (
                                    'Add Class'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClass;
