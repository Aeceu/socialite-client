import FeedTab from "../components/FeedTab";
import SideBar from "../components/SideBar";
import SocialTab from "../components/SocialTab";

const Home = () => {
  return (
    <div className="h-[calc(100vh-70px)] flex ">
      <SideBar />
      <FeedTab />
      <SocialTab />
    </div>
  );
};
export default Home;
