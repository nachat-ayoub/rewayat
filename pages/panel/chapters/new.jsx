import { requireAuthorAuth } from "../../../utils/middlewares";
import axios from "axios";

import Container from "../../../components/Container";

const newChapter = ({ novels }) => {
	return (
		<Container className="h-full">
			<div className="h-full w-full flex justify-center items-center flex-col">
				<form
					onSubmit={(e) => e.preventDefault()}
					dir="ltr"
					className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mx-3 sm:w-4/5 sm:mx-8 md:w-[65vw] md:max-w-[30rem]"
				>
					<h2 className="mb-3 text-xl text-gray-700 font-bold text-center">
						Create new chapter!
					</h2>
					{/* Fields */}
					<div className="w-full">
						{/* Novel */}
						<div className="w-full">
							<select className="input cursor-pointer">
								<option value="">select novel</option>
								{novels.length > 0 &&
									novels.map((novel) => (
										<option
											key={novel?.slug}
											value={novel?.slug}
										>
											{novel?.title}
										</option>
									))}
							</select>
							<div className="my-2">
								<div className="text-red-500 text-sm">
									{/* {errors.novel?.message} */}
								</div>
							</div>
						</div>
						{/* Title */}
						<div className="w-full">
							<input
								dir="auto"
								className="input mt-2"
								type="text"
								placeholder="chapter title..."
								// {...register("title")}
							/>
							<div className="my-2">
								<div className="text-red-500 text-sm">
									{/* {errors.title?.message} */}
								</div>
							</div>
						</div>
						{/* Content */}
						<div className="w-full">
							<textarea
								dir="auto"
								rows={4}
								className="input mt-2 min-h-[2.5rem]"
								type="text"
								placeholder="chapter content..."
								// {...register("content")}
							/>
							<div className="my-2">
								<div className="text-red-500 text-sm">
									{/* {errors.content?.message} */}
								</div>
							</div>
						</div>
						{/*  */}
					</div>
				</form>
			</div>
		</Container>
	);
};

export default newChapter;

export const getServerSideProps = async ({ req }) => {
	return requireAuthorAuth({ req }, async ({ user }) => {
		const resp = await axios.get(
			process.env.API_URL + "/auth/" + user?.username,
			{
				headers: {
					token: user?.token,
				},
			}
		);

		const novels = resp?.data?.user?.novels ?? [];
		// console.log(resp.data);
		return {
			props: { novels },
		};
	});
};
