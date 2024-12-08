import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { Spinner } from "@nextui-org/react";
import UserStore from "../store/UserStore";
import { getFeed } from "../actions/post";
import { TPost, TSharePost } from "../types/post";
import PostCard from "./PostCard";
import SharedPostCard from "./SharedPostCard";
import { Pagination } from "@nextui-org/react";

const FeedTab = () => {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(2); // Set a default page size
	const [totalPages, setTotalPages] = useState(1); // Dynamically track total pages

	useEffect(() => {
		const fetchTotalPages = async () => {
			await getFeed({ page: 1, pageSize }).then((res) => {
				if (res.code === "success") {
					const totalCount = res.data.totalCount || 0;
					setTotalPages(Math.ceil(totalCount / pageSize));
				}
			});
		};
		fetchTotalPages();
	}, [pageSize]);

	return (
		<div className="overflow-y-auto w-[60%] h-full flex flex-col items-center p-4 scrollbar-hide">
			<CreatePost />
			<PostAndSharedPost page={page} pageSize={pageSize} />
			<div className="flex items-center mt-4 gap-2">
				<Pagination
					showControls
					initialPage={1}
					total={totalPages}
					onChange={(newPage) => setPage(newPage)}
				/>
			</div>
		</div>
	);
};

export default FeedTab;

type PostAndSharedPostProps = {
	page: number;
	pageSize: number;
};

export const PostAndSharedPost: React.FC<PostAndSharedPostProps> = ({
	page,
	pageSize,
}) => {
	const { setFeed, feed } = UserStore();
	const [loading, setloading] = useState(false);

	useEffect(() => {
		const fetchPostAndSharedPost = async () => {
			setloading(true);
			await getFeed({ page, pageSize })
				.then((res) => {
					if (res.code === "success") {
						console.log(res.data.feed);
						setFeed(res.data.feed);
					} else {
						console.log(res.error);
					}
				})
				.finally(() => {
					setloading(false);
				});
		};
		fetchPostAndSharedPost();
	}, [page, pageSize, setFeed]);

	if (loading) {
		return <Spinner className="mt-4" />;
	}

	return (
		<div className="flex flex-col gap-4 mt-4">
			{feed.length > 0 &&
				feed.map((item, i) => (
					<div key={i} className="post">
						{isTPost(item) ? (
							<PostCard post={item} />
						) : (
							<SharedPostCard post={item} user={item.User} />
						)}
					</div>
				))}
		</div>
	);
};

// Type guard to check if the item is TPost
function isTPost(item: TPost | TSharePost): item is TPost {
	return (item as TPost) !== undefined && (item as TPost).user !== undefined;
}
