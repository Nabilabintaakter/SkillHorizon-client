import AboutTab from "./AboutTab";
import FollowCard from "./FollowCard";


const ProfileCard = ({name, email}) => {
    console.log(name);
    return (
        <div className="mt-4 flex justify-between">
            <FollowCard></FollowCard>
            <AboutTab name={name} email={email}></AboutTab>
        </div>
    );
};

export default ProfileCard;