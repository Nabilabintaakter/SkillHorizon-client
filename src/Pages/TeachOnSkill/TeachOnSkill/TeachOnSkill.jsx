import { useForm } from "react-hook-form";
import image from "../../../assets/become-a-teacher.png";
import userImg from "../../../assets/user.png";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Container from "../../../Shared/Container/Container";

const TeachOnSkill = () => {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const teacherInfo = 
        {...data, 
        image:user?.photoURL,
        status: 'pending'  
        }
        console.log(teacherInfo); 
        reset(); 
        toast.success("Application submitted successfully!");
    };

    return (
        <Container>
            <div className="flex flex-col md:flex-row items-center lg:gap-5 pt-3 pb-8">
                {/* Left Section - Image */}
                <div className="flex justify-center w-full md:w-1/2 mb-8 md:mb-0">
                    <img src={image} alt="Teach on Skill" className="w-[50%] sm:w-[60%] md:w-[70%] lg:w-[60%] h-auto" />
                </div>
                {/* Right Section - Form */}
                <div className="w-full md:w-1/2 mx-auto px-5 md:px-0 lg:pr-10">
                <h2 className="text-center text-2xl lg:text-3xl font-semibold mb-2 text-gray-800">Register to Become an Instructor</h2>
                <p className="text-gray-500 mb-4 text-center lg:text-lg">Join our platform to share your expertise and inspire learners worldwide.</p>

                    {/* Profile Section */}
                    <div className="flex flex-col items-center mb-3">
                        <img
                            src={user?.photoURL || userImg}
                            alt="User Avatar"
                            className="w-20 h-20 md:w-14 md:h-14 lg:w-20 lg:h-20 bg-[#139196] p-[1px] rounded-full mb-1 lg:mb-4"
                        />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 lg:gap-4">
                        {/* Name Field */}
                        <div className="col-span-2 md:col-span-1">
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-2 bg-[#F2F0EF] rounded focus:outline-none focus:ring-2 focus:ring-[#66BE80]"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email Field (Read Only) */}
                        <div className="col-span-2 md:col-span-1">
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full px-4 py-2 bg-[#F2F0EF] rounded  text-gray-700 focus:outline-none"
                            />
                        </div>

                        {/* Experience Field */}
                        <div className="col-span-2 md:col-span-1">
                            <select
                                {...register("experience", { required: "Experience level is required" })}
                                className="w-full px-4 py-[11.5px] bg-[#F2F0EF] rounded focus:outline-none focus:ring-2 focus:ring-[#66BE80]"
                            >
                                <option value="">Select Experience Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="mid-level">Mid-level</option>
                                <option value="experienced">Experienced</option>
                            </select>
                            {errors.experience && (
                                <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                            )}
                        </div>

                        {/* Title Field */}
                        <div className="col-span-2 md:col-span-1">
                            <input
                                type="text"
                                placeholder="Course Title"
                                {...register("title", { required: "Title is required" })}
                                className="w-full px-4 py-2 bg-[#F2F0EF] rounded focus:outline-none focus:ring-2 focus:ring-[#66BE80]"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Category Field */}
                        <div className="col-span-2">
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-[11px] bg-[#F2F0EF] rounded focus:outline-none focus:ring-2 focus:ring-[#66BE80]"
                            >
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Web Design">Web Design</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="App Development">App Development</option>
                                <option value="Game Development">Game Development</option>
                                <option value="Cyber Security">Cyber Security</option>
                                <option value="Artificial Intelligence">Artificial Intelligence</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="SEO Optimization">SEO Optimization</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Cloud Computing">Cloud Computing</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#66BE80] to-[#139196]  font-medium hover:bg-gradient-to-r hover:from-[#139196] hover:to-[#139196] text-white py-2 rounded  transition-all duration-300"
                            >
                                Submit for Review
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </Container>
    );
};

export default TeachOnSkill;
